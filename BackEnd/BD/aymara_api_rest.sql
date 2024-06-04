-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: aymara_api_rest
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `agregarproducto`
--

DROP TABLE IF EXISTS `agregarproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agregarproducto` (
  `id_agregar_producto` int NOT NULL AUTO_INCREMENT,
  `cantidad` int unsigned NOT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `carrito_id` int NOT NULL,
  `id_producto_id` int NOT NULL,
  PRIMARY KEY (`id_agregar_producto`),
  KEY `AgregarProducto_carrito_id_73ac8ad8_fk_Carrito_id_carrito` (`carrito_id`),
  KEY `AgregarProducto_id_producto_id_0656d33d_fk_Producto_id_producto` (`id_producto_id`),
  CONSTRAINT `AgregarProducto_carrito_id_73ac8ad8_fk_Carrito_id_carrito` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`id_carrito`),
  CONSTRAINT `AgregarProducto_id_producto_id_0656d33d_fk_Producto_id_producto` FOREIGN KEY (`id_producto_id`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `agregarproducto_chk_1` CHECK ((`cantidad` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agregarproducto`
--

LOCK TABLES `agregarproducto` WRITE;
/*!40000 ALTER TABLE `agregarproducto` DISABLE KEYS */;
/*!40000 ALTER TABLE `agregarproducto` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add Token',6,'add_token'),(22,'Can change Token',6,'change_token'),(23,'Can delete Token',6,'delete_token'),(24,'Can view Token',6,'view_token'),(25,'Can add Token',7,'add_tokenproxy'),(26,'Can change Token',7,'change_tokenproxy'),(27,'Can delete Token',7,'delete_tokenproxy'),(28,'Can view Token',7,'view_tokenproxy'),(29,'Can add Carrito',8,'add_carrito'),(30,'Can change Carrito',8,'change_carrito'),(31,'Can delete Carrito',8,'delete_carrito'),(32,'Can view Carrito',8,'view_carrito'),(33,'Can add Categoria',9,'add_categoria'),(34,'Can change Categoria',9,'change_categoria'),(35,'Can delete Categoria',9,'delete_categoria'),(36,'Can view Categoria',9,'view_categoria'),(37,'Can add Dato de envio',10,'add_datosenvio'),(38,'Can change Dato de envio',10,'change_datosenvio'),(39,'Can delete Dato de envio',10,'delete_datosenvio'),(40,'Can view Dato de envio',10,'view_datosenvio'),(41,'Can add Metodo de Pago',11,'add_metodopago'),(42,'Can change Metodo de Pago',11,'change_metodopago'),(43,'Can delete Metodo de Pago',11,'delete_metodopago'),(44,'Can view Metodo de Pago',11,'view_metodopago'),(45,'Can add Producto',12,'add_producto'),(46,'Can change Producto',12,'change_producto'),(47,'Can delete Producto',12,'delete_producto'),(48,'Can view Producto',12,'view_producto'),(49,'Can add user',13,'add_customuser'),(50,'Can change user',13,'change_customuser'),(51,'Can delete user',13,'delete_customuser'),(52,'Can view user',13,'view_customuser'),(53,'Can add Stock',14,'add_stock'),(54,'Can change Stock',14,'change_stock'),(55,'Can delete Stock',14,'delete_stock'),(56,'Can view Stock',14,'view_stock'),(57,'Can add Pedido',15,'add_pedido'),(58,'Can change Pedido',15,'change_pedido'),(59,'Can delete Pedido',15,'delete_pedido'),(60,'Can view Pedido',15,'view_pedido'),(61,'Can add Agregar Producto',16,'add_agregarproducto'),(62,'Can change Agregar Producto',16,'change_agregarproducto'),(63,'Can delete Agregar Producto',16,'delete_agregarproducto'),(64,'Can view Agregar Producto',16,'view_agregarproducto');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_AymaraAPP_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `aymaraapp_customuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aymaraapp_customuser`
--

LOCK TABLES `aymaraapp_customuser` WRITE;
/*!40000 ALTER TABLE `aymaraapp_customuser` DISABLE KEYS */;
INSERT INTO `aymaraapp_customuser` VALUES (1,'pbkdf2_sha256$600000$c0qrpYN8vZSsNETrAs96Ss$dY+Pb50S0hYOXuZ9UD+UC4yBkmrmZQqZbf36Wxdmos8=','2024-06-03 16:13:34.887052',1,'admin','admin','admin',1,1,'2024-06-03 16:12:51.719833','admin@gmail.com','Desconocido'),(2,'pbkdf2_sha256$600000$soga6Nilo87vegwm5nglHO$9WzNDfFMTl3GAKzP9US5yZdQu+yOUfPDvludSk/aNbw=',NULL,0,'joaquin','Joaquin Nicolas','Camino Alonso',0,1,'2024-06-03 16:16:49.000000','joaquin@gmail.com','Desconocido');
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
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `direccion_envio` varchar(200) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `id_datos_envio_id` int NOT NULL,
  `id_metodo_pago_id` int NOT NULL,
  `id_usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `Carrito_id_datos_envio_id_3d7aa869_fk_DatosEnvio_id_datos_envio` (`id_datos_envio_id`),
  KEY `Carrito_id_metodo_pago_id_af31339d_fk_MetodoPago_id_metodo_pago` (`id_metodo_pago_id`),
  KEY `Carrito_id_usuario_id_6d64f2ef_fk_AymaraAPP_customuser_id` (`id_usuario_id`),
  CONSTRAINT `Carrito_id_datos_envio_id_3d7aa869_fk_DatosEnvio_id_datos_envio` FOREIGN KEY (`id_datos_envio_id`) REFERENCES `datosenvio` (`id_datos_envio`),
  CONSTRAINT `Carrito_id_metodo_pago_id_af31339d_fk_MetodoPago_id_metodo_pago` FOREIGN KEY (`id_metodo_pago_id`) REFERENCES `metodopago` (`id_metodo_pago`),
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Suplemento Dietario','Los suplementos dietarios son productos diseñados para complementar la dieta y proporcionar nutrientes que pueden no estar presentes en cantidades suficientes en los alimentos cotidianos. Estos suplementos pueden incluir vitaminas, minerales, aminoácidos, enzimas, hierbas y otros ingredientes naturales. Su objetivo es mejorar la salud general, potenciar el rendimiento físico y mental, y prevenir deficiencias nutricionales.');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datosenvio`
--

DROP TABLE IF EXISTS `datosenvio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datosenvio` (
  `id_datos_envio` int NOT NULL AUTO_INCREMENT,
  `empresa` varchar(45) NOT NULL,
  `traking` varchar(45) NOT NULL,
  PRIMARY KEY (`id_datos_envio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datosenvio`
--

LOCK TABLES `datosenvio` WRITE;
/*!40000 ALTER TABLE `datosenvio` DISABLE KEYS */;
INSERT INTO `datosenvio` VALUES (1,'Correo Argentino','12345asd'),(2,'Oca','12345asd'),(3,'Retiro en Local','----');
/*!40000 ALTER TABLE `datosenvio` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-06-03 16:14:35.627268','1','Suplemento Dietario',1,'[{\"added\": {}}]',9,1),(2,'2024-06-03 16:14:54.672163','1','Correo Argentino - 12345asd',1,'[{\"added\": {}}]',10,1),(3,'2024-06-03 16:15:07.287830','2','Oca - 12345asd',1,'[{\"added\": {}}]',10,1),(4,'2024-06-03 16:15:18.203344','3','Retiro en Local - ----',1,'[{\"added\": {}}]',10,1),(5,'2024-06-03 16:15:33.940676','1','Tarjeta Debito',1,'[{\"added\": {}}]',11,1),(6,'2024-06-03 16:15:40.009848','2','Tarjeta Credito',1,'[{\"added\": {}}]',11,1),(7,'2024-06-03 16:15:45.287762','3','Mercado Pago',1,'[{\"added\": {}}]',11,1),(8,'2024-06-03 16:16:50.256882','2','',1,'[{\"added\": {}}]',13,1),(9,'2024-06-03 16:17:06.042383','2','joaquin@gmail.com',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email\"]}}]',13,1),(10,'2024-06-03 16:19:14.645839','1','Aceite de Coco Orgánico',1,'[{\"added\": {}}]',12,1),(11,'2024-06-03 16:21:07.155132','2','Café Verde Plus',1,'[{\"added\": {}}]',12,1),(12,'2024-06-03 16:24:04.706397','3','Garcimax Slim',1,'[{\"added\": {}}]',12,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(6,'authtoken','token'),(7,'authtoken','tokenproxy'),(16,'AymaraAPP','agregarproducto'),(8,'AymaraAPP','carrito'),(9,'AymaraAPP','categoria'),(13,'AymaraAPP','customuser'),(10,'AymaraAPP','datosenvio'),(11,'AymaraAPP','metodopago'),(15,'AymaraAPP','pedido'),(12,'AymaraAPP','producto'),(14,'AymaraAPP','stock'),(4,'contenttypes','contenttype'),(5,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-06-03 16:12:20.164183'),(2,'contenttypes','0002_remove_content_type_name','2024-06-03 16:12:20.255041'),(3,'auth','0001_initial','2024-06-03 16:12:20.605048'),(4,'auth','0002_alter_permission_name_max_length','2024-06-03 16:12:20.661286'),(5,'auth','0003_alter_user_email_max_length','2024-06-03 16:12:20.669537'),(6,'auth','0004_alter_user_username_opts','2024-06-03 16:12:20.677532'),(7,'auth','0005_alter_user_last_login_null','2024-06-03 16:12:20.687519'),(8,'auth','0006_require_contenttypes_0002','2024-06-03 16:12:20.691516'),(9,'auth','0007_alter_validators_add_error_messages','2024-06-03 16:12:20.701962'),(10,'auth','0008_alter_user_username_max_length','2024-06-03 16:12:20.710955'),(11,'auth','0009_alter_user_last_name_max_length','2024-06-03 16:12:20.718864'),(12,'auth','0010_alter_group_name_max_length','2024-06-03 16:12:20.745969'),(13,'auth','0011_update_proxy_permissions','2024-06-03 16:12:20.758627'),(14,'auth','0012_alter_user_first_name_max_length','2024-06-03 16:12:20.767628'),(15,'AymaraAPP','0001_initial','2024-06-03 16:12:21.799123'),(16,'admin','0001_initial','2024-06-03 16:12:21.955215'),(17,'admin','0002_logentry_remove_auto_add','2024-06-03 16:12:21.969389'),(18,'admin','0003_logentry_add_action_flag_choices','2024-06-03 16:12:21.983243'),(19,'authtoken','0001_initial','2024-06-03 16:12:22.084347'),(20,'authtoken','0002_auto_20160226_1747','2024-06-03 16:12:22.115305'),(21,'authtoken','0003_tokenproxy','2024-06-03 16:12:22.120779'),(22,'authtoken','0004_alter_tokenproxy_options','2024-06-03 16:12:22.130781'),(23,'sessions','0001_initial','2024-06-03 16:12:22.180185');
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
INSERT INTO `django_session` VALUES ('fg07nzdzhwq5y3oa2rm3dapcnbc7pma7','.eJxVjDsOwjAQRO_iGlkGyxubkp4zWPsDB5AtxUmFuDuJlAKaKea9mbfJuMwlL12nPIo5m6M5_HaE_NS6AXlgvTfLrc7TSHZT7E67vTbR12V3_w4K9rKulSQGH8knQFHgJCC6JnlOTpKE6JmHQDEA4UkVHIpDdTcZgCOg-XwBGhE5ZQ:1sEAJS:Vxtdc5C1JfUNGJffx0ciYPwvH33hoVzpCjmSUHQ--0g','2024-06-17 16:13:34.892400');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodopago`
--

LOCK TABLES `metodopago` WRITE;
/*!40000 ALTER TABLE `metodopago` DISABLE KEYS */;
INSERT INTO `metodopago` VALUES (1,'Tarjeta Debito'),(2,'Tarjeta Credito'),(3,'Mercado Pago');
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
  `id_carrito_id` int DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  UNIQUE KEY `id_carrito_id` (`id_carrito_id`),
  CONSTRAINT `Pedido_id_carrito_id_74f0dc3a_fk_Carrito_id_carrito` FOREIGN KEY (`id_carrito_id`) REFERENCES `carrito` (`id_carrito`)
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
  `disponibilidad` int unsigned NOT NULL,
  `imagen` longtext NOT NULL,
  `id_categoria_id` int NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `Producto_id_categoria_id_25096c94_fk_Categoria_id_categoria` (`id_categoria_id`),
  CONSTRAINT `Producto_id_categoria_id_25096c94_fk_Categoria_id_categoria` FOREIGN KEY (`id_categoria_id`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `producto_chk_1` CHECK ((`disponibilidad` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Aceite de Coco Orgánico','Suplemento dietario a base de aceite de coco. 100% natural. Fortificado con vitamina A, E y D. Sabor original. Presentación 380 cc',10300.00,50,'./assets/img/aceite_coco.jpeg',1),(2,'Café Verde Plus','Suplemento dietario a base de café verde, vitamina B6, L-carnitina, té verde y garcinia cambogia.Ingesta diario recomendada 2 a 4 comprimidos por día. Presentación 60 comprimidos',6100.00,32,'./assets/img/cafe_verde.jpeg',1),(3,'Garcimax Slim','Suplemento dietario natural de hierbas (garcinia cambogia, fucus vesiculoso, té verde y café verde) y vitamina B1. Ingesta diaria recomendada 2 comprimidos diarios con abundante agua media hora antes de cada comida principal. Presentación 60 comprimidos.',12500.00,12,'./assets/img/garcimax.jpeg',1);
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
  `cantidad` int unsigned NOT NULL,
  `id_producto_id` int NOT NULL,
  PRIMARY KEY (`id_stock`),
  KEY `Stock_id_producto_id_66eb9732_fk_Producto_id_producto` (`id_producto_id`),
  CONSTRAINT `Stock_id_producto_id_66eb9732_fk_Producto_id_producto` FOREIGN KEY (`id_producto_id`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `stock_chk_1` CHECK ((`cantidad` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-03 13:30:06
