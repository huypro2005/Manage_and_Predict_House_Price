Redis ZSET internally = hash table + skiplist.

🔹 Cấu trúc bên trong

    Hash table:

    Key: member

    Value: score
    👉 Cho phép lookup nhanh: “member này có trong zset không? score là bao nhiêu?” gần O(1).

Skiplist:

    Node giống linked list nhưng có nhiều level:

    Level 0: list bình thường, chứa tất cả node.

    Level 1,2,3,...: chỉ chứa một số node (random) → tạo “điểm nhảy nhanh”.

    Mỗi node có:

    score

    member

    forward pointers ở nhiều level

Ý tưởng giống:

    Level thấp: đi chậm, nhưng chính xác.

    Level cao: nhảy xa, đi nhanh.