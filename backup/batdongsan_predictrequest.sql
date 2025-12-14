-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: database-1.clieg46wkhrm.ap-southeast-1.rds.amazonaws.com    Database: batdongsan
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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predictrequest`
--

LOCK TABLES `predictrequest` WRITE;
/*!40000 ALTER TABLE `predictrequest` DISABLE KEYS */;
INSERT INTO `predictrequest` VALUES (1,'{\"pháp lý\": 1, \"số tầng\": 1, \"diện tích\": 100, \"mặt tiền\": 5, \"phòng ngủ\": 1, \"địa chỉ\": 15, \"tọa độ x\": 10.8624, \"tọa độ y\": 106.5894, \"loại nhà đất\": 8}',4228.18,42.281800000000004,'2025-08-24 03:45:35.785903',10,18),(2,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 73, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.797303067719644, \"tọa độ y\": 106.82324409484865, \"loại nhà đất\": 0}',3155.279,43.223,'2025-08-24 09:47:25.046326',7,15),(3,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 73, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.797303067719644, \"tọa độ y\": 106.82324409484865, \"loại nhà đất\": 0}',3155.279,43.223,'2025-08-24 09:49:44.639880',7,15),(4,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 73, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.8624, \"tọa độ y\": 106.5894, \"loại nhà đất\": 0}',3753.0614,51.4118,'2025-08-24 09:59:12.508547',7,15),(5,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 70, \"mặt tiền\": 0, \"phòng ngủ\": 3, \"địa chỉ\": 20, \"tọa độ x\": 10.841163, \"tọa độ y\": 106.82504, \"loại nhà đất\": 0}',4055.0930000000003,57.9299,'2025-09-11 06:41:40.273635',10,18),(6,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 126, \"mặt tiền\": 0, \"phòng ngủ\": 3, \"địa chỉ\": 2, \"tọa độ x\": 10.793512, \"tọa độ y\": 106.718069, \"loại nhà đất\": 0}',12176.350200000003,96.63770000000002,'2025-09-11 06:44:36.865217',10,18),(7,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 96, \"mặt tiền\": 0, \"phòng ngủ\": 3, \"địa chỉ\": 23, \"tọa độ x\": 10.804126319162, \"tọa độ y\": 106.616881383157, \"loại nhà đất\": 0}',6947.299200000005,72.36770000000006,'2025-09-13 01:44:27.560441',7,15),(8,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 77, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 13, \"tọa độ x\": 10.806447058580222, \"tọa độ y\": 106.77160144114288, \"loại nhà đất\": 0}',7626.049199999999,99.03959999999998,'2025-11-21 02:36:22.409054',15,24),(9,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 14, \"diện tích\": 74, \"mặt tiền\": 5, \"phòng ngủ\": 3, \"địa chỉ\": 20, \"tọa độ x\": 10.8624, \"tọa độ y\": 106.5894, \"loại nhà đất\": 0}',61900.91119999994,836.4987999999992,'2025-11-21 03:42:28.592793',16,25),(10,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 74, \"mặt tiền\": 0, \"phòng ngủ\": 3, \"địa chỉ\": 20, \"tọa độ x\": 10.8624, \"tọa độ y\": 106.5894, \"loại nhà đất\": 0}',3803.0375999999997,51.392399999999995,'2025-11-21 03:43:51.880818',16,25),(11,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": -1, \"diện tích\": 75, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 5, \"tọa độ x\": 10.838595, \"tọa độ y\": 106.675212, \"loại nhà đất\": 0}',3846.547500000001,51.287300000000016,'2025-12-03 10:40:13.485324',14,22),(12,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 113, \"mặt tiền\": 0, \"phòng ngủ\": 3, \"địa chỉ\": 5, \"tọa độ x\": 10.831852, \"tọa độ y\": 106.674857, \"loại nhà đất\": 0}',7151.758699999999,63.289899999999996,'2025-12-03 10:41:25.969016',14,22),(13,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 75, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 5, \"tọa độ x\": 10.828288, \"tọa độ y\": 106.685496, \"loại nhà đất\": 0}',4403.082187499999,58.70776249999999,'2025-12-03 10:42:19.264139',14,22),(14,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 63, \"mặt tiền\": 0, \"phòng ngủ\": 1, \"địa chỉ\": 20, \"tọa độ x\": 10.803522, \"tọa độ y\": 106.8143, \"loại nhà đất\": 0}',3056.0073600000023,48.50805333333337,'2025-12-03 12:02:49.800763',10,18),(15,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": -1, \"diện tích\": 63, \"mặt tiền\": 0, \"phòng ngủ\": 1, \"địa chỉ\": 20, \"tọa độ x\": 10.79697425405464, \"tọa độ y\": 106.82317113823956, \"loại nhà đất\": 0}',3353.93163,53.23701,'2025-12-03 12:11:34.857675',10,18),(16,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 66, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 21, \"tọa độ x\": 10.791160937986769, \"tọa độ y\": 106.7493267048849, \"loại nhà đất\": 0}',3662.200519999999,55.487886666666654,'2025-12-05 12:54:08.839351',10,18),(17,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 65, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 0, \"tọa độ x\": 10.701568, \"tọa độ y\": 106.636253, \"loại nhà đất\": 0}',2747.918875,42.275675,'2025-12-05 12:55:48.928374',10,18),(18,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 2, \"diện tích\": 54, \"mặt tiền\": 1, \"phòng ngủ\": 2, \"địa chỉ\": 23, \"tọa độ x\": 10.779099, \"tọa độ y\": 106.624253, \"loại nhà đất\": 2}',6070.639679999998,112.4192533333333,'2025-12-05 12:57:40.647713',10,18),(19,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 65, \"mặt tiền\": 0, \"phòng ngủ\": 1, \"địa chỉ\": 20, \"tọa độ x\": 10.797103, \"tọa độ y\": 106.82344, \"loại nhà đất\": 0}',3473.2106500000004,53.43401000000001,'2025-12-05 13:15:15.262439',10,18),(20,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 0, \"diện tích\": 65, \"mặt tiền\": 0, \"phòng ngủ\": 1, \"địa chỉ\": 20, \"tọa độ x\": 10.797104, \"tọa độ y\": 106.82344, \"loại nhà đất\": 0}',3473.2106500000004,53.43401000000001,'2025-12-05 13:25:36.243761',10,18),(21,'{\"pháp lý\": 1, \"mã tỉnh\": 0, \"số tầng\": 0, \"diện tích\": 70, \"mặt tiền\": 0, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.841163, \"tọa độ y\": 106.82504, \"loại nhà đất\": 0}',3678.801000000002,52.55430000000003,'2025-12-10 17:21:48.259828',10,18),(22,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 1, \"diện tích\": 100, \"mặt tiền\": 5, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.8624, \"tọa độ y\": 106.5894, \"loại nhà đất\": 0}',6010.1,60.101000000000006,'2025-12-11 07:11:27.434352',17,26),(23,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 1, \"diện tích\": 50, \"mặt tiền\": 5, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.859603, \"tọa độ y\": 106.779816, \"loại nhà đất\": 6}',4916.484999999999,98.32969999999997,'2025-12-11 07:15:39.121877',17,26),(24,'{\"tỉnh\": 0, \"pháp lý\": 1, \"số tầng\": 1, \"diện tích\": 50, \"mặt tiền\": 5, \"phòng ngủ\": 2, \"địa chỉ\": 20, \"tọa độ x\": 10.859603, \"tọa độ y\": 106.779816, \"loại nhà đất\": 0}',2419.4416666666657,48.38883333333332,'2025-12-11 07:15:49.939387',17,26);
/*!40000 ALTER TABLE `predictrequest` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-13  0:37:46
