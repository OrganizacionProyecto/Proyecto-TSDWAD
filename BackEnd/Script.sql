BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Categoria" (
	"id_categoria"	integer NOT NULL,
	"nombre"	varchar(100) NOT NULL,
	"descripcion"	text NOT NULL,
	PRIMARY KEY("id_categoria" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Favorito" (
	"id"	integer NOT NULL,
	"fecha_agregado"	datetime NOT NULL,
	"usuario_id"	bigint NOT NULL,
	"producto_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("producto_id") REFERENCES "products_producto"("id_producto") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("usuario_id") REFERENCES "users_customuser"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id"	integer NOT NULL,
	"name"	varchar(150) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id"	integer NOT NULL,
	"content_type_id"	integer NOT NULL,
	"codename"	varchar(100) NOT NULL,
	"name"	varchar(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "cart_app_carrito" (
	"id"	integer NOT NULL,
	"usuario_id"	bigint NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("usuario_id") REFERENCES "users_customuser"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "cart_app_itemcarrito" (
	"id"	integer NOT NULL,
	"cantidad"	integer unsigned NOT NULL CHECK("cantidad" >= 0),
	"carrito_id"	bigint NOT NULL,
	"producto_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("carrito_id") REFERENCES "cart_app_carrito"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("producto_id") REFERENCES "products_producto"("id_producto") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "cart_app_itempedido" (
	"id"	integer NOT NULL,
	"cantidad"	integer unsigned NOT NULL CHECK("cantidad" >= 0),
	"pedido_id"	bigint NOT NULL,
	"producto_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("pedido_id") REFERENCES "cart_app_pedido"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("producto_id") REFERENCES "products_producto"("id_producto") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "cart_app_pedido" (
	"id"	integer NOT NULL,
	"direccion_entrega"	varchar(255) NOT NULL,
	"telefono"	varchar(20) NOT NULL,
	"metodo_pago"	varchar(10) NOT NULL,
	"total"	decimal NOT NULL,
	"fecha_creacion"	datetime NOT NULL,
	"numero_tarjeta"	varchar(16),
	"fecha_expiracion"	varchar(5),
	"codigo_seguridad"	varchar(3),
	"usuario_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("usuario_id") REFERENCES "users_customuser"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "cart_carrito" (
	"id"	integer NOT NULL,
	"usuario_id"	bigint NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("usuario_id") REFERENCES "users_customuser"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "cart_itemcarrito" (
	"id"	integer NOT NULL,
	"cantidad"	integer unsigned NOT NULL CHECK("cantidad" >= 0),
	"carrito_id"	bigint NOT NULL,
	"producto_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("carrito_id") REFERENCES "cart_carrito"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("producto_id") REFERENCES "products_producto"("id_producto") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "cart_itempedido" (
	"id"	integer NOT NULL,
	"cantidad"	integer unsigned NOT NULL CHECK("cantidad" >= 0),
	"producto_id"	integer NOT NULL,
	"pedido_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("pedido_id") REFERENCES "cart_pedido"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("producto_id") REFERENCES "products_producto"("id_producto") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "cart_pedido" (
	"id"	integer NOT NULL,
	"direccion_entrega"	varchar(255) NOT NULL,
	"telefono"	varchar(20) NOT NULL,
	"metodo_pago"	varchar(10) NOT NULL,
	"total"	decimal NOT NULL,
	"fecha_creacion"	datetime NOT NULL,
	"numero_tarjeta"	varchar(16),
	"fecha_expiracion"	varchar(5),
	"codigo_seguridad"	varchar(3),
	"usuario_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("usuario_id") REFERENCES "users_customuser"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id"	integer NOT NULL,
	"object_id"	text,
	"object_repr"	varchar(200) NOT NULL,
	"action_flag"	smallint unsigned NOT NULL CHECK("action_flag" >= 0),
	"change_message"	text NOT NULL,
	"content_type_id"	integer,
	"user_id"	bigint NOT NULL,
	"action_time"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "users_customuser"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id"	integer NOT NULL,
	"app_label"	varchar(100) NOT NULL,
	"model"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id"	integer NOT NULL,
	"app"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"applied"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key"	varchar(40) NOT NULL,
	"session_data"	text NOT NULL,
	"expire_date"	datetime NOT NULL,
	PRIMARY KEY("session_key")
);
CREATE TABLE IF NOT EXISTS "products_producto" (
	"id_producto"	integer NOT NULL,
	"nombre"	varchar(200) NOT NULL,
	"descripcion"	text NOT NULL,
	"precio"	decimal NOT NULL,
	"stock"	integer unsigned NOT NULL CHECK("stock" >= 0),
	"imagen"	varchar(100),
	"id_categoria_id"	integer NOT NULL,
	PRIMARY KEY("id_producto" AUTOINCREMENT),
	FOREIGN KEY("id_categoria_id") REFERENCES "Categoria"("id_categoria") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "users_customuser" (
	"id"	integer NOT NULL,
	"password"	varchar(128) NOT NULL,
	"last_login"	datetime,
	"is_superuser"	bool NOT NULL,
	"username"	varchar(150) NOT NULL UNIQUE,
	"first_name"	varchar(150) NOT NULL,
	"last_name"	varchar(150) NOT NULL,
	"is_staff"	bool NOT NULL,
	"is_active"	bool NOT NULL,
	"date_joined"	datetime NOT NULL,
	"email"	varchar(150) NOT NULL UNIQUE,
	"direccion"	varchar(200) NOT NULL,
	"app_role"	varchar(20) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "users_customuser_groups" (
	"id"	integer NOT NULL,
	"customuser_id"	bigint NOT NULL,
	"group_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("customuser_id") REFERENCES "users_customuser"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "users_customuser_user_permissions" (
	"id"	integer NOT NULL,
	"customuser_id"	bigint NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("customuser_id") REFERENCES "users_customuser"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO "Categoria" VALUES (1,'crocantes','comida crocante');
INSERT INTO "Categoria" VALUES (2,'Bebibles','Descubre nuestra selección de bebidas naturales, saludables y deliciosas. Desde jugos orgánicos y leches vegetales hasta infusiones especiales y superalimentos líquidos, aquí encontrarás opciones perfectas para complementar tu estilo de vida saludable. Cada producto está cuidadosamente seleccionado para garantizar calidad, sabor y bienestar en cada sorbo.');
INSERT INTO "Categoria" VALUES (3,'Alimentos secos','Explora nuestra variedad de alimentos secos, esenciales para una dieta saludable y equilibrada. Desde legumbres, cereales y frutos secos hasta harinas integrales y superalimentos, ofrecemos productos de alta calidad y larga duración. Perfectos para tus recetas favoritas y para almacenar en tu despensa.');
INSERT INTO "auth_permission" VALUES (1,1,'add_logentry','Can add log entry');
INSERT INTO "auth_permission" VALUES (2,1,'change_logentry','Can change log entry');
INSERT INTO "auth_permission" VALUES (3,1,'delete_logentry','Can delete log entry');
INSERT INTO "auth_permission" VALUES (4,1,'view_logentry','Can view log entry');
INSERT INTO "auth_permission" VALUES (5,2,'add_permission','Can add permission');
INSERT INTO "auth_permission" VALUES (6,2,'change_permission','Can change permission');
INSERT INTO "auth_permission" VALUES (7,2,'delete_permission','Can delete permission');
INSERT INTO "auth_permission" VALUES (8,2,'view_permission','Can view permission');
INSERT INTO "auth_permission" VALUES (9,3,'add_group','Can add group');
INSERT INTO "auth_permission" VALUES (10,3,'change_group','Can change group');
INSERT INTO "auth_permission" VALUES (11,3,'delete_group','Can delete group');
INSERT INTO "auth_permission" VALUES (12,3,'view_group','Can view group');
INSERT INTO "auth_permission" VALUES (13,4,'add_contenttype','Can add content type');
INSERT INTO "auth_permission" VALUES (14,4,'change_contenttype','Can change content type');
INSERT INTO "auth_permission" VALUES (15,4,'delete_contenttype','Can delete content type');
INSERT INTO "auth_permission" VALUES (16,4,'view_contenttype','Can view content type');
INSERT INTO "auth_permission" VALUES (17,5,'add_session','Can add session');
INSERT INTO "auth_permission" VALUES (18,5,'change_session','Can change session');
INSERT INTO "auth_permission" VALUES (19,5,'delete_session','Can delete session');
INSERT INTO "auth_permission" VALUES (20,5,'view_session','Can view session');
INSERT INTO "auth_permission" VALUES (21,6,'add_customuser','Can add user');
INSERT INTO "auth_permission" VALUES (22,6,'change_customuser','Can change user');
INSERT INTO "auth_permission" VALUES (23,6,'delete_customuser','Can delete user');
INSERT INTO "auth_permission" VALUES (24,6,'view_customuser','Can view user');
INSERT INTO "auth_permission" VALUES (25,7,'add_producto','Can add Producto');
INSERT INTO "auth_permission" VALUES (26,7,'change_producto','Can change Producto');
INSERT INTO "auth_permission" VALUES (27,7,'delete_producto','Can delete Producto');
INSERT INTO "auth_permission" VALUES (28,7,'view_producto','Can view Producto');
INSERT INTO "auth_permission" VALUES (29,8,'add_favorito','Can add Favorito');
INSERT INTO "auth_permission" VALUES (30,8,'change_favorito','Can change Favorito');
INSERT INTO "auth_permission" VALUES (31,8,'delete_favorito','Can delete Favorito');
INSERT INTO "auth_permission" VALUES (32,8,'view_favorito','Can view Favorito');
INSERT INTO "auth_permission" VALUES (33,9,'add_categoria','Can add Categoria');
INSERT INTO "auth_permission" VALUES (34,9,'change_categoria','Can change Categoria');
INSERT INTO "auth_permission" VALUES (35,9,'delete_categoria','Can delete Categoria');
INSERT INTO "auth_permission" VALUES (36,9,'view_categoria','Can view Categoria');
INSERT INTO "auth_permission" VALUES (37,10,'add_carrito','Can add carrito');
INSERT INTO "auth_permission" VALUES (38,10,'change_carrito','Can change carrito');
INSERT INTO "auth_permission" VALUES (39,10,'delete_carrito','Can delete carrito');
INSERT INTO "auth_permission" VALUES (40,10,'view_carrito','Can view carrito');
INSERT INTO "auth_permission" VALUES (41,11,'add_itempedido','Can add item pedido');
INSERT INTO "auth_permission" VALUES (42,11,'change_itempedido','Can change item pedido');
INSERT INTO "auth_permission" VALUES (43,11,'delete_itempedido','Can delete item pedido');
INSERT INTO "auth_permission" VALUES (44,11,'view_itempedido','Can view item pedido');
INSERT INTO "auth_permission" VALUES (45,12,'add_pedido','Can add pedido');
INSERT INTO "auth_permission" VALUES (46,12,'change_pedido','Can change pedido');
INSERT INTO "auth_permission" VALUES (47,12,'delete_pedido','Can delete pedido');
INSERT INTO "auth_permission" VALUES (48,12,'view_pedido','Can view pedido');
INSERT INTO "auth_permission" VALUES (49,13,'add_itemcarrito','Can add item carrito');
INSERT INTO "auth_permission" VALUES (50,13,'change_itemcarrito','Can change item carrito');
INSERT INTO "auth_permission" VALUES (51,13,'delete_itemcarrito','Can delete item carrito');
INSERT INTO "auth_permission" VALUES (52,13,'view_itemcarrito','Can view item carrito');
INSERT INTO "auth_permission" VALUES (53,14,'add_itempedido','Can add item pedido');
INSERT INTO "auth_permission" VALUES (54,14,'change_itempedido','Can change item pedido');
INSERT INTO "auth_permission" VALUES (55,14,'delete_itempedido','Can delete item pedido');
INSERT INTO "auth_permission" VALUES (56,14,'view_itempedido','Can view item pedido');
INSERT INTO "auth_permission" VALUES (57,15,'add_pedido','Can add pedido');
INSERT INTO "auth_permission" VALUES (58,15,'change_pedido','Can change pedido');
INSERT INTO "auth_permission" VALUES (59,15,'delete_pedido','Can delete pedido');
INSERT INTO "auth_permission" VALUES (60,15,'view_pedido','Can view pedido');
INSERT INTO "auth_permission" VALUES (61,16,'add_carrito','Can add carrito');
INSERT INTO "auth_permission" VALUES (62,16,'change_carrito','Can change carrito');
INSERT INTO "auth_permission" VALUES (63,16,'delete_carrito','Can delete carrito');
INSERT INTO "auth_permission" VALUES (64,16,'view_carrito','Can view carrito');
INSERT INTO "auth_permission" VALUES (65,17,'add_itemcarrito','Can add item carrito');
INSERT INTO "auth_permission" VALUES (66,17,'change_itemcarrito','Can change item carrito');
INSERT INTO "auth_permission" VALUES (67,17,'delete_itemcarrito','Can delete item carrito');
INSERT INTO "auth_permission" VALUES (68,17,'view_itemcarrito','Can view item carrito');
INSERT INTO "cart_app_carrito" VALUES (1,1);
INSERT INTO "cart_app_carrito" VALUES (2,8);
INSERT INTO "cart_app_itempedido" VALUES (1,15,2,2);
INSERT INTO "cart_app_itempedido" VALUES (2,2,3,1);
INSERT INTO "cart_app_itempedido" VALUES (3,1,3,2);
INSERT INTO "cart_app_itempedido" VALUES (4,4,3,3);
INSERT INTO "cart_app_itempedido" VALUES (5,4,4,2);
INSERT INTO "cart_app_itempedido" VALUES (6,5,4,3);
INSERT INTO "cart_app_itempedido" VALUES (7,3,5,2);
INSERT INTO "cart_app_itempedido" VALUES (8,3,6,2);
INSERT INTO "cart_app_itempedido" VALUES (9,3,7,1);
INSERT INTO "cart_app_itempedido" VALUES (10,2,7,3);
INSERT INTO "cart_app_itempedido" VALUES (11,4,7,2);
INSERT INTO "cart_app_itempedido" VALUES (12,3,8,2);
INSERT INTO "cart_app_itempedido" VALUES (13,3,9,2);
INSERT INTO "cart_app_itempedido" VALUES (14,3,10,3);
INSERT INTO "cart_app_itempedido" VALUES (15,1,11,2);
INSERT INTO "cart_app_itempedido" VALUES (16,2,12,2);
INSERT INTO "cart_app_itempedido" VALUES (17,7,13,2);
INSERT INTO "cart_app_itempedido" VALUES (18,4,14,2);
INSERT INTO "cart_app_itempedido" VALUES (19,1,15,2);
INSERT INTO "cart_app_itempedido" VALUES (20,6,16,2);
INSERT INTO "cart_app_pedido" VALUES (1,'Av. Marcelo T. Alvear 820','03516956468','efectivo',22320,'2025-05-01 20:52:01.896005',NULL,NULL,NULL,1);
INSERT INTO "cart_app_pedido" VALUES (2,'Av. Marcelo T. Alvear 820','03516956468','efectivo',7500,'2025-05-01 20:53:45.800499',NULL,NULL,NULL,1);
INSERT INTO "cart_app_pedido" VALUES (3,'Av. Marcelo T. Alvear 820','3516956468','efectivo',12970,'2025-05-07 15:49:11.874246',NULL,NULL,NULL,1);
INSERT INTO "cart_app_pedido" VALUES (4,'Av. Marcelo T. Alvear 820','0351695646','efectivo',14500,'2025-05-07 16:04:58.773820',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (5,'Av. Marcelo T. Alvear 820','0351695646','efectivo',1500,'2025-05-07 17:07:14.055557',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (6,'Av. Marcelo T. Alvear 820','0351695646','efectivo',1500,'2025-05-07 17:53:45.427178',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (7,'Av. Marcelo T. Alvear 820','0351695646','efectivo',10705,'2025-05-09 23:36:49.543000',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (8,'Av. Marcelo T. Alvear 820','3516956468','efectivo',1500,'2025-05-11 20:17:58.759899',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (9,'Av. Marcelo T. Alvear 820','0351695646','efectivo',1500,'2025-05-11 20:39:57.137439',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (10,'Av. Marcelo T. Alvear 820','03516228084','efectivo',7500,'2025-05-11 22:32:21.629370',NULL,NULL,NULL,1);
INSERT INTO "cart_app_pedido" VALUES (11,'Av. Marcelo T. Alvear 820','0351695646','efectivo',500,'2025-05-11 22:32:45.710004',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (12,'Av. Marcelo T. Alvear 820','03516228084','tarjeta',1000,'2025-05-11 22:57:25.308887',NULL,NULL,NULL,1);
INSERT INTO "cart_app_pedido" VALUES (13,'Av. Marcelo T. Alvear 820','3516228084','tarjeta',3500,'2025-05-11 23:07:08.238851',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (14,'Av. Marcelo T. Alvear 820','0351695646','efectivo',2000,'2025-05-11 23:31:01.741684',NULL,NULL,NULL,1);
INSERT INTO "cart_app_pedido" VALUES (15,'Av. Marcelo T. Alvear 820','0351695646','tarjeta',500,'2025-05-12 00:48:08.730010',NULL,NULL,NULL,8);
INSERT INTO "cart_app_pedido" VALUES (16,'Av. Marcelo T. Alvear 820','0351695646','efectivo',3000,'2025-05-12 01:12:24.766529',NULL,NULL,NULL,8);
INSERT INTO "cart_carrito" VALUES (1,1);
INSERT INTO "cart_itemcarrito" VALUES (12,1,1,1);
INSERT INTO "cart_itempedido" VALUES (1,4,1,1);
INSERT INTO "cart_itempedido" VALUES (2,2,1,2);
INSERT INTO "cart_itempedido" VALUES (3,6,1,3);
INSERT INTO "cart_itempedido" VALUES (4,2,1,4);
INSERT INTO "cart_itempedido" VALUES (5,1,1,5);
INSERT INTO "cart_itempedido" VALUES (6,1,1,6);
INSERT INTO "cart_itempedido" VALUES (7,1,1,7);
INSERT INTO "cart_itempedido" VALUES (8,1,1,8);
INSERT INTO "cart_itempedido" VALUES (9,1,1,9);
INSERT INTO "cart_itempedido" VALUES (10,5,1,11);
INSERT INTO "cart_pedido" VALUES (1,'123 Calle Falsa','123456789','efectivo',940,'2025-04-20 23:44:54.525665',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (2,'acasdas','1231212313asd','efectivo',470,'2025-04-21 04:36:19.437003',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (3,'','','tarjeta',1410,'2025-04-21 04:37:03.437295',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (4,'acasdas','03516956468','tarjeta',470,'2025-04-21 04:42:37.401134',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (5,'acasdas','03516956468','tarjeta',235,'2025-04-21 04:45:43.216709',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (6,'acasdas','03516956468','tarjeta',235,'2025-04-21 04:47:33.682675',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (7,'','','efectivo',235,'2025-04-21 04:47:56.833418',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (8,'','','tarjeta',235,'2025-04-21 04:49:29.634031',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (9,'acasdas','1231212313asd','tarjeta',235,'2025-04-21 04:54:54.066022',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (10,'acasdas','12312123131','tarjeta',1410,'2025-04-21 05:06:07.047006',NULL,NULL,NULL,1);
INSERT INTO "cart_pedido" VALUES (11,'acasdas','3516956468','efectivo',1175,'2025-04-23 03:15:18.690609',NULL,NULL,NULL,1);
INSERT INTO "django_admin_log" VALUES (1,'12','1 x crocantes',1,'[{"added": {}}]',13,1,'2025-04-23 15:59:55.764551');
INSERT INTO "django_admin_log" VALUES (2,'1','crocantes',2,'[{"changed": {"fields": ["Imagen"]}}]',7,1,'2025-04-29 00:45:06.702584');
INSERT INTO "django_admin_log" VALUES (3,'2','Bebibles',1,'[{"added": {}}]',9,1,'2025-04-29 00:47:50.697452');
INSERT INTO "django_admin_log" VALUES (4,'1','Té verde',2,'[{"changed": {"fields": ["Nombre", "Descripcion", "Precio", "Id categoria"]}}]',7,1,'2025-04-29 00:47:56.067014');
INSERT INTO "django_admin_log" VALUES (5,'3','Alimentos secos',1,'[{"added": {}}]',9,1,'2025-04-29 00:49:26.929180');
INSERT INTO "django_admin_log" VALUES (6,'2','Soja texturizada 100gr',1,'[{"added": {}}]',7,1,'2025-04-29 00:51:30.948472');
INSERT INTO "django_admin_log" VALUES (7,'3','Almendras x100gr',1,'[{"added": {}}]',7,1,'2025-05-01 21:00:47.499299');
INSERT INTO "django_admin_log" VALUES (8,'11','5 x Soja texturizada 100gr',3,'',17,1,'2025-05-09 17:17:54.672098');
INSERT INTO "django_admin_log" VALUES (9,'12','3 x Té verde',2,'[{"changed": {"fields": ["Cantidad"]}}]',17,1,'2025-05-09 17:18:50.798038');
INSERT INTO "django_admin_log" VALUES (10,'13','2 x Almendras x100gr',1,'[{"added": {}}]',17,1,'2025-05-09 17:19:09.051409');
INSERT INTO "django_content_type" VALUES (1,'admin','logentry');
INSERT INTO "django_content_type" VALUES (2,'auth','permission');
INSERT INTO "django_content_type" VALUES (3,'auth','group');
INSERT INTO "django_content_type" VALUES (4,'contenttypes','contenttype');
INSERT INTO "django_content_type" VALUES (5,'sessions','session');
INSERT INTO "django_content_type" VALUES (6,'users','customuser');
INSERT INTO "django_content_type" VALUES (7,'products','producto');
INSERT INTO "django_content_type" VALUES (8,'products','favorito');
INSERT INTO "django_content_type" VALUES (9,'products','categoria');
INSERT INTO "django_content_type" VALUES (10,'cart','carrito');
INSERT INTO "django_content_type" VALUES (11,'cart','itempedido');
INSERT INTO "django_content_type" VALUES (12,'cart','pedido');
INSERT INTO "django_content_type" VALUES (13,'cart','itemcarrito');
INSERT INTO "django_content_type" VALUES (14,'cart_app','itempedido');
INSERT INTO "django_content_type" VALUES (15,'cart_app','pedido');
INSERT INTO "django_content_type" VALUES (16,'cart_app','carrito');
INSERT INTO "django_content_type" VALUES (17,'cart_app','itemcarrito');
INSERT INTO "django_migrations" VALUES (1,'contenttypes','0001_initial','2025-04-18 22:24:29.940896');
INSERT INTO "django_migrations" VALUES (2,'contenttypes','0002_remove_content_type_name','2025-04-18 22:24:30.189897');
INSERT INTO "django_migrations" VALUES (3,'auth','0001_initial','2025-04-18 22:24:30.245896');
INSERT INTO "django_migrations" VALUES (4,'auth','0002_alter_permission_name_max_length','2025-04-18 22:24:30.330897');
INSERT INTO "django_migrations" VALUES (5,'auth','0003_alter_user_email_max_length','2025-04-18 22:24:30.391896');
INSERT INTO "django_migrations" VALUES (6,'auth','0004_alter_user_username_opts','2025-04-18 22:24:30.450897');
INSERT INTO "django_migrations" VALUES (7,'auth','0005_alter_user_last_login_null','2025-04-18 22:24:30.514895');
INSERT INTO "django_migrations" VALUES (8,'auth','0006_require_contenttypes_0002','2025-04-18 22:24:30.544898');
INSERT INTO "django_migrations" VALUES (9,'auth','0007_alter_validators_add_error_messages','2025-04-18 22:24:30.561898');
INSERT INTO "django_migrations" VALUES (10,'auth','0008_alter_user_username_max_length','2025-04-18 22:24:30.665894');
INSERT INTO "django_migrations" VALUES (11,'auth','0009_alter_user_last_name_max_length','2025-04-18 22:24:30.793898');
INSERT INTO "django_migrations" VALUES (12,'auth','0010_alter_group_name_max_length','2025-04-18 22:24:31.061895');
INSERT INTO "django_migrations" VALUES (13,'auth','0011_update_proxy_permissions','2025-04-18 22:24:31.196895');
INSERT INTO "django_migrations" VALUES (14,'auth','0012_alter_user_first_name_max_length','2025-04-18 22:24:31.295896');
INSERT INTO "django_migrations" VALUES (15,'users','0001_initial','2025-04-18 22:24:31.419895');
INSERT INTO "django_migrations" VALUES (16,'admin','0001_initial','2025-04-18 22:24:31.494895');
INSERT INTO "django_migrations" VALUES (17,'admin','0002_logentry_remove_auto_add','2025-04-18 22:24:31.560901');
INSERT INTO "django_migrations" VALUES (18,'admin','0003_logentry_add_action_flag_choices','2025-04-18 22:24:31.766894');
INSERT INTO "django_migrations" VALUES (19,'sessions','0001_initial','2025-04-18 22:24:31.838895');
INSERT INTO "django_migrations" VALUES (20,'products','0001_initial','2025-04-20 22:02:39.786687');
INSERT INTO "django_migrations" VALUES (21,'users','0002_alter_customuser_managers','2025-04-20 22:51:31.400128');
INSERT INTO "django_migrations" VALUES (22,'cart','0001_initial','2025-04-20 22:52:11.329226');
INSERT INTO "django_migrations" VALUES (23,'cart','0002_rename_fecha_pedido_pedido_fecha_creacion','2025-04-20 23:44:28.254662');
INSERT INTO "django_migrations" VALUES (24,'products','0002_alter_producto_options_alter_producto_table','2025-04-21 05:04:20.365680');
INSERT INTO "django_migrations" VALUES (25,'cart_app','0001_initial','2025-04-25 03:35:30.067854');
INSERT INTO "django_session" VALUES ('hyhumpd3cansn2ear0qfaj0wwiirlijg','.eJxVjEEOwiAQRe_C2hBgSgGX7j0DmWFAqoYmpV0Z765NutDtf-_9l4i4rTVuPS9xYnEWWpx-N8L0yG0HfMd2m2Wa27pMJHdFHrTL68z5eTncv4OKvX5rCwmUYT1yCQG8N74oNsqyo6IRmIg1OI9KDdkYyCPoQIyUCxfnBiveH9XpN_c:1u6dal:ya8EtpshCdAOAk2iqVA8_8oMHMyLPhkpawIzy47rRLQ','2025-05-04 22:56:51.478248');
INSERT INTO "django_session" VALUES ('wbss6wpg516acuumajxg53y6rle4hpnc','.eJxVjEEOwiAQRe_C2hBgSgGX7j0DmWFAqoYmpV0Z765NutDtf-_9l4i4rTVuPS9xYnEWWpx-N8L0yG0HfMd2m2Wa27pMJHdFHrTL68z5eTncv4OKvX5rCwmUYT1yCQG8N74oNsqyo6IRmIg1OI9KDdkYyCPoQIyUCxfnBiveH9XpN_c:1u7QHM:pmgA-LZMEFDKd3ktJFNL40ZFuOPmWKPlkquw7hsgz0Y','2025-05-07 02:56:04.880832');
INSERT INTO "django_session" VALUES ('38vli1u0rpmumdy2rjmhxm1qp1nk801e','.eJxVjMEOwiAQRP-FsyGwyEo9eu83kIVdbNWUpLQn47_bJj3ocea9mbeKtC5DXJvMcWR1VVadfrtE-SnTDvhB073qXKdlHpPeFX3QpvvK8rod7t_BQG3Y1gkDYDbEmH1nMxIIGL8ll5DFZ8BQytkmZ5kKsrmAhA65gPXOCqD6fAHukzf6:1u8ojT:mg8eCYOUNfAM0VXaFWHCd05tuXJ-g6uk9i-ZFifrcJs','2025-05-10 23:14:51.605201');
INSERT INTO "django_session" VALUES ('9r5ozhs7nsx3139f0ulisokx2zyrx6mu','.eJxVjMEOwiAQRP-FsyGwyEo9eu83kIVdbNWUpLQn47_bJj3ocea9mbeKtC5DXJvMcWR1VVadfrtE-SnTDvhB073qXKdlHpPeFX3QpvvK8rod7t_BQG3Y1gkDYDbEmH1nMxIIGL8ll5DFZ8BQytkmZ5kKsrmAhA65gPXOCqD6fAHukzf6:1u9Z5d:JwxuMKP5kYBN5GIYjjLDmppOMXDQWI1aNZg25wIUkos','2025-05-13 00:44:49.867671');
INSERT INTO "django_session" VALUES ('hx0rtltdb6752ks60t7ouw5787mn8aio','.eJxVjMEOwiAQRP-FsyGwyEo9eu83kIVdbNWUpLQn47_bJj3ocea9mbeKtC5DXJvMcWR1VVadfrtE-SnTDvhB073qXKdlHpPeFX3QpvvK8rod7t_BQG3Y1gkDYDbEmH1nMxIIGL8ll5DFZ8BQytkmZ5kKsrmAhA65gPXOCqD6fAHukzf6:1u9wfS:Riuhp51k8Ju8QXhcTlNYdHix560UWAleKnCBDEBgrHQ','2025-05-14 01:55:22.331572');
INSERT INTO "django_session" VALUES ('9mqwd0b4lrqeq1a3p8gu0g9ii0ji1ln4','.eJxVjMEOwiAQRP-FsyGwyEo9eu83kIVdbNWUpLQn47_bJj3ocea9mbeKtC5DXJvMcWR1VVadfrtE-SnTDvhB073qXKdlHpPeFX3QpvvK8rod7t_BQG3Y1gkDYDbEmH1nMxIIGL8ll5DFZ8BQytkmZ5kKsrmAhA65gPXOCqD6fAHukzf6:1uBa53:aG9ZXGhZvzPbnJmo-t2YyLwILCqLxzUuOjuWRVzTrLg','2025-05-18 14:12:33.643518');
INSERT INTO "products_producto" VALUES (1,'Té verde','El té verde es una planta que aporta diversos beneficios para la salud, ayudando en la prevención de vatios tipos de cáncer, retardar el envejecimiento prematuro y el surgimiento de enfermedades crónicas, además de favorecer la pérdida de peso y mejorar la disposición física y mental.',1235,7,'productos/OIP.jpg',2);
INSERT INTO "products_producto" VALUES (2,'Soja texturizada 100gr','La soja texturizada es una excelente fuente de proteínas vegetales, ideal para enriquecer tus comidas con opciones saludables y sostenibles. Versátil y fácil de preparar, es perfecta para elaborar hamburguesas, guisos, rellenos y mucho más, adaptándose a cualquier estilo de cocina.',500,881,'productos/soja-texturizada-grano-fino-mercadona-hacendado-1536x1536.jpg',3);
INSERT INTO "products_producto" VALUES (3,'Almendras x100gr','Fruto seco altamente nutritivo y versátil. Son ricas en proteínas, grasas saludables, fibra y vitaminas, especialmente vitamina E.',2500,874,'productos/almendras.jpg',3);
INSERT INTO "users_customuser" VALUES (1,'pbkdf2_sha256$600000$J060u71B4w0G8SbFF1Z5rx$bgpOV6fFDfw4ZY2ePsQpt82ErQIq4ebAu1BdF5HDTMU=','2025-05-04 14:12:33.624520',1,'admin','admin','admin',1,1,'2025-04-19 20:14:37.578735','admin@gmail.com','Desconocido','admin_app');
INSERT INTO "users_customuser" VALUES (2,'pbkdf2_sha256$1000000$6jPnBwRFI38zp4NztrpRsN$JDkBjeJQDodvKITVJViztPW3Y0VyU+JRlatbooq1r4U=',NULL,0,'conichan139@gmail.com','Nicolas','Figueroa',0,1,'2025-04-19 20:23:10.849118','conichan139@gmail.com','Reconquista 256','editor');
INSERT INTO "users_customuser" VALUES (3,'pbkdf2_sha256$1000000$wLw6Mvy0hZ6e6IS2iJvzXH$mPqyPUqww9XNqnjLiG61WrXypCkTA0CtfwjAR/4INZE=',NULL,0,'Asfas','Damian','Figueroa',0,1,'2025-04-19 20:58:36.914124','damian@gmail.com','Reconquista 256','viewer');
INSERT INTO "users_customuser" VALUES (4,'pbkdf2_sha256$1000000$vAb10cfVfV7P4cKQswTECY$OMOwTvMaNlkkSBGO3P+BUFvW1Sr10e6wc/+w3SmqJlE=',NULL,0,'prueba@gmail.com','lapiz','lapizon',0,1,'2025-04-20 20:32:54.905818','prueba@gmail.com','lapis2','viewer');
INSERT INTO "users_customuser" VALUES (5,'pbkdf2_sha256$600000$aHROT5kTfna8gfkQnd7qnz$kpfaAmzqEGBQ/Y/s7CBKkyA1K2yV7OKpShyDz8MSjP4=',NULL,0,'conichan','Damian','Figueroa',0,1,'2025-05-06 01:58:56.180141','nicolas@gmail.com','reconquista 256','admin_app');
INSERT INTO "users_customuser" VALUES (8,'pbkdf2_sha256$600000$LpFj961spMxNz7LmBk5N8z$l/7Gjr1Rlg3uuFYhTxzqUgU4KgkoaUgmY6hBBHXTAlQ=',NULL,0,'joaquincamino','Joaquín Nicolás','Camino Alonso',0,1,'2025-05-07 15:54:10.345621','joaquincamino09@gmail.com','Desconocido','viewer');
CREATE INDEX IF NOT EXISTS "Favorito_producto_id_6cc24cd1" ON "Favorito" (
	"producto_id"
);
CREATE INDEX IF NOT EXISTS "Favorito_usuario_id_7dea0a7c" ON "Favorito" (
	"usuario_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "Favorito_usuario_id_producto_id_adcc4197_uniq" ON "Favorito" (
	"usuario_id",
	"producto_id"
);
CREATE INDEX IF NOT EXISTS "Producto_id_categoria_id_25096c94" ON "products_producto" (
	"id_categoria_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" (
	"group_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" (
	"group_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_permission_content_type_id_2f476e4b" ON "auth_permission" (
	"content_type_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" (
	"content_type_id",
	"codename"
);
CREATE INDEX IF NOT EXISTS "cart_app_itemcarrito_carrito_id_cfbdc16b" ON "cart_app_itemcarrito" (
	"carrito_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "cart_app_itemcarrito_carrito_id_producto_id_8099a7bd_uniq" ON "cart_app_itemcarrito" (
	"carrito_id",
	"producto_id"
);
CREATE INDEX IF NOT EXISTS "cart_app_itemcarrito_producto_id_4ab44035" ON "cart_app_itemcarrito" (
	"producto_id"
);
CREATE INDEX IF NOT EXISTS "cart_app_itempedido_pedido_id_0c451d26" ON "cart_app_itempedido" (
	"pedido_id"
);
CREATE INDEX IF NOT EXISTS "cart_app_itempedido_producto_id_beb0372c" ON "cart_app_itempedido" (
	"producto_id"
);
CREATE INDEX IF NOT EXISTS "cart_app_pedido_usuario_id_002467c5" ON "cart_app_pedido" (
	"usuario_id"
);
CREATE INDEX IF NOT EXISTS "cart_itemcarrito_carrito_id_c34f359b" ON "cart_itemcarrito" (
	"carrito_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "cart_itemcarrito_carrito_id_producto_id_0cec754c_uniq" ON "cart_itemcarrito" (
	"carrito_id",
	"producto_id"
);
CREATE INDEX IF NOT EXISTS "cart_itemcarrito_producto_id_4e488152" ON "cart_itemcarrito" (
	"producto_id"
);
CREATE INDEX IF NOT EXISTS "cart_itempedido_pedido_id_ed9c22f1" ON "cart_itempedido" (
	"pedido_id"
);
CREATE INDEX IF NOT EXISTS "cart_itempedido_producto_id_2a720bda" ON "cart_itempedido" (
	"producto_id"
);
CREATE INDEX IF NOT EXISTS "cart_pedido_usuario_id_76fa035e" ON "cart_pedido" (
	"usuario_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_user_id_c564eba6" ON "django_admin_log" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" (
	"app_label",
	"model"
);
CREATE INDEX IF NOT EXISTS "django_session_expire_date_a5c62663" ON "django_session" (
	"expire_date"
);
CREATE INDEX IF NOT EXISTS "users_customuser_groups_customuser_id_958147bf" ON "users_customuser_groups" (
	"customuser_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_customuser_groups_customuser_id_group_id_76b619e3_uniq" ON "users_customuser_groups" (
	"customuser_id",
	"group_id"
);
CREATE INDEX IF NOT EXISTS "users_customuser_groups_group_id_01390b14" ON "users_customuser_groups" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "users_customuser_user_permissions_customuser_id_5771478b" ON "users_customuser_user_permissions" (
	"customuser_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_customuser_user_permissions_customuser_id_permission_id_7a7debf6_uniq" ON "users_customuser_user_permissions" (
	"customuser_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "users_customuser_user_permissions_permission_id_baaa2f74" ON "users_customuser_user_permissions" (
	"permission_id"
);
COMMIT;
