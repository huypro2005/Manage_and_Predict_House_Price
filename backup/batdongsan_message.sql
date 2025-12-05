-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: user-service.clieg46wkhrm.ap-southeast-1.rds.amazonaws.com    Database: batdongsan
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `type` varchar(30) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `edit_at` datetime(6) DEFAULT NULL,
  `metadata` json NOT NULL,
  `conversation_id` bigint NOT NULL,
  `reply_message_id_id` bigint DEFAULT NULL,
  `sender_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `message_reply_message_id_id_2b5ea77e_fk_message_id` (`reply_message_id_id`),
  KEY `message_sender_id_a2a2e825_fk_customuser_id` (`sender_id`),
  KEY `message_convers_eb8893_idx` (`conversation_id`),
  CONSTRAINT `message_conversation_id_87e8709d_fk_conversation_id` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`),
  CONSTRAINT `message_reply_message_id_id_2b5ea77e_fk_message_id` FOREIGN KEY (`reply_message_id_id`) REFERENCES `message` (`id`),
  CONSTRAINT `message_sender_id_a2a2e825_fk_customuser_id` FOREIGN KEY (`sender_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'Hello','text','2025-11-09 10:30:43.583038',NULL,'{}',1,NULL,18),(2,'Hello','text','2025-11-09 10:31:38.669204',NULL,'{}',1,NULL,18),(3,'lo cc','text','2025-11-09 10:31:51.030972',NULL,'{}',1,NULL,20),(4,'hello men','text','2025-11-09 14:41:24.038329',NULL,'{}',2,NULL,15),(5,'qq','text','2025-11-09 14:42:31.809119',NULL,'{}',2,NULL,15),(6,'ádas','text','2025-11-09 15:50:02.447668',NULL,'{}',2,NULL,15),(7,'ádasd','text','2025-11-09 15:52:46.294562',NULL,'{}',1,NULL,18),(8,'ádasd','text','2025-11-09 15:52:50.220930',NULL,'{}',1,NULL,18),(9,'ádas','text','2025-11-09 15:52:56.666503',NULL,'{}',1,NULL,18),(10,'áda','text','2025-11-09 15:52:59.371291',NULL,'{}',2,NULL,18),(11,'fdsdf','text','2025-11-09 15:53:07.585775',NULL,'{}',2,NULL,18),(12,'ádas','text','2025-11-09 15:55:25.505739',NULL,'{}',2,NULL,18),(13,'ád','text','2025-11-09 15:55:29.376241',NULL,'{}',1,NULL,18),(14,'áda','text','2025-11-09 15:55:33.885817',NULL,'{}',2,NULL,18),(15,'hello','text','2025-11-09 15:56:05.396051',NULL,'{}',1,NULL,20),(16,'đ','text','2025-11-09 15:56:13.171375',NULL,'{}',1,NULL,20),(17,'ád','text','2025-11-09 15:56:28.669194',NULL,'{}',1,NULL,18),(18,'dsad','text','2025-11-09 16:01:03.453511',NULL,'{}',1,NULL,20),(19,'ssa','text','2025-11-09 16:01:09.761461',NULL,'{}',1,NULL,18),(20,'á','text','2025-11-09 16:02:31.624606',NULL,'{}',1,NULL,18),(21,'f','text','2025-11-09 16:02:33.134779',NULL,'{}',1,NULL,18),(22,'g','text','2025-11-09 16:02:34.320087',NULL,'{}',1,NULL,18),(23,'ád','text','2025-11-15 10:18:21.254590',NULL,'{}',1,NULL,20),(24,'hi','text','2025-11-15 10:18:41.553227',NULL,'{}',1,NULL,18),(25,'as','text','2025-11-15 14:13:36.457438',NULL,'{}',1,NULL,18),(26,'dsa','text','2025-11-15 14:13:38.036722',NULL,'{}',1,NULL,18),(27,'asd','text','2025-11-15 14:13:42.483356',NULL,'{}',2,NULL,18),(28,'hrl','text','2025-11-15 14:45:12.642040',NULL,'{}',1,NULL,18),(29,'ek','text','2025-11-15 14:55:35.430221',NULL,'{}',1,NULL,20),(30,'chi','text','2025-11-15 14:55:45.315742',NULL,'{}',1,NULL,18),(31,'ll','text','2025-11-15 14:55:49.374866',NULL,'{}',1,NULL,20),(32,'ek','text','2025-11-15 14:57:01.098338',NULL,'{}',1,NULL,20),(33,'sd','text','2025-11-15 14:57:08.157782',NULL,'{}',1,NULL,20),(34,'adasd','text','2025-11-15 15:02:53.519598',NULL,'{}',1,NULL,20),(35,'afdfafs','text','2025-11-15 15:04:29.619852',NULL,'{}',1,NULL,20),(36,'hello','text','2025-11-15 15:36:50.270973',NULL,'{}',1,NULL,20),(37,'hi','text','2025-11-15 15:37:15.370160',NULL,'{}',1,NULL,20),(38,'âs','text','2025-11-15 15:38:55.727583',NULL,'{}',1,NULL,18),(39,'há','text','2025-11-15 15:44:29.289121',NULL,'{}',1,NULL,20),(40,'asdasd','text','2025-11-15 15:46:02.570878',NULL,'{}',1,NULL,20),(41,'ád','text','2025-11-15 16:25:30.578615',NULL,'{}',1,NULL,18),(42,'hello','text','2025-11-15 17:04:22.895051',NULL,'{}',1,NULL,18),(43,'asdasd','text','2025-11-15 17:21:29.256338',NULL,'{}',1,NULL,20),(44,'hello','text','2025-11-15 17:21:55.072983',NULL,'{}',1,NULL,18),(45,'asd','text','2025-11-15 17:22:34.697158',NULL,'{}',1,NULL,18),(46,'as','text','2025-11-15 17:23:23.837084',NULL,'{}',1,NULL,20),(47,'asd','text','2025-11-15 17:24:06.948667',NULL,'{}',1,NULL,20),(48,'asd','text','2025-11-15 17:26:24.673334',NULL,'{}',1,NULL,18),(49,'asd','text','2025-11-15 17:27:44.781874',NULL,'{}',2,NULL,18),(50,'as','text','2025-11-15 17:28:33.155711',NULL,'{}',1,NULL,18),(51,'as','text','2025-11-15 17:29:31.682636',NULL,'{}',2,NULL,18),(52,'hello','text','2025-11-15 17:34:23.233477',NULL,'{}',1,NULL,18),(53,'ss','text','2025-11-15 17:34:42.285171',NULL,'{}',1,NULL,20),(54,'ád','text','2025-11-15 17:47:49.276719',NULL,'{}',1,NULL,18),(55,'a','text','2025-11-15 17:48:19.654769',NULL,'{}',1,NULL,18),(56,'a','text','2025-11-15 17:48:19.872881',NULL,'{}',1,NULL,18),(57,'a','text','2025-11-15 17:48:20.116931',NULL,'{}',1,NULL,18),(58,'â','text','2025-11-15 17:48:20.307625',NULL,'{}',1,NULL,18),(59,'a','text','2025-11-15 17:48:20.586425',NULL,'{}',1,NULL,18),(60,'a','text','2025-11-15 17:48:20.725115',NULL,'{}',1,NULL,18),(61,'a','text','2025-11-15 17:48:20.899299',NULL,'{}',1,NULL,18),(62,'a','text','2025-11-15 17:48:21.016138',NULL,'{}',1,NULL,18),(63,'a','text','2025-11-15 17:48:21.169372',NULL,'{}',1,NULL,18),(64,'a','text','2025-11-15 17:48:21.332046',NULL,'{}',1,NULL,18),(65,'a','text','2025-11-15 17:48:21.596579',NULL,'{}',1,NULL,18),(66,'a','text','2025-11-15 17:48:21.756046',NULL,'{}',1,NULL,18),(67,'a','text','2025-11-15 17:48:21.885793',NULL,'{}',1,NULL,18),(68,'a','text','2025-11-15 17:48:22.037421',NULL,'{}',1,NULL,18),(69,'a','text','2025-11-15 17:48:22.189710',NULL,'{}',1,NULL,18),(70,'a','text','2025-11-15 17:48:22.480488',NULL,'{}',1,NULL,18),(71,'a','text','2025-11-15 17:48:22.635976',NULL,'{}',1,NULL,18),(72,'a','text','2025-11-15 17:48:22.802713',NULL,'{}',1,NULL,18),(73,'a','text','2025-11-15 17:48:22.931613',NULL,'{}',1,NULL,18),(74,'a','text','2025-11-15 17:48:23.077802',NULL,'{}',1,NULL,18),(75,'á','text','2025-11-15 18:19:30.372231',NULL,'{}',1,NULL,18),(76,'hrll','text','2025-11-16 03:05:10.685186',NULL,'{}',1,NULL,18),(77,'áas','text','2025-11-16 03:12:05.663915',NULL,'{}',1,NULL,18),(78,'hello','text','2025-11-16 03:12:18.371158',NULL,'{}',1,NULL,18),(79,'chi anh','text','2025-11-16 03:13:14.345884',NULL,'{}',1,NULL,20),(80,'đang ngủ','text','2025-11-16 03:13:24.800397',NULL,'{}',1,NULL,20),(81,'ád','text','2025-11-16 03:14:48.802876',NULL,'{}',1,NULL,20),(82,'ád','text','2025-11-16 03:48:43.253913',NULL,'{}',1,NULL,18),(83,'hello','text','2025-11-16 04:13:28.184993',NULL,'{}',1,NULL,20),(84,'ádsa','text','2025-11-16 04:15:50.328738',NULL,'{}',1,NULL,20),(85,'gi','text','2025-11-16 04:16:18.122196',NULL,'{}',1,NULL,18),(86,'gi','text','2025-11-16 04:16:38.486010',NULL,'{}',2,NULL,18),(87,'hello','text','2025-11-16 04:19:54.596585',NULL,'{}',1,NULL,18),(88,'hi','text','2025-11-16 04:20:23.381185',NULL,'{}',1,NULL,20),(89,'h','text','2025-11-16 04:24:03.437239',NULL,'{}',1,NULL,18),(90,'hêlo','text','2025-11-16 04:24:22.030695',NULL,'{}',1,NULL,20),(91,'hello','text','2025-11-16 04:40:21.700266',NULL,'{}',1,NULL,20),(92,'hel','text','2025-11-16 04:45:09.929528',NULL,'{}',1,NULL,20),(93,'ek','text','2025-11-16 04:46:07.440224',NULL,'{}',1,NULL,20),(94,'elk','text','2025-11-16 04:46:39.307684',NULL,'{}',1,NULL,20),(95,'ek','text','2025-11-16 04:58:39.886299',NULL,'{}',1,NULL,20),(96,'like','text','2025-11-16 04:59:11.005141',NULL,'{}',1,NULL,18),(97,'ek','text','2025-11-16 07:07:47.671822',NULL,'{}',1,NULL,18),(98,'đ','text','2025-11-16 07:10:38.388556',NULL,'{}',1,NULL,20),(99,'fsdf','text','2025-11-16 07:10:44.686919',NULL,'{}',1,NULL,18),(100,'s','text','2025-11-16 07:11:22.430049',NULL,'{}',2,NULL,18),(101,'ád','text','2025-11-16 07:11:24.521844',NULL,'{}',2,NULL,18),(102,'ád','text','2025-11-16 07:12:18.763197',NULL,'{}',2,NULL,18),(103,'he;;p','text','2025-11-16 07:30:55.731460',NULL,'{}',1,NULL,18),(104,'này','text','2025-11-16 07:31:15.898790',NULL,'{}',1,NULL,20),(105,'ssa','text','2025-11-16 07:31:44.935192',NULL,'{}',1,NULL,20),(106,'https://docs.google.com/forms/d/e/1FAIpQLSfrNuDr2qSsEpdGzqiR6_y0nPbwMWpx8Iwit-H5dhgEoxygYg/viewform','text','2025-11-16 07:36:20.853748',NULL,'{}',1,NULL,20),(107,'ek\\','text','2025-11-16 07:41:42.262896',NULL,'{}',1,NULL,20),(108,'ấd','text','2025-11-18 16:47:37.987487',NULL,'{}',2,NULL,15),(109,'eksa','text','2025-11-18 16:47:45.108523',NULL,'{}',2,NULL,15),(110,'hellp','text','2025-11-19 06:19:16.921236',NULL,'{}',3,NULL,15),(111,'á','text','2025-11-19 06:19:29.256598',NULL,'{}',3,NULL,15),(112,'ek','text','2025-11-19 06:19:33.741966',NULL,'{}',2,NULL,15),(113,'ek','text','2025-11-19 17:44:23.941089',NULL,'{}',2,NULL,15),(114,'j','text','2025-11-20 05:33:39.403672',NULL,'{}',2,NULL,18),(115,'hello em','text','2025-11-20 17:54:44.074698',NULL,'{}',2,NULL,18),(116,'his','text','2025-11-20 17:55:54.625195',NULL,'{}',2,NULL,18),(117,'hi','text','2025-11-20 17:56:44.945919',NULL,'{}',2,NULL,18),(118,'hi','text','2025-11-20 17:57:00.464331',NULL,'{}',2,NULL,18),(119,'hi','text','2025-11-24 15:53:50.761829',NULL,'{}',2,NULL,18),(120,'Tôi đang quan tâm tài sản có tiêu đề: Bán lô góc BT Nam Cường 236m2 rẻ nhất thị trường, đường lớn giá rẻ nhỉnh 40 tỷ LH: 0936 386 ***\n\nThông tin liên hệ:\n\n        - Tên: hhh\n\n        - Số điện thoại: 012345 ****\n\n        - Email: pcoder808@gmail.com\n\n        Nội dung tin nhắn:\n\n        Hello\n\nLink bài viết: https://d37u3m9dkftg82.cloudfront.net/property/32','text','2025-11-29 10:26:59.274904',NULL,'{}',4,NULL,18),(121,'hi','text','2025-12-03 11:56:15.917928',NULL,'{}',5,NULL,18),(122,'a','text','2025-12-03 11:56:44.996409',NULL,'{}',5,NULL,18),(123,'hi','text','2025-12-03 11:56:57.171135',NULL,'{}',5,NULL,22),(124,'Tôi đang quan tâm tài sản có tiêu đề: Cập nhật liên tục rổ hàng bán tháng 08/2025 1PN+ 1 65m2 giá 2.6 tỷ, 2PN 73m2 giá 3.150 tỷ sổ sẵn\n\nThông tin liên hệ:\n\n        - Tên: Huy\n\n        - Số điện thoại: 012345 ****\n\n        - Email: pandalist998@gmail.com\n\n        Nội dung tin nhắn:\n\n        Tôi muốn đàm phán\n\nLink bài viết: https://restate-housing-day.store/property/18','text','2025-12-03 12:10:07.366629',NULL,'{}',5,NULL,22),(125,'hi','text','2025-12-03 12:10:22.266217',NULL,'{}',5,NULL,18);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 13:20:45
