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
-- Table structure for table `conversationparticipants`
--

DROP TABLE IF EXISTS `conversationparticipants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversationparticipants` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role` varchar(30) DEFAULT NULL,
  `last_read_at` datetime(6) DEFAULT NULL,
  `delete_for_user_at` datetime(6) DEFAULT NULL,
  `conversation_id` bigint NOT NULL,
  `last_read_message_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `conversationparticipants_conversation_id_user_id_b96c8f6f_uniq` (`conversation_id`,`user_id`),
  KEY `conversationparticip_last_read_message_id_1098ae9e_fk_message_i` (`last_read_message_id`),
  KEY `conversationparticipants_user_id_1d1ff264_fk_customuser_id` (`user_id`),
  KEY `conversatio_convers_1ab738_idx` (`conversation_id`,`user_id`),
  CONSTRAINT `conversationparticip_conversation_id_9c87cc0d_fk_conversat` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`),
  CONSTRAINT `conversationparticip_last_read_message_id_1098ae9e_fk_message_i` FOREIGN KEY (`last_read_message_id`) REFERENCES `message` (`id`),
  CONSTRAINT `conversationparticipants_user_id_1d1ff264_fk_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversationparticipants`
--

LOCK TABLES `conversationparticipants` WRITE;
/*!40000 ALTER TABLE `conversationparticipants` DISABLE KEYS */;
INSERT INTO `conversationparticipants` VALUES (1,NULL,'2025-11-16 07:41:43.980602',NULL,1,107,18),(2,NULL,'2025-11-16 07:41:42.269213',NULL,1,107,20),(3,NULL,'2025-11-09 15:50:02.458767',NULL,2,6,15),(4,NULL,'2025-11-16 07:12:18.773787',NULL,2,102,18);
/*!40000 ALTER TABLE `conversationparticipants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-18  0:28:52
