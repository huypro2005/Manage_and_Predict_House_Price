from .models import Property, PropertyAttributeValue
from apps.defaults.models import Attribute
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q, OuterRef, Subquery, F, Case, When, IntegerField, Value
from .serializer import PropertyV1Serializer 
from rest_framework.permissions import IsAuthenticated, AllowAny

name_bedrooms_attr = 'Số phòng ngủ'


class PropertyRecommendationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, property_id):
        # sắp xếp các property theo thứ tự ưu tiên 
        # district -> province -> property type -> price -> area -> view -> bedroom
        # cùng district thì là 1, ngược lại đánh dấu 0
        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({
                'message': 'Property not found',
                'data': []
            }, status=status.HTTP_404_NOT_FOUND)
        price_max = float(property.price) * 1.2
        price_min = float(property.price) * 0.8
        area_max = float(property.area_m2) * 1.2
        area_min = float(property.area_m2) * 0.8
        related_queryset = Property.objects.exclude(id=property_id)
        target_bedroom_value = property.attribute_values.filter(
            attribute__name=name_bedrooms_attr
        ).values_list('value', flat=True).first()

        if target_bedroom_value:
            bedroom_score_case = Case(
                When(
                    attribute_values__attribute__name=name_bedrooms_attr,
                    attribute_values__value=target_bedroom_value,
                    then=Value(1)
                ),
                default=Value(0),
                output_field=IntegerField()
            )
        else:
            bedroom_score_case = Value(0, output_field=IntegerField())
        # - Cùng Quận: 4 điểm (Quan trọng nhất)
        # - Cùng Tỉnh (nhưng khác quận): 1 điểm
        # - Cùng Loại: 2 điểm
        # - Giá hợp lý: 2 điểm
        # - Diện tích hợp lý: 2 điểm
        # - Cùng số phòng ngủ: 1 điểm
        related = related_queryset.annotate(
            score_same_district=Case(
                When(district_id=property.district_id, then=Value(4)),
                default=Value(0),
                output_field=IntegerField()
            ),
            score_same_province=Case(
                When(province_id=property.province_id, then=Value(1)),
                default=Value(0),
                output_field=IntegerField()
            ),
            score_same_property_type=Case(
                When(property_type_id=property.property_type_id, then=Value(2)),
                default=Value(0),
                output_field=IntegerField()
            ),
            score_price_in_range=Case(
                When(price__lte=price_max, price__gte=price_min, then=Value(2)),
                default=Value(0),
                output_field=IntegerField()
            ),
            score_area_in_range=Case(
                When(area_m2__lte=area_max, area_m2__gte=area_min, then=Value(2)),
                default=Value(0),
                output_field=IntegerField()
            ),
            score_same_bedrooms=bedroom_score_case,
            total_score=F('score_same_district') + F('score_same_province') +
                        F('score_same_property_type') + F('score_price_in_range') +
                        F('score_same_bedrooms'),
        ).order_by(
            '-total_score',
            '-views',
            '-created_at'
        )[:9]

        serializer = PropertyV1Serializer(related, many=True)
        return Response({
            'message': 'retrieve success',
            'data': serializer.data
        }, status=status.HTTP_200_OK)