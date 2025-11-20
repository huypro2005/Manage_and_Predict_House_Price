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
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add custom user',6,'add_customuser'),(22,'Can change custom user',6,'change_customuser'),(23,'Can delete custom user',6,'delete_customuser'),(24,'Can view custom user',6,'view_customuser'),(25,'Can add contact request',7,'add_contactrequest'),(26,'Can change contact request',7,'change_contactrequest'),(27,'Can delete contact request',7,'delete_contactrequest'),(28,'Can view contact request',7,'view_contactrequest'),(29,'Can add property type',8,'add_propertytype'),(30,'Can change property type',8,'change_propertytype'),(31,'Can delete property type',8,'delete_propertytype'),(32,'Can view property type',8,'view_propertytype'),(33,'Can add province',9,'add_province'),(34,'Can change province',9,'change_province'),(35,'Can delete province',9,'delete_province'),(36,'Can view province',9,'view_province'),(37,'Can add district',10,'add_district'),(38,'Can change district',10,'change_district'),(39,'Can delete district',10,'delete_district'),(40,'Can view district',10,'view_district'),(41,'Can add property',11,'add_property'),(42,'Can change property',11,'change_property'),(43,'Can delete property',11,'delete_property'),(44,'Can view property',11,'view_property'),(45,'Can add property image',12,'add_propertyimage'),(46,'Can change property image',12,'change_propertyimage'),(47,'Can delete property image',12,'delete_propertyimage'),(48,'Can view property image',12,'view_propertyimage'),(49,'Can add Token',13,'add_token'),(50,'Can change Token',13,'change_token'),(51,'Can delete Token',13,'delete_token'),(52,'Can view Token',13,'view_token'),(53,'Can add Token',14,'add_tokenproxy'),(54,'Can change Token',14,'change_tokenproxy'),(55,'Can delete Token',14,'delete_tokenproxy'),(56,'Can view Token',14,'view_tokenproxy'),(57,'Can add predict request',15,'add_predictrequest'),(58,'Can change predict request',15,'change_predictrequest'),(59,'Can delete predict request',15,'delete_predictrequest'),(60,'Can view predict request',15,'view_predictrequest'),(61,'Can add dashboard',16,'add_dashboard'),(62,'Can change dashboard',16,'change_dashboard'),(63,'Can delete dashboard',16,'delete_dashboard'),(64,'Can view dashboard',16,'view_dashboard'),(65,'Can add application',17,'add_application'),(66,'Can change application',17,'change_application'),(67,'Can delete application',17,'delete_application'),(68,'Can view application',17,'view_application'),(69,'Can add access token',18,'add_accesstoken'),(70,'Can change access token',18,'change_accesstoken'),(71,'Can delete access token',18,'delete_accesstoken'),(72,'Can view access token',18,'view_accesstoken'),(73,'Can add grant',19,'add_grant'),(74,'Can change grant',19,'change_grant'),(75,'Can delete grant',19,'delete_grant'),(76,'Can view grant',19,'view_grant'),(77,'Can add refresh token',20,'add_refreshtoken'),(78,'Can change refresh token',20,'change_refreshtoken'),(79,'Can delete refresh token',20,'delete_refreshtoken'),(80,'Can view refresh token',20,'view_refreshtoken'),(81,'Can add id token',21,'add_idtoken'),(82,'Can change id token',21,'change_idtoken'),(83,'Can delete id token',21,'delete_idtoken'),(84,'Can view id token',21,'view_idtoken'),(85,'Can add site',22,'add_site'),(86,'Can change site',22,'change_site'),(87,'Can delete site',22,'delete_site'),(88,'Can view site',22,'view_site'),(89,'Can add email address',23,'add_emailaddress'),(90,'Can change email address',23,'change_emailaddress'),(91,'Can delete email address',23,'delete_emailaddress'),(92,'Can view email address',23,'view_emailaddress'),(93,'Can add email confirmation',24,'add_emailconfirmation'),(94,'Can change email confirmation',24,'change_emailconfirmation'),(95,'Can delete email confirmation',24,'delete_emailconfirmation'),(96,'Can view email confirmation',24,'view_emailconfirmation'),(97,'Can add social account',25,'add_socialaccount'),(98,'Can change social account',25,'change_socialaccount'),(99,'Can delete social account',25,'delete_socialaccount'),(100,'Can view social account',25,'view_socialaccount'),(101,'Can add social application',26,'add_socialapp'),(102,'Can change social application',26,'change_socialapp'),(103,'Can delete social application',26,'delete_socialapp'),(104,'Can view social application',26,'view_socialapp'),(105,'Can add social application token',27,'add_socialtoken'),(106,'Can change social application token',27,'change_socialtoken'),(107,'Can delete social application token',27,'delete_socialtoken'),(108,'Can view social application token',27,'view_socialtoken'),(109,'Can add favourite property',28,'add_favouriteproperty'),(110,'Can change favourite property',28,'change_favouriteproperty'),(111,'Can delete favourite property',28,'delete_favouriteproperty'),(112,'Can view favourite property',28,'view_favouriteproperty'),(113,'Can add news article',29,'add_newsarticle'),(114,'Can change news article',29,'change_newsarticle'),(115,'Can delete news article',29,'delete_newsarticle'),(116,'Can view news article',29,'view_newsarticle'),(117,'Can add source',30,'add_source'),(118,'Can change source',30,'change_source'),(119,'Can delete source',30,'delete_source'),(120,'Can view source',30,'view_source'),(121,'Can add comment',31,'add_comment'),(122,'Can change comment',31,'change_comment'),(123,'Can delete comment',31,'delete_comment'),(124,'Can view comment',31,'view_comment'),(125,'Access admin page',32,'view'),(126,'Can add notification',33,'add_notification'),(127,'Can change notification',33,'change_notification'),(128,'Can delete notification',33,'delete_notification'),(129,'Can view notification',33,'view_notification'),(130,'Can add range',34,'add_range'),(131,'Can change range',34,'change_range'),(132,'Can delete range',34,'delete_range'),(133,'Can view range',34,'view_range'),(134,'Can add comment',35,'add_comment'),(135,'Can change comment',35,'change_comment'),(136,'Can delete comment',35,'delete_comment'),(137,'Can view comment',35,'view_comment'),(138,'Can add message',36,'add_message'),(139,'Can change message',36,'change_message'),(140,'Can delete message',36,'delete_message'),(141,'Can view message',36,'view_message'),(142,'Can add conversation participants',37,'add_conversationparticipants'),(143,'Can change conversation participants',37,'change_conversationparticipants'),(144,'Can delete conversation participants',37,'delete_conversationparticipants'),(145,'Can view conversation participants',37,'view_conversationparticipants'),(146,'Can add conversation',38,'add_conversation'),(147,'Can change conversation',38,'change_conversation'),(148,'Can delete conversation',38,'delete_conversation'),(149,'Can view conversation',38,'view_conversation'),(150,'Can add attribute',39,'add_attribute'),(151,'Can change attribute',39,'change_attribute'),(152,'Can delete attribute',39,'delete_attribute'),(153,'Can view attribute',39,'view_attribute'),(154,'Can add property type_ attribute',40,'add_propertytype_attribute'),(155,'Can change property type_ attribute',40,'change_propertytype_attribute'),(156,'Can delete property type_ attribute',40,'delete_propertytype_attribute'),(157,'Can view property type_ attribute',40,'view_propertytype_attribute'),(158,'Can add property attribute value',41,'add_propertyattributevalue'),(159,'Can change property attribute value',41,'change_propertyattributevalue'),(160,'Can delete property attribute value',41,'delete_propertyattributevalue'),(161,'Can view property attribute value',41,'view_propertyattributevalue');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 14:45:48
