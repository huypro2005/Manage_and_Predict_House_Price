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
        if obj.price >= 1000:
            return f'{obj.price / 1000} tỷ'
        else:
            return f'{obj.price} triệu'


class PropertyDetailV1Serializer(serializers.ModelSerializer):

    images = PropertyImageSerializer(many=True)
    # user = CustomUserV1Serializer(read_only=True)

    user_fullname = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Property
        fields = ['id', 'user', 'province', 
                  'username',
                  'district', 'title', 
                  'description', 'price', 
                  'area_m2', 'address', 
                  'images', 'thumbnail', 
                  'property_type', 'bedrooms',
                  'floors', 'coord_x', 'coord_y',
                  'legal_status', 'tab',
                  'user_fullname', 'user_email',
                  'views', 'created_at',
                  'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at', 'views', 'images']

    



    
    
class PropertyCreateFullV1Serializer(serializers.ModelSerializer):
    # Nếu bạn muốn thêm hình ảnh, sử dụng PropertyImageSerializer
    images = PropertyImageSerializer(many=True, required=False)  # Tùy chọn thêm hình ảnh
    
    class Meta:
        model = Property
        fields = [
            'id', 'province', 'district', 'title', 'description', 'price',
            'area_m2', 'address', 'images', 'thumbnail', 'property_type',
            'bedrooms', 'floors', 'coord_x', 'coord_y', 'legal_status',
            'tab', 'price_per_m2', 'frontage', 'user'
        ]
        read_only_fields = ['user', 'id']  # user chỉ được ghi từ context, không từ frontend

    def create(self, validated_data):
        property = super().create(validated_data)
        return property