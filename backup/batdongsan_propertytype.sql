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
-- Table structure for table `propertytype`
--

DROP TABLE IF EXISTS `propertytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propertytype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `code` int NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `tab` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propertytype`
--

LOCK TABLES `propertytype` WRITE;
/*!40000 ALTER TABLE `propertytype` DISABLE KEYS */;
INSERT INTO `propertytype` VALUES (1,'căn hộ chung cư','2025-08-10 10:07:59.367149','2025-11-18 17:43:25.530686',0,1,NULL,NULL),(2,'chung cư mini, căn hộ dịch vụ','2025-08-10 10:08:13.097585','2025-11-18 17:42:41.095739',1,1,NULL,NULL),(3,'nhà riêng','2025-08-10 10:08:20.466678','2025-11-18 17:42:36.047320',2,1,NULL,NULL),(4,'nhà biệt thự, liền kề','2025-08-10 10:08:31.363513','2025-11-18 17:42:28.773182',3,1,NULL,NULL),(5,'nhà mặt phố','2025-08-10 10:08:38.291219','2025-11-18 17:42:22.942897',4,1,NULL,NULL),(6,'shophouse, nhà phố thương mại','2025-08-10 10:08:44.879853','2025-11-17 10:05:38.498250',5,0,NULL,NULL),(7,'đất nền dự án','2025-08-10 10:08:54.278650','2025-11-17 09:28:04.748410',6,1,NULL,'ban'),(8,'bán đất','2025-08-10 10:09:01.641137','2025-11-17 09:27:49.169796',7,1,NULL,'ban'),(9,'condotel','2025-08-10 10:09:10.012344','2025-11-17 10:05:29.674633',8,0,NULL,NULL),(10,'kho nhà xưởng','2025-08-10 10:09:19.828308','2025-11-17 10:05:23.187351',9,0,NULL,NULL),(14,'Nhà trọ/ Phòng trọ','2025-09-23 05:34:05.775437','2025-11-18 17:41:09.583802',10,1,NULL,'thue'),(15,'Cửa hàng, ki ốt','2025-09-23 05:35:29.005772','2025-11-17 10:05:15.268940',11,0,NULL,'thue');
/*!40000 ALTER TABLE `propertytype` ENABLE KEYS */;
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
