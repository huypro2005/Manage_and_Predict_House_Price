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
-- Table structure for table `favouriteproperties`
--

DROP TABLE IF EXISTS `favouriteproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favouriteproperties` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `property_id` bigint NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `FavouriteProperties_user_id_property_id_6576b9c0_uniq` (`user_id`,`property_id`),
  KEY `FavouriteProperties_property_id_5832cf8b_fk_Property_id` (`property_id`),
  CONSTRAINT `FavouriteProperties_property_id_5832cf8b_fk_Property_id` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `FavouriteProperties_user_id_989c066c_fk_CustomUser_id` FOREIGN KEY (`user_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favouriteproperties`
--

LOCK TABLES `favouriteproperties` WRITE;
/*!40000 ALTER TABLE `favouriteproperties` DISABLE KEYS */;
INSERT INTO `favouriteproperties` VALUES (8,'2025-08-23 16:27:07.713284',1,14,15),(9,'2025-08-23 16:27:10.472689',1,18,15),(13,'2025-08-24 03:19:48.868900',1,17,18),(14,'2025-08-24 06:52:10.870371',1,16,15),(15,'2025-08-24 06:52:12.241282',1,15,15),(16,'2025-08-24 06:52:17.376676',1,13,15),(17,'2025-08-24 06:52:19.516714',1,11,15),(18,'2025-08-24 06:52:26.357689',1,17,15),(19,'2025-08-24 06:52:30.026268',1,12,15),(20,'2025-08-24 06:52:34.507251',1,10,15),(21,'2025-08-24 06:52:35.881079',1,9,15),(22,'2025-08-24 06:52:38.737176',1,7,15),(23,'2025-08-24 21:08:32.807100',1,18,19),(25,'2025-08-30 01:57:00.146020',1,16,18),(30,'2025-09-20 01:27:36.339551',1,15,18);
/*!40000 ALTER TABLE `favouriteproperties` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-11 22:51:02
