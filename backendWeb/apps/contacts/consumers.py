from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import CustomUser, ContactRequest, Property
from redis import asyncio as aioredis
from rest_framework_simplejwt.tokens import AccessToken
from apps.properties.serializer import PropertyV1Serializer
from celery import shared_task
from .tasks import send_message_to_user

'''
tôi muốn tạo một consumer websocket để lắng nghe sự kiện từ client gửi lên
và gửi thông báo đến các client khác khi có sự kiện mới
và tôi muốn dùng celery để lưu các tin nhắn nếu người dùng đó chưa online
nếu người dùng đó online thì gửi trực tiếp qua websocket
'''

redis = aioredis.from_url("redis://localhost:6379/0", encoding='utf-8', decode_responses=True)

'''
{
    "type": "contact_request",
    "data": {
        "property": 18,
        "message": "Tôi muốn liên lạc với bạn"
    }
}
'''

class NotificationConsumer(AsyncJsonWebsocketConsumer):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.key_group = None
        self.user = None
    
    async def connect(self):
        self.user = self.scope['user']
        user_id = getattr(self.user, 'id', None)
        if not user_id:
            user_id = 'anonymous'
        self.key_group = f'notifications_{user_id}'
        print(f'Key group: {self.key_group}')

        if not getattr(self.user, "is_authenticated", False):
            await self.close(code=4401)
            return

        print(f"User {self.user} connected to WebSocket")

        await self.accept()
        await self.channel_layer.group_add(
            self.key_group,
            self.channel_name
        )

        # set online status in redis
        await redis.set(f'user_online_{user_id}', 'online')

        messages_queue = await redis.lrange(self.key_group, 0, -1)
        print('Queued messages:', len(messages_queue))
        if messages_queue:
            print('Sending queued messages:', len(messages_queue))
            for message in messages_queue:
                message = convert_message_str_to_json(message)
                await self.broadcast_to_group(self.key_group, message)
            await redis.delete(self.key_group)


    async def disconnect(self, close_code):
        if hasattr(self, 'key_group'):
            await self.channel_layer.group_discard(
                self.key_group,
                self.channel_name
                )
            
        await redis.delete(f'user_online_{getattr(self.user, "id", "anonymous")}')


    async def receive_json(self, content, **kwargs):
        type = content.get('type')
        data = content.get('data')
        if type == 'contact_request':
            await self.handle_contact_request(data)

    async def broadcast_to_group(self, group, message):
        await self.channel_layer.group_send(
            group,
            {
                'type': 'send_notification',
                'message': message
            }
        )
    
    
    async def send_notification(self, event):
        await self.send_json(event['message'])

    async def handle_contact_request(self, data):
        property_id = data.get('property_id')
        message = data.get('message', '')
        
        if not self.user.is_authenticated:
            await self.send_json({
                'error': 'User not authenticated'
            })
            return  
        
        property_owner, property = await self.get_property_owner(property_id)
        data = PropertyV1Serializer(property).data
        if not property_owner:
            await self.send_json({
                'error': 'Property not found'
            })
            return
        contact_request = await self.create_contact_request(self.user, property, message)

        status_owner = await redis.get(f'user_online_{property_owner.id}')
        key_group_owner = f'notifications_{property_owner.id}'
        full_data = {
            'type': 'contact_request',
            'property': data,
            'message': message,
            'timestamp': str(contact_request.created_at),
            'from_username': self.user.username
        }
        # print(full_data)
        print('key_group_owner:', key_group_owner)
        if status_owner == 'online':
            await self.broadcast_to_group(key_group_owner, full_data)
            print(1)
        else:
            send_message_to_user(property_owner.id, key_group_owner, full_data)
            print(2)

    @sync_to_async
    def get_property_owner(self, property_id):
        try:
            property = Property.objects.get(id=property_id)
            return property.user, property
        except Property.DoesNotExist:
            return None
        
    @sync_to_async
    def create_contact_request(self, user, property, message):
        return ContactRequest.objects.create(user=user, property=property, message=message)
    
def convert_message_str_to_json(message):
    import json
    data_string = message.replace("'", '"')
    return json.loads(data_string)