-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: batdongsan
-- ------------------------------------------------------
-- Server version	9.3.0

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (2,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,NULL,1,'2025-08-20 17:53:29.273378','2025-08-20 17:57:40.982117',1,1,2,1,19,'properties/property/f0c705b3eaa842038f0ae3852b414610.jpg1755712409_270742',NULL,2,'ban'),(3,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,NULL,1,'2025-08-20 17:54:55.183661','2025-08-20 17:55:24.595705',1,1,2,1,19,'properties/property/69e28fe3c831404f84fb37c4db34527e.jpg1755712495_182558',NULL,1,'ban'),(4,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,NULL,1,'2025-08-20 18:05:54.847973','2025-08-20 18:05:54.853761',1,1,2,1,19,'properties/property/6b46d3764fc849de8d76c485e86eedac.jpg1755713154_847013',NULL,0,'ban'),(5,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,NULL,1,'2025-08-20 18:06:43.573944','2025-08-29 17:14:39.631408',1,1,2,1,19,'properties/property/977be5b065ea4744867c10c739fe9fce.jpg1755713203_573069',NULL,1,'ban'),(6,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,NULL,1,'2025-08-20 18:11:00.845137','2025-08-20 18:12:15.879271',1,1,2,1,19,'properties/property/52c9c11729094e9ea6c54f395b41cb22.jpg1755713460_844251',NULL,1,'ban'),(7,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,NULL,1,'2025-08-20 18:11:56.324778','2025-08-20 18:13:37.462333',1,1,2,1,19,'properties/property/e63ba229f8674746ae646854af702093.jpg1755713516_323521',NULL,2,'ban'),(8,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,NULL,1,'2025-08-20 18:12:43.400629','2025-09-09 17:22:32.472830',1,1,2,1,NULL,'properties/property/dc4e10d58fe141a68af8d0e9c5b57556.jpg1755713563_399648',NULL,6,'ban'),(9,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,NULL,1,'2025-08-20 18:17:04.949308','2025-09-23 03:52:09.532962',1,1,2,1,19,'properties/property/32d0d2741ece450289aafa4cd92d50c5.jpg1755713824_947725',NULL,2,'ban'),(10,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,5.00,1,'2025-08-20 18:18:00.997179','2025-08-20 18:18:21.399703',1,1,2,1,19,'properties/property/d9142bab1a0d435f8b458d3b9a381220.jpg1755713880_996096',NULL,1,'ban'),(11,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,5.00,1,'2025-08-20 18:19:02.887820','2025-08-20 18:19:45.237116',1,1,2,1,NULL,'properties/property/60bddc47a9254821817076c81f32d6ed.jpg1755713942_886952',NULL,2,'ban'),(12,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,5.00,1,'2025-08-20 18:19:57.008345','2025-08-29 17:16:22.743090',1,1,2,1,19,'properties/property/a46ba73f499e4e3989b57835e03d6b16.jpg1755713997_007348',NULL,5,'ban'),(13,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,5.00,1,'2025-08-20 18:22:19.909997','2025-08-29 17:14:17.853286',1,1,2,1,19,'properties/property/007611c46aa7469992e71443014ec588.jpg1755714139_909122',NULL,4,'ban'),(14,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,5.00,1,'2025-08-20 18:23:08.903820','2025-09-16 03:18:31.122560',1,1,2,1,19,'properties/property/e30e3fbefd5046abaee9bf3c9a27f61c.jpg1755714188_902885',NULL,3,'ban'),(15,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,5.00,1,'2025-08-20 18:23:25.185348','2025-09-15 14:21:29.424998',1,1,2,1,19,'properties/property/f3154def77934aaabb0c1918d3d280ab.jpg1755714205_184396',NULL,4,'ban'),(16,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,5.00,1,'2025-08-20 18:23:55.688099','2025-09-23 03:52:14.978535',1,1,2,1,19,'properties/property/68cde4da78534d43a73d7eb92a01b91c.jpg1755714235_687256',NULL,5,'ban'),(17,'Hello','hello',1000.00,50.00,20.00,'12',10.800000000000000,106.300000000000000,2,1,5.00,1,'2025-08-20 18:28:14.334813','2025-09-23 09:56:38.593220',1,1,2,1,19,'properties/property/cc70b19525794c65bfe9933e9190de96.jpg1755714494_33399',NULL,63,'ban'),(18,'Cập nhật liên tục rổ hàng bán tháng 08/2025 1PN+ 1 65m2 giá 2.6 tỷ, 2PN 73m2 giá 3.150 tỷ sổ sẵn','Rổ hàng 08/2025 mới nhất, đang bán giá tốt nhất thị trường, cạnh tranh - 0976 312 ***, căn có thật ko chào ảo.\r\n\r\n- 1PN + 1 DT 63m² tới 65m² gía 2.6 tỷ View ngoài và view trực diện hồ bơi, sổ sẵn, mua bán sang tên ngay.\r\n- 2PN + 2Wc 70m² giá 3.1 tỷ có 3 căn sẵn xem nhà, sổ sẵn chủ ko vay muốn bán sớm.\r\n- 2PN, 2WC 73m² giá 3.150 tỷ tới 3.2 tỷ sẵn căn xem nhà ngay, sổ sẵn.\r\n- 3PN 100m² view hồ bơi giá 4 tỷ. Còn nhiều căn khác nhau có thể lựa chọn, làm việc chính chủ.\r\n\r\n- Tiện ích có sẵn: Hồ bơi người lớn, trẻ em, gym, nhà trẻ, siêu thị, công viên ven sông, BBQ, Sân thê thao đa năng.. Liền kề bờ sông thoáng mát.\r\n- Gần chợ truyền thống, siệu thị đã về, hệ thống trường học từ mẫu giao tới cấp 3 chr cách 1km.\r\n\r\nVị trí: Nằm Cách Nguyễn Duy Trinh 300m, Về trung tâm Q2 chủ 10 phút, Q7 20 phút, trung tâm Q1 25 phút dễ dàng di chuyển đi các quận huyện trong TP.\r\nLH: 097631269 Ms Duyên ở tại dự án, chuyên bán dự án, xem nhà bất kể khi nào.',2600.00,65.00,40.00,'Dự án MT Eastmark City, Đường Trường Lưu, Phường Long Trường, Quận 9, Hồ Chí Minh',106.823440000000000,10.797104000000000,2,NULL,NULL,1,'2025-08-21 03:21:04.108993','2025-09-23 09:57:45.529097',1,21,1,1,18,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817',NULL,144,'ban');
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

-- Dump completed on 2025-09-26 21:26:05
