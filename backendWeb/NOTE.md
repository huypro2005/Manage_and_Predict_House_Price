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