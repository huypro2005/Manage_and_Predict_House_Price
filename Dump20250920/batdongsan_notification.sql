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
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `message` varchar(255) NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `url` varchar(200) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `image_representation` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Notification_user_id_27901a99_fk_CustomUser_id` (`user_id`),
  CONSTRAINT `Notification_user_id_27901a99_fk_CustomUser_id` FOREIGN KEY (`user_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'contact_request','New contact request from hw2125186 for property ID Cập nhật liên tục...',1,'/contact-requests/79/','2025-09-06 09:29:58.090900',18,0,''),(2,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/81/','2025-09-06 09:38:17.815340',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(3,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/84/','2025-09-06 10:03:21.526002',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(6,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/93/','2025-09-07 10:53:05.989153',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(7,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/94/','2025-09-09 01:46:28.402512',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(8,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/95/','2025-09-09 01:46:35.467661',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(9,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/96/','2025-09-09 01:47:22.785398',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(10,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/97/','2025-09-09 01:48:54.992046',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(11,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/98/','2025-09-09 01:49:38.954734',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(12,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/99/','2025-09-09 01:51:53.786338',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(14,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/101/','2025-09-09 02:27:40.731543',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(17,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/104/','2025-09-09 08:23:46.783452',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(18,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/105/','2025-09-09 08:26:32.182559',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(19,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/106/','2025-09-09 08:53:33.258575',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(20,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/107/','2025-09-09 09:53:43.383784',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(21,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/108/','2025-09-09 09:58:53.018441',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(22,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/109/','2025-09-09 17:14:51.850504',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(23,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/110/','2025-09-10 04:16:25.782234',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(24,'contact_request','pcoder808 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/111/','2025-09-10 09:58:50.739398',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(25,'contact_request','your_username đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/112/','2025-09-13 01:37:54.254365',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(26,'contact_request','protrader2005 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/113/','2025-09-15 15:30:04.155196',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(27,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/114/','2025-09-16 02:19:32.613654',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(28,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/115/','2025-09-16 02:20:39.278950',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(29,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/116/','2025-09-16 02:31:25.578441',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(30,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/117/','2025-09-16 02:55:28.453383',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(31,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/118/','2025-09-16 03:02:28.510037',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817'),(32,'contact_request','hw2125186 đã yêu cầu liên lạc từ bài biết Cập nhật liên tục...',1,'/contact-requests/119/','2025-09-16 03:03:17.376207',18,0,'properties/property/0704910aa16f4da38cc9164f1fdd18bc.jpg1755746464_103817');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-20  7:56:05
