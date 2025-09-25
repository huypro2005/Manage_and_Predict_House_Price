## yêu cầu:
- python 3.13

# Clone code về
```sh
git clone https://github.com/huypro2005/Manage_and_Predict_House_Price.git
```

# Chạy môi trường ảo
```sh
python -m venv venv
venv\Scripts\Activate
```


# Chạy code
```sh
cd backendWeb
pip install -r requirements.txt
```

# tạo file .env cùng cấp nằm trong folder backendWeb, cùng cấp với manage.py, thêm data này vào file

```sh
DB_NAME=BATDONGSAN
DB_USER=root
DB_PASSWORD=123456789
DB_HOST=localhost
DB_PORT=3307

# API Mapbox
MAPBOX_TOKEN=pk.eyJ1IjoicGNvZGVyODA4IiwiYSI6ImNtZTFrMHE0ZTBneGsyam9sNDhjNWlhZmQifQ.CE1jl3Ww9RA6OZpDclIiEg

PATH_FIREBASE_ACCOUNT = 'D:\my_project\auth-e0be2-firebase-adminsdk-fbsvc-29ef4d998d.json'
```




