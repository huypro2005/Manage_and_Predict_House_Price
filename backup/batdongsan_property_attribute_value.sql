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
-- Table structure for table `property_attribute_value`
--

DROP TABLE IF EXISTS `property_attribute_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_attribute_value` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `attribute_id` bigint NOT NULL,
  `property_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `property_attribute_value_property_id_attribute_id_509732de_uniq` (`property_id`,`attribute_id`),
  KEY `property_attribute_value_attribute_id_d8c53ddf_fk_attribute_id` (`attribute_id`),
  CONSTRAINT `property_attribute_value_attribute_id_d8c53ddf_fk_attribute_id` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`id`),
  CONSTRAINT `property_attribute_value_property_id_e8eca465_fk_property_id` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_attribute_value`
--

LOCK TABLES `property_attribute_value` WRITE;
/*!40000 ALTER TABLE `property_attribute_value` DISABLE KEYS */;
INSERT INTO `property_attribute_value` VALUES (1,'1',1,'2025-11-18 16:06:31.597211','2025-11-18 16:06:31.597229',1,20),(2,'15',1,'2025-11-18 16:06:31.600166','2025-11-18 16:06:31.600187',5,20),(3,'Đông nam',1,'2025-11-18 16:06:31.601532','2025-11-18 16:06:31.601549',6,20),(4,'1',1,'2025-11-18 16:06:54.214621','2025-11-18 16:06:54.214670',1,19),(5,'2',1,'2025-11-18 16:07:09.760045','2025-11-18 16:07:09.760072',1,18),(12,'2',1,'2025-11-18 18:33:32.540440','2025-11-18 18:33:32.540464',1,31),(13,'1',1,'2025-11-18 18:33:32.545399','2025-11-18 18:33:32.545421',4,31),(14,'Tây - Bắc',1,'2025-11-18 18:33:32.546183','2025-11-18 18:33:32.546200',6,31),(15,'Đông - Nam',1,'2025-11-18 18:33:32.547189','2025-11-18 18:33:32.547203',7,31),(16,'Đầy đủ',1,'2025-11-18 18:33:32.547873','2025-11-18 18:33:32.547894',8,31),(17,'5',1,'2025-11-18 18:39:06.824133','2025-11-18 18:39:06.824160',1,32),(18,'11',1,'2025-11-18 18:39:06.825533','2025-11-18 18:39:06.825551',3,32),(19,'Đầy đủ',1,'2025-11-18 18:39:06.826341','2025-11-18 18:39:06.826373',8,32);
/*!40000 ALTER TABLE `property_attribute_value` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 23:50:27
