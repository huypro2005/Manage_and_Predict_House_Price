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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'Hello','text','2025-11-09 10:30:43.583038',NULL,'{}',1,NULL,18),(2,'Hello','text','2025-11-09 10:31:38.669204',NULL,'{}',1,NULL,18),(3,'lo cc','text','2025-11-09 10:31:51.030972',NULL,'{}',1,NULL,20),(4,'hello men','text','2025-11-09 14:41:24.038329',NULL,'{}',2,NULL,15),(5,'qq','text','2025-11-09 14:42:31.809119',NULL,'{}',2,NULL,15),(6,'ádas','text','2025-11-09 15:50:02.447668',NULL,'{}',2,NULL,15),(7,'ádasd','text','2025-11-09 15:52:46.294562',NULL,'{}',1,NULL,18),(8,'ádasd','text','2025-11-09 15:52:50.220930',NULL,'{}',1,NULL,18),(9,'ádas','text','2025-11-09 15:52:56.666503',NULL,'{}',1,NULL,18),(10,'áda','text','2025-11-09 15:52:59.371291',NULL,'{}',2,NULL,18),(11,'fdsdf','text','2025-11-09 15:53:07.585775',NULL,'{}',2,NULL,18),(12,'ádas','text','2025-11-09 15:55:25.505739',NULL,'{}',2,NULL,18),(13,'ád','text','2025-11-09 15:55:29.376241',NULL,'{}',1,NULL,18),(14,'áda','text','2025-11-09 15:55:33.885817',NULL,'{}',2,NULL,18),(15,'hello','text','2025-11-09 15:56:05.396051',NULL,'{}',1,NULL,20),(16,'đ','text','2025-11-09 15:56:13.171375',NULL,'{}',1,NULL,20),(17,'ád','text','2025-11-09 15:56:28.669194',NULL,'{}',1,NULL,18),(18,'dsad','text','2025-11-09 16:01:03.453511',NULL,'{}',1,NULL,20),(19,'ssa','text','2025-11-09 16:01:09.761461',NULL,'{}',1,NULL,18),(20,'á','text','2025-11-09 16:02:31.624606',NULL,'{}',1,NULL,18),(21,'f','text','2025-11-09 16:02:33.134779',NULL,'{}',1,NULL,18),(22,'g','text','2025-11-09 16:02:34.320087',NULL,'{}',1,NULL,18);
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

-- Dump completed on 2025-11-11 22:51:01
