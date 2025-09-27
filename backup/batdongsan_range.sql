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
-- Table structure for table `range`
--

DROP TABLE IF EXISTS `range`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `range` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `offset` int NOT NULL,
  `length` int NOT NULL,
  `notification_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Range_notification_id_4ebad73f_fk_Notification_id` (`notification_id`),
  CONSTRAINT `Range_notification_id_4ebad73f_fk_Notification_id` FOREIGN KEY (`notification_id`) REFERENCES `notification` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `range`
--

LOCK TABLES `range` WRITE;
/*!40000 ALTER TABLE `range` DISABLE KEYS */;
INSERT INTO `range` VALUES (1,25,9,1),(2,51,20,1),(3,0,9,2),(4,42,20,2),(5,0,9,3),(6,42,20,3),(11,0,9,6),(12,42,20,6),(13,0,9,7),(14,42,20,7),(15,0,9,8),(16,42,20,8),(17,0,9,9),(18,42,20,9),(19,0,9,10),(20,42,20,10),(21,0,9,11),(22,42,20,11),(23,0,9,12),(24,42,20,12),(27,0,9,14),(28,42,20,14),(33,0,9,17),(34,42,20,17),(35,0,9,18),(36,42,20,18),(37,0,9,19),(38,42,20,19),(39,0,9,20),(40,42,20,20),(41,0,9,21),(42,42,20,21),(43,0,9,22),(44,42,20,22),(45,0,9,23),(46,42,20,23),(47,0,9,24),(48,42,20,24),(49,0,13,25),(50,46,20,25),(51,0,13,26),(52,46,20,26),(53,0,9,27),(54,42,20,27),(55,0,9,28),(56,42,20,28),(57,0,9,29),(58,42,20,29),(59,0,9,30),(60,42,20,30),(61,0,9,31),(62,42,20,31),(63,0,9,32),(64,42,20,32);
/*!40000 ALTER TABLE `range` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-26 21:26:04
