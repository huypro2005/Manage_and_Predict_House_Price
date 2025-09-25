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
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_CustomUser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_CustomUser_id` FOREIGN KEY (`user_id`) REFERENCES `customuser` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (26,'2025-08-15 10:24:59.982653','1','1ZmLhcaS4Fmjx17L9lU6lVBofyf8YVBvGUpUcDrm',1,'[{\"added\": {}}]',17,6),(28,'2025-08-18 10:28:38.281072','13','hw2125186',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',6,6),(29,'2025-08-18 10:28:50.120987','13','hw2125186',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',6,6),(30,'2025-08-18 17:20:21.779375','15','your_username',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',6,6),(31,'2025-08-18 17:35:16.067325','16','huypro37',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',6,6),(32,'2025-08-19 00:59:15.147310','17','huypro375',2,'[{\"changed\": {\"fields\": [\"Avatar\"]}}]',6,6),(33,'2025-08-19 03:04:31.834297','17','huypro375',2,'[{\"changed\": {\"fields\": [\"Password\"]}}]',6,6),(34,'2025-08-19 03:16:04.135126','15','your_username',2,'[{\"changed\": {\"fields\": [\"Password\"]}}]',6,6),(35,'2025-08-19 03:18:26.848496','15','your_username',2,'[{\"changed\": {\"fields\": [\"Password\", \"Avatar\"]}}]',6,6),(36,'2025-08-24 21:58:38.551594','1','Hello world',1,'[{\"added\": {}}]',29,6),(37,'2025-08-24 21:59:26.106124','1','Hello world',2,'[{\"changed\": {\"fields\": [\"Is approved\"]}}]',29,6),(38,'2025-09-16 17:26:29.943726','2','Đất Nền Đan Phượng – Giá Đi Ngang Dù Lực Đẩy Mới Xuất Hiện',1,'[{\"added\": {}}]',29,6),(39,'2025-09-16 17:26:41.776609','2','Đất Nền Đan Phượng – Giá Đi Ngang Dù Lực Đẩy Mới Xuất Hiện',2,'[{\"changed\": {\"fields\": [\"Is checked\", \"Is approved\"]}}]',29,6),(40,'2025-09-16 17:31:10.146397','2','Đất Nền Đan Phượng – Giá Đi Ngang Dù Lực Đẩy Mới Xuất Hiện',2,'[{\"changed\": {\"fields\": [\"Province\"]}}]',29,6),(41,'2025-09-16 17:43:51.558386','2','Đất Nền Đan Phượng – Giá Đi Ngang Dù Lực Đẩy Mới Xuất Hiện',2,'[{\"changed\": {\"fields\": [\"Thumbnail\"]}}]',29,6),(42,'2025-09-16 17:53:08.718799','1','admin',3,'',6,6),(43,'2025-09-16 18:10:57.228411','2','Đất Nền Đan Phượng – Giá Đi Ngang Dù Lực Đẩy Mới Xuất Hiện',2,'[{\"changed\": {\"fields\": [\"Introduction\"]}}]',29,6),(44,'2025-09-16 18:11:03.586893','1','Hello world',3,'',29,6),(45,'2025-09-17 01:17:36.053738','3','Giá Căn Hộ Chung Cư TP.HCM \"Rượt Đuổi\" Sát Nút Nhà Mặt Đất',1,'[{\"added\": {}}, {\"added\": {\"name\": \"source\", \"object\": \"aaa\"}}]',29,6),(46,'2025-09-17 01:18:42.468595','3','Giá Căn Hộ Chung Cư TP.HCM \"Rượt Đuổi\" Sát Nút Nhà Mặt Đất',2,'[{\"changed\": {\"fields\": [\"Thumbnail\", \"Views\"]}}]',29,6),(47,'2025-09-17 01:19:54.178095','3','Giá Căn Hộ Chung Cư TP.HCM \"Rượt Đuổi\" Sát Nút Nhà Mặt Đất',2,'[{\"changed\": {\"name\": \"source\", \"object\": \"ngu\\u1ed3n 1\", \"fields\": [\"Name\"]}}]',29,6),(48,'2025-09-17 01:22:15.451834','6','admin123',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',6,6),(49,'2025-09-17 01:24:16.745372','6','admin123',2,'[{\"changed\": {\"fields\": [\"Password\"]}}]',6,23),(50,'2025-09-17 03:29:12.280560','4','Trọn Bộ Lãi Suất Vay Mua Nhà Mới Nhất Tháng 9/2025',1,'[{\"added\": {}}]',29,23);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-20  7:56:06
