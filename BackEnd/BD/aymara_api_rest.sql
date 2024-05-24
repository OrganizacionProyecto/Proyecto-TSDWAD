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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Categoria',7,'add_categoria'),(26,'Can change Categoria',7,'change_categoria'),(27,'Can delete Categoria',7,'delete_categoria'),(28,'Can view Categoria',7,'view_categoria'),(29,'Can add Metodo de Pago',8,'add_metodo_pago'),(30,'Can change Metodo de Pago',8,'change_metodo_pago'),(31,'Can delete Metodo de Pago',8,'delete_metodo_pago'),(32,'Can view Metodo de Pago',8,'view_metodo_pago'),(33,'Can add Usuario',9,'add_usuario'),(34,'Can change Usuario',9,'change_usuario'),(35,'Can delete Usuario',9,'delete_usuario'),(36,'Can view Usuario',9,'view_usuario'),(37,'Can add Producto',10,'add_producto'),(38,'Can change Producto',10,'change_producto'),(39,'Can delete Producto',10,'delete_producto'),(40,'Can view Producto',10,'view_producto'),(41,'Can add Pedido',11,'add_pedido'),(42,'Can change Pedido',11,'change_pedido'),(43,'Can delete Pedido',11,'delete_pedido'),(44,'Can view Pedido',11,'view_pedido'),(45,'Can add Carrito',12,'add_carrito'),(46,'Can change Carrito',12,'change_carrito'),(47,'Can delete Carrito',12,'delete_carrito'),(48,'Can view Carrito',12,'view_carrito');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$vkMotLAyyr9oML39aFHgkz$cAIbKsQdXO5K2XxzNfwZxtefAnHTmBob3Dw2D7wUO/Q=','2024-05-13 20:29:13.289384',1,'Joaco','','','joaquincamino09@gmail.com',1,1,'2024-05-13 20:28:38.620839');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
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
  `id_pedido_id` int NOT NULL,
  `id_producto_id` int NOT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `Carrito_id_pedido_id_da4b95d0_fk_Pedido_id_pedido` (`id_pedido_id`),
  KEY `Carrito_id_producto_id_f3585060_fk_Producto_id_producto` (`id_producto_id`),
  CONSTRAINT `Carrito_id_pedido_id_da4b95d0_fk_Pedido_id_pedido` FOREIGN KEY (`id_pedido_id`) REFERENCES `pedido` (`id_pedido`),
  CONSTRAINT `Carrito_id_producto_id_f3585060_fk_Producto_id_producto` FOREIGN KEY (`id_producto_id`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Cereales','Contiene todos los cereales en venta.'),(2,'Organicos','Contiene todos los productos organicos.');
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
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-05-13 20:30:00.403618','1','lienzoasasda',1,'[{\"added\": {}}]',7,1),(2,'2024-05-13 20:30:15.782654','1','pizza',1,'[{\"added\": {}}]',10,1),(3,'2024-05-13 20:30:34.980802','1','Usuario: Joaquin Nicolas Camino Alonso',1,'[{\"added\": {}}]',9,1),(4,'2024-05-13 20:30:48.168765','1','visa',1,'[{\"added\": {}}]',8,1),(5,'2024-05-13 20:40:08.462450','1','Pedido #1 (Fecha: 2024-05-13, Estado: En proceso)',1,'[{\"added\": {}}]',11,1),(6,'2024-05-14 00:42:42.513446','2','Organicos',1,'[{\"added\": {}}]',7,1),(7,'2024-05-14 00:43:03.892064','1','Cereales',2,'[{\"changed\": {\"fields\": [\"Nombre\", \"Descripcion\"]}}]',7,1),(8,'2024-05-14 00:44:31.600071','1','Avena',2,'[{\"changed\": {\"fields\": [\"Nombre\", \"Descripcion\", \"Precio\"]}}]',10,1),(9,'2024-05-14 00:44:56.267015','2','Algas disecadas',1,'[{\"added\": {}}]',10,1),(10,'2024-05-14 00:45:17.635811','1','Usuario: Joaquin Nicolas Camino Alonso',2,'[{\"changed\": {\"fields\": [\"Contrasena\"]}}]',9,1),(11,'2024-05-14 00:46:37.652373','2','Usuario: Damian Nicolas Figueroa',1,'[{\"added\": {}}]',9,1),(12,'2024-05-14 00:47:07.584711','1','Usuario: Joaquin Nicolas Camino Alonso',2,'[{\"changed\": {\"fields\": [\"Direccion\"]}}]',9,1),(13,'2024-05-14 00:47:33.469130','1','Pedido #1 (Fecha: 2024-05-13, Estado: En proceso)',2,'[]',11,1),(14,'2024-05-14 00:48:21.738655','1','Visa Credito',2,'[{\"changed\": {\"fields\": [\"Nombre\"]}}]',8,1),(15,'2024-05-14 00:48:31.287425','2','Naranja X',1,'[{\"added\": {}}]',8,1),(16,'2024-05-14 00:48:40.982632','3','Debito',1,'[{\"added\": {}}]',8,1),(17,'2024-05-14 00:49:26.680050','2','Pedido #2 (Fecha: 2024-05-11, Estado: En proceso)',1,'[{\"added\": {}}]',11,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(12,'AymaraAPP','carrito'),(7,'AymaraAPP','categoria'),(8,'AymaraAPP','metodo_pago'),(11,'AymaraAPP','pedido'),(10,'AymaraAPP','producto'),(9,'AymaraAPP','usuario'),(5,'contenttypes','contenttype'),(6,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'AymaraAPP','0001_initial','2024-05-13 20:26:49.752865'),(2,'AymaraAPP','0002_metodo_pago_usuario_producto_pedido_carrito','2024-05-13 20:26:50.271651'),(3,'contenttypes','0001_initial','2024-05-13 20:26:50.323082'),(4,'auth','0001_initial','2024-05-13 20:26:50.912088'),(5,'admin','0001_initial','2024-05-13 20:26:51.082234'),(6,'admin','0002_logentry_remove_auto_add','2024-05-13 20:26:51.095044'),(7,'admin','0003_logentry_add_action_flag_choices','2024-05-13 20:26:51.108227'),(8,'contenttypes','0002_remove_content_type_name','2024-05-13 20:26:51.216632'),(9,'auth','0002_alter_permission_name_max_length','2024-05-13 20:26:51.287322'),(10,'auth','0003_alter_user_email_max_length','2024-05-13 20:26:51.323954'),(11,'auth','0004_alter_user_username_opts','2024-05-13 20:26:51.334348'),(12,'auth','0005_alter_user_last_login_null','2024-05-13 20:26:51.410045'),(13,'auth','0006_require_contenttypes_0002','2024-05-13 20:26:51.415240'),(14,'auth','0007_alter_validators_add_error_messages','2024-05-13 20:26:51.426231'),(15,'auth','0008_alter_user_username_max_length','2024-05-13 20:26:51.501041'),(16,'auth','0009_alter_user_last_name_max_length','2024-05-13 20:26:51.577219'),(17,'auth','0010_alter_group_name_max_length','2024-05-13 20:26:51.603727'),(18,'auth','0011_update_proxy_permissions','2024-05-13 20:26:51.619512'),(19,'auth','0012_alter_user_first_name_max_length','2024-05-13 20:26:51.696849'),(20,'sessions','0001_initial','2024-05-13 20:26:51.745468'),(21,'AymaraAPP','0003_remove_carrito_id_usuario_pedido_direccion_envio_and_more','2024-05-13 20:38:46.452905');
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
INSERT INTO `django_session` VALUES ('yxx3ixmtfcaz3hzn1cws4wrznwnhuqda','.eJxVjDsOwjAQRO_iGllx8O7alPScwVr_cADZUpxUiLuTSClAmmrem3kLx-tS3NrT7KYoLkKJ02_nOTxT3UF8cL03GVpd5snLXZEH7fLWYnpdD_fvoHAv21pbAMJM45hReTBoLUSvMrChHDWaLTYHRjSok_LxPIAnJgQVbB5IfL6_TDcW:1s6cIL:YlRjIEgk09At29Ov1GZNxi9GNrWlBdSO4CV6SxyI8wU','2024-05-27 20:29:13.295137');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_pago`
--

DROP TABLE IF EXISTS `metodo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_pago` (
  `id_metodo_pago` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_metodo_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_pago`
--

LOCK TABLES `metodo_pago` WRITE;
/*!40000 ALTER TABLE `metodo_pago` DISABLE KEYS */;
INSERT INTO `metodo_pago` VALUES (1,'Visa Credito'),(2,'Naranja X'),(3,'Debito');
/*!40000 ALTER TABLE `metodo_pago` ENABLE KEYS */;
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
  `id_usuario_id` int NOT NULL,
  `direccion_envio` varchar(200) NOT NULL,
  `id_metodo_pago_id` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `Pedido_id_usuario_id_60975b94_fk_Usuario_id_usuario` (`id_usuario_id`),
  KEY `Pedido_id_metodo_pago_id_a24e817c_fk_Metodo_pago_id_metodo_pago` (`id_metodo_pago_id`),
  CONSTRAINT `Pedido_id_metodo_pago_id_a24e817c_fk_Metodo_pago_id_metodo_pago` FOREIGN KEY (`id_metodo_pago_id`) REFERENCES `metodo_pago` (`id_metodo_pago`),
  CONSTRAINT `Pedido_id_usuario_id_60975b94_fk_Usuario_id_usuario` FOREIGN KEY (`id_usuario_id`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2024-05-13','En proceso',1,'Av. Marcelo T. de Alvear 820, X5000KGY Córdoba, Argentina',1,2000.00),(2,'2024-05-11','En proceso',2,'Calle 123',2,27333.99);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Avena','Precio por 100gr.',999.99,2000,'asdadas',1),(2,'Algas disecadas','Precio por 100gr',2000.00,2000,'asdadasda',2);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo_electronico` varchar(200) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `tipo_usuario` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Joaquin Nicolas','Camino Alonso','joaquincamino09@gmail.com','Joaco12345','Calle 123',1),(2,'Damian Nicolas','Figueroa','damiannicolasfigueroa2024@gmail.com','Damian1234','Calle 123',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-13 21:56:44
