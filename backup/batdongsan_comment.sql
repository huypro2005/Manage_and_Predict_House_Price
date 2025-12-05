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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  `answer_id` bigint DEFAULT NULL,
  `article_id` bigint NOT NULL,
  `author_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_comment_answer_id_026b1302_fk_comments_comment_id` (`answer_id`),
  KEY `comments_comment_article_id_94fe60a2_fk_news_newsarticle_id` (`article_id`),
  KEY `comments_comment_author_id_334ce9e2_fk_CustomUser_id` (`author_id`),
  CONSTRAINT `comments_comment_answer_id_026b1302_fk_comments_comment_id` FOREIGN KEY (`answer_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `comments_comment_article_id_94fe60a2_fk_news_newsarticle_id` FOREIGN KEY (`article_id`) REFERENCES `newsarticle` (`id`),
  CONSTRAINT `comments_comment_author_id_334ce9e2_fk_CustomUser_id` FOREIGN KEY (`author_id`) REFERENCES `customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'hello','2025-09-22 17:07:34.533411','2025-09-22 17:07:34.533435',0,NULL,2,18),(2,'hello','2025-09-22 17:07:53.036029','2025-09-22 17:07:53.036054',0,NULL,2,18),(3,'hello','2025-09-22 17:17:33.554369','2025-09-22 17:17:33.554399',0,1,2,18),(4,'hello','2025-09-22 17:19:11.213268','2025-09-22 17:19:11.213296',0,2,2,18),(5,'','2025-09-22 17:25:30.589493','2025-09-22 17:25:30.589515',0,2,2,18),(6,'Chào bà con','2025-09-22 17:27:01.698324','2025-09-22 17:27:01.698376',0,2,2,18),(7,'Chào bà con','2025-09-22 17:28:28.544182','2025-09-22 17:28:28.544202',0,2,2,18),(8,'Chào bà con','2025-09-22 17:29:18.549039','2025-09-22 17:29:18.549059',0,2,2,18),(9,'Chào bà con','2025-09-22 17:46:22.127521','2025-09-22 17:46:22.127546',0,2,2,18),(10,'Chào bà con','2025-09-22 17:53:42.813050','2025-09-22 17:53:42.813118',0,2,2,18),(11,'Chào bà con','2025-09-22 17:54:52.651332','2025-09-22 17:54:52.651352',0,2,4,18),(12,'Chào bà con','2025-09-22 17:55:27.823528','2025-09-22 17:55:27.823587',0,4,4,18),(13,'Chào bà con','2025-09-22 17:57:07.921161','2025-09-22 17:57:07.921179',0,4,2,18),(18,'Chào lại bà con','2025-09-23 02:34:14.756563','2025-09-23 02:34:14.756587',0,2,2,20),(19,'Chào lại bà con','2025-09-23 02:44:24.451801','2025-09-23 02:44:24.451821',0,2,2,20),(20,'Chào lại bà con','2025-09-23 02:45:11.692239','2025-09-23 02:45:11.692254',0,NULL,2,20),(21,'Hello123','2025-09-23 09:54:36.360516','2025-09-23 09:54:36.360549',0,4,2,15),(22,'hello','2025-09-23 10:05:39.458828','2025-09-23 10:05:39.458861',0,1,2,15),(23,'hello','2025-09-23 10:05:55.058229','2025-09-23 10:05:55.058265',0,NULL,2,15),(24,'alo','2025-09-23 10:07:27.039113','2025-09-23 10:07:27.039128',0,1,2,15),(25,'dd','2025-09-23 10:09:46.781876','2025-09-23 10:09:46.781899',0,20,2,18),(26,'sssaa','2025-09-23 10:23:22.464384','2025-09-23 10:23:22.464411',0,2,2,18),(27,'aaaa','2025-09-23 10:35:21.998713','2025-09-23 10:35:21.998731',0,NULL,2,18),(28,'bbbb','2025-09-23 10:35:35.039432','2025-09-23 10:35:35.039454',0,27,2,18),(29,'cccc','2025-09-23 10:52:42.425571','2025-09-23 10:52:42.425595',0,28,2,18),(30,'ddd','2025-09-23 10:52:51.333111','2025-09-23 10:52:51.333132',0,29,2,18),(31,'aaaa','2025-09-23 10:52:54.343180','2025-09-23 10:52:54.343200',0,NULL,2,18);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 13:20:17
