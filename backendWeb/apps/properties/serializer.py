from rest_framework import serializers
from .models import Property, PropertyImage
from datetime import datetime
from apps.utils import datetimeFormat
from apps.accounts.serializer import CustomUserV1Serializer

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = '__all__'

class PropertyV1Serializer(serializers.ModelSerializer):

    time = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    class Meta:
        model = Property
        fields = ['id', 'title', 'description', 'price', 'area_m2', 'address', 'thumbnail', 'views', 'time']

    # time là thời gian đăng so với hiện tại

    def get_time(self, obj):
        # Lấy thời gian hiện tại
        now = datetime.now()
        
        # Tính toán thời gian đã trôi qua so với thời điểm đăng
        delta = now - datetimeFormat(str(obj.created_at))

        # Trả về thời gian đã trôi qua theo dạng phù hợp
        if delta.days > 0:
            return f"{delta.days} ngày trước"
        elif delta.seconds // 3600 > 0:
            return f"{delta.seconds // 3600} giờ trước"
        elif delta.seconds // 60 > 0:
            return f"{delta.seconds // 60} phút trước"
        else:
            return f"{delta.seconds} giây trước"
        
    def get_price(self, obj):
        if obj.price > 1000:
            return f'{obj.price / 1000} tỷ'
        else:
            return f'{obj.price} triệu'


class PropertyDetailV1Serializer(serializers.ModelSerializer):

    images = PropertyImageSerializer(many=True, read_only=True)
    # user = CustomUserV1Serializer(read_only=True)

    user_fullname = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Property
        fields = '__all__'