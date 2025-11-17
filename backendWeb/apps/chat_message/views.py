from rest_framework.views import APIView
from .models import Message
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from .serializers import MessageSerializer
from apps.participantConversation.models import ConversationParticipants
from django.db.models import Q, Count, F, Subquery, OuterRef
from apps.conversations.models import Conversation

class MessagesListView(APIView):
    permission_classes=[IsAuthenticated]

    def get_params(self, request):
        params = {}
        params['last_message_id'] = request.query_params.get('last_message_id', None)
        return params

    def get(self, request, conv_id):
        if not ConversationParticipants.objects.filter(user_id=request.user.id, conversation_id=conv_id).exists():
            PermissionError("you are not in this conversation")
        
        params = self.get_params(request)
        if params['last_message_id']:
            last_message_id = int(params['last_message_id'])
            messages = Message.objects.filter(conversation_id=conv_id, id__lt=last_message_id).order_by('-id')[:20]
            datas = MessageSerializer(messages, many=True).data
            try:
                last_message_id = messages[len(messages)-1].id
            except:
                last_message_id = None

        else:
            messages = Message.objects.filter(conversation_id=conv_id).order_by('-id')[:20]
            messages = list(reversed(messages))
            datas = MessageSerializer(messages, many=True).data
            last_message_id = messages[0].id
   
        return Response({
            'message':'retrieve success',
            'data':{
                'last_message_id': last_message_id,
                'data': datas
            }
        })
    
class NumberMessagesUnreadPerConversationView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        user_to_check = request.user.id

        last_read_msg_id_subquery = ConversationParticipants.objects.filter(
            conversation=OuterRef('pk'),
            user=user_to_check
        ).values('last_read_message_id')[:1]

        delete_time_subquery = ConversationParticipants.objects.filter(
            conversation=OuterRef('pk'),
            user=user_to_check
        ).values('delete_for_user_at')[:1]

        conversation_with_unread = Conversation.objects.filter(
            conversation_participants__user= user_to_check
        ).annotate(
            user_last_read_msg_id=Subquery(last_read_msg_id_subquery),
            user_delete_time=Subquery(delete_time_subquery)
        ).annotate(
            unread_count=Count(
                'conversation_messages',
                distinct=True,
                filter=Q(
                    ~Q(conversation_messages__sender=user_to_check),
                    Q(conversation_messages__id__gt=F('user_last_read_msg_id')) | Q(user_last_read_msg_id__isnull=True),
                    Q(conversation_messages__created_at__gt=F('user_delete_time')) | Q(user_delete_time__isnull=True)
                )
            )
        )

        datas = []
        for conv in conversation_with_unread:
            datas.append({
                'conversation_id': conv.id,
                'unread_count': conv.unread_count
            })
        return Response({
            'message': 'retrieve success',
            'data': datas
        }, status=status.HTTP_200_OK)