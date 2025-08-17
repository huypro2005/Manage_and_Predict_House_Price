## Bài toán: load list ảnh của tất cả property

# Cách giải thông thường
```bash
property = Property.objects.all() # 1 query
for p in property:
    print(p.images.all()) # N query
tổng N+1 query
```


## Sử dụng prefetch_relate để load to

```bash
property = Property.objects.prefetch_related('images') # 1 query
for p in property:
    print(p.images.all()) # lấy tất cả các images trong 1 query duy nhất
tổng 2 query
```

prefetch_relate sử dụng bộ nhớ cache lưu toàn bộ thông tin liên quan.
Ưu điểm: truy vẫn nhanh
Nhược điểm: tốn ram


<!-- Hiển thị danh sách api tại trang / bằng drf_yasg -->
### Các bước thực hiện

1. Cài đặt
```sh
pip install drf_yasg
```

2. Thêm vào settings
```sh
INSTALLED_APPS = [
    #...
    'drf_yasg',
]
```

3. Thêm vào urls.py
```sh
# ...
from drf_yasg import openapi
from drf_yasg.views import get_schema_views

schema_view = get_schema_view(
    openapi.Info(
        title='INCOME EXPENSES API',
        default_version='v1',
        description='Test description',
        terms_of_service='https://www.ourapp.com/policies/terms/',
        contact=openapi.Contact(email="contact@expenses.local"),
        license=openapi.License(name="Test License"),
    ),
    public=True,
    permission_classes=(permission.AllowAny,),
)

urlpatterns = [
    # ...
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]
```
4. py manage.py migrate

## END