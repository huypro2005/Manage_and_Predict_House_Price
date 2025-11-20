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
-- Table structure for table `predictrequest`
--

DROP TABLE IF EXISTS `predictrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predictrequest` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `input_data` json NOT NULL,
  `predict_result` double DEFAULT NULL,
  `predict_price_per_m2` double DEFAULT NULL,
  `timestamp` datetime(6) NOT NULL,
  `dashboard_id` bigint DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `predicts_predictrequ_dashboard_id_94b01beb_fk_predicts_` (`dashboard_id`),
  KEY `predicts_predictrequest_user_id_6062ff0c_fk_CustomUser_id` (`user_id`),
  CONSTRAINT `predicts_predictrequ_dashboard_id_94b01beb_fk_predicts_` FOREIGN KEY (`dashboard_id`) REFERENCES `dashboard` (`id`),
  CONSTRAINT `predicts_predictrequest_user_id_6062ff0c_fk_CustomUser_id` FOREIGN KEY (`user_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predictrequest`
--

LOCK TABLES `predictrequest` WRITE;
/*!40000 ALTER TABLE `predictrequest` DISABLE KEYS */;
INSERT INTO `predictrequest` VALUES (1,'{\"pháp lý\": 1, \"số tầng\": 1, \"diện tích\": 100, \"mặt tiền\": 5, \"phòng ngủ\": 1, \"địa chỉ\": 15, \"tọa độ x\": 10.8624, \"tọa độ y\": 106.5894, \"loại nhà đất\": 8}',4228.18,42.281800000000004,'2025-08-24 03:45:35.785903',10,18),(2,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 73, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.797303067719644, \"tọa độ y\": 106.82324409484865, \"loại nhà đất\": 0}',3155.279,43.223,'2025-08-24 09:47:25.046326',7,15),(3,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 73, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.797303067719644, \"tọa độ y\": 106.82324409484865, \"loại nhà đất\": 0}',3155.279,43.223,'2025-08-24 09:49:44.639880',7,15),(4,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 73, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.8624, \"tọa độ y\": 106.5894, \"loại nhà đất\": 0}',3753.0614,51.4118,'2025-08-24 09:59:12.508547',7,15),(5,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 70, \"mặt tiền\": 0, \"phòng ngủ\": 3, \"địa chỉ\": 20, \"tọa độ x\": 10.841163, \"tọa độ y\": 106.82504, \"loại nhà đất\": 0}',4055.0930000000003,57.9299,'2025-09-11 06:41:40.273635',10,18),(6,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 126, \"mặt tiền\": 0, \"phòng ngủ\": 3, \"địa chỉ\": 2, \"tọa độ x\": 10.793512, \"tọa độ y\": 106.718069, \"loại nhà đất\": 0}',12176.350200000003,96.63770000000002,'2025-09-11 06:44:36.865217',10,18),(7,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 96, \"mặt tiền\": 0, \"phòng ngủ\": 3, \"địa chỉ\": 23, \"tọa độ x\": 10.804126319162, \"tọa độ y\": 106.616881383157, \"loại nhà đất\": 0}',6947.299200000005,72.36770000000006,'2025-09-13 01:44:27.560441',7,15);
/*!40000 ALTER TABLE `predictrequest` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 14:45:51
