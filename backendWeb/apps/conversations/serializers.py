from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Conversation
from apps.accounts.models import CustomUser
from apps.chat_message.models import Message


class ConversationSerializer(ModelSerializer):
    to_user = SerializerMethodField()
    last_message = SerializerMethodField()
    last_message_id = SerializerMethodField()
    time_last_send = SerializerMethodField()


    class Meta:
        model = Conversation
        fields = ['id', 'type', 'to_user', 'last_message', 'last_message_id', 'time_last_send']

    def get_to_user(self, obj):
        """
        Với conversation private: trả về username của người còn lại
        (khác request.user), bỏ qua participant có user=NULL.
        """
        if getattr(obj, "type", None) != "private":
            return None

        request = self.context.get("request")
        if not request or not request.user or not request.user.is_authenticated:
            return None

        # Từ conversation -> conversation_participants -> user
        other_cp = (
            obj.conversation_participants
              .select_related("user")
              .exclude(user__isnull=True)
              .exclude(user_id=request.user.id)
              .first()
        )
        return other_cp.user.username if other_cp and other_cp.user else None
    

    def get_last_message_obj(self, obj):
        if hasattr(obj, '_last_message_cache'):
            return obj._last_message_cache
        last = obj.conversation_messages.order_by("-id").first()
        obj._last_message_cache = last
        return last

    def get_last_message(self, obj):
        """
        Lấy nội dung tin nhắn mới nhất. Giả định Message có FK:
        Message.conversation (related_name='messages').
        """
        last = self.get_last_message_obj(obj)
        return last.content if last else None
    
    def get_last_message_id(self, obj):
        """
        Lấy id tin nhắn mới nhất. Giả định Message có FK:
        Message.conversation (related_name='messages').
        """
        last = self.get_last_message_obj(obj)
        return last.id if last else None
    
    def get_time_last_send(self, obj):
        """
        Lấy thời gian tin nhắn mới nhất. Giả định Message có FK:
        Message.conversation (related_name='messages').
        """
        last = self.get_last_message_obj(obj)
        return last.created_at if last else None