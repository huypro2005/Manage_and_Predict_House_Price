from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import CustomUser
from redis import asyncio as aioredis


REDIS_URL = 'redis://127.0.0.1:6379/0'

class CustomUserConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']

        if not self.user.is_authenticated:
            self.close()
            return


        # connect redis
        self.redis = aioredis.from_url(REDIS_URL)
        self.redis_count_key = f'user_socket_count:{self.user.id}'

        # increase socket count
        count = await self.redis.incr(self.redis_count_key)
        if count == 1:
            await self.set_offline(self.user)

        await self.accept()
        await self.channel_layer.group_add("status_user", self.channel_name)



    async def disconnect(self, code):
        if hasattr(self, 'redis'):
            count = self.redis.decr(self.redis_count_key)
            if count <= 0:
                await self.set_offline(self.user)
                await self.redis.delete(self.redis_count_key)
        
        
        

    @sync_to_async
    def set_online(self, user):
        user.status = True
        user.save()

    @sync_to_async
    def set_offline(self, user):
        user.status = False
        user.save()