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
-- Table structure for table `contactrequest`
--

DROP TABLE IF EXISTS `contactrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactrequest` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` longtext,
  `created_at` datetime(6) NOT NULL,
  `property_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contacts_contactrequ_property_id_c5d53446_fk_propertie` (`property_id`),
  KEY `contacts_contactrequest_user_id_4cea03a6_fk_CustomUser_id` (`user_id`),
  CONSTRAINT `contacts_contactrequ_property_id_c5d53446_fk_propertie` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `contacts_contactrequest_user_id_4cea03a6_fk_CustomUser_id` FOREIGN KEY (`user_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactrequest`
--

LOCK TABLES `contactrequest` WRITE;
/*!40000 ALTER TABLE `contactrequest` DISABLE KEYS */;
INSERT INTO `contactrequest` VALUES (22,'Thông tin liên hệ:\n- Tên: áas\n- Số điện thoại: 0123456789\n- Email: Không có\n\nNội dung tin nhắn:\náasasa','2025-08-28 18:37:48.637627',18,21),(23,'Thông tin liên hệ:\n- Tên: asaas\n- Số điện thoại: 0123456789\n- Email: Không có\n\nNội dung tin nhắn:\nHello anh em','2025-08-28 18:39:09.634739',18,21),(24,'Thông tin liên hệ:\n- Tên: aa\n- Số điện thoại: 0123456789\n- Email: Không có\n\nNội dung tin nhắn:\n147896325','2025-08-28 18:40:29.160503',18,21),(25,'Thông tin liên hệ:\n- Tên: hhh\n- Số điện thoại: 0123456789\n- Email: Không có\n\nNội dung tin nhắn:\nHello','2025-08-29 16:35:09.426948',18,20),(26,'Thông tin liên hệ:\n- Tên: aa\n- Số điện thoại: 1234567890\n- Email: Không có\n\nNội dung tin nhắn:\n12345','2025-08-29 17:11:52.165852',18,20),(27,'Thông tin liên hệ:\n- Tên: huypro37\n- Số điện thoại: 0123456789\n- Email: Không có\n\nNội dung tin nhắn:\nHello','2025-08-29 17:13:26.201177',18,20),(28,'Thông tin liên hệ:\n- Tên: huypro37\n- Số điện thoại: 0123456789\n- Email: Không có\n\nNội dung tin nhắn:\nhello','2025-08-30 02:06:03.201411',18,20),(29,'hello anh em','2025-09-04 09:33:58.530170',18,19),(30,'hello anh em','2025-09-04 09:34:52.357962',18,19),(31,'hello anh em 123','2025-09-04 09:35:26.709051',18,19),(32,'hello anh em 1234','2025-09-04 09:37:24.318822',18,19),(33,'hello anh em 1234','2025-09-04 09:37:48.214022',18,19),(34,'hello anh em 1234','2025-09-04 09:38:33.911620',18,19),(35,'hello anh em 1234','2025-09-04 09:39:43.045082',18,19),(36,'hello anh em 1234','2025-09-04 09:41:08.816288',18,19),(37,'hello anh em 1234','2025-09-04 09:47:43.417453',18,19),(38,'hello anh em 12345','2025-09-04 09:47:53.208554',18,19),(39,'hello anh em 12345','2025-09-04 10:00:02.538284',18,19),(40,'hello anh em 12345','2025-09-04 10:00:31.162914',18,19),(41,'hello anh em 12345','2025-09-04 10:00:31.700246',18,19),(42,'hello anh em 12345','2025-09-04 10:00:32.204876',18,19),(43,'hello anh em 12345','2025-09-04 10:06:08.129812',18,19),(44,'hello anh em 12345','2025-09-04 10:07:44.667584',18,19),(45,'hello anh em 12345','2025-09-04 10:16:21.569964',18,19),(46,'hello anh em 12345','2025-09-04 10:20:04.877715',18,19),(47,'hello anh em 12345','2025-09-04 10:20:12.626720',18,19),(48,'hello anh em 12345','2025-09-04 10:24:01.521445',18,19),(49,'hello anh em 12345','2025-09-04 10:24:27.314055',18,19),(50,'hello anh em 12345','2025-09-04 10:28:25.166244',18,19),(51,'hello anh em 12345','2025-09-04 10:28:53.872700',18,19),(52,'hello anh em 12345','2025-09-04 10:28:54.396103',18,19),(53,'Thông tin liên hệ:\n- Tên: huy\n- Số điện thoại: 0315756479\n- Email: Không có\n\nNội dung tin nhắn:\nHello anh em','2025-09-04 14:50:05.493503',18,19),(54,'hello anh em 12345','2025-09-04 14:58:08.389855',18,19),(55,'hello anh em 12345','2025-09-04 15:01:16.187289',18,19),(56,'hello anh em 12345','2025-09-04 15:03:04.462901',18,19),(57,'hello anh em 12345','2025-09-04 15:03:58.467131',18,19),(58,'hello anh em 12345','2025-09-04 15:19:37.675612',18,19),(59,'chicken kid','2025-09-04 15:20:04.889079',18,19),(60,'chicken kid','2025-09-04 15:21:52.241959',18,19),(61,'chicken kid','2025-09-04 15:22:14.204241',18,19),(62,'chicken kid','2025-09-04 15:53:39.445170',18,19),(63,'chicken kid','2025-09-04 17:43:03.714462',18,19),(64,'chicken kid 123','2025-09-04 17:43:32.806144',18,19),(65,'Thông tin liên hệ:\n- Tên: huypro37\n- Số điện thoại: 0345678912\n- Email: Không có\n\nNội dung tin nhắn:\nHello anh em','2025-09-04 17:47:33.498020',18,19),(66,'Thông tin liên hệ:\n\n        - Tên: huy\n\n        - Số điện thoại: 1234567890\n \n        - Email: Không có\n\n\n        Nội dung tin nhắn:\n\n        Hello','2025-09-04 17:49:56.890462',18,19),(67,'Thông tin liên hệ:<br>\n        - Tên: Cao Thành Huy<br>\n        - Số điện thoại: 0353735497<br>\n        - Email: Không có<br><br>\n        Nội dung tin nhắn:<br>\n        Huy tới chơi','2025-09-04 17:54:12.656282',18,19),(68,'Thông tin liên hệ:\n        - Tên: Huy\n        - Số điện thoại: 0123456789\n        - Email: Không có<br/>\n        Nội dung tin nhắn:\n        147896325','2025-09-04 17:56:02.776599',18,19),(69,'chicken kid 123','2025-09-04 18:13:24.457500',18,19),(70,'chào bà con','2025-09-04 18:13:39.544296',18,19),(71,'chào bà con','2025-09-04 18:16:02.278014',18,19),(72,'chicken kid 123','2025-09-04 18:16:18.368226',18,19),(76,'hello, contact me if you interest','2025-09-06 09:08:42.143440',18,19),(77,'hello, contact me if you interest','2025-09-06 09:15:04.804574',18,19),(78,'hello, contact me if you interest  aaâ','2025-09-06 09:17:33.518055',18,19),(79,'hello, contact me if you interest  aaâ','2025-09-06 09:29:58.073523',18,19),(80,'hello, contact me if you interest  aaâ','2025-09-06 09:36:59.455287',18,19),(81,'hello, contact me if you interest  aaâ','2025-09-06 09:38:17.802040',18,19),(82,'hello, contact me if you interest  aaâ','2025-09-06 10:00:57.150264',18,19),(83,'hello, contact me if you interest  aaâ','2025-09-06 10:02:48.413621',18,19),(84,'hello, contact me if you interest  aaâ','2025-09-06 10:03:21.520969',18,19),(85,'hello, contact me if you interest  aaâ','2025-09-06 10:07:10.468241',18,19),(86,'hello, contact me if you interest  aaâ','2025-09-06 10:56:33.918057',18,19),(87,'hello, contact me if you interest  aaâ','2025-09-06 10:57:14.098251',18,19),(88,'hello, contact me if you interest  aaâ','2025-09-06 16:36:33.836903',18,18),(89,'Tôi muốn liên lạc với bạn','2025-09-07 10:42:35.789717',18,19),(90,'hello','2025-09-07 10:46:50.686544',18,19),(91,'hello','2025-09-07 10:47:41.982026',18,19),(92,'hello','2025-09-07 10:51:47.937602',18,19),(93,'hello','2025-09-07 10:53:05.979609',18,19),(94,'hello','2025-09-09 01:46:28.391082',18,18),(95,'hello','2025-09-09 01:46:35.461765',18,18),(96,'hello','2025-09-09 01:47:22.771388',18,18),(97,'hello','2025-09-09 01:48:54.986467',18,18),(98,'hello','2025-09-09 01:49:38.945517',18,18),(99,'hello','2025-09-09 01:51:53.781115',18,18),(100,'hello','2025-09-09 02:25:13.151155',18,18),(101,'hello','2025-09-09 02:27:40.720560',18,18),(102,'hello','2025-09-09 02:27:46.528759',18,18),(103,'hello','2025-09-09 02:29:51.949983',18,18),(104,'hello','2025-09-09 08:23:46.774567',18,19),(105,'hello','2025-09-09 08:26:32.169983',18,19),(106,'hello','2025-09-09 08:53:33.252549',18,19),(107,'hello','2025-09-09 09:53:43.373164',18,19),(108,'hello','2025-09-09 09:58:53.008337',18,19),(109,'hello','2025-09-09 17:14:51.841823',18,18),(110,'hello','2025-09-10 04:16:25.750094',18,18),(111,'hello','2025-09-10 09:58:50.719247',18,18),(112,'Thông tin liên hệ:\n        - Tên: hhhh\n        - Số điện thoại: 0123456789\n        - Email: Không có\n        Nội dung tin nhắn:\n        aaa','2025-09-13 01:37:54.225009',18,15),(113,'Thông tin liên hệ:\n        - Tên: huypro\n        - Số điện thoại: 0123456789\n        - Email: Không có\n        Nội dung tin nhắn:\n        Hello 123','2025-09-15 15:30:04.137033',18,20),(114,'Thông tin liên hệ:\n        - Tên: huypro37\n        - Số điện thoại: 0123456789\n        - Email: Không có\n        Nội dung tin nhắn:\n        Hello world','2025-09-16 02:19:32.592612',18,19),(115,'Thông tin liên hệ:\n        - Tên: huypro37\n        - Số điện thoại: 1234567890\n        - Email: Không có\n        Nội dung tin nhắn:\n        Hello','2025-09-16 02:20:39.274060',18,19),(116,'Thông tin liên hệ:\n        - Tên: aaa\n        - Số điện thoại: 0123456789\n        - Email: Không có\n        Nội dung tin nhắn:\n        Hrll','2025-09-16 02:31:25.566268',18,19),(117,'Thông tin liên hệ:\n        - Tên: aaa\n        - Số điện thoại: 0123456789\n        - Email: Không có\n        Nội dung tin nhắn:\n        44','2025-09-16 02:55:28.443361',18,19),(118,'Thông tin liên hệ:\n        - Tên: aaa\n        - Số điện thoại: 0123456789\n        - Email: Không có\n        Nội dung tin nhắn:\n        Heeee','2025-09-16 03:02:28.502260',18,19),(119,'Thông tin liên hệ:\n        - Tên: aaa\n        - Số điện thoại: 1123456789\n        - Email: Không có\n        Nội dung tin nhắn:\n        Hrrrr','2025-09-16 03:03:17.365451',18,19);
/*!40000 ALTER TABLE `contactrequest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 23:50:23
