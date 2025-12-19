### Hướng dẫn chạy qua docker

# Yêu cầu: 
- Tạo và import data backup
- Thiết lập biến môi trường 
Các biến là 'localhost' chuyển sang 'host.docker.internal' trong các file chứa biến môi trường
- Mở ứng dụng docker desktop

# Bước 1: Thiết lập theo yêu cầu


# Bước 2: Chạy docker backend
```sh
cd backendWeb
docker compose up --build -d
```

# Bước 3: Chạy docker frontend
```sh
cd frontend
docker compose up --build -d
```

Nếu không có lỗi gì xảy ra, 2 docker images đó đang được chạy trong ứng dụng docker desktop


## VIDEO DEMO

[![Watch the video](https://i.ytimg.com/vi/ufraSdLiqiE/hqdefault.jpg)](https://www.youtube.com/watch?v=ufraSdLiqiE)
