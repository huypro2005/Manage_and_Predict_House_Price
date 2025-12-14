from rest_framework import serializers
from .models import Property, PropertyImage
from datetime import datetime
from apps.utils import datetimeFormat
from apps.accounts.serializer import CustomUserV1Serializer
from apps.defaults.serializer import AttributeSerializer

# Hàm validate cho thuộc tính
def validate_attributes(attributes):
    for attr in attributes:
        if 'attribute_id' not in attr or 'value' not in attr:
            raise serializers.ValidationError("Each attribute must have 'attribute_id' and 'value'.")
        if attr['name'] == 'Số phòng ngủ' : 
            try:
                int(attr['value'])
                if int(attr['value']) < 0:
                    raise serializers.ValidationError(f"The value for {attr['name']} must be a non-negative integer.")
            except ValueError:
                raise serializers.ValidationError(f"The value for {attr['name']} must be an integer.")
        if attr['name'] == 'Số tầng':
            try:
                int(attr['value'])
                if int(attr['value']) < 0:
                    raise serializers.ValidationError(f"The value for {attr['name']} must be a non-negative integer.")
            except ValueError:
                raise serializers.ValidationError(f"The value for {attr['name']} must be a number.")
        if attr['name'] == 'Số phòng tắm, vệ sinh':
            try:
                int(attr['value'])
                if int(attr['value']) < 0:
                    raise serializers.ValidationError(f"The value for {attr['name']} must be a non-negative integer.")
            except ValueError:
                raise serializers.ValidationError(f"The value for {attr['name']} must be an integer.")
        if attr['name'] == 'Số phòng tắm, vệ sinh':
            try:
                int(attr['value'])
                if int(attr['value']) < 0:
                    raise serializers.ValidationError(f"The value for {attr['name']} must be a non-negative integer.")
            except ValueError:
                raise serializers.ValidationError(f"The value for {attr['name']} must be an integer.")
        if attr['name'] == 'Mặt tiền':
            try:
                float(attr['value'])
                if float(attr['value']) < 0:
                    raise serializers.ValidationError(f"The value for {attr['name']} must be a non-negative number.")
            except ValueError:
                raise serializers.ValidationError(f"The value for {attr['name']} must be a number.")
        if attr['name'] == 'Đường vào':
            try:
                float(attr['value'])
                if float(attr['value']) < 0:
                    raise serializers.ValidationError(f"The value for {attr['name']} must be a non-negative number.")
            except ValueError:
                raise serializers.ValidationError(f"The value for {attr['name']} must be a number.")
            

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = '__all__'

# Serializer cơ bản cho Property
class PropertyV1Serializer(serializers.ModelSerializer):

    time = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    views = serializers.SerializerMethodField()
    class Meta:
        model = Property
        fields = ['id', 'title', 'description', 'status',
                  'price', 'area_m2', 'address', 'thumbnail', 'views', 'time']

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
        
    def get_views(self, obj):
        return obj.viewed_property.views if hasattr(obj, 'viewed_property') else 0


# Serializer chi tiết Property với hình ảnh và thuộc tính
class PropertyDetailV1Serializer(serializers.ModelSerializer):

    images = PropertyImageSerializer(many=True)
    # user = CustomUserV1Serializer(read_only=True)

    user_fullname = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    attributes = serializers.SerializerMethodField()
    property_type_name = serializers.CharField(source='property_type.name', read_only=True)

    class Meta:
        model = Property
        fields = ['id', 'user', 'province', 
                  'username',
                  'district', 'title', 
                  'description', 'price', 
                  'area_m2', 'address', 
                  'thumbnail', 
                  'property_type',
                  'coord_x', 'coord_y',
                  'legal_status', 'tab',
                  'user_fullname', 'user_email',
                  'views', 'created_at',
                  'updated_at', 'property_type_name', 
                  'attributes', 'images', 'status']
        read_only_fields = ['id', 'user', 'created_at', 
                            'updated_at', 'views', 'images', 
                            'status', 'username', 
                            'user_fullname', 'user_email', 'property_type_name',
                            'tab', 'coord_x', 'coord_y', 'province', 'district', 'address']

    def get_attributes(self, obj):
        attribute_values = obj.attribute_values.filter(is_active=True)
        return [
            {
                'attribute_id': attr_value.attribute.id,
                'attribute_name': attr_value.attribute.name,
                'value': attr_value.value,
                'unit': attr_value.attribute.unit
            }
            for attr_value in attribute_values
        ]
    
class PropertyUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            "title", "description",
            "price", "area_m2",
            "legal_status",
            "thumbnail", "price_per_m2"
        ]

    def validate(self, attrs):
        if "area_m2" in attrs and attrs["area_m2"] <= 0:
            raise serializers.ValidationError({"area_m2": "area_m2 must be > 0"})
        if "price" in attrs and attrs["price"] <= 0:
            raise serializers.ValidationError({"price": "price must be > 0"})
        return attrs

    def update(self, instance, validated_data):
        price_changed = "price" in validated_data
        area_changed = "area_m2" in validated_data

        for k, v in validated_data.items():
            setattr(instance, k, v)

        # auto calc price_per_m2
        if price_changed or area_changed:
            if instance.area_m2 and instance.area_m2 > 0:
                instance.price_per_m2 = instance.price / instance.area_m2

        instance.save()
        return instance


    

# Serializer để tạo Property kèm thuộc tính và hình ảnh
class PropertyCreateFullV1Serializer(serializers.ModelSerializer):
    # Nếu bạn muốn thêm hình ảnh, sử dụng PropertyImageSerializer
    images = PropertyImageSerializer(many=True, required=False)  # Tùy chọn thêm hình ảnh
    attributes = serializers.SerializerMethodField()


    class Meta:
        model = Property
        fields = [
            'id', 'province', 'district', 'title', 'description', 'price',
            'area_m2', 'address', 'images', 'thumbnail', 'property_type',
             'coord_x', 'coord_y', 'legal_status',
            'tab', 'price_per_m2',  'user', 'attributes'
        ]
        read_only_fields = ['user', 'id']  # user chỉ được ghi từ context, không từ frontend

    def create(self, validated_data):
        property = super().create(validated_data)
        return property
    
    def get_attributes(self, obj):
        attribute_values = obj.attribute_values.filter(is_active=True)
        return [
            {
                'attribute_id': attr_value.attribute.id,
                'attribute_name': attr_value.attribute.name,
                'value': attr_value.value,
                'unit': attr_value.attribute.unit
            }
            for attr_value in attribute_values
        ]