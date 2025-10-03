-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: realestate.clieg46wkhrm.ap-southeast-1.rds.amazonaws.com    Database: batdongsan
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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-08-09 18:10:21.226801'),(2,'contenttypes','0002_remove_content_type_name','2025-08-09 18:10:21.285144'),(3,'auth','0001_initial','2025-08-09 18:10:21.447789'),(4,'auth','0002_alter_permission_name_max_length','2025-08-09 18:10:21.490359'),(5,'auth','0003_alter_user_email_max_length','2025-08-09 18:10:21.494745'),(6,'auth','0004_alter_user_username_opts','2025-08-09 18:10:21.499181'),(7,'auth','0005_alter_user_last_login_null','2025-08-09 18:10:21.504635'),(8,'auth','0006_require_contenttypes_0002','2025-08-09 18:10:21.506474'),(9,'auth','0007_alter_validators_add_error_messages','2025-08-09 18:10:21.510327'),(10,'auth','0008_alter_user_username_max_length','2025-08-09 18:10:21.514293'),(11,'auth','0009_alter_user_last_name_max_length','2025-08-09 18:10:21.519080'),(12,'auth','0010_alter_group_name_max_length','2025-08-09 18:10:21.529349'),(13,'auth','0011_update_proxy_permissions','2025-08-09 18:10:21.534248'),(14,'auth','0012_alter_user_first_name_max_length','2025-08-09 18:10:21.537852'),(15,'accounts','0001_initial','2025-08-09 18:10:21.732623'),(16,'accounts','0002_alter_customuser_options_alter_customuser_table','2025-08-09 18:10:21.777869'),(17,'admin','0001_initial','2025-08-09 18:10:21.902156'),(18,'admin','0002_logentry_remove_auto_add','2025-08-09 18:10:21.910194'),(19,'admin','0003_logentry_add_action_flag_choices','2025-08-09 18:10:21.915049'),(20,'defaults','0001_initial','2025-08-09 18:10:22.043772'),(21,'properties','0001_initial','2025-08-09 18:10:22.264761'),(22,'contacts','0001_initial','2025-08-09 18:10:22.374392'),(23,'contacts','0002_alter_contactrequest_table','2025-08-09 18:10:22.398782'),(24,'defaults','0002_alter_district_table_alter_propertytype_table_and_more','2025-08-09 18:10:22.452234'),(25,'properties','0002_alter_property_table_alter_propertyimage_table','2025-08-09 18:10:22.493593'),(26,'sessions','0001_initial','2025-08-09 18:10:22.517086'),(27,'authtoken','0001_initial','2025-08-10 04:13:41.184084'),(28,'authtoken','0002_auto_20160226_1747','2025-08-10 04:13:41.211228'),(29,'authtoken','0003_tokenproxy','2025-08-10 04:13:41.215102'),(30,'authtoken','0004_alter_tokenproxy_options','2025-08-10 04:13:41.221519'),(31,'properties','0003_property_thumbnail','2025-08-10 04:13:41.304876'),(32,'accounts','0003_alter_customuser_birth_date','2025-08-10 04:15:17.877365'),(33,'accounts','0004_alter_customuser_avatar','2025-08-10 15:17:35.005052'),(34,'defaults','0003_district_deleted_at_propertytype_deleted_at_and_more','2025-08-10 15:17:35.099596'),(35,'properties','0004_property_deleted_at_alter_property_coord_x_and_more','2025-08-10 15:17:35.302391'),(36,'properties','0005_alter_property_coord_x_alter_property_coord_y','2025-08-10 15:18:24.457377'),(37,'properties','0006_alter_property_bedrooms_alter_property_floors_and_more','2025-08-10 17:35:26.198599'),(38,'properties','0007_alter_property_coord_x_alter_property_coord_y','2025-08-10 17:37:21.339132'),(39,'predicts','0001_initial','2025-08-11 01:58:37.995896'),(40,'accounts','0005_alter_customuser_phone','2025-08-11 02:30:39.465719'),(41,'properties','0008_property_views','2025-08-13 10:25:55.910776'),(42,'properties','0009_rename_decription_property_description','2025-08-13 10:44:02.059605'),(43,'oauth2_provider','0001_initial','2025-08-14 16:26:42.200490'),(44,'oauth2_provider','0002_auto_20190406_1805','2025-08-14 16:26:42.301529'),(45,'oauth2_provider','0003_auto_20201211_1314','2025-08-14 16:26:42.357209'),(46,'oauth2_provider','0004_auto_20200902_2022','2025-08-14 16:26:42.689527'),(47,'oauth2_provider','0005_auto_20211222_2352','2025-08-14 16:26:42.743614'),(48,'oauth2_provider','0006_alter_application_client_secret','2025-08-14 16:26:42.769818'),(49,'oauth2_provider','0007_application_post_logout_redirect_uris','2025-08-14 16:26:42.839617'),(50,'oauth2_provider','0008_alter_accesstoken_token','2025-08-14 16:26:42.851865'),(51,'oauth2_provider','0009_add_hash_client_secret','2025-08-14 16:26:42.919278'),(52,'oauth2_provider','0010_application_allowed_origins','2025-08-14 16:26:42.975479'),(53,'oauth2_provider','0011_refreshtoken_token_family','2025-08-14 16:26:43.025819'),(54,'oauth2_provider','0012_add_token_checksum','2025-08-14 16:26:43.240252'),(55,'account','0001_initial','2025-08-15 10:55:49.465074'),(56,'account','0002_email_max_length','2025-08-15 10:55:49.487758'),(57,'account','0003_alter_emailaddress_create_unique_verified_email','2025-08-15 10:55:49.529379'),(58,'account','0004_alter_emailaddress_drop_unique_email','2025-08-15 10:55:49.561018'),(59,'account','0005_emailaddress_idx_upper_email','2025-08-15 10:55:49.586623'),(60,'account','0006_emailaddress_lower','2025-08-15 10:55:49.603829'),(61,'account','0007_emailaddress_idx_email','2025-08-15 10:55:49.648352'),(62,'account','0008_emailaddress_unique_primary_email_fixup','2025-08-15 10:55:49.666214'),(63,'account','0009_emailaddress_unique_primary_email','2025-08-15 10:55:49.678068'),(64,'sites','0001_initial','2025-08-15 10:55:49.691902'),(65,'sites','0002_alter_domain_unique','2025-08-15 10:55:49.705327'),(66,'socialaccount','0001_initial','2025-08-15 10:55:50.046089'),(67,'socialaccount','0002_token_max_lengths','2025-08-15 10:55:50.087691'),(68,'socialaccount','0003_extra_data_default_dict','2025-08-15 10:55:50.099348'),(69,'socialaccount','0004_app_provider_id_settings','2025-08-15 10:55:50.209028'),(70,'socialaccount','0005_socialtoken_nullable_app','2025-08-15 10:55:50.311539'),(71,'socialaccount','0006_alter_socialaccount_extra_data','2025-08-15 10:55:50.361062'),(72,'accounts','0006_alter_customuser_avatar','2025-08-19 10:57:59.723110'),(73,'contacts','0003_alter_contactrequest_message','2025-08-19 10:57:59.833989'),(74,'properties','0010_property_status_sell','2025-08-19 17:29:21.887387'),(75,'properties','0011_rename_status_sell_property_tab','2025-08-20 07:56:09.219793'),(76,'properties','0012_alter_property_user','2025-08-20 16:53:04.788632'),(77,'love_cart','0001_initial','2025-08-22 07:34:17.581868'),(78,'love_cart','0002_alter_favouriteproperty_user','2025-08-22 08:36:37.512730'),(79,'news','0001_initial','2025-08-24 21:49:57.016484'),(80,'news','0002_newsarticle_is_checked','2025-08-24 22:15:56.228408'),(81,'accounts','0007_customuser_status','2025-08-27 17:22:07.018754'),(82,'contacts','0004_remove_contactrequest_updated_at','2025-08-28 01:06:45.635246'),(83,'news','0003_comment_is_deleted_newsarticle_is_deleted','2025-08-29 14:48:35.453636'),(84,'django_rq','0001_initial','2025-09-04 09:18:50.704631'),(85,'accounts','0008_customuser_description','2025-09-04 18:06:46.838900'),(86,'notifications','0001_initial','2025-09-04 18:06:46.864723'),(87,'notifications','0002_remove_notification_image_notification_updated_at_and_more','2025-09-06 08:01:31.083955'),(88,'notifications','0003_remove_notification_updated_at_and_more','2025-09-06 08:24:57.560420'),(89,'notifications','0004_range','2025-09-06 09:27:26.700011'),(90,'notifications','0005_notification_image_representation','2025-09-06 09:35:29.312361'),(91,'news','0004_newsarticle_province','2025-09-16 17:30:46.000063'),(92,'news','0005_newsarticle_thumbnail','2025-09-16 17:43:13.468463'),(93,'news','0006_newsarticle_introduction','2025-09-16 18:10:29.792624'),(94,'news','0007_newsarticle_views','2025-09-17 01:12:40.698929'),(95,'news','0008_delete_comment','2025-09-22 16:39:34.882226'),(96,'comments','0001_initial','2025-09-22 16:39:35.145831'),(97,'defaults','0004_propertytype_tab','2025-09-23 05:39:34.188124');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
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

-- Dump completed on 2025-10-03 15:15:39
