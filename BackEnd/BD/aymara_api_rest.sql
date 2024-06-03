-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema aymara_api_rest
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aymara_api_rest
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aymara_api_rest` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `aymara_api_rest` ;

-- -----------------------------------------------------
-- Table `aymara_api_rest`.`datosenvio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`datosenvio` (
  `id_datos_envio` INT NOT NULL AUTO_INCREMENT,
  `empresa` VARCHAR(45) NOT NULL,
  `traking` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_datos_envio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`metodopago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`metodopago` (
  `id_metodo_pago` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_metodo_pago`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`aymaraapp_customuser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`aymaraapp_customuser` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(128) NOT NULL,
  `last_login` DATETIME(6) NULL DEFAULT NULL,
  `is_superuser` TINYINT(1) NOT NULL,
  `username` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(150) NOT NULL,
  `last_name` VARCHAR(150) NOT NULL,
  `is_staff` TINYINT(1) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `date_joined` DATETIME(6) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `direccion` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`carrito` (
  `id_carrito` INT NOT NULL AUTO_INCREMENT,
  `direccion_envio` VARCHAR(200) NOT NULL,
  `telefono` VARCHAR(15) NOT NULL,
  `total` DECIMAL(10,2) NULL DEFAULT NULL,
  `id_datos_envio_id` INT NOT NULL,
  `id_metodo_pago_id` INT NOT NULL,
  `id_usuario_id` BIGINT NOT NULL,
  PRIMARY KEY (`id_carrito`),
  INDEX `Carrito_id_datos_envio_id_3d7aa869_fk_DatosEnvio_id_datos_envio` (`id_datos_envio_id` ASC) VISIBLE,
  INDEX `Carrito_id_metodo_pago_id_af31339d_fk_MetodoPago_id_metodo_pago` (`id_metodo_pago_id` ASC) VISIBLE,
  INDEX `Carrito_id_usuario_id_6d64f2ef_fk_AymaraAPP_customuser_id` (`id_usuario_id` ASC) VISIBLE,
  CONSTRAINT `Carrito_id_datos_envio_id_3d7aa869_fk_DatosEnvio_id_datos_envio`
    FOREIGN KEY (`id_datos_envio_id`)
    REFERENCES `aymara_api_rest`.`datosenvio` (`id_datos_envio`),
  CONSTRAINT `Carrito_id_metodo_pago_id_af31339d_fk_MetodoPago_id_metodo_pago`
    FOREIGN KEY (`id_metodo_pago_id`)
    REFERENCES `aymara_api_rest`.`metodopago` (`id_metodo_pago`),
  CONSTRAINT `Carrito_id_usuario_id_6d64f2ef_fk_AymaraAPP_customuser_id`
    FOREIGN KEY (`id_usuario_id`)
    REFERENCES `aymara_api_rest`.`aymaraapp_customuser` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` LONGTEXT NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`producto` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `descripcion` LONGTEXT NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `disponibilidad` INT UNSIGNED NOT NULL,
  `imagen` LONGTEXT NOT NULL,
  `id_categoria_id` INT NOT NULL,
  PRIMARY KEY (`id_producto`),
  INDEX `Producto_id_categoria_id_25096c94_fk_Categoria_id_categoria` (`id_categoria_id` ASC) VISIBLE,
  CONSTRAINT `Producto_id_categoria_id_25096c94_fk_Categoria_id_categoria`
    FOREIGN KEY (`id_categoria_id`)
    REFERENCES `aymara_api_rest`.`categoria` (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`agregarproducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`agregarproducto` (
  `id_agregar_producto` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT UNSIGNED NOT NULL,
  `precio_unitario` DECIMAL(10,2) NULL DEFAULT NULL,
  `carrito_id` INT NOT NULL,
  `id_producto_id` INT NOT NULL,
  PRIMARY KEY (`id_agregar_producto`),
  INDEX `AgregarProducto_carrito_id_73ac8ad8_fk_Carrito_id_carrito` (`carrito_id` ASC) VISIBLE,
  INDEX `AgregarProducto_id_producto_id_0656d33d_fk_Producto_id_producto` (`id_producto_id` ASC) VISIBLE,
  CONSTRAINT `AgregarProducto_carrito_id_73ac8ad8_fk_Carrito_id_carrito`
    FOREIGN KEY (`carrito_id`)
    REFERENCES `aymara_api_rest`.`carrito` (`id_carrito`),
  CONSTRAINT `AgregarProducto_id_producto_id_0656d33d_fk_Producto_id_producto`
    FOREIGN KEY (`id_producto_id`)
    REFERENCES `aymara_api_rest`.`producto` (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`auth_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`auth_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`django_content_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`django_content_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `app_label` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label` ASC, `model` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`auth_permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`auth_permission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `content_type_id` INT NOT NULL,
  `codename` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id` ASC, `codename` ASC) VISIBLE,
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co`
    FOREIGN KEY (`content_type_id`)
    REFERENCES `aymara_api_rest`.`django_content_type` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 65
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`auth_group_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`auth_group_permissions` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `group_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id` ASC, `permission_id` ASC) VISIBLE,
  INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`
    FOREIGN KEY (`permission_id`)
    REFERENCES `aymara_api_rest`.`auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `aymara_api_rest`.`auth_group` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`authtoken_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`authtoken_token` (
  `key` VARCHAR(40) NOT NULL,
  `created` DATETIME(6) NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_AymaraAPP_customuser_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `aymara_api_rest`.`aymaraapp_customuser` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`aymaraapp_customuser_groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`aymaraapp_customuser_groups` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `customuser_id` BIGINT NOT NULL,
  `group_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `AymaraAPP_customuser_groups_customuser_id_group_id_927c49d9_uniq` (`customuser_id` ASC, `group_id` ASC) VISIBLE,
  INDEX `AymaraAPP_customuser_groups_group_id_d346b1db_fk_auth_group_id` (`group_id` ASC) VISIBLE,
  CONSTRAINT `AymaraAPP_customuser_customuser_id_a3d153fd_fk_AymaraAPP`
    FOREIGN KEY (`customuser_id`)
    REFERENCES `aymara_api_rest`.`aymaraapp_customuser` (`id`),
  CONSTRAINT `AymaraAPP_customuser_groups_group_id_d346b1db_fk_auth_group_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `aymara_api_rest`.`auth_group` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`aymaraapp_customuser_user_permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`aymaraapp_customuser_user_permissions` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `customuser_id` BIGINT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `AymaraAPP_customuser_use_customuser_id_permission_ad069bc1_uniq` (`customuser_id` ASC, `permission_id` ASC) VISIBLE,
  INDEX `AymaraAPP_customuser_permission_id_4ee8203f_fk_auth_perm` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `AymaraAPP_customuser_customuser_id_e52adf27_fk_AymaraAPP`
    FOREIGN KEY (`customuser_id`)
    REFERENCES `aymara_api_rest`.`aymaraapp_customuser` (`id`),
  CONSTRAINT `AymaraAPP_customuser_permission_id_4ee8203f_fk_auth_perm`
    FOREIGN KEY (`permission_id`)
    REFERENCES `aymara_api_rest`.`auth_permission` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`django_admin_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`django_admin_log` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `action_time` DATETIME(6) NOT NULL,
  `object_id` LONGTEXT NULL DEFAULT NULL,
  `object_repr` VARCHAR(200) NOT NULL,
  `action_flag` SMALLINT UNSIGNED NOT NULL,
  `change_message` LONGTEXT NOT NULL,
  `content_type_id` INT NULL DEFAULT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id` ASC) VISIBLE,
  INDEX `django_admin_log_user_id_c564eba6_fk_AymaraAPP_customuser_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co`
    FOREIGN KEY (`content_type_id`)
    REFERENCES `aymara_api_rest`.`django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_AymaraAPP_customuser_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `aymara_api_rest`.`aymaraapp_customuser` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`django_migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`django_migrations` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `app` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `applied` DATETIME(6) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`django_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`django_session` (
  `session_key` VARCHAR(40) NOT NULL,
  `session_data` LONGTEXT NOT NULL,
  `expire_date` DATETIME(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  INDEX `django_session_expire_date_a5c62663` (`expire_date` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`pedido` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `fecha_pedido` DATE NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `id_carrito_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  UNIQUE INDEX `id_carrito_id` (`id_carrito_id` ASC) VISIBLE,
  CONSTRAINT `Pedido_id_carrito_id_74f0dc3a_fk_Carrito_id_carrito`
    FOREIGN KEY (`id_carrito_id`)
    REFERENCES `aymara_api_rest`.`carrito` (`id_carrito`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `aymara_api_rest`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aymara_api_rest`.`stock` (
  `id_stock` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT UNSIGNED NOT NULL,
  `id_producto_id` INT NOT NULL,
  PRIMARY KEY (`id_stock`),
  INDEX `Stock_id_producto_id_66eb9732_fk_Producto_id_producto` (`id_producto_id` ASC) VISIBLE,
  CONSTRAINT `Stock_id_producto_id_66eb9732_fk_Producto_id_producto`
    FOREIGN KEY (`id_producto_id`)
    REFERENCES `aymara_api_rest`.`producto` (`id_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
