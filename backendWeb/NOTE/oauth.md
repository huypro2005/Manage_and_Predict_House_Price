## Lỗi gửi token từ frontend về backend xử lý 
```sh
Token used too early error thrown by firebase_admin auth's verify_id_token method
```

Lỗi do không đồng bộ thời gian xác thực, nên đợi thêm thời gian mới auth.verify_id_token

- Giải pháp: sleep(1.5)