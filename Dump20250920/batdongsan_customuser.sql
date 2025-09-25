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
-- Table structure for table `customuser`
--

DROP TABLE IF EXISTS `customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(254) NOT NULL,
  `auth_provider` varchar(20) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `CustomUser_phone_2cf41b23_uniq` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customuser`
--

LOCK TABLES `customuser` WRITE;
/*!40000 ALTER TABLE `customuser` DISABLE KEYS */;
INSERT INTO `customuser` VALUES (4,'pbkdf2_sha256$1000000$TvcjA9smAEsTqhjGQKmREl$o/FWGIUGpDSPVK0wJp55v9jow3l4Puj+dmzTXnR9H5o=','2025-08-17 11:25:42.841962',0,'vya',0,'2025-08-11 02:45:12.000000','msz@gmail.com','local',NULL,'accounts/customuser/c852c535b3a946bd90d64c419c776213.jpg1754880532_024648',NULL,'Vy','Dau Thi',NULL,1,0,'2025-08-11 02:45:12.955215','2025-08-17 11:25:42.845451',0,''),(6,'pbkdf2_sha256$1000000$egVcUOldGQbhdS2EW1P72l$cv0mEtKSt5x+b5Htdc97rHUzS53PBOGvc9xkHNfNbM0=','2025-09-11 06:53:31.000000',1,'admin123',1,'2025-08-15 10:05:33.000000','admin123@gmail.com','local',NULL,'accounts/default/user_avatar.png',NULL,'Admin','Add',NULL,1,0,'2025-08-15 10:05:33.590806','2025-09-17 01:24:16.739642',0,''),(7,'pbkdf2_sha256$1000000$wzRdRyVnRgS5Ak7xjiUNYl$TGSAFDTnjPJxrj3GclBiGHJPNBCRnTnMJYYC33tRVV4=',NULL,0,'newuser',0,'2025-08-15 18:20:36.985285','newuser@example.com','local',NULL,'accounts/default/user_avatar.png',NULL,'John','Doe',NULL,1,0,'2025-08-15 18:20:37.335056','2025-08-15 18:20:37.335064',0,''),(8,'pbkdf2_sha256$1000000$9tctRvaTsYZ6CQCENNOVaS$37+ezOWsH47gfSd7QbxMtiVDMiiMzZlI+yqg82LCITk=',NULL,0,'newuser1',0,'2025-08-16 08:46:56.204632','newuser1@example.com','local',NULL,'accounts/default/user_avatar.png',NULL,'John','Doe',NULL,1,0,'2025-08-16 08:46:56.600150','2025-08-16 08:58:51.195504',0,''),(15,'pbkdf2_sha256$1000000$Prkon8qVvN6QOyPIMbYolb$ggWKiXrxYyExaDY/cK9rsulYzmfzyR7p/VqxCL4RBdM=','2025-09-13 01:36:55.187081',0,'your_username',0,'2025-08-18 17:06:57.000000','23520595@gm.uit.edu.vn','local',NULL,'accounts/customuser/b6ac6c2753b34c85a092cef1929faf87.jpg1755573506_793419','0353735497','Cao','Huy',NULL,1,0,'2025-08-18 17:06:57.891992','2025-09-13 01:36:55.196807',0,''),(16,'pbkdf2_sha256$1000000$MHBJAnHejrp4Ix9Avy4taD$6NxuM/E+jqb5G/lyYyJkceZnX4xIwaelwXjzCfdjny4=','2025-08-18 17:33:28.000000',0,'huypro37',0,'2025-08-18 17:33:15.000000','westisabellasbs324@hotmail.com','local',NULL,'accounts/customuser/57245a50138148be8d7f02111e54e56d.png1755538516_056207','0353735498','Cao','Huy',NULL,1,0,'2025-08-18 17:33:15.728090','2025-08-18 17:35:16.063792',0,''),(17,'pbkdf2_sha256$1000000$NHMF6IeiNHd8cF1lgkuoyZ$LXf9QID5qnsl2RYL/4f9Oviho2nIQCaTFbDj+UMrac8=','2025-08-19 03:04:48.183053',0,'huypro375',0,'2025-08-18 18:05:20.000000','235205a95@gm.uit.edu.vn','local',NULL,'accounts/customuser/7c9a3fb69d7f468a88599e5ced44dc0b.png1755565155_129436','0353735499','Cao','Huy',NULL,1,0,'2025-08-18 18:05:20.880543','2025-08-19 03:04:48.186571',0,''),(18,'pbkdf2_sha256$1000000$cTQjZ3cdbpwgMNOXXnrTyq$g2ZVew8wmyXoaYVQSMo0gYyA6o+yAzA/joSXFZYlFY0=','2025-09-17 05:04:38.988201',0,'pcoder808',0,'2025-08-19 03:59:19.287945','pcoder808@gmail.com','google','VHqCXYWj2GN7Xq9rkYQ34MeUqyO2','accounts/customuser/9020347d35db47d19ccfecc0b48e628c.jpg1758001957_039036','0355735497','Huy','Cao Thanh','2005-10-14',1,0,'2025-08-19 03:59:19.288203','2025-09-17 05:04:38.996662',0,'Hi, I\'m Thanh Huy. I\'m a backend engineer and AI engineer. Python skill is the second level. I hope coolabrated with you soon.'),(19,'pbkdf2_sha256$1000000$U5O1mJ9tCIi5V8TCwq6TFl$+6f/Xu9EHuDS+CgtS7ZRzcHhvy4DlrekTEWfAR7uLX4=','2025-09-16 15:12:50.898181',0,'hw2125186',0,'2025-08-19 05:46:47.694290','hw2125186@gmail.com','google','v399RcMG7ghoibPQbN2IuudW4Op1','/accounts/default/user_avatar.png',NULL,'hello world','',NULL,1,0,'2025-08-19 05:46:47.695592','2025-09-16 15:12:50.904932',0,''),(20,'pbkdf2_sha256$1000000$aqR23hme7LrZNS0SoOpagP$lsDaaeo2jOoiyllPmGssxuXqbbw4g3qxkHfiCDBOxo0=','2025-09-16 01:59:00.368121',0,'protrader2005',0,'2025-08-19 10:16:45.078310','protrader2005@gmail.com','google','1IhXtuEOVggxbTdLFWr4QiIR2tI3','/accounts/default/user_avatar.png',NULL,'Huy Cao Thành','',NULL,1,0,'2025-08-19 10:16:45.078504','2025-09-16 01:59:00.378023',0,''),(21,'pbkdf2_sha256$1000000$P1Cor4fHpkj3911YnEAKxN$QdVO4pRWFnE3YagMBaW2GIp74SEQrgyYrT0w/Gy/daM=','2025-08-28 18:16:33.210339',0,'pandala269',0,'2025-08-28 18:16:32.353389','pandala269@gmail.com','google','0NHxn6ZuptgKt3a4cdvTfrcvizT2','/accounts/default/user_avatar.png',NULL,'Panda','',NULL,1,0,'2025-08-28 18:16:32.354784','2025-08-28 18:16:33.220268',0,''),(22,'pbkdf2_sha256$1000000$YeBligLJcegOjb0jQkhWpi$ww4cWp6Ly/8ycx4kk9gnLXS8/MsSr/bJGMa2Cbg18YU=','2025-09-15 17:11:34.757948',0,'pandalist998',0,'2025-09-15 17:11:33.569122','pandalist998@gmail.com','google','SuzD8nnwOHXVXQHYQ235kTdThB03','/accounts/default/user_avatar.png',NULL,'Panda','',NULL,1,0,'2025-09-15 17:11:33.572495','2025-09-15 17:11:34.764162',0,''),(23,'pbkdf2_sha256$1000000$XytPyOiaZ8zayYSJkNByJu$Gcv/BXQJ0LysOOvsEpz61UfQxR6Cb0MQpTYJ/n+WVxM=','2025-09-17 01:24:02.599384',1,'admin',1,'2025-09-17 01:23:52.205678','a@gmail.com','local',NULL,'/accounts/default/user_avatar.png',NULL,'','',NULL,1,0,'2025-09-17 01:23:52.552212','2025-09-17 01:24:02.602601',0,'');
/*!40000 ALTER TABLE `customuser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-20  7:56:09
