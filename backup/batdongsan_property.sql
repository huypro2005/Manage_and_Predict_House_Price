-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: batdongsan
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `area_m2` decimal(10,2) NOT NULL,
  `price_per_m2` decimal(10,2) NOT NULL,
  `address` varchar(255) NOT NULL,
  `coord_x` decimal(20,15) NOT NULL,
  `coord_y` decimal(20,15) NOT NULL,
  `bedrooms` int DEFAULT NULL,
  `floors` int DEFAULT NULL,
  `frontage` decimal(10,2) DEFAULT NULL,
  `legal_status` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `district_id` bigint NOT NULL,
  `property_type_id` bigint NOT NULL,
  `province_id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `views` int NOT NULL,
  `tab` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `properties_property_district_id_7cbcdbdb_fk_defaults_district_id` (`district_id`),
  KEY `properties_property_property_type_id_21d12070_fk_defaults_` (`property_type_id`),
  KEY `properties_property_province_id_ab18575e_fk_defaults_province_id` (`province_id`),
  KEY `Property_user_id_bdf85459_fk_CustomUser_id` (`user_id`),
  CONSTRAINT `properties_property_district_id_7cbcdbdb_fk_defaults_district_id` FOREIGN KEY (`district_id`) REFERENCES `district` (`id`),
  CONSTRAINT `properties_property_property_type_id_21d12070_fk_defaults_` FOREIGN KEY (`property_type_id`) REFERENCES `propertytype` (`id`),
  CONSTRAINT `properties_property_province_id_ab18575e_fk_defaults_province_id` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`),
  CONSTRAINT `Property_user_id_bdf85459_fk_CustomUser_id` FOREIGN KEY (`user_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (18,'Cập nhật liên tục rổ hàng bán tháng 08/2025 1PN+ 1 65m2 giá 2.6 tỷ, 2PN 73m2 giá 3.150 tỷ sổ sẵn','Rổ hàng 08/2025 mới nhất, đang bán giá tốt nhất thị trường, cạnh tranh - 0976 312 ***, căn có thật ko chào ảo.\r\n\r\n- 1PN + 1 DT 63m² tới 65m² gía 2.6 tỷ View ngoài và view trực diện hồ bơi, sổ sẵn, mua bán sang tên ngay.\r\n- 2PN + 2Wc 70m² giá 3.1 tỷ có 3 căn sẵn xem nhà, sổ sẵn chủ ko vay muốn bán sớm.\r\n- 2PN, 2WC 73m² giá 3.150 tỷ tới 3.2 tỷ sẵn căn xem nhà ngay, sổ sẵn.\r\n- 3PN 100m² view hồ bơi giá 4 tỷ. Còn nhiều căn khác nhau có thể lựa chọn, làm việc chính chủ.\r\n\r\n- Tiện ích có sẵn: Hồ bơi người lớn, trẻ em, gym, nhà trẻ, siêu thị, công viên ven sông, BBQ, Sân thê thao đa năng.. Liền kề bờ sông thoáng mát.\r\n- Gần chợ truyền thống, siệu thị đã về, hệ thống trường học từ mẫu giao tới cấp 3 chr cách 1km.\r\n\r\nVị trí: Nằm Cách Nguyễn Duy Trinh 300m, Về trung tâm Q2 chủ 10 phút, Q7 20 phút, trung tâm Q1 25 phút dễ dàng di chuyển đi các quận huyện trong TP.\r\nLH: 097631269 Ms Duyên ở tại dự án, chuyên bán dự án, xem nhà bất kể khi nào.',2600.00,65.00,40.00,'Dự án MT Eastmark City, Đường Trường Lưu, Phường Long Trường, Quận 9, Hồ Chí Minh',106.823440000000000,10.797104000000000,2,NULL,NULL,1,'2025-08-21 03:21:04.108993','2025-11-17 10:07:12.052848',1,21,1,1,18,'properties/property/ad88a4e09ab14565ba25660786e10fb5.webp1763374032_050034',NULL,144,'ban'),(19,'Chuyên cho thuê căn hộ Vinhomes Central Park giá chỉ từ: 1PN 16tr - 2PN 18tr - 3PN 29tr - 4PN 50tr','600 + căn hộ cho thuê Vinhomes giá tốt chỉ từ 15 triệu/th.\nTư vấn miễn phí gọi ngay: 0909 638 ***\n----------------------------------------------------\n* Căn hộ 1 phòng ngủ có diện tích: 36; 50,5m² - 56m²:\n- Giá thuê nội thất cơ bản: 14 - 16 triệu VNĐ/tháng.\n- Giá thuê đầy đủ nội thất: 15 - 18 triệu VNĐ/tháng.\nTư vấn miễn phí gọi ngay: 0909 638 ***\n\n* Căn hộ 2 phòng ngủ có diện tích: 68,5 - 89 - 90,6m²:\n- Giá thuê nội thất cơ bản: 16 - 21 triệu VNĐ/tháng.\n- Giá thuê đầy đủ nội thất: 18 - 25 triệu VNĐ/tháng.\nTư vấn miễn phí gọi ngay: 0909 638 ***\n\n* Căn hộ 3 phòng ngủ có diện tích: 94m - 118m - 140m.\n- Giá thuê nội thất cơ bản: 23 - 26 triệu VNĐ/tháng.\n- Giá thuê đầy đủ nội thất: 25 - 35 triệu VNĐ/tháng.\nTư vấn miễn phí gọi ngay: 0909 638 ***\n\n* Căn hộ 4 phòng ngủ có diện tích: 145 - 160 - 188m:\n- Giá thuê nội thất cơ bản: 35 - 37 - 45 triệu VNĐ/tháng.\n- Giá thuê đầy đủ nội thất: 45; 55 - 65 - 75 triệu VNĐ/tháng. H.\nTư vấn miễn phí gọi ngay: 0909 638 ***\n----------------------------------------------------\nNgoài ra còn cho thuê căn hộ theo ngày, theo tuần, theo tháng.\n* Hỗ trợ anh chị nhiệt tình đến khi chọn được căn ưng ý mà không phát sinh thêm chi phí.\nThủ tục pháp lý rõ ràng, có uy tín trách nhiệm cao.\nTiện ích dành xriêng cho cư dân và khách thuê căn hộ Vinhomes Central Park.\n- Hầm giữ xe.\n- Hồ bơi ngoài trời, nhiều mảng xanh.\n- Mặt bằng thương mại dưới các tòa căn hộ Vinhomes.\n- Công viên ven sông Sài Gòn, bến du thuyền đẳng cấp.\n- Phòng tập gym.\n- Sảnh lounge sang trọng chuẩn 5 sao.\n- Hệ thống sân tập thể thao.\n- Hệ thống trường Vinschool và bệnh viện Vinmec.\n- An ninh tuyệt đối, camera 24/7.\nTư vấn miễn phí gọi ngay: 0909 638 ***',18.00,90.00,0.20,'Dự án Vinhomes Central Park, Đường Điện Biên Phủ, Phường 22, Bình Thạnh, Hồ Chí Minh',106.721878051757830,10.795545175110025,NULL,0,0.00,2,'2025-11-13 18:10:02.875839','2025-11-13 18:14:22.590660',1,3,1,1,15,'properties/property/c0587260e1a7472eb53ccf80fbead35e.jpg1763057402_87108',NULL,11,'thue'),(20,'Giá sốc tháng 11 căn hộ Vinhomes Grand Park, Quận 9 - Studio, 1 phòng ngủ, 2 phòng ngủ, 3 phòng ngủ','Studio chỉ từ 4.5 triệu 1 phòng ngủ từ 5 triệu 2 phòng ngủ từ 6 triệu 3 phòng ngủ chỉ 8.5 triệu/tháng.\r\n\r\nĐịa chỉ: Dự án Vinhomes Grand Park, Phường Long Thạnh Mỹ, TP. Thủ Đức (Quận 9 cũ).\r\nDịch vụ cho thuê chuyên nghiệp uy tín tận tâm.\r\nTDH Homes hân hạnh mang đến giỏ hàng đa dạng, giá tốt nhất thị trường. Hỗ trợ tư vấn và xem nhà 24/7 hoàn toàn miễn phí.\r\n\r\nCác loại căn hộ hiện có.\r\n1. Căn Studio.\r\n- Trống: 4.500.000đ/tháng.\r\n- Có bếp + rèm: 5.000.000đ đến 5.500.000đ/tháng.\r\n- Full nội thất: 5.500.000đ đến 6.500.000đ/tháng.\r\nHiện có căn full nội thất view Vincom Mega Mall, giá rất tốt. Liên hệ ngay 0839 221 *** để xem thực tế.',4.50,32.00,0.14,'Dự án Vinhomes Grand Park, Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9, Hồ Chí Minh',106.829752000000000,10.827991000000000,1,0,0.00,2,'2025-11-13 18:30:10.366786','2025-11-16 07:35:35.279753',1,21,1,1,15,'properties/property/3b05a03dcb9646b29e3660b4ed8eacab.jpg1763058610_345764',NULL,38,'ban');
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-18  0:28:54
