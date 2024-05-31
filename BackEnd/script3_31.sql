CREATE DATABASE  IF NOT EXISTS `aymara_api_rest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aymara_api_rest`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: aymara_api_rest
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add Carrito',6,'add_carrito'),(22,'Can change Carrito',6,'change_carrito'),(23,'Can delete Carrito',6,'delete_carrito'),(24,'Can view Carrito',6,'view_carrito'),(25,'Can add Categoria',7,'add_categoria'),(26,'Can change Categoria',7,'change_categoria'),(27,'Can delete Categoria',7,'delete_categoria'),(28,'Can view Categoria',7,'view_categoria'),(29,'Can add datos envio',8,'add_datosenvio'),(30,'Can change datos envio',8,'change_datosenvio'),(31,'Can delete datos envio',8,'delete_datosenvio'),(32,'Can view datos envio',8,'view_datosenvio'),(33,'Can add Metodo de Pago',9,'add_metodopago'),(34,'Can change Metodo de Pago',9,'change_metodopago'),(35,'Can delete Metodo de Pago',9,'delete_metodopago'),(36,'Can view Metodo de Pago',9,'view_metodopago'),(37,'Can add Producto',10,'add_producto'),(38,'Can change Producto',10,'change_producto'),(39,'Can delete Producto',10,'delete_producto'),(40,'Can view Producto',10,'view_producto'),(41,'Can add user',11,'add_customuser'),(42,'Can change user',11,'change_customuser'),(43,'Can delete user',11,'delete_customuser'),(44,'Can view user',11,'view_customuser'),(45,'Can add Stock',12,'add_stock'),(46,'Can change Stock',12,'change_stock'),(47,'Can delete Stock',12,'delete_stock'),(48,'Can view Stock',12,'view_stock'),(49,'Can add Pedido',13,'add_pedido'),(50,'Can change Pedido',13,'change_pedido'),(51,'Can delete Pedido',13,'delete_pedido'),(52,'Can view Pedido',13,'view_pedido'),(53,'Can add agregar producto',14,'add_agregarproducto'),(54,'Can change agregar producto',14,'change_agregarproducto'),(55,'Can delete agregar producto',14,'delete_agregarproducto'),(56,'Can view agregar producto',14,'view_agregarproducto');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aymaraapp_agregarproducto`
--

DROP TABLE IF EXISTS `aymaraapp_agregarproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aymaraapp_agregarproducto` (
  `id_agregar_producto` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `id_producto_id` int NOT NULL,
  PRIMARY KEY (`id_agregar_producto`),
  KEY `AymaraAPP_agregarpro_id_producto_id_5ed58340_fk_Producto_` (`id_producto_id`),
  CONSTRAINT `AymaraAPP_agregarpro_id_producto_id_5ed58340_fk_Producto_` FOREIGN KEY (`id_producto_id`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aymaraapp_agregarproducto`
--

LOCK TABLES `aymaraapp_agregarproducto` WRITE;
/*!40000 ALTER TABLE `aymaraapp_agregarproducto` DISABLE KEYS */;
/*!40000 ALTER TABLE `aymaraapp_agregarproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aymaraapp_customuser`
--

DROP TABLE IF EXISTS `aymaraapp_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aymaraapp_customuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(150) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aymaraapp_customuser`
--

LOCK TABLES `aymaraapp_customuser` WRITE;
/*!40000 ALTER TABLE `aymaraapp_customuser` DISABLE KEYS */;
INSERT INTO `aymaraapp_customuser` VALUES (1,'pbkdf2_sha256$600000$YTWNRooJ8cP1sCDnaSpcEy$bM1njdlvPx3MycIrhDTs1QfllxZZ6iTqB7KgNRF5RoU=','2024-05-28 03:59:57.246153',1,'maria','','',1,1,'2024-05-28 03:57:25.961884','coronelsuaremaria@gamil.com','Desconocido');
/*!40000 ALTER TABLE `aymaraapp_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aymaraapp_customuser_groups`
--

DROP TABLE IF EXISTS `aymaraapp_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aymaraapp_customuser_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AymaraAPP_customuser_groups_customuser_id_group_id_927c49d9_uniq` (`customuser_id`,`group_id`),
  KEY `AymaraAPP_customuser_groups_group_id_d346b1db_fk_auth_group_id` (`group_id`),
  CONSTRAINT `AymaraAPP_customuser_customuser_id_a3d153fd_fk_AymaraAPP` FOREIGN KEY (`customuser_id`) REFERENCES `aymaraapp_customuser` (`id`),
  CONSTRAINT `AymaraAPP_customuser_groups_group_id_d346b1db_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aymaraapp_customuser_groups`
--

LOCK TABLES `aymaraapp_customuser_groups` WRITE;
/*!40000 ALTER TABLE `aymaraapp_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `aymaraapp_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aymaraapp_customuser_user_permissions`
--

DROP TABLE IF EXISTS `aymaraapp_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aymaraapp_customuser_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `AymaraAPP_customuser_use_customuser_id_permission_ad069bc1_uniq` (`customuser_id`,`permission_id`),
  KEY `AymaraAPP_customuser_permission_id_4ee8203f_fk_auth_perm` (`permission_id`),
  CONSTRAINT `AymaraAPP_customuser_customuser_id_e52adf27_fk_AymaraAPP` FOREIGN KEY (`customuser_id`) REFERENCES `aymaraapp_customuser` (`id`),
  CONSTRAINT `AymaraAPP_customuser_permission_id_4ee8203f_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aymaraapp_customuser_user_permissions`
--

LOCK TABLES `aymaraapp_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `aymaraapp_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `aymaraapp_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aymaraapp_datosenvio`
--

DROP TABLE IF EXISTS `aymaraapp_datosenvio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aymaraapp_datosenvio` (
  `id_datos_envio` int NOT NULL AUTO_INCREMENT,
  `empresa` varchar(45) NOT NULL,
  `traking` varchar(45) NOT NULL,
  PRIMARY KEY (`id_datos_envio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aymaraapp_datosenvio`
--

LOCK TABLES `aymaraapp_datosenvio` WRITE;
/*!40000 ALTER TABLE `aymaraapp_datosenvio` DISABLE KEYS */;
/*!40000 ALTER TABLE `aymaraapp_datosenvio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `id_producto_id` int NOT NULL,
  `id_usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `Carrito_id_producto_id_f3585060_fk_Producto_id_producto` (`id_producto_id`),
  KEY `Carrito_id_usuario_id_6d64f2ef_fk_AymaraAPP_customuser_id` (`id_usuario_id`),
  CONSTRAINT `Carrito_id_producto_id_f3585060_fk_Producto_id_producto` FOREIGN KEY (`id_producto_id`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `Carrito_id_usuario_id_6d64f2ef_fk_AymaraAPP_customuser_id` FOREIGN KEY (`id_usuario_id`) REFERENCES `aymaraapp_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_AymaraAPP_customuser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_AymaraAPP_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `aymaraapp_customuser` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(14,'AymaraAPP','agregarproducto'),(6,'AymaraAPP','carrito'),(7,'AymaraAPP','categoria'),(11,'AymaraAPP','customuser'),(8,'AymaraAPP','datosenvio'),(9,'AymaraAPP','metodopago'),(13,'AymaraAPP','pedido'),(10,'AymaraAPP','producto'),(12,'AymaraAPP','stock'),(4,'contenttypes','contenttype'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-05-28 03:55:49.829109'),(2,'contenttypes','0002_remove_content_type_name','2024-05-28 03:55:49.978731'),(3,'auth','0001_initial','2024-05-28 03:55:50.480254'),(4,'auth','0002_alter_permission_name_max_length','2024-05-28 03:55:50.615889'),(5,'auth','0003_alter_user_email_max_length','2024-05-28 03:55:50.629860'),(6,'auth','0004_alter_user_username_opts','2024-05-28 03:55:50.645810'),(7,'auth','0005_alter_user_last_login_null','2024-05-28 03:55:50.659778'),(8,'auth','0006_require_contenttypes_0002','2024-05-28 03:55:50.678723'),(9,'auth','0007_alter_validators_add_error_messages','2024-05-28 03:55:50.698668'),(10,'auth','0008_alter_user_username_max_length','2024-05-28 03:55:50.722605'),(11,'auth','0009_alter_user_last_name_max_length','2024-05-28 03:55:50.739562'),(12,'auth','0010_alter_group_name_max_length','2024-05-28 03:55:50.793417'),(13,'auth','0011_update_proxy_permissions','2024-05-28 03:55:50.822853'),(14,'auth','0012_alter_user_first_name_max_length','2024-05-28 03:55:50.849781'),(15,'AymaraAPP','0001_initial','2024-05-28 03:55:52.559400'),(16,'admin','0001_initial','2024-05-28 03:55:52.762663'),(17,'admin','0002_logentry_remove_auto_add','2024-05-28 03:55:52.781609'),(18,'admin','0003_logentry_add_action_flag_choices','2024-05-28 03:55:52.799560'),(19,'sessions','0001_initial','2024-05-28 03:55:52.915524');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('g2keisgd0yqa19ntgv58a35zhxv972px','.eJxVjMsOwiAQRf-FtSE8hkdduvcbyDCAVA0kpV0Z_12bdKHbe865LxZwW2vYRl7CnNiZSXb63SLSI7cdpDu2W-fU27rMke8KP-jg157y83K4fwcVR_3WVmgrrMmkwXsoMSuvkUjboibhDYrJWCBH1qAyUhXpEhRQGJ0QEnxm7w-9Yjbc:1sBo0D:d2KrC86UkXMRffjb3TkBvkEL9n2HxeuAL7bgzsfVCTQ','2024-06-11 03:59:57.251162');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodopago`
--

DROP TABLE IF EXISTS `metodopago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodopago` (
  `id_metodo_pago` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_metodo_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodopago`
--

LOCK TABLES `metodopago` WRITE;
/*!40000 ALTER TABLE `metodopago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodopago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `fecha_pedido` date NOT NULL,
  `estado` varchar(45) NOT NULL,
  `id_carrito_id` int NOT NULL,
  `id_usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `Pedido_id_carrito_id_74f0dc3a_fk_Carrito_id_carrito` (`id_carrito_id`),
  KEY `Pedido_id_usuario_id_60975b94_fk_AymaraAPP_customuser_id` (`id_usuario_id`),
  CONSTRAINT `Pedido_id_carrito_id_74f0dc3a_fk_Carrito_id_carrito` FOREIGN KEY (`id_carrito_id`) REFERENCES `carrito` (`id_carrito`),
  CONSTRAINT `Pedido_id_usuario_id_60975b94_fk_AymaraAPP_customuser_id` FOREIGN KEY (`id_usuario_id`) REFERENCES `aymaraapp_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `descripcion` longtext NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `disponibilidad` int NOT NULL,
  `imagen` longtext NOT NULL,
  `id_categoria_id` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `Producto_id_categoria_id_25096c94_fk_Categoria_id_categoria` (`id_categoria_id`),
  CONSTRAINT `Producto_id_categoria_id_25096c94_fk_Categoria_id_categoria` FOREIGN KEY (`id_categoria_id`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id_stock` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `id_producto_id` int NOT NULL,
  PRIMARY KEY (`id_stock`),
  KEY `Stock_id_producto_id_66eb9732_fk_Producto_id_producto` (`id_producto_id`),
  CONSTRAINT `Stock_id_producto_id_66eb9732_fk_Producto_id_producto` FOREIGN KEY (`id_producto_id`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'aymara_api_rest'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-31 10:39:28
