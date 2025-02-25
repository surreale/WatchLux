-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: ora
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aszamlapszine`
--

DROP TABLE IF EXISTS `aszamlapszine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aszamlapszine` (
  `aszamlapszineaz` int NOT NULL AUTO_INCREMENT,
  `aszamlapszine` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`aszamlapszineaz`),
  UNIQUE KEY `UK_aszamlapszine_aszamlapszineaz` (`aszamlapszineaz`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=963 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aszamlapszine`
--

LOCK TABLES `aszamlapszine` WRITE;
/*!40000 ALTER TABLE `aszamlapszine` DISABLE KEYS */;
INSERT INTO `aszamlapszine` VALUES (1,'LCD'),(2,'Fekete'),(3,'Vöros arany'),(4,'Kék'),(5,'Többszínű'),(6,'Fehér'),(7,'Arany'),(8,'Ezüst'),(9,'Krém'),(10,'Piros'),(11,'Antracit'),(12,'Szürke'),(13,'Barna'),(14,'Gyöngyház'),(15,'Rózsaszín'),(16,'Lila'),(17,'Zöld');
/*!40000 ALTER TABLE `aszamlapszine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atok`
--

DROP TABLE IF EXISTS `atok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atok` (
  `atokaz` int NOT NULL AUTO_INCREMENT,
  `atok` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`atokaz`),
  UNIQUE KEY `UK_atok_atokaz` (`atokaz`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=1489 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atok`
--

LOCK TABLES `atok` WRITE;
/*!40000 ALTER TABLE `atok` DISABLE KEYS */;
INSERT INTO `atok` VALUES (1,'Rozsdamenetes acél-műanyag'),(2,'Rozsdamentes acél'),(3,'Acél - műanyag'),(4,'Rozsdamenetes acél-gumi'),(5,'Acél PVD bevonattal'),(6,'Műanyag'),(7,'Sárgaréz'),(8,'Titán'),(9,'Gyanta'),(10,'Általános fém'),(11,'Fekete Acél');
/*!40000 ALTER TABLE `atok` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atokszine`
--

DROP TABLE IF EXISTS `atokszine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atokszine` (
  `atokszineaz` int NOT NULL AUTO_INCREMENT,
  `atokszine` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`atokszineaz`),
  UNIQUE KEY `UK_atokszine_atokszineaz` (`atokszineaz`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=1024 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atokszine`
--

LOCK TABLES `atokszine` WRITE;
/*!40000 ALTER TABLE `atokszine` DISABLE KEYS */;
INSERT INTO `atokszine` VALUES (1,'Vörös arany'),(2,'Ezüst-Vörös Arany'),(3,'Arany-ezüst'),(4,'Fekete-ezüst'),(5,'Fekete acél'),(6,'Átlátszó, Szürke'),(7,'Arany'),(8,'Fekete'),(9,'Ezüst'),(10,'Szürke'),(11,'Piros'),(12,'Fehér'),(13,'Kék'),(14,'Barna'),(15,'Zöld'),(16,'Rózsaszín');
/*!40000 ALTER TABLE `atokszine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datumkijelzes`
--

DROP TABLE IF EXISTS `datumkijelzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datumkijelzes` (
  `datumkijelzesaz` int NOT NULL AUTO_INCREMENT,
  `datumkijelzes` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`datumkijelzesaz`),
  UNIQUE KEY `UK_datumkijelzes_datumkijelzesaz` (`datumkijelzesaz`),
  KEY `idx_datumkijelzesaz` (`datumkijelzesaz`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=8192 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datumkijelzes`
--

LOCK TABLES `datumkijelzes` WRITE;
/*!40000 ALTER TABLE `datumkijelzes` DISABLE KEYS */;
INSERT INTO `datumkijelzes` VALUES (1,'igen'),(2,'nem');
/*!40000 ALTER TABLE `datumkijelzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extrafunkcio`
--

DROP TABLE IF EXISTS `extrafunkcio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extrafunkcio` (
  `extrafunkcioaz` int NOT NULL AUTO_INCREMENT,
  `extrafunkcio` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`extrafunkcioaz`),
  UNIQUE KEY `UK_extrafunkcio_extrafunkcioaz` (`extrafunkcioaz`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=2730 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extrafunkcio`
--

LOCK TABLES `extrafunkcio` WRITE;
/*!40000 ALTER TABLE `extrafunkcio` DISABLE KEYS */;
INSERT INTO `extrafunkcio` VALUES (1,'Nincs'),(2,'Stopper, Kronográf, Riasztó, Éves naptár, Megvilágítás'),(3,'Riasztó, Megvilágítás, Rezgésálló, Éves naptár, Mágneses ellenállás, Stopper, Kronográf'),(4,'Stopper'),(5,'Kronográf'),(6,'Lumineszcens mutatók');
/*!40000 ALTER TABLE `extrafunkcio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `felhasznalok`
--

DROP TABLE IF EXISTS `felhasznalok`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `felhasznalok` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `felhasznalonev` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `jelszo` varchar(64) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `jogosultsag` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=3276 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `felhasznalok`
--

LOCK TABLES `felhasznalok` WRITE;
/*!40000 ALTER TABLE `felhasznalok` DISABLE KEYS */;
INSERT INTO `felhasznalok` VALUES (1,'Szilágyi István','UmNaPisti','f6665495852570cce1f1d9218e2a40ad0c13527b4ac8f066efb4ef205d69c01b','admin'),(2,'Makra Martin','spn','8495d92fbd59ead6498000efa60da4b188fed4baf533bc4554bc1316b954f49a','admin'),(3,'Ratkai Róbert','Remkiraly','2c77b9e91c375d03360817e326c5d17d208846f200a967503d04599a4b7a01f3','office'),(5,'Berényi Gergő','gergo','da56c9fbd03cc5d0c683ff8b2bfc6159865ecca38abfacc19b16afa90fe03042','admin'),(10,'f','f','252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111','admin');
/*!40000 ALTER TABLE `felhasznalok` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `hash_jelszo_insert` BEFORE INSERT ON `felhasznalok` FOR EACH ROW BEGIN
  SET NEW.jelszo = SHA2(NEW.jelszo, 256);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `hash_jelszo_update` BEFORE UPDATE ON `felhasznalok` FOR EACH ROW BEGIN
  SET NEW.jelszo = SHA2(NEW.jelszo, 256);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `fizetesmod`
--

DROP TABLE IF EXISTS `fizetesmod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fizetesmod` (
  `fizetesmodaz` int NOT NULL AUTO_INCREMENT,
  `fizetesmod` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`fizetesmodaz`),
  UNIQUE KEY `UK_fizetesmod_fizetesmodaz` (`fizetesmodaz`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=8192 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fizetesmod`
--

LOCK TABLES `fizetesmod` WRITE;
/*!40000 ALTER TABLE `fizetesmod` DISABLE KEYS */;
INSERT INTO `fizetesmod` VALUES (1,'Készpénz'),(2,'Bank kártya ');
/*!40000 ALTER TABLE `fizetesmod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jotallas`
--

DROP TABLE IF EXISTS `jotallas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jotallas` (
  `jotallasaz` int NOT NULL AUTO_INCREMENT,
  `jotallas` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`jotallasaz`),
  UNIQUE KEY `UK_jotallas_jotallasaz` (`jotallasaz`),
  KEY `idx_jotallasaz` (`jotallasaz`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=8192 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jotallas`
--

LOCK TABLES `jotallas` WRITE;
/*!40000 ALTER TABLE `jotallas` DISABLE KEYS */;
INSERT INTO `jotallas` VALUES (1,'24 hónap'),(2,'Citizen 5 év');
/*!40000 ALTER TABLE `jotallas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kristalyuveg`
--

DROP TABLE IF EXISTS `kristalyuveg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kristalyuveg` (
  `kristalyuvegaz` int NOT NULL AUTO_INCREMENT,
  `kristalyuveg` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`kristalyuvegaz`),
  UNIQUE KEY `UK_kristalyuveg_kristalyuvegaz` (`kristalyuvegaz`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=2340 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kristalyuveg`
--

LOCK TABLES `kristalyuveg` WRITE;
/*!40000 ALTER TABLE `kristalyuveg` DISABLE KEYS */;
INSERT INTO `kristalyuveg` VALUES (1,'Akrilát'),(2,'Ásványi'),(3,'Zafír'),(4,'Műanyag'),(5,'Szférikus'),(6,'Hardlex'),(7,'Ásványi, Műanyag');
/*!40000 ALTER TABLE `kristalyuveg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marka`
--

DROP TABLE IF EXISTS `marka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marka` (
  `markaaz` int NOT NULL AUTO_INCREMENT,
  `marka` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`markaaz`),
  UNIQUE KEY `UK_marka_markaaz` (`markaaz`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=585 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marka`
--

LOCK TABLES `marka` WRITE;
/*!40000 ALTER TABLE `marka` DISABLE KEYS */;
INSERT INTO `marka` VALUES (1,'Casio'),(2,'Emporio Armani'),(3,'Festina'),(4,'Tommy Hilfiger'),(5,'Fossil'),(6,'Michael Kors'),(7,'Diesel'),(8,'Citizen'),(9,'Zeppelin'),(10,'Seiko'),(11,'Daniel Wellington'),(12,'Guess'),(13,'Orient'),(14,'Rosefield'),(15,'Skagen'),(16,'DKNY'),(17,'MVMT'),(18,'Iron Annie'),(19,'Swiss Alpine Military'),(20,'Armani Exchange'),(21,'Tissot'),(22,'Marc Malone'),(23,'Lacoste'),(24,'Certina'),(25,'Olivia Burton'),(26,'Lorus'),(27,'Hugo Boss'),(28,'Anne Klein');
/*!40000 ALTER TABLE `marka` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maxcsuklomili`
--

DROP TABLE IF EXISTS `maxcsuklomili`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maxcsuklomili` (
  `maxcsuklomiliaz` int NOT NULL AUTO_INCREMENT,
  `maxcsuklomili` int DEFAULT NULL,
  PRIMARY KEY (`maxcsuklomiliaz`),
  UNIQUE KEY `UK_maxcsuklomili_maxcsuklomiliaz` (`maxcsuklomiliaz`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=963 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maxcsuklomili`
--

LOCK TABLES `maxcsuklomili` WRITE;
/*!40000 ALTER TABLE `maxcsuklomili` DISABLE KEYS */;
INSERT INTO `maxcsuklomili` VALUES (1,195),(2,205),(3,210),(4,200),(5,215),(6,220),(7,190),(8,185),(9,225),(10,170),(11,230),(12,180),(13,240),(14,175),(15,165),(16,160),(17,140);
/*!40000 ALTER TABLE `maxcsuklomili` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meghajtas`
--

DROP TABLE IF EXISTS `meghajtas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meghajtas` (
  `meghajtasaz` int NOT NULL AUTO_INCREMENT,
  `meghajtas` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`meghajtasaz`),
  UNIQUE KEY `UK_meghajtas_meghajtasaz` (`meghajtasaz`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=4096 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meghajtas`
--

LOCK TABLES `meghajtas` WRITE;
/*!40000 ALTER TABLE `meghajtas` DISABLE KEYS */;
INSERT INTO `meghajtas` VALUES (1,'Quartz (elem)'),(2,'Automatikus / kinetikus'),(3,'Szoláris'),(4,'Citizen Eco-Drive');
/*!40000 ALTER TABLE `meghajtas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `megrendeles`
--

DROP TABLE IF EXISTS `megrendeles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `megrendeles` (
  `megrendelesaz` int NOT NULL AUTO_INCREMENT,
  `oraaz` int DEFAULT NULL,
  `szamlaaz` int DEFAULT NULL,
  `db` int DEFAULT NULL,
  `datum` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`megrendelesaz`),
  KEY `FK_megrendeles_oraaz` (`oraaz`),
  KEY `FK_megrendeles_szamlaaz` (`szamlaaz`),
  CONSTRAINT `FK_megrendeles_oraaz` FOREIGN KEY (`oraaz`) REFERENCES `ora` (`oraaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_megrendeles_szamlaaz` FOREIGN KEY (`szamlaaz`) REFERENCES `szamla` (`szamlaaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `megrendeles_chk_1` CHECK ((`db` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=8192 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `megrendeles`
--

LOCK TABLES `megrendeles` WRITE;
/*!40000 ALTER TABLE `megrendeles` DISABLE KEYS */;
INSERT INTO `megrendeles` VALUES (1,1,1,1,'2024-12-06 00:00:00'),(2,6,2,2,'2025-01-11 01:39:00');
/*!40000 ALTER TABLE `megrendeles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nem`
--

DROP TABLE IF EXISTS `nem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nem` (
  `nemaz` int NOT NULL AUTO_INCREMENT,
  `nem` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`nemaz`),
  UNIQUE KEY `UK_nem_nemaz` (`nemaz`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=8192 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nem`
--

LOCK TABLES `nem` WRITE;
/*!40000 ALTER TABLE `nem` DISABLE KEYS */;
INSERT INTO `nem` VALUES (1,'Férfi'),(2,'Női');
/*!40000 ALTER TABLE `nem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ora`
--

DROP TABLE IF EXISTS `ora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ora` (
  `oraaz` int NOT NULL AUTO_INCREMENT,
  `megnevezes` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `kep1` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `kep2` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `kep3` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `raktaraz` int DEFAULT NULL,
  `ar` int DEFAULT NULL,
  `cikszam` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `markaaz` int DEFAULT NULL,
  `nemaz` int DEFAULT NULL,
  `meghajtasaz` int DEFAULT NULL,
  `vizallosagaz` int DEFAULT NULL,
  `jotallasaz` int DEFAULT NULL,
  `meretmillimeterben` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `sulygrammbanaz` int DEFAULT NULL,
  `tipusaz` int DEFAULT NULL,
  `datumkijelzesaz` int DEFAULT NULL,
  `extrafunkcioaz` int DEFAULT NULL,
  `atokszineaz` int DEFAULT NULL,
  `aszamlapszineaz` int DEFAULT NULL,
  `atokaz` int DEFAULT NULL,
  `kristalyuvegaz` int DEFAULT NULL,
  `szamlaptipusaz` int DEFAULT NULL,
  `oraformaaz` int DEFAULT NULL,
  `szijszineaz` int DEFAULT NULL,
  `szijaz` int DEFAULT NULL,
  `maxcsuklomiliaz` int DEFAULT NULL,
  `db` int DEFAULT '0',
  PRIMARY KEY (`oraaz`),
  KEY `idx_szamlaptipusaz` (`szamlaptipusaz`),
  KEY `idx_nemaz` (`nemaz`),
  KEY `idx_markaaz` (`markaaz`),
  KEY `FK_ora_aszamlapszineaz` (`aszamlapszineaz`),
  KEY `FK_ora_atokaz` (`atokaz`),
  KEY `FK_ora_atokszineaz` (`atokszineaz`),
  KEY `FK_ora_datumkijelzesaz` (`datumkijelzesaz`),
  KEY `FK_ora_extrafunkcioaz` (`extrafunkcioaz`),
  KEY `FK_ora_jotallasaz` (`jotallasaz`),
  KEY `FK_ora_kristalyuvegaz` (`kristalyuvegaz`),
  KEY `FK_ora_maghajtasaz` (`meghajtasaz`),
  KEY `FK_ora_maxcsuklomiliaz` (`maxcsuklomiliaz`),
  KEY `FK_ora_oraformaaz` (`oraformaaz`),
  KEY `FK_ora_raktaraz` (`raktaraz`),
  KEY `FK_ora_sulygrammbanaz` (`sulygrammbanaz`),
  KEY `FK_ora_szijaz` (`szijaz`),
  KEY `FK_ora_szijszineaz` (`szijszineaz`),
  KEY `FK_ora_tipusaz` (`tipusaz`),
  KEY `FK_ora_vizallosagaz` (`vizallosagaz`),
  CONSTRAINT `FK_ora_aszamlapszineaz` FOREIGN KEY (`aszamlapszineaz`) REFERENCES `aszamlapszine` (`aszamlapszineaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_atokaz` FOREIGN KEY (`atokaz`) REFERENCES `atok` (`atokaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_atokszineaz` FOREIGN KEY (`atokszineaz`) REFERENCES `atokszine` (`atokszineaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_datumkijelzesaz` FOREIGN KEY (`datumkijelzesaz`) REFERENCES `datumkijelzes` (`datumkijelzesaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_extrafunkcioaz` FOREIGN KEY (`extrafunkcioaz`) REFERENCES `extrafunkcio` (`extrafunkcioaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_jotallasaz` FOREIGN KEY (`jotallasaz`) REFERENCES `jotallas` (`jotallasaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_kristalyuvegaz` FOREIGN KEY (`kristalyuvegaz`) REFERENCES `kristalyuveg` (`kristalyuvegaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_maghajtasaz` FOREIGN KEY (`meghajtasaz`) REFERENCES `meghajtas` (`meghajtasaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_markaaz` FOREIGN KEY (`markaaz`) REFERENCES `marka` (`markaaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_maxcsuklomiliaz` FOREIGN KEY (`maxcsuklomiliaz`) REFERENCES `maxcsuklomili` (`maxcsuklomiliaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_nemaz` FOREIGN KEY (`nemaz`) REFERENCES `nem` (`nemaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_oraformaaz` FOREIGN KEY (`oraformaaz`) REFERENCES `oraforma` (`oraformaaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_raktaraz` FOREIGN KEY (`raktaraz`) REFERENCES `raktar` (`raktaraz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_sulygrammbanaz` FOREIGN KEY (`sulygrammbanaz`) REFERENCES `sulygrammban` (`sulygrammbanaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_szamlaptipusaz` FOREIGN KEY (`szamlaptipusaz`) REFERENCES `szamlaptipus` (`szamlaptipusaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_szijaz` FOREIGN KEY (`szijaz`) REFERENCES `szij` (`szijaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_szijszineaz` FOREIGN KEY (`szijszineaz`) REFERENCES `szijszine` (`szijszineaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_tipusaz` FOREIGN KEY (`tipusaz`) REFERENCES `tipus` (`tipusaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ora_vizallosagaz` FOREIGN KEY (`vizallosagaz`) REFERENCES `vizallosag` (`vizallosagaz`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=555 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=270 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ora`
--

LOCK TABLES `ora` WRITE;
/*!40000 ALTER TABLE `ora` DISABLE KEYS */;
INSERT INTO `ora` VALUES (1,'Casio Vintage A168WG-9EF','1.jpeg','1.1.jpeg','1.2.jpeg',1,20790,'A168WG-9EF',1,1,1,1,1,'38,6 x 36,3 x 9,6',2,1,1,2,7,1,1,1,1,1,5,1,1,100),(2,'Casio G-Shock GA-100-1A1ER','2.jpeg','2.1.jpeg','2.2.jpeg',3,40990,'GA-100-1A1ER',1,1,1,2,1,'50 x 16',3,2,1,3,8,2,6,2,2,2,6,2,2,80),(3,'Emporio Armani Chrono AR5905','3.jpeg','3.1.jpeg','3.2.jpeg',3,34990,'AR5905',2,1,1,3,1,'46 x 43 x 12',1,2,1,1,1,2,2,2,3,2,6,3,3,80),(4,'Casio Edifice EF-527D-1AVEF','4.jpeg','4.1.jpeg','4.2.jpeg',1,54500,'EF-527D-1AVEF',1,1,1,4,1,'51 x 45 x 11',4,2,1,4,9,2,2,2,3,2,7,1,3,100),(5,'Emporio Armani Chronograph AR2448','5.jpeg','5.1.jpeg','5.2.jpeg',1,45010,'AR2448',2,1,1,3,1,'43 x 11',1,1,1,5,9,4,2,2,3,2,7,1,4,100),(6,'Festina Automatic 235/1','6.jpeg','6.1.jpeg','6.2.jpeg',1,85915,'235/1',3,1,2,3,1,'41,5 x 35',1,1,2,1,10,5,2,3,3,2,8,1,4,100),(7,'Festina Ceramic 215/2','7.jpeg','7.1.jpeg','7.2.jpeg',1,66270,'215/2',3,1,1,4,1,'44 x 34',1,1,1,1,4,2,2,3,3,2,6,3,4,100),(8,'Festina Ceramic 216/1','8.jpeg','8.1.jpeg','8.2.jpeg',1,71505,'216/1',3,1,1,4,1,'44 x 12,5',1,2,1,6,1,4,2,2,3,2,9,3,3,100),(9,'Festina Classics 212/1','9.jpeg','9.1.jpeg','9.2.jpeg',1,31285,'212/1',3,1,1,3,1,'39',1,1,1,6,9,6,2,2,3,2,10,4,5,100),(10,'Festina Chrono Sport 217/1','10.jpeg','10.1.jpeg','10.2.jpeg',1,50345,'217/1',3,1,1,4,1,'44',1,2,1,6,9,4,2,2,3,2,9,3,6,100),(11,'Festina Chrono Sport 219/3','11.jpeg','11.1.jpeg','11.2.jpeg',1,53980,'219/3',3,1,1,4,1,'45 x 12',1,2,1,5,8,2,2,2,3,2,9,4,3,100),(12,'Casio Collection AE-1200WHD-1AVEF','12.jpeg','12.1.jpeg','12.2.jpeg',1,18380,'AE-1200WHD-1AVEF',1,1,1,4,1,'42 x 13',1,1,1,6,9,1,3,4,1,3,7,1,4,100),(13,'Tommy Hilfiger Decker 1791476','13.jpeg','13.1.jpeg','13.2.jpeg',1,39220,'1791476',4,1,1,3,1,'46 x 12,7',1,2,1,6,9,4,2,2,3,2,9,3,4,100),(14,'Casio Retro W-59-1VQES','14.jpeg','14.1.jpeg','14.2.jpeg',3,8990,'W-59-1VQES',1,1,1,3,1,'34 x 9',1,2,1,6,8,1,1,1,1,1,6,2,4,80),(15,'Casio Edifice EFR-539D-1A2VUEF','15.jpeg','15.1.jpeg','15.2.jpeg',3,49990,'EFR-539D-1A2VUEF',1,1,1,4,1,'50 x 54 x 12',5,2,1,6,9,2,2,2,3,2,7,1,5,80),(16,'Fossil Nate JR1401','16.jpeg','16.1.jpeg','16.2.jpeg',3,48990,'JR1401',5,1,1,4,1,'51 x 14',1,1,1,5,8,2,5,2,3,2,6,5,4,80),(17,'Casio Retro DBC-32D-1AES','17.jpeg','17.1.jpeg','17.2.jpeg',3,19990,'DBC-32D-1AES',1,1,1,5,1,'50,4 x 37,4 x 12',6,1,1,6,9,1,9,5,1,1,7,1,3,80),(18,'Emporio Armani Chronograph AR2447','18.jpeg','18.1.jpeg','18.2.jpeg',1,44725,'AR2447',2,1,1,3,1,'43 x 12',1,1,1,5,9,2,2,2,3,2,6,4,4,100),(19,'Michael Kors Lexington MK8281','19.jpeg','19.1.jpeg','19.2.jpeg',1,54470,'MK8281',6,1,1,4,1,'45 x 13',1,1,1,5,7,7,2,2,3,2,5,1,4,100),(20,'Casio Retro A164WA-1VES','20.jpeg','20.1.jpeg','20.2.jpeg',1,15475,'A164WA-1VES',1,1,1,1,1,'33x8',1,1,1,1,9,1,6,4,1,1,7,1,1,100),(21,'Casio G-Shock GA-100-1A2ER','21.jpeg','21.1.jpeg','21.2.jpeg',1,37900,'GA-100-1A2ER',1,1,1,2,1,'52 x 17',1,2,1,1,8,2,6,2,2,2,6,2,2,100),(22,'Casio G-Shock GX-56BB-1ER','22.jpeg','22.1.jpeg','22.2.jpeg',1,53290,'GX-56BB-1ER',1,1,3,2,1,'55,5 x 53,6 x 17,5',7,2,1,6,8,1,9,2,1,1,6,6,4,100),(23,'Emporio Armani Chrono AR2434','23.jpeg','23.1.jpeg','23.2.jpeg',1,45390,'AR2434',2,1,1,3,1,'43 x 14',1,4,1,5,9,2,2,2,3,2,7,1,4,100),(24,'Tommy Hilfiger Trent 1791066','24.jpeg','24.1.jpeg','24.2.jpeg',1,51190,'1791066',4,1,1,3,1,'46',1,3,1,6,9,4,4,2,3,2,10,4,4,100),(25,'Diesel Mega Chief DZ4329','25.jpeg','25.1.jpeg','25.2.jpeg',1,64150,'DZ4329',7,1,1,4,1,'58 x 53,5 x 13,8',8,1,1,5,10,4,2,2,3,2,8,1,4,100),(26,'Casio G-Shock GA-100-1A4ER','26.jpeg','26.1.jpeg','26.2.jpeg',1,38685,'GA-100-1A4ER',1,1,1,2,1,'51,2 x 16,9',1,2,1,6,8,2,1,2,2,2,6,2,2,100),(27,'Diesel Mega Chief DZ4360','27.jpeg','27.1.jpeg','27.2.jpeg',1,44440,'DZ4360',7,1,1,4,1,'51 x 44 x12',9,3,1,5,7,7,2,2,3,2,5,1,3,100),(28,'Emporio Armani AR5857','28.jpeg','28.1.jpeg','28.2.jpeg',3,46990,'AR5857',2,1,1,3,1,'43',1,1,1,6,7,2,2,2,3,2,5,1,3,80),(29,'Casio Collection AE-1000W-1AVEF','29.jpeg','29.1.jpeg','29.2.jpeg',3,13990,'AE-1000W-1AVEF',1,1,1,4,1,'43 x 13',1,2,1,6,8,1,1,4,1,2,6,2,4,80),(30,'Casio Vintage A159WGEA-1EF','30.jpeg','30.1.jpeg','30.2.jpeg',3,20990,'A159WGEA-1EF',1,1,1,1,1,'33 x 8',1,1,1,1,7,1,1,1,1,1,5,1,1,80),(31,'Casio G-Shock GA-100B-4AER','31.jpeg','31.1.jpeg','31.2.jpeg',3,40990,'GA-100B-4AER',1,1,1,2,1,'52 x 17',1,2,1,1,11,2,6,2,2,2,11,2,2,80),(32,'Casio Retro DBC-32-1AES','32.jpeg','32.1.jpeg','32.2.jpeg',1,18285,'DBC-32-1AES',1,1,1,1,1,'44 x 8',1,1,1,1,8,1,6,1,1,1,6,2,3,100),(33,'Casio Edifice EF-129D-2AVEF','33.jpeg','33.1.jpeg','33.2.jpeg',3,29990,'EF-129D-2AVEF',1,1,1,4,1,'49 x 44,8 x 10,4',10,1,1,6,9,4,2,2,3,2,7,1,7,80),(34,'Casio Radio Controlled LCW-M100DSE-2AER','34.jpeg','34.1.jpeg','34.2.jpeg',1,78130,'LCW-M100DSE-2AER',1,1,3,3,1,'43,8 x 40,0 x 9,4',1,2,1,6,9,4,2,3,2,2,7,1,4,100),(35,'Casio Collection AE-1000WD-1AVEF','35.jpeg','35.1.jpeg','35.2.jpeg',1,19940,'AE-1000WD-1AVEF',1,1,1,4,1,'48 x 14',1,2,1,6,9,1,6,2,1,2,7,1,3,100),(36,'Casio Vintage B640WB-1BEF','36.jpeg','36.1.jpeg','36.2.jpeg',1,27260,'B640WB-1BEF',1,1,1,3,1,'33 x 8',1,1,1,6,8,1,6,2,1,1,6,1,8,100),(37,'Diesel Mr. Daddy DZ7313','37.jpeg','37.1.jpeg','37.2.jpeg',1,60400,'DZ7313',7,1,1,1,1,'57 x 57 x 13',1,1,1,6,8,2,2,2,3,2,6,4,4,100),(38,'Casio Collection AE-2000W-1AVEF','38.jpeg','38.1.jpeg','38.2.jpeg',1,23800,'AE-2000W-1AVEF',1,1,1,2,1,'45 x 15',11,2,1,6,9,1,1,2,1,2,6,2,2,100),(39,'Emporio Armani Classic AR2453','39.jpeg','39.1.jpeg','39.2.jpeg',1,55585,'AR2453',2,1,1,3,1,'43 x 43 x 11',1,1,1,6,8,2,2,2,3,2,6,1,4,100),(40,'Casio Edifice EF-125D-2AVEF','40.jpeg','40.1.jpeg','40.2.jpeg',3,31990,'EF-125D-2AVEF',1,1,1,4,1,'48,60 x 40,00 x 9,90',1,4,1,1,9,4,2,2,3,2,7,1,3,80),(41,'Casio Edifice EF-316D-1AVEF','41.jpeg','41.1.jpeg','41.2.jpeg',1,29690,'EF-316D-1AVEF',1,1,1,4,1,'40 x 9',1,1,1,1,9,2,2,2,3,2,7,1,4,100),(42,'Casio Collection MTP-1259PD-7BEF','42.jpeg','42.1.jpeg','42.2.jpeg',1,18510,'MTP-1259PD-7BEF',1,1,1,1,1,'36 x 42 x 7',7,1,1,6,9,6,7,2,3,2,7,1,4,100),(43,'Casio G-Shock AWG-M100B-1AER','43.jpeg','43.1.jpeg','43.2.jpeg',1,50895,'AWG-M100B-1AER',1,1,3,2,1,'52 x 46,4 x 14,9',7,2,1,6,8,2,6,2,2,2,6,2,2,100),(44,'Festina The Originals 20330/5','44.jpeg','44.1.jpeg','44.2.jpeg',1,54070,'20330/5',3,1,1,4,1,'47',1,5,1,5,4,2,2,2,3,2,6,3,3,100),(45,'Casio Collection AW-49H-1BVEF','45.jpeg','45.1.jpeg','45.2.jpeg',3,9990,'AW-49H-1BVEF',1,1,1,3,1,'44 x 10',1,1,1,1,8,2,6,5,2,2,6,2,4,80),(46,'Casio Edifice EFR-526L-7AVUEF','46.jpeg','46.1.jpeg','46.2.jpeg',1,45550,'EFR-526L-7AVUEF',1,1,1,4,1,'48,5 x 43,8 x 11,6',1,4,1,4,9,6,2,2,3,2,10,4,4,100),(47,'Casio Collection MRW-200H-1BVEF','47.jpeg','47.1.jpeg','47.2.jpeg',1,14525,'MRW-200H-1BVEF',1,1,1,4,1,'40 x 13',1,1,1,1,8,2,6,4,3,2,6,2,3,100),(48,'Casio Edifice EFR-556D-1AVUEF','48.jpeg','48.1.jpeg','48.2.jpeg',1,45830,'EFR-556D-1AVUEF',1,1,1,4,1,'53,5 x 48,7 x 12,6',7,2,1,6,9,2,2,2,3,2,7,1,6,100),(49,'Casio Edifice EFR-526L-1AVUEF','49.jpeg','49.1.jpeg','49.2.jpeg',1,37395,'EFR-526L-1AVUEF',1,1,1,4,1,'48,5 x 43,8 x 11,6',1,4,1,4,9,2,2,2,3,2,6,4,1,100),(50,'Casio Edifice EF-129D-1AVEF','50.jpeg','50.1.jpeg','50.2.jpeg',1,31495,'EF-129D-1AVEF',1,1,1,4,1,'49',10,1,1,1,9,2,2,2,3,2,7,1,7,100),(51,'Casio Edifice EFR-539D-1AVUEF','51.jpeg','51.1.jpeg','51.2.jpeg',1,67015,'EFR-539D-1AVUEF',1,1,1,4,1,'54,1 x 49,5 x 11,7',11,4,1,6,9,2,2,2,3,2,7,1,3,100),(52,'Citizen Eco-Drive CA0690-88L','52.jpeg','52.1.jpeg','52.2.jpeg',1,80500,'CA0690-88L',8,1,3,4,2,'44 x 13',4,1,1,6,9,4,2,2,3,2,7,1,1,100),(53,'Casio Collection W-800H-1AVES','53.jpeg','53.1.jpeg','53.2.jpeg',3,11990,'W-800H-1AVES',1,1,1,4,1,'44 x 14',1,1,1,1,8,1,6,4,1,1,6,2,5,80),(54,'Casio Collection AE-1200WH-1AVEF','54.jpeg','54.1.jpeg','54.2.jpeg',3,13990,'AE-1200WH-1AVEF',1,1,1,4,1,'42 x 13',1,1,1,1,8,1,6,1,1,1,6,2,9,80),(55,'Casio Retro A158WEA-9EF','55.jpeg','55.1.jpeg','55.2.jpeg',3,15990,'A158WEA-9EF',1,1,1,1,1,'33 x 8',1,1,1,1,9,1,1,1,1,1,7,1,7,80),(56,'Casio Collection AQ-S800W-1BVEF','56.jpeg','56.1.jpeg','56.2.jpeg',3,22990,'AQ-S800W-1BVEF',1,1,3,4,1,'47,6 x 42 x 10,6',7,2,1,6,8,2,1,4,2,2,6,2,4,80),(57,'Casio G-Shock GA-110-1BER','57.jpeg','57.1.jpeg','57.2.jpeg',1,44035,'GA-110-1BER',1,1,1,2,1,'51 x 16',7,2,1,6,8,2,6,2,2,2,6,2,2,100),(58,'Casio Collection AE-1000W-1BVEF','58.jpeg','58.1.jpeg','58.2.jpeg',1,13715,'AE-1000W-1BVEF',1,1,1,4,1,'44 x 14',1,1,1,1,8,1,6,4,1,2,6,2,4,100),(59,'Casio Collection AW-80-1AVES','59.jpeg','59.1.jpeg','59.2.jpeg',3,12990,'AW-80-1AVES',1,1,1,3,1,'46.8',7,2,1,6,9,2,9,4,2,2,6,6,2,80),(60,'Tommy Hilfiger Chase 1791487','60.jpeg','60.1.jpeg','60.2.jpeg',1,51255,'1791487',4,1,1,3,1,'44 x 52 x 10',7,1,1,6,9,4,2,2,3,2,10,4,4,100),(61,'Festina Retro 16573/1','61.jpeg','61.1.jpeg','61.2.jpeg',3,28990,'16573/1',3,1,1,3,1,'45 x 45',1,1,1,1,9,8,2,2,3,2,6,4,4,80),(62,'Casio Collection MQ-24-7BLLGF','62.jpeg','62.1.jpeg','62.2.jpeg',3,5990,'MQ-24-7BLLGF',1,1,1,1,1,'35 x 7',1,1,2,1,8,6,3,4,3,2,6,2,4,80),(63,'Casio Sports Leisure W-96H-1AVES','63.jpeg','63.1.jpeg','63.2.jpeg',1,15820,'W-96H-1AVES',1,1,1,3,1,'38 x 12',1,2,1,6,9,1,1,4,1,1,6,2,4,100),(64,'Casio G-Shock GW-7900B-1ER','64.jpeg','64.1.jpeg','64.2.jpeg',1,59725,'GW-7900B-1ER',1,1,3,2,1,'50 x 18',7,2,1,6,8,1,6,2,1,2,6,2,2,100),(65,'Fossil Coachman CH2564','65.jpeg','65.1.jpeg','65.2.jpeg',3,39990,'CH2564',5,1,1,4,1,'44 x 13',7,1,1,5,9,4,2,2,3,2,6,4,2,80),(66,'Emporio Armani AR2432','66.jpeg','66.1.jpeg','66.2.jpeg',1,36875,'AR2432',2,1,1,3,1,'43',1,1,1,5,9,8,2,2,3,2,6,4,1,100),(67,'Casio Edifice EF-539D-1AVEF','67.jpeg','67.1.jpeg','67.2.jpeg',3,45990,'EF-539D-1AVEF',1,1,1,4,1,'48 x 11',1,2,1,6,9,2,2,2,3,2,7,1,5,80),(68,'Citizen Promaster BN0150-10E','68.jpeg','68.1.jpeg','68.2.jpeg',1,85630,'BN0150-10E',8,1,3,2,2,'44 x 12',7,2,1,6,4,2,2,2,3,2,6,3,3,100),(69,'Casio Collection AQ-S810W-1AVEF','69.jpeg','69.1.jpeg','69.2.jpeg',3,22990,'AQ-S810W-1AVEF',1,1,3,4,1,'46,6 x 52,2',1,1,1,1,8,2,6,4,2,2,6,2,3,80),(70,'Casio Retro A163WA-1QES','70.jpeg','70.1.jpeg','70.2.jpeg',3,14990,'A163WA-1QES',1,1,1,1,1,'34 x 10',7,1,1,6,9,1,9,1,1,1,7,1,4,80),(71,'Casio G-Shock GA-2000-1A9ER','71.jpeg','71.1.jpeg','71.2.jpeg',1,62400,'GA-2000-1A9ER',1,1,1,2,1,'48,7 x 51,2 x 14,1',7,2,1,6,8,2,6,2,3,2,6,2,4,100),(72,'Festina Timeless Chronograph 16760/3','72.jpeg','72.1.jpeg','72.2.jpeg',1,56905,'16760/3',3,1,1,3,1,'44 x 44 x 12',7,1,1,6,9,4,2,2,3,2,9,4,4,100),(73,'Casio Edifice EF-125D-1AVEF','73.jpeg','73.1.jpeg','73.2.jpeg',3,30990,'EF-125D-1AVEF',1,1,1,4,1,'48.6',7,1,1,1,9,2,2,2,3,2,7,1,2,80),(74,'Zeppelin LZ127 Graf Zeppelin 7642-5','74.jpeg','74.1.jpeg','74.2.jpeg',1,85405,'2097345',9,1,1,3,1,'42',1,4,1,6,9,9,2,2,3,2,10,4,2,100),(75,'Festina Timeless Chronograph 16760/4','75.jpeg','75.1.jpeg','75.2.jpeg',1,40980,'16760/4',3,1,1,3,1,'44 x 51 x 11',7,2,1,6,9,2,2,2,3,2,6,4,4,100),(76,'Tommy Hilfiger Kane 1791398','76.jpeg','76.1.jpeg','76.2.jpeg',1,64620,'1791398',4,1,1,1,1,'44 x 11',7,2,1,6,9,4,2,2,3,2,7,1,2,100),(77,'Fossil The Minimalist FS5305','77.jpeg','77.1.jpeg','77.2.jpeg',1,45670,'FS5305',5,1,1,3,1,'44',1,1,2,1,8,2,5,2,3,2,10,4,2,100),(78,'Citizen Promaster BN0151-17L','78.jpeg','78.1.jpeg','78.2.jpeg',1,81115,'BN0151-17L',8,1,4,2,2,'44 x 44 x 12',7,1,1,6,9,4,2,2,3,2,9,3,3,100),(79,'Casio G-Shock GA-100B-7AER','79.jpeg','79.1.jpeg','79.2.jpeg',3,37990,'GA-100B-7AER',1,1,1,2,1,'55 x 51,2 x 16,9',3,2,1,6,12,2,6,2,2,2,12,2,2,80),(80,'Casio Edifice EFR-556DB-1AVUEF','80.jpeg','80.1.jpeg','80.2.jpeg',3,46990,'EFR-556DB-1AVUEF',1,1,1,4,1,'53,5 x 48,7 x 12,6',7,2,1,6,9,2,2,2,3,2,7,1,6,80),(81,'Tommy Hilfiger Daniel 1710381','81.jpeg','81.1.jpeg','81.2.jpeg',1,38705,'1710381',4,1,1,3,1,'44',1,6,1,6,9,2,2,2,3,2,6,4,4,100),(82,'Diesel Mega Chief DZ4318','82.jpeg','82.1.jpeg','82.2.jpeg',1,44440,'DZ4318',7,1,1,4,1,'54 x 14',7,1,1,4,8,5,2,2,3,2,6,1,6,100),(83,'Casio Edifice EFR-552D-1AVUEF','83.jpeg','83.1.jpeg','83.2.jpeg',1,37370,'EFR-552D-1AVUEF',1,1,1,4,1,'53 x 47 x 12,3',4,2,1,6,9,2,2,2,3,2,7,1,2,100),(84,'Casio Edifice EFR-552D-1A2VUEF','84.jpeg','84.1.jpeg','84.2.jpeg',1,37595,'EFR-552D-1A2VUEF',1,1,1,4,1,'53 x 47 x 12,3',4,1,1,6,9,2,2,2,3,2,7,1,2,100),(85,'Casio G-Shock GA-710GB-1AER','85.jpeg','85.1.jpeg','85.2.jpeg',1,56775,'GA-710GB-1AER',1,1,1,2,1,'55 x 51,2 x 16,9',7,2,1,6,8,7,1,2,2,2,6,2,11,100),(86,'Casio Edifice EF-539D-1A2VEF','86.jpeg','86.1.jpeg','86.2.jpeg',3,46990,'EF-539D-1A2VEF',1,1,1,4,1,'48 x 11',1,2,1,6,9,2,2,2,3,2,7,1,3,80),(87,'Tommy Hilfiger Gavin 1791471','87.jpeg','87.1.jpeg','87.2.jpeg',1,48215,'1791471',4,1,1,3,1,'44 x 9,7',1,2,1,6,13,4,2,2,3,2,9,1,3,100),(89,'Diesel Mega Chief DZ4355','89.jpeg','89.1.jpeg','89.2.jpeg',1,46275,'DZ4355',7,1,1,4,1,'53 x 62 x 15',1,2,1,6,8,2,2,2,3,2,6,1,4,100),(90,'Casio Collection F-91W-1YEF','90.jpeg','90.1.jpeg','90.2.jpeg',3,7990,'F-91W-1YEF',1,1,1,1,1,'38,20 x 33,20 x 8,50',1,1,1,6,8,1,6,4,1,1,6,7,1,80),(91,'Casio G-Shock GBA-800-1AER','91.jpeg','91.1.jpeg','91.2.jpeg',1,43310,'GBA-800-1AER',1,1,1,2,1,'54,10 x 48,60 x 15,50',7,2,1,6,8,2,9,2,2,2,6,6,2,100),(92,'Citizen Promaster NY0040-09EE','92.jpeg','92.1.jpeg','92.2.jpeg',1,98740,'NY0040-09EE',8,1,2,2,2,'41',1,4,1,6,4,2,2,2,3,2,6,3,2,100),(93,'Fossil The Minimalist FS5308','93.jpeg','93.1.jpeg','93.2.jpeg',1,51910,'FS5308',5,1,1,3,1,'44 x 50 x 8',7,1,2,1,8,2,5,2,3,2,6,5,4,100),(94,'Fossil Machine FS4487','94.jpeg','94.1.jpeg','94.2.jpeg',1,54620,'FS4487',5,1,1,3,1,'45 x 13',1,1,1,5,5,2,11,2,3,2,6,3,6,100),(95,'Citizen Radio Controlled AT9036-08E','95.jpeg','95.1.jpeg','95.2.jpeg',1,151860,'AT9036-08E',8,1,3,2,2,'44 x 12',3,1,1,6,4,2,2,3,3,2,6,4,4,100),(96,'Casio G-Shock DW-5600HR-1ER','96.jpeg','96.1.jpeg','96.2.jpeg',1,49995,'DW-5600HR-1ER',1,1,1,2,1,'48,9 x 42,8 x 13,4',7,2,1,6,8,1,1,2,1,1,6,6,11,100),(97,'Citizen Radio Controlled AT9030-55L','97.jpeg','97.1.jpeg','97.2.jpeg',1,168675,'AT9030-55L',8,1,3,2,2,'44 x 44 x 12',7,1,1,6,9,4,2,3,3,2,7,1,4,100),(98,'Casio Retro B640WD-1AVEF','98.jpeg','98.1.jpeg','98.2.jpeg',1,14525,'B640WD-1AVEF',1,1,1,3,1,'38 x 35 x 9',1,1,1,6,9,1,6,4,1,1,7,1,1,100),(99,'Festina Retro 16573/7','99.jpeg','99.1.jpeg','99.2.jpeg',3,28990,'16573/7',3,1,1,3,1,'44.9',1,1,1,6,9,4,2,2,3,2,9,4,4,80),(100,'Citizen Radio Controlled CB5000-50L','100.jpeg','100.1.jpeg','100.2.jpeg',1,176320,'CB5000-50L',8,1,3,2,2,'45 x 14',1,2,1,6,9,4,2,3,3,2,7,1,4,100),(101,'Casio Collection MTP-1314PL-7AVEF','101.jpeg','101.1.jpeg','101.2.jpeg',1,17945,'MTP-1314PL-7AVEF',1,1,1,3,1,'45 x 10',1,1,1,6,9,6,7,2,3,2,10,4,4,100),(102,'Casio Collection AEQ-110W-1AVEF','102.jpeg','102.1.jpeg','102.2.jpeg',1,22190,'AEQ-110W-1AVEF',1,1,1,4,1,'47 x 53 x 16',7,2,1,6,8,2,6,4,2,2,6,2,3,100),(103,'Festina The Originals 20330/2','103.jpeg','103.1.jpeg','103.2.jpeg',1,66660,'20330/2',3,1,1,4,1,'47 x 13',1,5,1,5,9,4,2,2,3,2,9,3,5,100),(104,'Festina Retro 16573/4','104.jpeg','104.1.jpeg','104.2.jpeg',1,37295,'16573/4',3,1,1,3,1,'45 x 45',1,1,1,1,9,2,2,2,3,2,10,4,4,100),(105,'Seiko 5 SNKA05K1','105.jpeg','105.1.jpeg','105.2.jpeg',1,72595,'SNKA05K1',10,1,2,1,1,'37 x 11',1,1,1,6,9,4,2,6,3,2,7,1,4,100),(106,'Casio Collection MCW-200H-1AVEF','106.jpeg','106.1.jpeg','106.2.jpeg',3,22990,'MCW-200H-1AVEF',1,1,1,4,1,'55,8 x 53,5 x 14,1',7,2,1,6,8,2,6,4,3,2,6,2,3,80),(107,'Tommy Hilfiger Daniel 1710383','107.jpeg','107.1.jpeg','107.2.jpeg',1,40000,'1710383',4,1,1,3,1,'44',1,1,1,6,8,2,2,2,3,2,6,1,12,100),(108,'Casio Edifice EFR-556L-1AVUEF','108.jpeg','108.1.jpeg','108.2.jpeg',3,41990,'EFR-556L-1AVUEF',1,1,1,4,1,'53,5 x 48,7 x 12,6',7,2,1,6,9,2,2,2,3,2,6,4,6,80),(109,'Fossil Grant FS5151','109.jpeg','109.1.jpeg','109.2.jpeg',3,39990,'FS5151',5,1,1,3,1,'44 x 12',1,2,1,6,9,4,2,2,3,2,10,4,6,80),(110,'Tommy Hilfiger Decker 1791473','110.jpeg','110.1.jpeg','110.2.jpeg',1,43115,'1791473',4,1,1,3,1,'46 x 12,7',1,2,1,6,9,2,2,2,3,2,6,3,4,100),(111,'Citizen Eco-Drive CA0695-84E','111.jpeg','111.1.jpeg','111.2.jpeg',1,87870,'CA0695-84E',8,1,3,4,2,'44 x 13',4,2,1,6,8,2,2,2,3,2,6,1,4,100),(112,'Casio G-Shock GBD-800UC-5ER','112.jpeg','112.1.jpeg','112.2.jpeg',1,40920,'GBD-800UC-5ER',1,1,1,2,1,'54,1 x 48,6 x 15,5',7,2,1,6,14,1,9,2,1,2,10,6,4,100),(113,'Casio Collection MQ-24-7B2LEF','113.jpeg','113.1.jpeg','113.2.jpeg',1,7340,'MQ-24-7B2LEF',1,1,1,1,1,'38,8 x 33,8 x 7,8',1,1,2,1,8,6,6,2,3,2,6,2,1,100),(114,'Casio G-Shock GA-400-1BER','114.jpeg','114.1.jpeg','114.2.jpeg',1,64890,'GA-400-1BER',1,1,1,2,1,'52 x 55 x 18',7,2,1,6,8,2,1,2,2,2,6,6,3,100),(115,'Michael Kors Lexington MK8344','115.jpeg','115.1.jpeg','115.2.jpeg',1,45390,'MK8344',6,1,1,4,1,'45',1,1,1,6,3,8,2,2,3,2,2,1,4,100),(116,'Casio Radio Controlled LCW-M170D-1AER','116.jpeg','116.1.jpeg','116.2.jpeg',1,88310,'LCW-M170D-1AER',1,1,3,3,1,'46,4 x 39,5 x 9,2',7,1,1,6,9,2,2,3,2,2,7,1,4,100),(117,'Casio G-Shock GD-100-1BER','117.jpeg','117.1.jpeg','117.2.jpeg',1,48355,'GD-100-1BER',1,1,1,2,1,'55 x 51,2 x 17,4',7,2,1,6,8,1,9,2,1,2,6,6,3,100),(118,'Casio Collection AE-1000W-2AVEF','118.jpeg','118.1.jpeg','118.2.jpeg',1,17080,'AE-1000W-2AVEF',1,1,1,4,1,'42 x 46 x 12',7,4,1,6,9,1,9,4,1,2,9,6,4,100),(119,'Casio Collection AE-1300WH-4AVEF','119.jpeg','119.1.jpeg','119.2.jpeg',1,19710,'AE-1300WH-4AVEF',1,1,1,4,1,'45 x 42,1 x 12,5',7,2,1,6,11,1,9,4,1,3,6,6,2,100),(120,'Casio Collection AEQ-100W-1BVEF','120.jpeg','120.1.jpeg','120.2.jpeg',1,22170,'AEQ-100W-1BVEF',1,1,1,4,1,'53 x 48 x 15',7,2,1,6,8,2,9,4,2,2,6,6,3,100),(121,'Festina The Originals 20330/4','121.jpeg','121.1.jpeg','121.2.jpeg',1,62995,'20330/4',3,1,1,4,1,'47 x 25 x 22',1,5,1,5,9,2,2,2,3,2,13,8,3,100),(122,'Casio Collection AE-1000W-4AVEF','122.jpeg','122.1.jpeg','122.2.jpeg',1,16175,'AE-1000W-4AVEF',1,1,1,4,1,'48,1 x 43,7 x 13,7',7,2,1,6,11,1,1,4,1,2,11,6,3,100),(123,'Casio Collection AEQ-110BW-9AVEF','123.jpeg','123.1.jpeg','123.2.jpeg',1,26420,'AEQ-110BW-9AVEF',1,1,1,4,1,'47 x 53 x 16',7,2,1,6,8,7,6,4,2,2,6,2,3,100),(124,'Casio Retro A158WEA-1EF','124.jpeg','124.1.jpeg','124.2.jpeg',1,15215,'A158WEA-1EF',1,1,1,1,1,'33 x 8',1,1,1,1,9,1,6,4,1,1,7,1,7,100),(125,'Casio Edifice EFV-540DC-1AVUEF','125.jpeg','125.1.jpeg','125.2.jpeg',1,62950,'EFV-540DC-1AVUEF',1,1,1,4,1,'44 x 49 x 12',7,4,1,6,8,2,2,2,3,2,6,1,4,100),(126,'Casio Collection MRW-200H-3BVEF','126.jpeg','126.1.jpeg','126.2.jpeg',1,14035,'MRW-200H-3BVEF',1,1,1,4,1,'47,9 x 44,6 x 11,6',7,2,1,6,8,2,1,4,3,2,6,6,3,100),(127,'Casio G-Shock GA-30-1A1ER','127.jpeg','127.1.jpeg','127.2.jpeg',1,40285,'GA-30-1A1ER',1,1,1,2,1,'44 x 11,8',2,1,1,6,8,2,6,2,2,2,6,2,3,100),(128,'Casio Collection AQ-230A-7BMQYES','128.jpeg','128.1.jpeg','128.2.jpeg',1,19220,'AQ-230A-7BMQYES',1,1,1,1,1,'28x8',1,1,1,1,9,6,2,4,2,1,6,5,4,100),(129,'Casio Edifice  EFV-C100D-1BVEF','129.jpeg','129.1.jpeg','129.2.jpeg',1,46655,'EFV-C100D-1BVEF',1,1,1,4,1,'51,6 x 46,6 x 14,2',7,2,1,6,9,2,2,2,2,2,7,1,4,100),(130,'Casio Collection MTP-1303PD-2AVEF','130.jpeg','130.1.jpeg','130.2.jpeg',1,20500,'MTP-1303PD-2AVEF',1,1,1,3,1,'47 x 40 x 8,1',7,1,2,6,9,4,7,2,3,2,7,1,4,100),(131,'Tommy Hilfiger Cooper 1791513','131.jpeg','131.1.jpeg','131.2.jpeg',2,62955,'1791513',4,1,1,1,1,'40',1,3,2,1,7,4,5,2,3,2,5,5,7,1),(132,'Fossil Grant FS5061','132.jpeg','132.1.jpeg','132.2.jpeg',1,39750,'FS5061',5,1,1,3,1,'44 x 44 x 11',1,1,2,6,8,4,5,2,3,2,9,4,4,100),(133,'Casio Edifice  EFV-570D-2AVUEF','133.jpeg','133.1.jpeg','133.2.jpeg',1,46655,'EFV-570D-2AVUEF',1,1,1,4,1,'48,5 × 43,8 × 11,6',7,2,1,6,9,4,2,2,3,2,7,1,4,100),(134,'Casio G-Shock DW-5600BBN-1ER','134.jpeg','134.1.jpeg','134.2.jpeg',1,46795,'DW-5600BBN-1ER',1,1,1,2,1,'48,9 x 42,8 x 13,4',7,2,1,6,8,1,1,2,1,1,6,9,6,100),(135,'Casio Radio Controlled LCW-M100DSE-1AER','135.jpeg','135.1.jpeg','135.2.jpeg',3,74990,'LCW-M100DSE-1AER',1,1,3,3,1,'40 x 10',7,1,1,6,9,2,2,3,2,2,7,1,4,80),(136,'Casio Edifice EFR-526D-1AVUEF','136.jpeg','136.1.jpeg','136.2.jpeg',1,38970,'EFR-526D-1AVUEF',1,1,1,4,1,'48,5 x 43,8 x 11,6',1,2,1,4,9,2,2,2,3,2,7,1,4,100),(137,'Seiko 5 SNK603K1','137.jpeg','137.1.jpeg','137.2.jpeg',1,67155,'SNK603K1',10,1,2,1,1,'41 x 13',1,1,1,6,9,4,2,6,3,2,7,1,4,100),(138,'Festina Retro 16573/2','138.jpeg','138.1.jpeg','138.2.jpeg',3,26990,'16573/2',3,1,1,3,1,'45 x 45',7,1,1,1,9,8,2,2,3,2,8,4,4,80),(139,'Casio Radio Controlled WVA-M650D-1AER','139.jpeg','139.1.jpeg','139.2.jpeg',3,58990,'WVA-M650D-1AER',1,1,3,4,1,'43 x 48 x 15',7,2,1,6,9,2,9,4,2,2,7,1,3,80),(140,'Casio Radio Controlled LCW-M170TD-1AER','140.jpeg','140.1.jpeg','140.2.jpeg',1,106485,'LCW-M170TD-1AER',1,1,3,3,1,'46,4 x 39,5 x 9,2',7,1,1,6,9,2,8,3,2,2,7,10,2,100),(141,'Fossil Machine FS4552','141.jpeg','141.1.jpeg','141.2.jpeg',3,44990,'FS4552',5,1,1,3,1,'45 x 12',1,1,1,6,8,2,2,2,3,2,6,10,4,80),(142,'Casio G-Shock AWG-M100SB-2AER','142.jpeg','142.1.jpeg','142.2.jpeg',1,66820,'AWG-M100SB-2AER',1,1,3,2,1,'52 x 46,4 x 14,9',7,2,1,6,8,4,6,2,2,2,6,2,2,100),(143,'Emporio Armani Luigi AR1979','143.jpeg','143.1.jpeg','143.2.jpeg',1,70320,'AR1979',2,1,1,3,1,'46 x 12',1,1,1,6,8,4,2,2,3,2,6,1,4,100),(144,'Fossil Nate JR1437','144.jpeg','144.1.jpeg','144.2.jpeg',1,51950,'JR1437',5,1,1,3,1,'50 x 14',1,4,1,4,8,2,2,2,3,2,14,1,1,100),(145,'Casio Retro LA670WEGA-9EF','145.jpeg','145.1.jpeg','145.2.jpeg',1,21050,'LA670WEGA-9EF',1,1,1,1,1,'27 x 5',1,1,1,1,7,1,1,1,1,1,5,1,7,100),(146,'Daniel Wellington DW00100124','146.jpeg','146.1.jpeg','146.2.jpeg',2,71565,'DW00100124',11,1,1,1,1,'40 x 6',1,1,2,1,1,2,5,2,3,2,10,4,13,1),(147,'Zeppelin 100 Years Zeppelin 7640-1','147.jpeg','147.1.jpeg','147.2.jpeg',1,101555,'2096494',9,1,1,3,1,'42',1,6,1,6,9,8,2,2,3,2,10,1,2,100),(148,'Casio Collection MRW-200H-1B2VEF','148.jpeg','148.1.jpeg','148.2.jpeg',1,14380,'MRW-200H-1B2VEF',1,1,1,4,1,'48 x 12',1,1,1,1,8,2,6,4,3,2,6,2,3,100),(149,'Casio Collection MTD-1053D-1AVES','149.jpeg','149.1.jpeg','149.2.jpeg',3,27990,'MTD-1053D-1AVES',1,1,1,2,1,'48 x 42,6 x 11,5',7,2,1,1,9,2,2,2,3,2,7,1,4,80),(150,'Casio Collection MRW-200H-4BVEF','150.jpeg','150.1.jpeg','150.2.jpeg',1,15020,'MRW-200H-4BVEF',1,1,1,4,1,'47,9 x 44,6 x 11,6',7,2,1,6,8,2,9,4,3,2,6,6,3,100),(151,'Citizen Eco-Drive AT2141-87E','151.jpeg','151.1.jpeg','151.2.jpeg',1,104900,'AT2141-87E',8,1,4,4,2,'42 x 11',7,2,1,6,9,2,2,3,3,2,7,1,6,100),(152,'Tommy Hilfiger Chase 1791576','152.jpeg','152.1.jpeg','152.2.jpeg',1,33930,'1791576',4,1,1,1,1,'40',1,6,1,6,7,6,5,2,3,2,5,5,12,100),(153,'Casio Collection AE-1000W-4BVEF','153.jpeg','153.1.jpeg','153.2.jpeg',1,16890,'AE-1000W-4BVEF',1,1,1,4,1,'42 x 46 x 12',7,4,1,6,4,1,9,4,1,2,13,6,4,100),(154,'Casio G-Shock GBD-800UC-8ER','154.jpeg','154.1.jpeg','154.2.jpeg',1,41405,'GBD-800UC-8ER',1,1,1,2,1,'54,1 x 48,6 x 15,5',7,2,1,6,10,1,9,2,1,2,8,6,11,100),(155,'Casio G-Shock GA-30-1AER','155.jpeg','155.1.jpeg','155.2.jpeg',1,40480,'GA-30-1AER',1,1,1,2,1,'45,4 x 11,8',2,1,1,6,8,2,6,2,2,2,6,2,2,100),(156,'Casio Collection MTP-1374D-1A','156.jpeg','156.1.jpeg','156.2.jpeg',1,30395,'MTP-1374D-1A',1,1,1,3,1,'47×43.5×10.4',7,1,1,6,9,2,2,2,3,2,7,1,4,100),(157,'Casio Collection MTD-1053D-2AVES','157.jpeg','157.1.jpeg','157.2.jpeg',3,30990,'MTD-1053D-2AVES',1,1,1,2,1,'48 x 42,60 x 11,50',1,1,1,1,9,4,2,2,3,2,7,1,4,80),(158,'Casio Collection MTP-1314D-1AVEF','158.jpeg','158.1.jpeg','158.2.jpeg',3,15990,'MTP-1314D-1AVEF',1,1,1,3,1,'49 x 9',1,1,1,1,9,2,2,2,3,2,7,1,4,80),(159,'Festina Timeless Chronograph 16759/3','159.jpeg','159.1.jpeg','159.2.jpeg',1,60705,'16759/3',3,1,1,3,1,'44 x 44 x 12',7,2,1,6,9,4,2,2,3,2,7,1,2,100),(160,'Fossil Coachman CH2891','160.jpeg','160.1.jpeg','160.2.jpeg',1,42160,'CH2891',5,1,1,4,1,'44 x 13',1,1,1,5,9,2,2,2,3,2,10,4,2,100),(161,'Casio Edifice  EFV-550P-1AVUEF','161.jpeg','161.1.jpeg','161.2.jpeg',1,35055,'EFV-550P-1AVUEF',1,1,1,4,1,'53 x 47 x 12,1',7,2,1,6,9,2,2,2,3,2,6,6,4,100),(162,'Diesel Mega Chief DZ4283','162.jpeg','162.1.jpeg','162.2.jpeg',1,51685,'DZ4283',7,1,1,4,1,'51 x 12',1,1,1,6,8,2,2,2,3,2,6,1,6,100),(163,'Fossil Machine FS4775','163.jpeg','163.1.jpeg','163.2.jpeg',1,46780,'FS4775',5,1,1,3,1,'42 x 12',1,1,1,6,8,2,5,2,3,2,6,5,8,100),(164,'Casio Collection DB-36-1AVEF','164.jpeg','164.1.jpeg','164.2.jpeg',3,11990,'DB-36-1AVEF',1,1,1,1,1,'34 x 10',1,1,1,1,8,1,6,4,1,1,6,2,4,80),(165,'Casio G-Shock GW-B5600-2ER','165.jpeg','165.1.jpeg','165.2.jpeg',1,57810,'GW-B5600-2ER',1,1,3,2,1,'42,8 x 13,4',7,2,1,6,8,1,9,2,1,1,6,6,4,100),(166,'Tommy Hilfiger Luke 1791117','166.jpeg','166.1.jpeg','166.2.jpeg',1,52885,'1791117',4,1,1,3,1,'46',1,3,1,6,9,2,2,2,3,2,6,4,7,100),(167,'Casio G-Shock GA-30-4AER','167.jpeg','167.1.jpeg','167.2.jpeg',1,38500,'GA-30-4AER',1,1,1,2,1,'48,5 x 45,4 x 11,8',2,2,1,6,11,10,9,2,2,2,11,6,3,100),(168,'Casio Collection MTP-1375L-7AVEF','168.jpeg','168.1.jpeg','168.2.jpeg',1,29400,'MTP-1375L-7AVEF',1,1,1,3,1,'48,5 x 42 x 9,7',7,4,1,6,9,8,2,2,3,2,6,4,4,100),(169,'Tommy Hilfiger Damon 1791415','169.jpeg','169.1.jpeg','169.2.jpeg',1,52380,'1791415',4,1,1,3,1,'44 x 10,8',7,2,1,6,9,2,2,2,3,2,7,1,4,100),(170,'Casio Collection MTP-1374L-7A1VDF','170.jpeg','170.1.jpeg','170.2.jpeg',1,36870,'MTP-1374L-7A1VDF',1,1,1,3,1,'47 x 43,5 x 10,4',7,6,1,6,9,8,2,2,3,2,10,4,1,100),(171,'Casio Radio Controlled LCW-M170TD-7AER','171.jpeg','171.1.jpeg','171.2.jpeg',3,106990,'LCW-M170TD-7AER',1,1,3,3,1,'46,4 x 39,5 x 9,2',7,1,1,6,9,6,8,3,2,2,7,10,4,80),(172,'Casio Collection HDC-700-3AVEF','172.jpeg','172.1.jpeg','172.2.jpeg',1,24690,'HDC-700-3AVEF',1,1,1,4,1,'53,3 x 48,8s16,6',7,2,1,6,8,2,9,4,2,2,15,6,3,100),(173,'Citizen Radio Controlled CB0010-88L','173.jpeg','173.1.jpeg','173.2.jpeg',1,137760,'CB0010-88L',8,1,4,4,2,'43 x 10',7,1,1,6,9,4,2,3,3,2,7,1,6,100),(174,'Citizen Promaster NY0085-86EE','174.jpeg','174.1.jpeg','174.2.jpeg',1,111360,'NY0085-86EE',8,1,2,2,2,'42 x 12',1,4,1,6,9,2,2,2,3,2,7,1,5,100),(175,'Citizen Super Titanium CA0700-86L','175.jpeg','175.1.jpeg','175.2.jpeg',2,144685,'CA0700-86L',8,1,3,4,2,'43 x 11',7,1,1,6,9,4,8,3,3,2,7,10,4,1),(176,'Casio Collection B640WB-1AEF','176.jpeg','176.1.jpeg','176.2.jpeg',1,27405,'B640WB-1AEF',1,1,1,3,1,'33 x 8',1,1,1,1,8,1,1,1,1,1,6,1,1,100),(177,'Casio Collection F-105W-1AWYEF','177.jpeg','177.1.jpeg','177.2.jpeg',1,9500,'F-105W-1AWYEF',1,1,1,1,1,'37x9',7,1,1,6,8,1,6,2,1,1,6,2,1,100),(178,'Festina Retro 16823/3','178.jpeg','178.1.jpeg','178.2.jpeg',3,33990,'16823/3',3,1,1,3,1,'43 x 11',1,1,1,1,9,4,2,2,3,2,9,4,4,80),(179,'Casio Edifice EFR-552D-1A3VUDF','179.jpeg','179.1.jpeg','179.2.jpeg',1,48315,'EFR-552D-1A3VUDF',1,1,1,4,1,'53 x 47 x 12,3',4,2,1,6,9,2,2,2,3,2,7,1,4,100),(180,'Casio Retro LA670WEA-7EF','180.jpeg','180.1.jpeg','180.2.jpeg',1,15755,'LA670WEA-7EF',1,1,1,1,1,'25x7',7,1,1,6,9,1,2,4,1,1,7,1,7,100),(181,'Casio Collection MTP-1314PL-8AVEF','181.jpeg','181.1.jpeg','181.2.jpeg',1,20340,'MTP-1314PL-8AVEF',1,1,1,3,1,'45 x 50 x 10',7,1,1,6,9,2,7,2,3,2,6,4,4,100),(182,'Casio G-Shock AWG-M100A-1AER','182.jpeg','182.1.jpeg','182.2.jpeg',3,49990,'AWG-M100A-1AER',1,1,3,2,1,'46 x 15',7,2,1,6,8,2,6,2,2,2,6,2,3,80),(183,'Casio G-Shock GG-1000-1AER','183.jpeg','183.1.jpeg','183.2.jpeg',1,130995,'GG-1000-1AER',1,1,1,2,1,'56,2 x 55,3 x 17,1',1,4,1,6,8,2,1,2,2,2,6,6,3,100),(184,'Diesel Mega Chief DZ4308','184.jpeg','184.1.jpeg','184.2.jpeg',2,41695,'DZ4308',7,1,1,4,1,'54 x 14',1,4,1,6,9,2,2,2,3,2,7,1,3,1),(185,'Fossil Neutra FS5453','185.jpeg','185.1.jpeg','185.2.jpeg',1,45150,'FS5453',5,1,1,3,1,'44 x 12',7,1,1,6,9,4,2,2,3,2,10,4,4,100),(186,'Casio Collection AEQ-110W-1BVEF','186.jpeg','186.1.jpeg','186.2.jpeg',1,23855,'AEQ-110W-1BVEF',1,1,1,4,1,'52,2 x 46,6 x 16,6',7,2,1,6,8,2,6,1,2,2,6,6,2,100),(187,'Casio G-Shock GBD-800UC-3ER','187.jpeg','187.1.jpeg','187.2.jpeg',3,38990,'GBD-800UC-3ER',1,1,1,2,1,'54,1 x 48,6 x 15,5',7,2,1,6,15,1,9,2,1,2,15,6,4,80),(188,'Casio G-Shock GD-100GB-1ER','188.jpeg','188.1.jpeg','188.2.jpeg',3,46990,'GD-100GB-1ER',1,1,1,2,1,'51 x 17',7,2,1,6,8,1,1,2,1,2,6,2,3,80),(189,'Citizen Promaster BJ8050-08E','189.jpeg','189.1.jpeg','189.2.jpeg',1,178900,'BJ8050-08E',8,1,4,6,2,'46',1,4,1,6,9,2,2,2,3,2,6,3,3,100),(190,'Casio Collection HDC-700-1AVEF','190.jpeg','190.1.jpeg','190.2.jpeg',1,22630,'HDC-700-1AVEF',1,1,1,4,1,'53,3 x 48,8 x 16,6',7,4,1,6,8,2,6,1,2,2,6,2,5,100),(191,'Casio Collection MCW-200H-9AVEF','191.jpeg','191.1.jpeg','191.2.jpeg',1,31305,'MCW-200H-9AVEF',1,1,1,4,1,'55,7 x 53,5 x 14,2',7,4,1,6,8,7,6,1,3,2,6,2,3,100),(192,'Casio Collection AE-1200WH-1BVEF','192.jpeg','192.1.jpeg','192.2.jpeg',1,18515,'AE-1200WH-1BVEF',1,1,1,4,1,'42x13',1,1,1,1,8,1,6,1,1,1,6,2,4,100),(193,'Casio Collection W-800HG-9AVES','193.jpeg','193.1.jpeg','193.2.jpeg',1,19650,'W-800HG-9AVES',1,1,1,4,1,'44 x 14',1,1,1,1,8,1,6,4,1,1,6,2,5,100),(194,'Casio Collection MTP-1374D-2A','194.jpeg','194.1.jpeg','194.2.jpeg',1,30910,'MTP-1374D-2A',1,1,1,3,1,'47 × 43,5 × 10,4',7,1,1,6,9,4,2,2,3,2,7,1,4,100),(195,'Casio Enticer MTP-1374L-1AVDF','195.jpeg','195.1.jpeg','195.2.jpeg',1,29765,'MTP-1374L-1AVDF',1,1,1,3,1,'47×43.5×10.4',1,2,1,6,9,2,2,2,3,2,6,4,1,100),(196,'Citizen Eco-Drive BM7108-81L','196.jpeg','196.1.jpeg','196.2.jpeg',1,71015,'BM7108-81L',8,1,3,4,2,'41 x 10',1,1,1,6,9,4,2,3,3,2,7,1,4,100),(197,'Tommy Hilfiger Briggs 1791424','197.jpeg','197.1.jpeg','197.2.jpeg',1,40820,'1791424',4,1,1,3,1,'46 x 11,4',7,2,1,6,9,4,2,2,3,2,10,4,4,100),(198,'Casio Collection AE-1300WH-1AVEF','198.jpeg','198.1.jpeg','198.2.jpeg',1,19005,'AE-1300WH-1AVEF',1,1,1,4,1,'45,0 x 42,1 x 12,5',7,2,1,6,8,1,9,4,1,1,6,6,6,100),(199,'Daniel Wellington DW00100129','199.jpeg','199.1.jpeg','199.2.jpeg',2,71565,'DW00100129',11,1,1,1,1,'40 x 6',1,1,2,1,1,2,5,2,3,2,6,4,13,1),(200,'Casio Edifice  EFV-C100D-2AVEF','200.jpeg','200.1.jpeg','200.2.jpeg',3,35990,'EFV-C100D-2AVEF',1,1,1,4,1,'51,6 x 46,6 x 14,2',7,2,1,6,9,4,2,2,2,2,7,1,4,80),(201,'Casio Edifice  EFV-C100D-1AVEF','201.jpeg','201.1.jpeg','201.2.jpeg',1,36445,'EFV-C100D-1AVEF',1,1,1,4,1,'51.6 × 46.6 × 14.2',7,2,1,6,9,2,2,2,2,2,7,1,4,100),(202,'Fossil Machine FS4931','202.jpeg','202.1.jpeg','202.2.jpeg',1,58180,'FS4931',5,1,1,3,1,'45 x 13',1,1,1,6,10,11,5,2,3,2,14,1,7,100),(203,'Casio G-Shock GAW-100B-1AER','203.jpeg','203.1.jpeg','203.2.jpeg',1,53805,'GAW-100B-1AER',1,1,3,2,1,'55,1 x 52,5 x 16,7',7,4,1,6,8,2,6,2,2,2,6,2,2,100),(204,'Casio Edifice  EFV-570D-1AVUEF','204.jpeg','204.1.jpeg','204.2.jpeg',1,48715,'EFV-570D-1AVUEF',1,1,1,4,1,'48,5 x 43,8 x 11,6',7,2,1,6,9,2,2,2,3,2,7,1,4,100),(206,'Tommy Hilfiger Briggs 1791423','206.jpeg','206.1.jpeg','206.2.jpeg',1,50490,'1791423',4,1,1,3,1,'46 x 12',1,2,1,6,8,2,2,2,3,2,6,1,3,100),(207,'Casio Radio Controlled LCW-M170DB-1AER','207.jpeg','207.1.jpeg','207.2.jpeg',3,100990,'LCW-M170DB-1AER',1,1,3,3,1,'46,4 x 39,5 x 9,2',7,1,1,6,8,2,2,3,2,2,6,1,3,80),(208,'Citizen Eco-Drive AT2141-52L','208.jpeg','208.1.jpeg','208.2.jpeg',1,104900,'AT2141-52L',8,1,3,4,2,'42',1,5,1,6,9,4,2,3,3,2,7,1,6,100),(209,'Casio Collection MW-59-7BVEF','209.jpeg','209.1.jpeg','209.2.jpeg',1,11545,'MW-59-7BVEF',1,1,1,3,1,'36 x 9',1,1,1,1,8,6,6,2,3,2,6,2,1,100),(211,'Casio G-Shock DW-5900BB-1DR','211.jpeg','211.1.jpeg','211.2.jpeg',1,42790,'DW-5900BB-1DR',1,1,1,2,1,'53.2 × 50 × 16.3',7,2,1,6,8,1,1,2,1,1,6,2,6,100),(212,'Guess Frontier W1132G1','212.jpeg','212.1.jpeg','212.2.jpeg',1,59380,'W1132G1',12,1,1,4,1,'48 x 11',7,6,1,6,7,2,2,2,3,2,6,2,4,100),(213,'Casio Collection AW-80D-1AVES','213.jpeg','213.1.jpeg','213.2.jpeg',1,22470,'AW-80D-1AVES',1,1,1,3,1,'46,8 x 40 x 13,5',1,1,1,6,9,2,6,5,2,2,7,1,4,100),(214,'Casio Collection MTP-1302PL-1AVEF','214.jpeg','214.1.jpeg','214.2.jpeg',1,22790,'MTP-1302PL-1AVEF',1,1,1,3,1,'44,2 x 38,5 x 9,2',7,1,1,6,9,2,7,2,3,2,6,4,4,100),(215,'Tommy Hilfiger Briggs 1791422','215.jpeg','215.1.jpeg','215.2.jpeg',1,38595,'1791422',4,1,1,3,1,'46 x 11,6',1,2,1,6,9,2,2,2,3,2,7,1,1,100),(216,'Casio G-Shock GA-110HR-1AER','216.jpeg','216.1.jpeg','216.2.jpeg',1,58190,'GA-110HR-1AER',1,1,1,2,1,'55 x 51,2 x 16,9',7,2,1,6,8,2,1,2,2,2,6,2,9,100),(217,'Casio Collection HDC-700-9AVEF','217.jpeg','217.1.jpeg','217.2.jpeg',3,17990,'HDC-700-9AVEF',1,1,1,4,1,'43,3 x 48,8 x 16,6',7,2,1,6,8,2,6,1,2,2,6,2,3,80),(218,'Casio Collection AE-2000W-1BVEF','218.jpeg','218.1.jpeg','218.2.jpeg',1,22645,'AE-2000W-1BVEF',1,1,1,2,1,'52,2 x 47,7 x 16',11,2,1,6,4,1,1,2,1,2,6,2,3,100),(219,'Casio G-Shock AW-591-2AER','219.jpeg','219.1.jpeg','219.2.jpeg',1,40190,'AW-591-2AER',1,1,1,2,1,'46 x 15',1,2,1,6,8,2,6,2,2,2,6,2,4,100),(220,'Casio G-Shock AW-590-1AER','220.jpeg','220.1.jpeg','220.2.jpeg',1,37790,'AW-590-1AER',1,1,1,2,1,'46 x 15',1,2,1,6,9,2,1,2,2,2,6,2,3,100),(221,'Casio Collection MRW-200H-2B2VEF','221.jpeg','221.1.jpeg','221.2.jpeg',1,15140,'MRW-200H-2B2VEF',1,1,1,4,1,'47,9 x 44,6 x 11,6',7,4,1,6,8,4,6,4,3,2,6,6,3,100),(222,'Casio MQ-76-1ALDF','222.jpeg','222.1.jpeg','222.2.jpeg',3,6990,'MQ-76-1ALDF',1,1,1,1,1,'38,8 x 33,8 x 7,8',1,1,2,1,8,2,9,4,3,2,6,6,4,80),(223,'Fossil Neutra  FS5381','223.jpeg','223.1.jpeg','223.2.jpeg',1,58800,'FS5381',5,1,1,3,1,'44 x 49 x 10',7,1,1,6,1,2,5,2,3,2,6,4,4,100),(224,'Casio Collection MRW-200H-7BVEF','224.jpeg','224.1.jpeg','224.2.jpeg',1,14495,'MRW-200H-7BVEF',1,1,1,4,1,'47,9 x 44,6 x 11,6',7,1,1,6,8,6,9,1,3,2,6,6,3,100),(225,'Casio G-Shock GA-110-1AER','225.jpeg','225.1.jpeg','225.2.jpeg',3,41990,'GA-110-1AER',1,1,1,2,1,'55 x 51,2 x 16,9',7,2,1,6,8,2,6,2,2,2,6,2,3,80),(226,'Fossil Townsman FS5279','226.jpeg','226.1.jpeg','226.2.jpeg',3,42990,'FS5279',5,1,1,3,1,'44',1,1,2,6,9,4,2,2,3,2,10,4,2,80),(227,'Casio MQ-24-1B2LDF','227.jpeg','227.1.jpeg','227.2.jpeg',1,8485,'MQ-24-1B2LDF',1,1,1,1,1,'38,8 × 34,9 × 7,8',1,1,2,1,8,2,9,4,3,2,6,6,1,100),(228,'Guess Atlas W0668G3','228.jpeg','228.1.jpeg','228.2.jpeg',1,48105,'W0668G3',12,1,1,3,1,'45/49',1,4,1,6,9,2,2,2,3,2,7,1,7,100),(229,'Tommy Hilfiger Chase 1791580','229.jpeg','229.1.jpeg','229.2.jpeg',1,50790,'1791580',4,1,1,3,1,'44',1,1,1,6,7,2,5,2,3,2,6,5,7,100),(230,'Citizen Radio Controlled CB5034-82L','230.jpeg','230.1.jpeg','230.2.jpeg',1,227600,'CB5034-82L',8,1,4,2,2,'50 x 46,5 x 13',7,3,1,6,4,4,2,3,3,2,7,1,4,100),(231,'Casio Collection MTP-1303PD-1AVEF','231.jpeg','231.1.jpeg','231.2.jpeg',1,17900,'MTP-1303PD-1AVEF',1,1,1,3,1,'47 x 40 x 8,1',7,1,2,6,9,2,7,2,3,2,7,1,4,100),(232,'Festina Retro 16573/3','232.jpeg','232.1.jpeg','232.2.jpeg',3,28990,'16573/3',3,1,1,3,1,'45 x 45',1,1,1,1,9,2,2,2,3,2,6,4,6,80),(233,'Citizen Promaster NY0086-16LE','233.jpeg','233.1.jpeg','233.2.jpeg',1,104045,'NY0086-16LE',8,1,2,2,2,'42 x 12',1,4,1,6,9,4,2,2,3,2,6,3,3,100),(234,'Casio Collection MTP-1303PL-7BVEF','234.jpeg','234.1.jpeg','234.2.jpeg',1,17945,'MTP-1303PL-7BVEF',1,1,1,3,1,'47 x 40 x 8,1',7,1,2,6,9,6,7,2,3,2,6,4,3,100),(235,'Citizen Promaster BN0190-15E','235.jpeg','235.1.jpeg','235.2.jpeg',1,106150,'BN0190-15E',8,1,3,2,2,'44 x 12',1,1,1,6,4,2,2,2,3,2,6,3,4,100),(236,'Casio G-Shock GA-700-1BER','236.jpeg','236.1.jpeg','236.2.jpeg',3,36990,'GA-700-1BER',1,1,1,2,1,'57,5 x 53,4 x 18,4',11,2,1,6,8,2,1,2,2,2,6,2,3,80),(237,'Casio Collection MTP-1308PD-1BVEF','237.jpeg','237.1.jpeg','237.2.jpeg',1,21260,'MTP-1308PD-1BVEF',1,1,1,3,1,'48,9 x 43,5 x 9,2',11,1,1,6,9,2,7,2,3,2,7,1,2,100),(238,'Casio Collection AE-1300WH-2AVEF','238.jpeg','238.1.jpeg','238.2.jpeg',1,18385,'AE-1300WH-2AVEF',1,1,1,4,1,'45,0 x 42,1 x 12,5',11,2,1,6,13,1,9,4,1,1,6,6,6,100),(239,'Casio Edifice EFV-540DC-1BVUEF','239.jpeg','239.1.jpeg','239.2.jpeg',3,42990,'EFV-540DC-1BVUEF',1,1,1,4,1,'44 x 12',11,2,1,6,8,2,2,2,3,2,6,1,4,80),(240,'Diesel Rasp DZ1761','240.jpeg','240.1.jpeg','240.2.jpeg',3,59990,'DZ1761',7,1,1,3,1,'46x53x10',11,1,2,1,7,7,5,2,3,2,5,5,5,80),(241,'Casio Radio Controlled WVA-M650D-2AER','241.jpeg','241.1.jpeg','241.2.jpeg',3,53990,'WVA-M650D-2AER',1,1,3,4,1,'48,8 x 43,5 x 14,5',11,4,1,6,9,4,2,4,2,2,7,1,2,80),(242,'Casio Radio Controlled WVA-M650TD-1AER','242.jpeg','242.1.jpeg','242.2.jpeg',3,61990,'WVA-M650TD-1AER',1,1,3,4,1,'48,8 x 43,5 x 14,5',11,4,1,6,9,2,8,4,2,2,7,10,3,80),(243,'Casio Collection AW-49HE-2AVEF','243.jpeg','243.1.jpeg','243.2.jpeg',1,13735,'AW-49HE-2AVEF',1,1,1,3,1,'44 x 10',1,1,1,1,8,4,6,5,2,2,6,2,3,100),(244,'Casio Collection W-216H-1AVEF','244.jpeg','244.1.jpeg','244.2.jpeg',1,13815,'W-216H-1AVEF',1,1,1,3,1,'46 x 43,8 x 11,3',11,2,1,6,8,1,9,4,1,2,6,6,3,100),(245,'Citizen Eco-Drive BM8470-11EE','245.jpeg','245.1.jpeg','245.2.jpeg',1,53880,'BM8470-11EE',8,1,4,4,2,'42 x 11',1,1,1,6,9,2,2,2,3,2,15,9,4,100),(246,'Fossil Neutra FS5512','246.jpeg','246.1.jpeg','246.2.jpeg',2,62605,'FS5512',5,1,1,3,1,'44 x 11',1,1,1,6,10,2,2,2,3,2,10,4,1,1),(247,'Citizen Super Titanium BM7430-89L','247.jpeg','247.1.jpeg','247.2.jpeg',2,124850,'BM7430-89L',8,1,3,4,2,'43 x 12',11,1,1,6,9,4,8,3,3,2,7,10,4,1),(248,'Casio Edifice EFV-540D-1A2VUEF','248.jpeg','248.1.jpeg','248.2.jpeg',1,37595,'EFV-540D-1A2VUEF',1,1,1,4,1,'48,5 x 43,8 x 12,1',11,4,1,6,9,2,2,2,3,2,7,1,4,100),(249,'Casio Retro AQ-230A-1DMQYES','249.jpeg','249.1.jpeg','249.2.jpeg',1,18185,'AQ-230A-1DMQYES',1,1,1,3,1,'34 x 9',11,1,1,6,9,2,6,4,2,1,7,10,1,100),(250,'Casio Collection MRW-200HC-2BVEF','250.jpeg','250.1.jpeg','250.2.jpeg',1,15165,'MRW-200HC-2BVEF',1,1,1,4,1,'47,9 x 44,6 x 11,6',11,2,1,6,13,4,9,4,3,2,9,6,3,100),(251,'Casio Collection AE-1000W-3AVEF','251.jpeg','251.1.jpeg','251.2.jpeg',3,12990,'AE-1000W-3AVEF',1,1,1,4,1,'42 x 46 x 12',11,4,1,6,15,1,9,4,1,2,15,6,4,80),(252,'Orient Ray II Automatic FAA02005D9','252.jpeg','252.1.jpeg','252.2.jpeg',1,93685,'FAA02005D9',13,1,2,2,1,'41,5 x 13',1,2,1,6,9,4,2,2,3,2,7,1,4,100),(253,'Casio G-Shock GA-140-1A1ER','253.jpeg','253.1.jpeg','253.2.jpeg',1,38535,'GA-140-1A1ER',1,1,1,2,1,'51,2 x 16,9',11,2,1,6,8,2,9,2,2,2,6,6,4,100),(254,'Casio G-Shock GA-140-1A4ER','254.jpeg','254.1.jpeg','254.2.jpeg',3,41990,'GA-140-1A4ER',1,1,1,2,1,'51,2 x 16,9',11,1,1,6,8,2,6,2,2,2,6,2,2,80),(255,'Casio G-Shock GA-400GB-1A4ER','255.jpeg','255.1.jpeg','255.2.jpeg',4,54990,'GA-400GB-1A4ER',1,1,1,2,1,'55 x 51,9 x 18,3',11,2,1,6,8,2,6,2,2,2,6,2,3,1),(256,'Casio Edifice EQS-920DB-1BVUEF','256.jpeg','256.1.jpeg','256.2.jpeg',3,59990,'EQS-920DB-1BVUEF',1,1,3,4,1,'56,5 × 47,6 × 12,5',1,4,1,6,9,2,2,2,3,2,7,1,4,80),(257,'Casio Collection MTP-1221A-1AVEF','257.jpeg','257.1.jpeg','257.2.jpeg',1,20610,'MTP-1221A-1AVEF',1,1,1,3,1,'44 x 10',1,1,1,1,9,2,2,2,3,2,7,1,4,100),(258,'Casio Edifice EFV-540D-1AVUEF','258.jpeg','258.1.jpeg','258.2.jpeg',1,39120,'EFV-540D-1AVUEF',1,1,1,4,1,'48,5 x 43,8 x 12,1',11,4,1,6,9,2,2,2,3,2,7,1,4,100),(259,'Fossil Neutra FS5452','259.jpeg','259.1.jpeg','259.2.jpeg',1,43120,'FS5452',5,1,1,3,1,'44 x 10',11,1,1,6,9,2,2,2,3,2,6,4,1,100),(260,'Citizen Eco-Drive CA4010-58L','260.jpeg','260.1.jpeg','260.2.jpeg',1,158760,'CA4010-58L',8,1,4,4,2,'43',1,4,1,6,9,4,8,3,3,2,7,10,4,100),(261,'Casio Edifice  EFV-550GY-8AVUEF','261.jpeg','261.1.jpeg','261.2.jpeg',3,49990,'EFV-550GY-8AVUEF',1,1,1,4,1,'53 x 47 x 12,1',10,2,1,6,10,12,2,2,3,2,8,1,4,80),(262,'Casio Edifice EFV-550D-2AVUEF','262.jpeg','262.1.jpeg','262.2.jpeg',3,36990,'EFV-550D-2AVUEF',1,1,1,4,1,'53 x 47 x 12,1',10,2,1,6,9,4,2,2,3,2,7,1,4,80),(263,'Casio Edifice  EFV-C100L-1AVEF','263.jpeg','263.1.jpeg','263.2.jpeg',1,46780,'EFV-C100L-1AVEF',1,1,1,4,1,'51,6 x 46,6 x 14,2',11,2,1,6,9,2,2,2,2,2,6,4,4,100),(264,'Diesel Rasp DZ1807','264.jpeg','264.1.jpeg','264.2.jpeg',3,45990,'DZ1807',7,1,1,3,1,'49 x 10',1,1,2,6,8,2,2,2,3,2,6,3,4,80),(265,'Citizen Eco-Drive CA4215-04W','265.jpeg','265.1.jpeg','265.2.jpeg',1,81115,'CA4215-04W',8,1,3,4,2,'45 x 13',11,1,1,6,8,9,2,2,3,2,10,4,6,100),(266,'Casio Collection AEQ-110W-1A3VEF','266.jpeg','266.1.jpeg','266.2.jpeg',3,15990,'AEQ-110W-1A3VEF',1,1,1,4,1,'47 x 53 x 17',1,2,1,6,8,3,6,4,2,2,6,6,3,80),(267,'Citizen Super Titanium CA4444-82E','267.jpeg','267.1.jpeg','267.2.jpeg',1,139500,'CA4444-82E',8,1,4,4,2,'43',11,1,1,6,9,2,8,3,3,2,7,10,7,100),(268,'Citizen Super Titanium CA4444-82L','268.jpeg','268.1.jpeg','268.2.jpeg',1,139500,'CA4444-82L',8,1,4,4,2,'43',11,1,1,6,9,4,8,3,3,2,7,10,4,100),(269,'Tommy Hilfiger Alden 1791310','269.jpeg','269.1.jpeg','269.2.jpeg',1,34420,'1791310',4,1,1,3,1,'44 x 11',11,2,1,6,8,2,5,2,3,2,6,4,11,100),(270,'Diesel Mega Chief DZ4280','270.jpeg','270.1.jpeg','270.2.jpeg',3,44990,'DZ4280',7,1,1,4,1,'51 x 12',1,1,1,6,10,6,2,2,3,2,10,4,4,80),(271,'Citizen Eco-Drive BM8476-07E','271.jpeg','271.1.jpeg','271.2.jpeg',1,55400,'BM8476-07E',8,1,4,4,2,'42',1,4,1,6,8,2,2,2,3,2,10,4,4,100),(272,'Citizen Super Titanium AW1240-57L','272.jpeg','272.1.jpeg','272.2.jpeg',1,98520,'AW1240-57L',8,1,4,4,2,'42',1,4,1,6,9,4,8,3,3,2,7,10,2,100),(273,'Citizen Promaster BN0201-88L','273.jpeg','273.1.jpeg','273.2.jpeg',1,176490,'BN0201-88L',8,1,3,2,2,'44 x 12',11,1,1,6,9,4,8,2,3,2,7,10,3,100),(274,'Fossil Townsman ME3110','274.jpeg','274.1.jpeg','274.2.jpeg',1,83120,'ME3110',5,1,2,3,1,'44 x 12',1,1,2,1,9,4,2,2,3,2,10,4,4,100),(275,'Casio Collection AE-1400WHD-1AVEF','275.jpeg','275.1.jpeg','275.2.jpeg',3,16990,'AE-1400WHD-1AVEF',1,1,1,4,1,'46 x 14',11,2,1,6,9,1,6,1,1,2,7,1,6,80),(276,'Citizen Eco-Drive CA0695-17E','276.jpeg','276.1.jpeg','276.2.jpeg',1,94755,'CA0695-17E',8,1,3,4,2,'44 x 13',11,1,1,6,8,2,2,2,3,2,10,4,1,100),(277,'Daniel Wellington Classic Petite Melrose DW00100163','277.jpeg','277.1.jpeg','277.2.jpeg',1,50700,'DW00100163',11,2,1,1,1,'32 x 6',1,1,2,1,1,6,5,2,3,2,1,5,7,100),(278,'Daniel Wellington Classic Petite DW00100162','278.jpeg','278.1.jpeg','278.2.jpeg',2,57750,'DW00100162',11,2,1,1,1,'32 x 6',11,1,2,1,9,2,2,2,3,2,7,1,7,1),(279,'Michael Kors Darci MK3190','279.jpeg','279.1.jpeg','279.2.jpeg',1,34610,'MK3190',6,2,1,3,1,'39 x 8',1,1,2,1,9,8,2,2,3,2,7,1,10,100),(280,'Festina Boyfriend 206/3','280.jpeg','280.1.jpeg','280.2.jpeg',2,39200,'206/3',3,2,1,3,1,'34 x 28,5',1,1,1,1,9,13,2,2,3,2,10,1,12,1),(281,'Festina Classics 209/2','281.jpeg','281.1.jpeg','281.2.jpeg',1,28410,'209/2',3,2,1,3,1,'30,8 x 25',1,1,1,1,9,6,2,2,3,2,7,1,14,100),(282,'Michael Kors Blair MK5165','282.jpeg','282.1.jpeg','282.2.jpeg',1,42905,'MK5165',6,2,1,4,1,'39 x 11',1,1,1,1,9,8,2,2,3,2,7,1,7,100),(283,'Michael Kors Runway MK3178','283.jpeg','283.1.jpeg','283.2.jpeg',1,25465,'MK3178',6,2,1,3,1,'42',1,1,2,1,9,8,2,2,3,2,7,1,7,100),(284,'Michael Kors Runway MK3179','284.jpeg','284.1.jpeg','284.2.jpeg',1,27810,'MK3179',6,2,1,3,1,'42 x 8',1,3,2,1,7,7,2,2,3,2,5,1,8,100),(285,'Michael Kors Parker MK5491','285.jpeg','285.1.jpeg','285.2.jpeg',1,55725,'MK5491',6,2,1,4,1,'39 x 13',1,1,1,1,1,14,2,2,3,2,1,1,8,100),(286,'Michael Kors Bradshaw MK5605','286.jpeg','286.1.jpeg','286.2.jpeg',1,34545,'MK5605',6,2,1,3,1,'43 x 12',1,1,1,1,7,7,2,2,3,2,5,1,7,100),(287,'Michael Kors Slim Runway MK3221','287.jpeg','287.1.jpeg','287.2.jpeg',2,44430,'MK3221',6,2,1,3,1,'42 x 9',1,1,2,1,8,2,5,2,3,2,6,1,7,1),(288,'Michael Kors Bradshaw MK5739','288.jpeg','288.1.jpeg','288.2.jpeg',1,36515,'MK5739',6,2,1,4,1,'43 x 11',1,1,1,1,7,2,2,2,3,2,5,1,8,100),(289,'Casio Collection LTP-2069D-4AVEF','289.jpeg','289.1.jpeg','289.2.jpeg',1,26940,'LTP-2069D-4AVEF',1,2,1,3,1,'36,5 x 31 x 8,4',1,1,1,1,9,15,2,2,3,2,7,1,14,100),(290,'Festina Boyfriend 16716/1','290.jpeg','290.1.jpeg','290.2.jpeg',1,40100,'16716/1',3,2,1,3,1,'36 x 36 x 7',1,1,1,1,9,8,2,2,3,2,7,1,1,100),(291,'Michael Kors Chronograph MK3131','291.jpeg','291.1.jpeg','291.2.jpeg',1,29660,'MK3131',6,2,1,3,1,'37 x 14',1,1,1,1,7,9,2,2,3,2,5,1,14,100),(292,'Michael Kors Runway MK3197','292.jpeg','292.1.jpeg','292.2.jpeg',1,27920,'MK3197',6,2,1,3,1,'42 x 8',1,1,2,1,1,3,2,2,3,2,1,1,7,100),(293,'Casio Vintage B640WC-5AEF','293.jpeg','293.1.jpeg','293.2.jpeg',1,29595,'B640WC-5AEF',1,2,1,3,1,'33 x 8',1,1,1,1,1,1,1,1,1,1,1,1,1,100),(294,'Fossil Riley ES3202','294.jpeg','294.1.jpeg','294.2.jpeg',1,41200,'ES3202',5,2,1,4,1,'39 x 12',1,1,1,1,9,8,2,2,3,2,7,1,10,100),(295,'Daniel Wellington Classic Petite DW00100202','295.jpeg','295.1.jpeg','295.2.jpeg',2,48025,'DW00100202',11,2,1,1,1,'32 x 6',1,3,2,1,9,2,2,2,3,2,6,5,14,1),(296,'Festina Boyfriend 16719/1','296.jpeg','296.1.jpeg','296.2.jpeg',2,40320,'16719/1',3,2,1,3,1,'36 x 36 x 7',1,1,2,1,9,8,2,2,3,2,7,1,12,1),(297,'Michael Kors Chronograph MK5735','297.jpeg','297.1.jpeg','297.2.jpeg',1,37080,'MK5735',6,2,1,4,1,'38 x 12',1,3,1,1,9,8,5,2,3,2,2,5,7,100),(298,'Fossil Riley ES3203','298.jpeg','298.1.jpeg','298.2.jpeg',3,39990,'ES3203',5,2,1,4,1,'39 x 12',1,1,1,1,7,7,2,2,3,2,5,1,12,80),(299,'Daniel Wellington Classic Petite Ashfield DW00100245','299.jpeg','299.1.jpeg','299.2.jpeg',2,49620,'DW00100245',11,2,1,1,1,'50',1,1,2,1,1,2,5,2,3,2,6,5,7,1),(300,'Casio Retro LA680WEGA-9ER','300.jpeg','300.1.jpeg','300.2.jpeg',1,22220,'LA680WEGA-9ER',1,2,1,1,1,'33,5 x 28,6 x 8,6',1,1,1,1,7,7,6,2,1,1,5,1,4,100),(301,'Michael Kors Parker MK5784','301.jpeg','301.1.jpeg','301.2.jpeg',1,52245,'MK5784',6,2,1,3,1,'39,5 x 12',1,1,1,1,7,7,2,2,3,2,5,1,12,100),(302,'Michael Kors Runway MK3181','302.jpeg','302.1.jpeg','302.2.jpeg',1,25315,'MK3181',6,2,1,3,1,'42 x 9',1,1,2,1,1,13,2,2,3,2,1,1,8,100),(303,'Michael Kors Lexington MK5556','303.jpeg','303.1.jpeg','303.2.jpeg',1,34425,'MK5556',6,2,1,4,1,'38 x 10',1,1,1,1,7,7,2,2,3,2,5,1,4,100),(304,'Michael Kors Darci MK3406','304.jpeg','304.1.jpeg','304.2.jpeg',1,51235,'MK3406',6,2,1,3,1,'39 x 7',1,1,2,1,7,4,2,2,3,2,5,1,12,100),(305,'Daniel Wellington Classic Petite DW00100201','305.jpeg','305.1.jpeg','305.2.jpeg',1,60590,'DW00100201',11,2,1,1,1,'32 x 6',1,3,2,1,1,2,2,2,3,2,6,1,2,100),(306,'Casio Collection LTP-1259PD-7BEF','306.jpeg','306.1.jpeg','306.2.jpeg',1,18510,'LTP-1259PD-7BEF',1,2,1,1,1,'27 x 33 x 9',1,1,1,1,9,6,7,2,3,2,7,1,10,100),(307,'Michael Kors Ritz MK6077','307.jpeg','307.1.jpeg','307.2.jpeg',2,33105,'MK6077',6,2,1,4,1,'37 x 11',1,1,1,1,1,3,2,2,3,2,1,1,10,1),(308,'Casio Collection LTP-1234PGL-7AEF','308.jpeg','308.1.jpeg','308.2.jpeg',1,22245,'LTP-1234PGL-7AEF',1,2,1,1,1,'21 x 32 x 8',1,1,2,1,7,14,5,2,3,1,10,4,10,100),(309,'Michael Kors Darci MK3337','309.jpeg','309.1.jpeg','309.2.jpeg',1,42810,'MK3337',6,2,1,3,1,'39',1,1,2,1,8,2,5,2,3,2,6,5,10,100),(310,'Guess Lady Frontier W1156L1','310.jpeg','310.1.jpeg','310.2.jpeg',1,61080,'W1156L1',12,2,1,3,1,'40 x 11',1,1,1,1,9,8,2,2,3,2,7,1,7,100),(311,'Citizen Radio Controlled FC0010-55D','311.jpeg','311.1.jpeg','311.2.jpeg',1,174100,'FC0010-55D',8,2,4,4,2,'39',1,3,1,1,9,14,2,3,3,2,7,1,7,100),(312,'Festina Mademoiselle 16867/1','312.jpeg','312.1.jpeg','312.2.jpeg',1,30360,'16867/1',3,2,1,3,1,'33 x 10',1,1,1,1,9,8,2,2,3,2,7,1,10,100),(313,'Michael Kors Chronograph MK5057','313.jpeg','313.1.jpeg','313.2.jpeg',2,41815,'MK5057',6,2,1,4,1,'37 x 13',1,1,1,1,9,14,2,2,3,2,2,1,12,1),(314,'Daniel Wellington DW00100139','314.jpeg','314.1.jpeg','314.2.jpeg',1,74890,'DW00100139',11,2,1,1,1,'36 x 6',1,1,2,1,1,2,5,2,3,2,6,4,11,100),(315,'Fossil Virginia ES3282','315.jpeg','315.1.jpeg','315.2.jpeg',3,35990,'ES3282',5,2,1,3,1,'30 x 9',1,1,2,1,9,8,2,2,3,2,7,1,12,80),(316,'Michael Kors Slim Runway MK3478','316.jpeg','316.1.jpeg','316.2.jpeg',1,25335,'MK3478',6,2,1,3,1,'42 x 47 x 9',1,1,2,1,7,2,2,2,3,2,5,1,12,100),(317,'Guess Solar W1070L1','317.jpeg','317.1.jpeg','317.2.jpeg',1,55095,'W1070L1',12,2,1,1,1,'40 x 10,2',1,1,1,1,9,8,2,2,3,2,7,1,7,100),(318,'Tommy Hilfiger Angela 1782127','318.jpeg','318.1.jpeg','318.2.jpeg',1,41095,'1782127',4,2,1,1,1,'36 x 8',1,1,1,1,9,3,2,2,3,2,7,1,7,100),(319,'Fossil Jacqueline ES3546','319.jpeg','319.1.jpeg','319.2.jpeg',1,52620,'ES3546',5,2,1,1,1,'36 x 8',1,1,1,1,1,3,2,2,3,2,1,1,14,100),(320,'Festina Boyfriend 20397/3','320.jpeg','320.1.jpeg','320.2.jpeg',1,48760,'20397/3',3,2,1,4,1,'38.5',1,1,2,1,9,9,2,2,3,2,7,1,7,100),(321,'Casio Collection LA680WEGA-1ER','321.jpeg','321.1.jpeg','321.2.jpeg',3,22990,'LA680WEGA-1ER',1,2,1,1,1,'33,5 x 28,6 x 8,6',1,1,1,1,7,1,9,2,1,1,5,1,1,80),(322,'Guess Lady Frontier W1156L2','322.jpeg','322.1.jpeg','322.2.jpeg',1,59870,'W1156L2',12,2,1,3,1,'40 x 11',1,1,1,1,7,7,5,2,3,2,5,5,7,100),(323,'Michael Kors Lexington MK5955','323.jpeg','323.1.jpeg','323.2.jpeg',1,46080,'MK5955',6,2,1,4,1,'38 x 13',1,2,1,1,3,8,5,2,3,2,2,5,1,100),(324,'Casio Collection LTP-1259PD-2AEF','324.jpeg','324.1.jpeg','324.2.jpeg',1,19195,'LTP-1259PD-2AEF',1,2,1,1,1,'27 x 33 x 9',1,1,1,1,9,4,7,2,3,2,7,1,14,100),(325,'Michael Kors Slim Runway MK3293','325.jpeg','325.1.jpeg','325.2.jpeg',1,28350,'MK3293',6,2,1,3,1,'42',1,1,2,1,1,16,5,2,3,2,1,1,1,100),(326,'Fossil Scarlette ES4317','326.jpeg','326.1.jpeg','326.2.jpeg',4,35990,'ES4317',5,2,1,3,1,'32 x 9',1,1,1,1,9,8,2,2,3,2,7,1,7,1),(327,'Casio Collection LTP-1302PSG-7AVEF','327.jpeg','327.1.jpeg','327.2.jpeg',1,26330,'LTP-1302PSG-7AVEF',1,2,1,3,1,'30',1,1,1,1,9,8,2,2,3,2,2,1,14,100),(328,'Festina Boyfriend 16719/2','328.jpeg','328.1.jpeg','328.2.jpeg',1,35470,'16719/2',3,2,1,3,1,'36 x 36 x 7',1,1,2,1,9,2,2,2,3,2,7,1,12,100),(329,'Michael Kors Parker MK5925','329.jpeg','329.1.jpeg','329.2.jpeg',1,41745,'MK5925',6,2,1,3,1,'39 x 39',1,1,2,1,9,8,2,2,3,2,7,1,10,100),(330,'Daniel Wellington Grand Petite Melrose 36 DW00100303','330.jpeg','330.1.jpeg','330.2.jpeg',2,50195,'DW00100303',11,2,1,1,1,'36 x 6',3,1,2,1,1,2,5,2,3,2,1,5,7,1),(331,'Daniel Wellington Petite Sterling 36 DW00100306','331.jpeg','331.1.jpeg','331.2.jpeg',1,50195,'DW00100306',11,2,1,1,1,'36 x 6',3,1,2,1,9,6,2,2,3,2,7,1,7,100),(332,'Guess Aurora W1288L1','332.jpeg','332.1.jpeg','332.2.jpeg',1,62890,'W1288L1',12,2,1,1,1,'37 x 9',1,1,2,1,9,8,2,2,3,2,7,1,1,100),(333,'Michael Kors Runway MK8315','333.jpeg','333.1.jpeg','333.2.jpeg',1,41815,'MK8315',6,2,1,4,1,'45 x 11',1,1,1,1,7,4,2,2,3,2,5,1,4,100),(334,'Daniel Wellington DW00100304','334.jpeg','334.1.jpeg','334.2.jpeg',2,50195,'DW00100304',11,2,1,1,1,'36 x 6',3,1,2,1,9,2,2,2,3,2,7,1,7,1),(335,'Michael Kors Bradshaw MK5503','335.jpeg','335.1.jpeg','335.2.jpeg',1,36650,'MK5503',6,2,1,4,1,'43 x 13',1,1,1,1,1,3,2,2,3,2,1,1,7,100),(336,'Daniel Wellington DW00100307','336.jpeg','336.1.jpeg','336.2.jpeg',2,70890,'DW00100307',11,2,1,1,1,'36 x 6',3,1,2,1,1,2,5,2,3,2,6,5,7,1),(337,'Daniel Wellington Petite Ashfield 36 DW00100308','337.jpeg','337.1.jpeg','337.2.jpeg',2,50660,'DW00100308',11,2,1,1,1,'36 x 6',3,1,2,1,9,2,2,2,3,2,6,5,7,1),(338,'Casio Collection LTP-1302PD-7BVEF','338.jpeg','338.1.jpeg','338.2.jpeg',3,20990,'LTP-1302PD-7BVEF',1,2,1,3,1,'30',1,1,1,1,9,6,2,2,3,2,7,1,12,80),(339,'Michael Kors Darci MK3352','339.jpeg','339.1.jpeg','339.2.jpeg',1,36840,'MK3352',6,2,1,1,1,'39 x 7',1,1,2,1,9,15,2,2,3,2,7,1,10,100),(340,'Festina Boyfriend 20397/1','340.jpeg','340.1.jpeg','340.2.jpeg',3,39990,'20397/1',3,2,1,4,1,'38.5',1,1,2,1,9,14,2,2,3,2,7,1,7,80),(341,'Michael Kors Lexington MK5569','341.jpeg','341.1.jpeg','341.2.jpeg',1,36880,'MK5569',6,2,1,4,1,'38 x 12',1,1,1,1,1,3,2,2,3,2,1,1,8,100),(342,'Fossil Jesse ES2362','342.jpeg','342.1.jpeg','342.2.jpeg',3,35990,'ES2362',5,2,1,3,1,'35 x 8',1,1,2,1,9,6,2,2,3,2,7,1,14,80),(343,'Casio Retro LA670WEA-1EF','343.jpeg','343.1.jpeg','343.2.jpeg',1,15635,'LA670WEA-1EF',1,2,1,1,1,'25 x 7',1,1,1,1,9,1,2,4,1,1,7,1,7,100),(344,'Michael Kors Bradshaw MK5799','344.jpeg','344.1.jpeg','344.2.jpeg',1,36400,'MK5799',6,2,1,4,1,'35',1,1,1,1,1,3,2,2,3,2,1,1,14,100),(345,'Michael Kors Darci MK3220','345.jpeg','345.1.jpeg','345.2.jpeg',1,38865,'MK3220',6,2,1,3,1,'40 x 8',1,1,2,1,1,14,2,2,3,2,1,1,7,100),(346,'Tommy Hilfiger Angela 1782128','346.jpeg','346.1.jpeg','346.2.jpeg',1,39110,'1782128',4,2,1,1,1,'36 x 8',3,1,1,1,7,8,5,2,3,2,5,5,7,100),(347,'Casio Collection LTP-1234PG-7AEF','347.jpeg','347.1.jpeg','347.2.jpeg',1,23265,'LTP-1234PG-7AEF',1,2,1,1,1,'22 x 32 x 8',1,1,2,1,7,8,7,2,3,4,5,1,12,100),(348,'Michael Kors Portia MK3843','348.jpeg','348.1.jpeg','348.2.jpeg',1,38150,'MK3843',6,2,1,3,1,'36 x 8',1,1,2,1,9,8,2,2,3,2,7,1,8,100),(349,'Casio Collection LRW-200H-1BVEF','349.jpeg','349.1.jpeg','349.2.jpeg',1,14990,'LRW-200H-1BVEF',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,1,1,1,8,2,6,7,3,2,6,2,12,100),(350,'Michael Kors Runway MK5473','350.jpeg','350.1.jpeg','350.2.jpeg',1,38005,'MK5473',6,2,1,4,1,'45 x 15',1,3,2,1,7,7,2,2,3,2,5,1,7,100),(351,'Citizen Eco-Drive EM0504-81A','351.jpeg','351.1.jpeg','351.2.jpeg',1,53155,'EM0504-81A',8,2,4,3,2,'32 x 7',1,1,2,1,3,6,2,2,3,2,7,1,4,100),(352,'Fossil Jacqueline ES3843','352.jpeg','352.1.jpeg','352.2.jpeg',1,42150,'ES3843',5,2,1,1,1,'36 x 40 x 8',1,1,1,1,1,6,2,2,3,2,9,4,7,100),(353,'Casio Collection LW-200-2AVEF','353.jpeg','353.1.jpeg','353.2.jpeg',1,14770,'LW-200-2AVEF',1,2,1,3,1,'35 x 12',1,1,1,1,9,1,6,2,1,2,9,2,12,100),(354,'Guess  Solar W1070L3','354.jpeg','354.1.jpeg','354.2.jpeg',1,70605,'W1070L3',12,2,1,1,1,'40 x 10,2',1,1,1,1,1,3,5,2,3,2,1,5,7,100),(355,'Festina Mademoiselle 20371/1','355.jpeg','355.1.jpeg','355.2.jpeg',1,34925,'20371/1',3,2,1,1,1,'38',1,6,2,1,9,8,2,2,3,2,12,4,7,100),(356,'Michael Kors Runway MK3149','356.jpeg','356.1.jpeg','356.2.jpeg',1,34080,'MK3149',6,2,1,3,1,'38',1,6,1,1,9,8,2,2,3,2,7,1,12,100),(357,'Festina Boyfriend 20400/1','357.jpeg','357.1.jpeg','357.2.jpeg',1,60540,'20400/1',3,2,1,4,1,'38.5 x 11',1,6,2,1,7,8,5,2,3,2,5,5,7,100),(358,'Anne Klein AK/2158RGRG','358.jpeg','358.1.jpeg','358.2.jpeg',4,21990,'AK/2158RGRG',28,2,1,1,1,'30 x 9',1,1,2,1,1,15,10,2,3,2,1,10,14,1),(359,'Fossil Carlie ES4341','359.jpeg','359.1.jpeg','359.2.jpeg',3,39990,'ES4341',5,2,1,1,1,'35 x 9',1,1,2,1,9,8,2,2,3,2,7,1,12,80),(360,'Rosefield The West Village WEGR-W75','360.jpeg','360.1.jpeg','360.2.jpeg',2,37905,'WEGR-W75',14,2,1,1,1,'33 x 7',1,6,2,1,1,6,7,2,3,2,8,4,12,1),(361,'Emporio Armani Chrono AR5920','361.jpeg','361.1.jpeg','361.2.jpeg',1,49215,'AR5920',2,2,1,3,1,'38 x 38',1,5,1,1,1,6,2,2,3,2,12,1,15,100),(362,'Michael Kors Parker MK6117','362.jpeg','362.1.jpeg','362.2.jpeg',1,36400,'MK6117',6,2,1,4,1,'39 x 12',1,1,1,1,9,16,2,2,3,2,7,1,10,100),(363,'Festina Boyfriend 20475/1','363.jpeg','363.1.jpeg','363.2.jpeg',1,34225,'20475/1',3,2,1,1,1,'38',1,1,2,1,9,8,2,2,3,2,7,1,7,100),(364,'Guess G Twist W0911L3','364.jpeg','364.1.jpeg','364.2.jpeg',1,24710,'W0911L3',12,2,1,1,1,'39 x 10',1,1,2,1,7,7,5,2,3,2,6,8,7,100),(365,'Tommy Hilfiger Ari 1781978','365.jpeg','365.1.jpeg','365.2.jpeg',1,49915,'1781978',4,2,1,1,1,'38 x 10',1,1,1,1,1,8,5,2,3,2,1,5,7,100),(366,'Casio Collection LTP-1302PD-1A1VEF','366.jpeg','366.1.jpeg','366.2.jpeg',1,22220,'LTP-1302PD-1A1VEF',1,2,1,3,1,'30 x 35 x 9',1,1,1,1,9,2,7,2,3,2,7,1,10,100),(367,'Casio Collection LW-200-4AVEF','367.jpeg','367.1.jpeg','367.2.jpeg',2,14305,'LW-200-4AVEF',1,2,1,3,1,'35 x 12',1,1,1,1,8,1,6,2,1,2,11,2,12,1),(368,'Casio Collection LRW-200H-7E2VEF','368.jpeg','368.1.jpeg','368.2.jpeg',1,13130,'LRW-200H-7E2VEF',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,1,1,1,12,6,6,7,3,2,12,2,14,100),(369,'Tommy Hilfiger Kelly 1782114','369.jpeg','369.1.jpeg','369.2.jpeg',2,53105,'1782114',4,2,1,1,1,'38 x x 6,5',1,1,2,1,7,7,5,2,3,2,5,5,7,1),(370,'Skagen Anita SKW2149','370.jpeg','370.1.jpeg','370.2.jpeg',3,43990,'SKW2149',15,2,1,1,1,'30 x 6,7',1,1,2,1,9,8,2,2,3,2,7,1,14,80),(371,'Fossil Riley ES3466','371.jpeg','371.1.jpeg','371.2.jpeg',3,39990,'ES3466',5,2,1,4,1,'38 x 11',1,1,1,1,1,8,2,2,3,2,16,1,14,80),(372,'Casio Collection LRW-200H-4BVEF','372.jpeg','372.1.jpeg','372.2.jpeg',1,12815,'LRW-200H-4BVEF',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,2,1,1,12,6,9,4,3,2,12,6,12,100),(373,'Guess Aurora W1288L2','373.jpeg','373.1.jpeg','373.2.jpeg',1,76805,'W1288L2',12,2,1,1,1,'37 x 9',1,1,2,1,7,7,2,2,3,2,2,1,8,100),(374,'Tommy Hilfiger Project Z 1782163','374.jpeg','374.1.jpeg','374.2.jpeg',1,30680,'1782163',4,2,1,1,1,'38 x 6',1,1,2,1,9,8,2,2,3,2,7,1,7,100),(375,'Fossil Riley ES4519','375.jpeg','375.1.jpeg','375.2.jpeg',2,53455,'ES4519',5,2,1,3,1,'38 x 11',1,1,1,1,8,2,5,2,3,2,6,5,7,1),(376,'Fossil Carlie ES4301','376.jpeg','376.1.jpeg','376.2.jpeg',1,42455,'ES4301',5,2,1,1,1,'35 x 9',1,3,2,1,1,3,2,2,3,2,1,1,12,100),(377,'Michael Kors Slim Runway MK3435','377.jpeg','377.1.jpeg','377.2.jpeg',1,29000,'MK3435',6,2,1,3,1,'42',1,1,2,1,7,17,5,2,3,2,5,5,12,100),(378,'Casio LW-200-1AVEF','378.jpeg','378.1.jpeg','378.2.jpeg',1,17345,'LW-200-1AVEF',1,2,1,3,1,'37,90 x 34,90 x 11,90',1,2,1,1,4,1,6,5,1,2,6,2,12,100),(379,'Festina Boyfriend  20401/1','379.jpeg','379.1.jpeg','379.2.jpeg',1,43840,'20401/1',3,2,1,3,1,'36 x 40 x 9,5',1,1,2,1,9,14,2,2,3,2,7,1,7,100),(380,'Festina Boyfriend 20398/1','380.jpeg','380.1.jpeg','380.2.jpeg',3,49990,'20398/1',3,2,1,4,1,'38.5 x 11',1,6,2,1,2,8,2,2,3,2,2,1,7,80),(381,'Michael Kors Bradshaw MK5606','381.jpeg','381.1.jpeg','381.2.jpeg',3,30990,'MK5606',6,2,1,3,1,'43 x 14',1,1,1,1,2,4,2,2,3,2,7,1,7,80),(382,'Michael Kors Parker MK6263','382.jpeg','382.1.jpeg','382.2.jpeg',1,45290,'MK6263',6,2,1,3,1,'39 x 11',1,1,1,1,7,17,2,2,3,2,5,1,14,100),(383,'Rosefield The Tribeca TWG-T51','383.jpeg','383.1.jpeg','383.2.jpeg',2,38645,'TWG-T51',14,2,1,1,1,'33 x 7',1,6,2,1,7,6,7,2,3,2,5,1,13,1),(384,'Guess W1293L1','384.jpeg','384.1.jpeg','384.2.jpeg',2,59865,'W1293L1',12,2,1,1,1,'36',1,1,1,1,9,8,2,2,3,2,7,1,12,1),(385,'Skagen Anita SKW2150','385.jpeg','385.1.jpeg','385.2.jpeg',1,51220,'SKW2150',15,2,1,1,1,'30 x 6,7',1,1,2,1,7,8,2,2,3,2,5,1,12,100),(386,'Festina Boyfriend 20412/2','386.jpeg','386.1.jpeg','386.2.jpeg',1,42625,'20412/2',3,2,1,3,1,'36',1,3,2,1,9,15,2,2,3,2,17,4,12,100),(387,'Citizen Super Titanium EW2214-52A','387.jpeg','387.1.jpeg','387.2.jpeg',3,93990,'EW2214-52A',8,2,4,4,2,'34',1,4,1,1,3,6,8,3,3,2,7,10,14,80),(388,'Fossil Jacqueline ES4274','388.jpeg','388.1.jpeg','388.2.jpeg',3,29990,'ES4274',5,2,1,1,1,'42 x 36 x 8',1,1,1,1,2,4,5,2,3,2,10,4,7,80),(389,'Guess Chelsea W0989L1','389.jpeg','389.1.jpeg','389.2.jpeg',1,34870,'W0989L1',12,2,1,1,1,'30',1,3,2,1,9,8,2,2,3,2,7,1,12,100),(390,'Casio Vintage B650WC-5AEF','390.jpeg','390.1.jpeg','390.2.jpeg',2,26795,'B650WC-5AEF',1,2,1,3,1,'43,1 x 41,2 x 10,5',1,1,1,1,1,1,6,2,1,1,1,1,2,1),(391,'Festina Boyfriend 16716/3','391.jpeg','391.1.jpeg','391.2.jpeg',1,42370,'16716/3',3,2,1,3,1,'36 x 36 x 7',1,1,1,1,9,3,2,2,3,2,7,1,10,100),(392,'Rosefield The Mercer MBB-M43','392.jpeg','392.1.jpeg','392.2.jpeg',2,37905,'MBB-M43',14,2,1,1,1,'38 x 8',1,6,2,1,8,2,7,2,3,2,6,1,13,1),(393,'Casio Collection LRW-200H-2BVEF','393.jpeg','393.1.jpeg','393.2.jpeg',3,11990,'LRW-200H-2BVEF',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,2,1,1,12,6,9,4,3,2,12,6,12,80),(394,'Fossil Virginia ES3405','394.jpeg','394.1.jpeg','394.2.jpeg',1,47120,'ES3405',5,2,1,3,1,'30 x 9',1,1,2,1,3,3,5,2,3,2,2,1,12,100),(395,'Festina Boyfriend 20371/2','395.jpeg','395.1.jpeg','395.2.jpeg',3,25990,'20371/2',3,2,1,1,1,'38',1,6,2,1,9,15,2,2,3,2,17,4,7,80),(396,'Fossil Scarlette ES4318','396.jpeg','396.1.jpeg','396.2.jpeg',2,47120,'ES4318',5,2,1,3,1,'32 x 9',1,1,1,1,1,3,5,2,3,2,1,5,7,1),(397,'Rosefield The Tribeca TBR-T59','397.jpeg','397.1.jpeg','397.2.jpeg',1,38095,'TBR-T59',14,2,1,1,1,'33 x 7',1,6,2,1,1,2,7,2,3,2,1,1,13,100),(398,'Citizen Eco-Drive EO1184-81D','398.jpeg','398.1.jpeg','398.2.jpeg',2,63175,'EO1184-81D',8,2,4,3,2,'34 x 8',1,1,1,1,3,14,2,2,3,2,2,1,7,1),(399,'Rosefield The Small Edit 26WR-265','399.jpeg','399.1.jpeg','399.2.jpeg',2,38645,'26WR-265',14,2,1,1,1,'26 x 6',1,1,2,1,1,6,5,2,3,2,1,5,7,1),(400,'Festina Mademoiselle 16868/1','400.jpeg','400.1.jpeg','400.2.jpeg',1,43020,'16868/1',3,2,1,3,1,'33 x 10',1,1,1,1,3,6,2,2,3,2,2,1,14,100),(401,'Michael Kors Slim Runway MK3291','401.jpeg','401.1.jpeg','401.2.jpeg',1,32805,'MK3291',6,2,1,3,1,'42',1,1,2,1,9,15,2,2,3,2,7,1,12,100),(402,'Tommy Hilfiger Alexa 1782160','402.jpeg','402.1.jpeg','402.2.jpeg',1,31080,'1782160',4,2,1,1,1,'38 x 6',1,1,2,1,8,2,5,2,3,2,6,5,7,100),(403,'Michael Kors Pyper MK2740','403.jpeg','403.1.jpeg','403.2.jpeg',3,47990,'MK2740',6,2,1,3,1,'38 x 8',1,2,2,1,7,8,2,2,3,2,10,4,14,80),(404,'Casio Collection LTP-1302D-7BVEF','404.jpeg','404.1.jpeg','404.2.jpeg',1,20975,'LTP-1302D-7BVEF',1,2,1,3,1,'34,5  x  30,2  x  8,7',1,1,1,1,9,6,2,2,3,2,7,1,14,100),(405,'Fossil Carlie ES4502','405.jpeg','405.1.jpeg','405.2.jpeg',2,39805,'ES4502',5,2,1,1,1,'28 x 7',1,1,2,1,1,6,5,2,3,2,9,4,7,1),(406,'Emporio Armani Classic AR1908','406.jpeg','406.1.jpeg','406.2.jpeg',1,46025,'AR1908',2,2,1,1,1,'32 x 7',1,3,2,1,9,14,2,2,3,2,7,1,12,100),(407,'Michael Kors Darci MK3218','407.jpeg','407.1.jpeg','407.2.jpeg',1,43700,'MK3218',6,2,1,3,1,'39',1,1,2,1,9,15,2,2,3,2,7,1,10,100),(408,'Guess Lady Frontier W1160L1','408.jpeg','408.1.jpeg','408.2.jpeg',1,79720,'W1160L1',12,2,1,3,1,'40 x 12',1,1,1,1,7,7,5,2,3,2,6,8,7,100),(409,'Festina Boyfriend 20397/2','409.jpeg','409.1.jpeg','409.2.jpeg',3,41990,'20397/2',3,2,1,4,1,'38.5',1,1,2,1,9,4,2,2,3,2,7,1,7,80),(410,'Casio Collection LW-203-1BVEF','410.jpeg','410.1.jpeg','410.2.jpeg',1,14525,'LW-203-1BVEF',1,2,1,3,1,'38,1 x 34,6 x 11,3',1,2,1,1,8,1,6,1,1,2,6,2,14,100),(411,'Skagen Anita SKW2151','411.jpeg','411.1.jpeg','411.2.jpeg',4,51990,'SKW2151',15,2,1,1,1,'30 x 6,7',1,1,2,1,1,8,2,2,3,2,1,1,12,1),(412,'Rosefield The Upper East Side UEWG-U21','412.jpeg','412.1.jpeg','412.2.jpeg',2,42645,'UEWG-U21',14,2,1,1,1,'33 x 7',1,6,2,1,7,14,7,2,3,2,5,1,7,1),(413,'Casio Retro LA680WGA-9DF','413.jpeg','413.1.jpeg','413.2.jpeg',1,28670,'LA680WGA-9DF',1,2,1,1,1,'33,5 x 28,6 x 8,6',1,1,1,1,7,1,6,2,1,1,5,1,7,100),(414,'Casio Retro LA680WGA-9BEF','414.jpeg','414.1.jpeg','414.2.jpeg',3,19990,'LA680WGA-9BEF',1,2,1,1,1,'33,8 x 28,6 x 8,6',1,6,1,1,7,1,9,2,1,1,5,1,7,80),(415,'Festina Boyfriend  20402/1','415.jpeg','415.1.jpeg','415.2.jpeg',1,54070,'20402/1',3,2,1,3,1,'36 x 40 x 9,5',1,1,2,1,3,14,2,2,3,2,2,1,7,100),(416,'Casio Collection LTP-1308PD-1BVEF','416.jpeg','416.1.jpeg','416.2.jpeg',4,18990,'LTP-1308PD-1BVEF',1,2,1,3,1,'35,9 x 31,2 x 8,7',1,1,1,1,9,2,7,2,3,2,7,1,12,1),(417,'Casio Youth Ladies LRW-200H-4E2VDR','417.jpeg','417.1.jpeg','417.2.jpeg',1,16660,'LRW-200H-4E2VDR',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,1,1,1,12,5,1,4,3,2,12,2,12,100),(418,'Guess Chelsea W1209L1','418.jpeg','418.1.jpeg','418.2.jpeg',1,31935,'W1209L1',12,2,1,1,1,'30 x 8',1,1,2,1,9,8,2,2,3,2,7,1,7,100),(419,'Rosefield The Mercer MWR-M42','419.jpeg','419.1.jpeg','419.2.jpeg',2,37905,'MWR-M42',14,2,1,1,1,'38 x 8',1,6,2,1,1,6,7,2,3,2,1,1,13,1),(420,'Tommy Hilfiger Angela 1782126','420.jpeg','420.1.jpeg','420.2.jpeg',1,35045,'1782126',4,2,1,1,1,'36 x 8',1,1,1,1,9,4,2,2,3,2,7,1,7,100),(421,'Guess Terrace W1230L2','421.jpeg','421.1.jpeg','421.2.jpeg',1,42280,'W1230L2',12,2,1,1,1,'32 x 8',1,1,2,1,7,7,5,2,3,2,10,4,7,100),(422,'Festina Boyfriend 20476/2','422.jpeg','422.1.jpeg','422.2.jpeg',1,43165,'20476/2',3,2,1,1,1,'38 x 42 x 7',1,1,2,1,7,2,2,2,3,2,5,1,7,100),(423,'DKNY Soho NY2341','423.jpeg','423.1.jpeg','423.2.jpeg',1,35695,'NY2341',16,2,1,3,1,'34 x 9',1,6,2,1,1,9,2,2,3,2,8,4,10,100),(424,'Casio Collection LTP-1302D-7A1VDF','424.jpeg','424.1.jpeg','424.2.jpeg',1,25405,'LTP-1302D-7A1VDF',1,2,1,3,1,'34,5 x 30,2 x 8,7',1,1,1,1,9,6,2,2,3,2,7,1,7,100),(425,'Citizen Eco-Drive FE1081-08A','425.jpeg','425.1.jpeg','425.2.jpeg',1,41425,'FE1081-08A',8,2,4,1,2,'30 x 8',1,1,1,1,9,8,2,2,3,2,6,4,14,100),(426,'Festina Mademoiselle 16868/2','426.jpeg','426.1.jpeg','426.2.jpeg',1,34690,'16868/2',3,2,1,3,1,'33 x 10',1,1,1,1,2,6,2,2,3,2,2,1,10,100),(427,'Skagen  Freja SKW2699','427.jpeg','427.1.jpeg','427.2.jpeg',4,33990,'SKW2699',15,2,1,1,1,'26 x 6,5',1,1,2,1,2,8,5,2,3,2,2,5,14,1),(428,'Tommy Hilfiger Blake 1781904','428.jpeg','428.1.jpeg','428.2.jpeg',1,41275,'1781904',4,2,1,1,1,'38 x 42 x 9',1,3,1,1,9,15,2,2,3,2,7,1,15,100),(429,'Casio Sports LW-200-7AV','429.jpeg','429.1.jpeg','429.2.jpeg',1,14200,'LW-200-7AV',1,2,1,3,1,'37,9 x 34,9 x 11,9',1,1,1,1,9,1,9,4,1,2,12,6,7,100),(430,'Michael Kors Darci MK3217','430.jpeg','430.1.jpeg','430.2.jpeg',1,41075,'MK3217',6,2,1,3,1,'39 x 39 x 7',1,1,2,1,1,13,2,2,3,2,1,1,10,100),(431,'Casio Enticer LTP-1303D-7AVDF','431.jpeg','431.1.jpeg','431.2.jpeg',1,19155,'LTP-1303D-7AVDF',1,2,1,3,1,'35,5 x 30 x 7,5',1,1,2,1,9,8,2,2,3,2,7,1,14,100),(432,'Citizen Super Titanium EW23-53L','432.jpeg','432.1.jpeg','432.2.jpeg',3,93990,'EW23-53L',8,2,4,4,2,'34 x 9',1,4,1,1,9,4,8,3,3,2,7,10,12,80),(433,'Citizen Super Titanium EW23-53E','433.jpeg','433.1.jpeg','433.2.jpeg',3,82990,'EW23-53E',8,2,4,4,2,'34 x 9',1,4,1,1,9,2,8,3,3,2,7,10,12,80),(434,'Citizen Eco-Drive EM0503-83X','434.jpeg','434.1.jpeg','434.2.jpeg',1,56765,'EM0503-83X',8,2,4,3,2,'32 x 7',1,1,2,1,1,3,2,2,3,2,1,1,12,100),(435,'Tommy Hilfiger Gray 1782213','435.jpeg','435.1.jpeg','435.2.jpeg',1,27140,'1782213',4,2,1,1,1,'36 x 6',1,1,2,1,9,4,2,2,3,2,9,4,7,100),(436,'Rosefield The Mercer MWS-M40','436.jpeg','436.1.jpeg','436.2.jpeg',1,38645,'MWS-M40',14,2,1,1,1,'38 x 8',1,6,2,1,9,6,7,2,3,2,7,1,13,100),(437,'Rosefield The Tribeca TWR-T50','437.jpeg','437.1.jpeg','437.2.jpeg',2,32775,'TWR-T50',14,2,1,1,1,'33 x 7',1,6,2,1,1,6,7,2,3,2,1,1,13,1),(438,'Guess W1283L1','438.jpeg','438.1.jpeg','438.2.jpeg',2,33625,'W1283L1',12,2,1,1,1,'38,1 x 10,7',1,1,2,1,12,6,2,2,3,2,12,3,7,1),(439,'Casio Retro A700WEMG-9AEF','439.jpeg','439.1.jpeg','439.2.jpeg',1,27425,'A700WEMG-9AEF',1,2,1,1,1,'35,5 x 37,4 x 6',1,1,1,1,7,1,9,4,1,1,5,1,7,100),(440,'Tommy Hilfiger Alexa 1782154','440.jpeg','440.1.jpeg','440.2.jpeg',1,41730,'1782154',4,2,1,1,1,'38',1,1,2,1,9,4,2,2,3,2,9,3,7,100),(441,'Casio Youth Ladies LRW-200H-2E2VDR','441.jpeg','441.1.jpeg','441.2.jpeg',3,10990,'LRW-200H-2E2VDR',1,2,1,4,1,'38.9 × 34.2 × 11.5',1,1,1,1,12,5,1,4,3,2,12,2,12,80),(442,'Guess Sugar GW0001L2','442.jpeg','442.1.jpeg','442.2.jpeg',1,52480,'GW0001L2',12,2,1,1,1,'37',1,1,2,1,7,5,5,2,3,2,5,5,7,100),(443,'Casio Youth Ladies LRW-200H-3CVDF','443.jpeg','443.1.jpeg','443.2.jpeg',3,9990,'LRW-200H-3CVDF',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,1,1,1,12,17,1,4,3,2,12,2,12,80),(444,'Casio Youth Ladies LRW-200H-9E2VDF','444.jpeg','444.1.jpeg','444.2.jpeg',1,13575,'LRW-200H-9E2VDF',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,1,1,1,8,3,1,4,3,2,6,2,7,100),(445,'Tommy Hilfiger Liberty 1782219','445.jpeg','445.1.jpeg','445.2.jpeg',1,67800,'1782219',4,2,1,1,1,'35 x 7',1,1,2,1,1,4,2,2,3,2,9,1,12,100),(446,'Casio Collection LW-200-2BVDF','446.jpeg','446.1.jpeg','446.2.jpeg',1,17135,'LW-200-2BVDF',1,2,1,3,1,'32 x 12',1,2,1,1,9,1,6,4,1,2,9,6,12,100),(447,'Skagen Signature Slim SKW2692','447.jpeg','447.1.jpeg','447.2.jpeg',3,36990,'SKW2692',15,2,1,3,1,'30 x 6',1,1,2,1,9,6,2,2,3,2,7,1,14,80),(448,'Michael Kors Darci MK3507','448.jpeg','448.1.jpeg','448.2.jpeg',1,41030,'MK3507',6,2,1,3,1,'39 x 8',1,1,2,1,7,3,5,2,3,2,5,5,12,100),(449,'Festina Mademoiselle 16937/B','449.jpeg','449.1.jpeg','449.2.jpeg',1,42625,'16937/B',3,2,1,3,1,'32,5 x 36 x 9',1,1,2,1,9,7,2,2,3,2,2,1,7,100),(450,'Tommy Hilfiger Haven 1782196','450.jpeg','450.1.jpeg','450.2.jpeg',1,41895,'1782196',4,2,1,1,1,'38 x 8',1,2,1,1,10,12,5,2,3,2,8,5,14,100),(451,'Casio Youth Ladies LRW-200H-9EVDF','451.jpeg','451.1.jpeg','451.2.jpeg',1,19310,'LRW-200H-9EVDF',1,2,1,4,1,'38.9 × 34.2 × 11.5',1,1,1,1,8,7,1,4,3,2,6,2,7,100),(452,'Casio Youth Ladies LRW-200H-4B2VDF','452.jpeg','452.1.jpeg','452.2.jpeg',1,14645,'LRW-200H-4B2VDF',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,1,1,1,16,8,1,4,3,2,17,2,12,100),(453,'Festina Classics 16748/2','453.jpeg','453.1.jpeg','453.2.jpeg',1,40460,'16748/2',3,2,1,3,1,'31 x 31 x 7',1,1,1,1,9,8,2,2,3,2,7,1,16,100),(454,'Festina Boyfriend 20477/1','454.jpeg','454.1.jpeg','454.2.jpeg',3,30990,'20477/1',3,2,1,1,1,'38 x 42 x 7',1,1,2,1,1,3,2,2,3,2,1,1,7,80),(455,'Casio Enticer LTP-1302D-1A2VDF','455.jpeg','455.1.jpeg','455.2.jpeg',1,20745,'LTP-1302D-1A2VDF',1,2,1,3,1,'34,5 x 30,2 x 8,7',1,1,1,1,9,2,2,2,3,2,7,1,14,100),(456,'Rosefield The Boxy XS QMWSS-Q020','456.jpeg','456.1.jpeg','456.2.jpeg',1,41730,'QMWSS-Q020',14,2,1,1,1,'24 x 22 x 6',1,1,1,1,9,8,7,2,3,1,7,1,7,100),(457,'Festina Mademoiselle 20420/1','457.jpeg','457.1.jpeg','457.2.jpeg',2,39200,'20420/1',3,2,1,3,1,'36',1,3,2,1,9,14,2,2,3,2,7,1,4,1),(458,'Citizen Quartz EU6070-51D','458.jpeg','458.1.jpeg','458.2.jpeg',1,31815,'EU6070-51D',8,2,1,3,2,'28 x 8',1,1,1,1,9,14,2,2,3,2,7,1,12,100),(459,'Rosefield The Small Edit 26BSG-268','459.jpeg','459.1.jpeg','459.2.jpeg',2,47080,'26BSG-268',14,2,1,1,1,'26 x 30 x 6,5',1,1,2,1,7,2,5,2,3,2,5,5,7,1),(460,'Michael Kors Darci MK3322','460.jpeg','460.1.jpeg','460.2.jpeg',1,41070,'MK3322',6,2,1,3,1,'37 x 5',1,1,2,1,3,2,2,2,3,2,6,1,10,100),(461,'Tommy Hilfiger Angela 1782124','461.jpeg','461.1.jpeg','461.2.jpeg',1,39110,'1782124',4,2,1,1,1,'36 x 8',1,1,1,1,1,8,5,2,3,2,1,5,7,100),(462,'Guess Frontier W0799G4','462.jpeg','462.1.jpeg','462.2.jpeg',1,74220,'W0799G4',12,2,1,4,1,'48 x 12',1,1,1,1,3,8,5,2,3,2,2,5,14,100),(463,'Rosefield The West Village WEGTR-X184','463.jpeg','463.1.jpeg','463.2.jpeg',1,49315,'WEGTR-X184',14,2,1,1,1,'33 x 38 x 7',1,1,2,1,1,6,7,2,3,2,8,1,7,100),(464,'Festina Classics 16477/1','464.jpeg','464.1.jpeg','464.2.jpeg',3,23990,'16477/1',3,2,1,1,1,'31 x 6',1,1,1,1,9,6,2,2,3,2,6,4,10,80),(465,'Michael Kors Bradshaw MK5798','465.jpeg','465.1.jpeg','465.2.jpeg',1,51810,'MK5798',6,2,1,4,1,'36 x 11',1,1,1,1,7,7,2,2,3,2,5,1,12,100),(466,'Casio Collection LTP-1303PL-7BVEF','466.jpeg','466.1.jpeg','466.2.jpeg',1,19490,'LTP-1303PL-7BVEF',1,2,1,3,1,'35,5 x 30 x 7,5',1,1,2,1,9,6,7,2,3,2,18,10,14,100),(467,'Citizen Promaster EP6050-17E','467.jpeg','467.1.jpeg','467.2.jpeg',1,96110,'EP6050-17E',8,2,3,2,2,'34 x 12',1,2,1,1,4,2,2,2,3,2,6,3,12,100),(468,'Citizen Eco-Drive FE1081-59B','468.jpeg','468.1.jpeg','468.2.jpeg',3,52990,'FE1081-59B',8,2,4,1,2,'30 x 8',1,1,1,1,9,8,2,2,3,2,7,1,14,80),(469,'Festina Classics 16748/3','469.jpeg','469.1.jpeg','469.2.jpeg',3,26990,'16748/3',3,2,1,3,1,'30,8 x 7',1,1,1,1,9,4,2,2,3,2,7,1,10,80),(470,'Zeppelin LZ129 Hindenburg 7037-1','470.jpeg','470.1.jpeg','470.2.jpeg',1,119605,'1876253',9,2,1,1,1,'36 x 10',1,1,1,1,9,8,2,4,3,2,6,4,14,100),(471,'Citizen Quartz EU6074-51D','471.jpeg','471.1.jpeg','471.2.jpeg',1,46610,'EU6074-51D',8,2,1,3,2,'28 x 8',1,1,1,1,9,14,2,2,3,2,2,1,14,100),(472,'Casio Classic LTP-V300L-1A','472.jpeg','472.1.jpeg','472.2.jpeg',1,25875,'LTP-V300L-1A',1,2,1,1,1,'38×33.2×8.2',1,2,1,1,9,2,2,2,3,2,6,4,7,100),(473,'Guess Chelsea W1197L1','473.jpeg','473.1.jpeg','473.2.jpeg',1,33750,'W1197L1',12,2,1,1,1,'30 x 9',1,1,2,1,9,2,2,2,3,2,7,1,10,100),(474,'Rosefield The Ace ACSG-A03','474.jpeg','474.1.jpeg','474.2.jpeg',1,45960,'ACSG-A03',14,2,1,1,1,'33 x 7',1,1,1,1,7,8,2,2,3,2,5,1,2,100),(475,'Festina Boyfriend  20401/3','475.jpeg','475.1.jpeg','475.2.jpeg',3,37990,'20401/3',3,2,1,3,1,'36 x 40 x 9,5',1,1,2,1,9,14,2,2,3,2,7,1,7,80),(476,'Festina Boyfriend 20401/4','476.jpeg','476.1.jpeg','476.2.jpeg',1,59005,'20401/4',3,2,1,3,1,'36 x 40 x 9,5',1,1,2,1,9,14,2,2,3,2,7,1,7,100),(477,'Festina Boyfriend  20403/1','477.jpeg','477.1.jpeg','477.2.jpeg',1,70885,'20403/1',3,2,1,3,1,'36 x 40 x 9,5',1,1,2,1,2,14,2,2,3,2,2,1,7,100),(478,'Festina Classics 20455/2','478.jpeg','478.1.jpeg','478.2.jpeg',1,32610,'20455/2',3,2,1,4,1,'29.5',1,1,1,1,9,15,2,2,3,2,7,1,7,100),(479,'Casio Youth Ladies LRW-200H-2CVDF','479.jpeg','479.1.jpeg','479.2.jpeg',3,9990,'LRW-200H-2CVDF',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,1,1,1,12,4,1,4,3,2,12,2,12,80),(480,'Casio Youth Ladies LRW-200H-2EVDR','480.jpeg','480.1.jpeg','480.2.jpeg',1,19310,'LRW-200H-2EVDR',1,2,1,4,1,'38,9 x 34,2 x 11,5',1,1,1,1,8,4,1,4,3,2,6,2,7,100),(481,'Rosefield The Boxy XS QMBG-Q025','481.jpeg','481.1.jpeg','481.2.jpeg',1,47380,'QMBG-Q025',14,2,1,1,1,'24 x 22 x 7',1,1,1,1,7,2,5,2,3,1,5,5,8,100),(482,'Guess W1293L3','482.jpeg','482.1.jpeg','482.2.jpeg',4,57990,'W1293L3',12,2,1,1,1,'36 x 11',1,1,1,1,1,8,2,2,3,2,1,1,14,1),(483,'Michael Kors Pyper MK4339','483.jpeg','483.1.jpeg','483.2.jpeg',4,46990,'MK4339',6,2,1,3,1,'38 x 7',1,1,2,1,7,7,5,2,3,2,5,5,7,1),(484,'Skagen Signatur Slim SKW2784','484.jpeg','484.1.jpeg','484.2.jpeg',3,36990,'SKW2784',15,2,1,1,1,'38 x 7',1,1,2,1,1,6,5,2,3,2,1,5,7,80),(485,'Skagen Signatur Slim SKW2785','485.jpeg','485.1.jpeg','485.2.jpeg',3,35990,'SKW2785',15,2,1,1,1,'38 x 7',1,1,2,1,9,6,2,2,3,2,7,1,7,80),(486,'Skagen Signatur SKW2837','486.jpeg','486.1.jpeg','486.2.jpeg',1,45690,'SKW2837',15,2,1,1,1,'29 x 6',1,1,2,1,1,4,5,2,3,2,1,5,7,100),(487,'Guess Nova GW0004L2','487.jpeg','487.1.jpeg','487.2.jpeg',2,36100,'GW0004L2',12,2,1,1,1,'40 x 8',1,1,2,1,1,8,5,2,3,2,9,3,7,1),(488,'Guess Cosmo GW0033L2','488.jpeg','488.1.jpeg','488.2.jpeg',1,59520,'GW0033L2',12,2,1,1,1,'36 x 9',1,1,2,1,7,7,5,2,3,2,5,5,7,100),(489,'Fossil Carlie ES4649','489.jpeg','489.1.jpeg','489.2.jpeg',2,52910,'ES4649',5,2,1,1,1,'28 x 7',1,1,2,1,2,14,5,2,3,2,2,5,7,1),(490,'Fossil Carlie ES4699','490.jpeg','490.1.jpeg','490.2.jpeg',2,30520,'ES4699',5,2,1,1,1,'28 x 7',1,1,2,1,1,14,5,2,3,2,17,4,7,1),(491,'Fossil Carlie ES4701','491.jpeg','491.1.jpeg','491.2.jpeg',1,39700,'ES4701',5,2,1,1,1,'28 x 7',1,1,2,1,2,14,5,2,3,2,10,4,7,100),(492,'MVMT Bloom FR01-TIRG','492.jpeg','492.1.jpeg','492.2.jpeg',3,63990,'FR01-TIRG',17,2,1,3,1,'80',1,1,2,1,1,2,5,2,3,2,1,5,7,80),(493,'Festina Mademoiselle 16940/A','493.jpeg','493.1.jpeg','493.2.jpeg',3,28990,'16940/A',3,2,1,3,1,'32',1,1,2,1,9,8,5,2,3,2,7,1,7,80),(494,'Guess G Twist W0911L5','494.jpeg','494.1.jpeg','494.2.jpeg',1,30985,'W0911L5',12,2,1,4,1,'40 x 10,5',1,1,2,1,1,5,2,2,3,2,12,3,14,100),(495,'Festina Classics 16477/2','495.jpeg','495.1.jpeg','495.2.jpeg',3,22990,'16477/2',3,2,1,1,1,'31 x 6',1,1,1,1,9,8,2,2,3,2,10,4,10,80),(496,'Michael Kors Lauryn MK3900','496.jpeg','496.1.jpeg','496.2.jpeg',2,74920,'MK3900',6,2,1,3,1,'34 x 7',1,3,2,1,9,14,2,2,3,2,7,1,7,1),(497,'Rosefield The Boxy QWSS-Q08','497.jpeg','497.1.jpeg','497.2.jpeg',1,42305,'QWSS-Q08',14,2,1,1,1,'26 x 28 x 6.8',1,1,1,1,9,6,2,2,3,3,7,1,7,100),(498,'Citizen Eco-Drive EX1498-87A','498.jpeg','498.1.jpeg','498.2.jpeg',3,65990,'EX1498-87A',8,2,3,3,2,'30 x 6',1,6,2,1,9,8,2,2,3,2,7,1,12,80),(499,'Casio Enticer LTP-1215A-2A2DF','499.jpeg','499.1.jpeg','499.2.jpeg',1,17935,'LTP-1215A-2A2DF',1,2,1,1,1,'32 x 28 x 8,6',1,1,1,1,9,4,2,2,3,2,7,1,10,100),(500,'Zeppelin LZ129 Hindenburg 7037-3','500.jpeg','500.1.jpeg','500.2.jpeg',1,119605,'1876312',9,2,1,1,1,'36 x 10',1,1,1,1,9,4,2,4,3,2,9,4,14,100),(501,'Rosefield The Ace ACSGD-A01','501.jpeg','501.1.jpeg','501.2.jpeg',2,44165,'ACSGD-A01',14,2,1,1,1,'33 x 7',1,1,1,1,9,8,2,2,3,2,2,5,2,1),(502,'Rosefield The Boxy XS QMWMG-Q039','502.jpeg','502.1.jpeg','502.2.jpeg',1,41705,'QMWMG-Q039',14,2,1,1,1,'22 x 24 x 6,4',1,1,1,1,1,8,5,2,3,1,5,5,7,100),(503,'Citizen Eco-Drive EM0500-73A','503.jpeg','503.1.jpeg','503.2.jpeg',1,56190,'EM0500-73A',8,2,3,3,2,'32 x 7,6',1,1,2,1,9,8,2,2,3,2,7,1,12,100),(504,'Citizen Eco-Drive EM0500-73L','504.jpeg','504.1.jpeg','504.2.jpeg',1,54560,'EM0500-73L',8,2,3,3,2,'32 x 7,6',1,1,2,1,9,4,2,2,3,2,7,1,14,100),(505,'Festina Mademoiselle 16936/A','505.jpeg','505.1.jpeg','505.2.jpeg',2,37195,'16936/A',3,2,1,3,1,'32,5 x 36 x 9',1,1,2,1,9,8,2,2,3,2,7,1,7,1),(506,'Citizen Eco-Drive EM0503-75X','506.jpeg','506.1.jpeg','506.2.jpeg',1,68800,'EM0503-75X',8,2,3,3,2,'32 x 7,6',1,1,2,1,1,16,2,2,3,2,1,1,14,100),(507,'Festina Boyfriend 20475/2','507.jpeg','507.1.jpeg','507.2.jpeg',1,32585,'20475/2',3,2,1,1,1,'38',1,1,2,1,9,15,2,2,3,2,7,1,7,100),(508,'Festina Classics 20455/1','508.jpeg','508.1.jpeg','508.2.jpeg',3,25990,'20455/1',3,2,1,4,1,'29.5',1,1,1,1,9,8,2,2,3,2,7,1,7,80),(509,'Zeppelin LZ129 Hindenburg 7039-1','509.jpeg','509.1.jpeg','509.2.jpeg',1,128155,'1876983',9,2,1,1,1,'36 x 10',1,3,1,1,7,8,5,2,3,2,10,4,10,100),(510,'Fossil Carlie ME3175','510.jpeg','510.1.jpeg','510.2.jpeg',3,59990,'ME3175',5,2,2,3,1,'34 x 11',1,3,2,1,1,3,5,2,3,2,1,5,7,80),(511,'Casio Youth Ladies LRW-200H-7BVDF','511.jpeg','511.1.jpeg','511.2.jpeg',1,17485,'LRW-200H-7BVDF',1,2,1,4,1,'38.9 × 34.2 × 11.5',1,1,1,1,12,6,1,4,3,2,12,2,12,100),(512,'Casio Youth Ladies LRW-200H-4EVDR','512.jpeg','512.1.jpeg','512.2.jpeg',1,17425,'LRW-200H-4EVDR',1,2,1,4,1,'38.9 × 34.2 × 11.5',1,1,1,1,8,15,1,4,3,2,6,2,7,100),(513,'Citizen Eco-Drive FE1081-59E','513.jpeg','513.1.jpeg','513.2.jpeg',2,60950,'FE1081-59E',8,2,4,1,2,'29 x 29',1,1,1,1,9,2,2,2,3,2,7,1,14,1),(514,'Michael Kors Darci MK3402','514.jpeg','514.1.jpeg','514.2.jpeg',1,48790,'MK3402',6,2,1,3,1,'39 x 39',1,1,2,1,1,2,5,2,3,2,1,1,15,100),(515,'Guess Athena GW0030L2','515.jpeg','515.1.jpeg','515.2.jpeg',1,53910,'GW0030L2',12,2,1,1,1,'39 x 10',1,1,1,1,7,7,2,2,3,2,6,3,7,100),(516,'Guess Cosmo GW0034L1','516.jpeg','516.1.jpeg','516.2.jpeg',1,44490,'GW0034L1',12,2,1,1,1,'36 x 9',1,1,2,1,7,7,5,2,3,2,6,3,7,100),(517,'Festina Boyfriend 16940/B','517.jpeg','517.1.jpeg','517.2.jpeg',3,27990,'16940/B',3,2,1,3,1,'32',1,1,2,1,9,8,2,2,3,2,7,1,7,80),(518,'Festina Boyfriend 16721/2','518.jpeg','518.1.jpeg','518.2.jpeg',3,37990,'16721/2',3,2,1,3,1,'36 x 36 x 7',1,1,2,1,1,3,2,2,3,2,1,1,14,80),(519,'Citizen Eco-Drive EW2484-82B','519.jpeg','519.1.jpeg','519.2.jpeg',1,82245,'EW2484-82B',8,2,3,1,2,'28 x 8',1,1,1,1,3,8,2,2,3,2,2,1,17,100),(520,'Guess Chelsea W0989L3','520.jpeg','520.1.jpeg','520.2.jpeg',3,34990,'W0989L3',12,2,1,1,1,'30',1,6,2,1,1,3,2,2,3,2,1,1,10,80),(521,'Iron Annie 5045-1','521.jpeg','521.1.jpeg','521.2.jpeg',3,59990,'1148690',18,2,1,3,1,'38 x 9,55',1,1,1,1,9,9,2,6,3,2,10,4,14,80),(522,'Swiss Alpine Military Argos 7767.1137','522.jpeg','522.1.jpeg','522.2.jpeg',3,42990,'7767.1137',19,2,1,4,1,'34 x 9',1,1,1,1,9,2,2,2,3,2,7,1,14,80),(523,'Tommy Hilfiger Peyton 1781966','523.jpeg','523.1.jpeg','523.2.jpeg',3,42990,'1781966',4,2,1,1,1,'38 x 8',1,1,2,1,1,9,2,2,3,2,16,4,8,80),(524,'Fossil Jacqueline ES5318','524.jpeg','524.1.jpeg','524.2.jpeg',4,45990,'ES5318',5,2,1,1,1,'30',1,1,2,1,7,7,2,2,3,2,5,1,14,1),(525,'Fossil Jacqueline ES5292','525.jpeg','525.1.jpeg','525.2.jpeg',4,40990,'ES5292',5,2,1,1,1,'30',1,1,2,1,7,7,2,2,3,2,5,1,14,1),(526,'Armani Exchange AX5594','526.jpeg','526.1.jpeg','526.2.jpeg',3,36990,'AX5594',20,2,1,1,1,'38 x 9,55',1,1,2,1,7,7,2,2,3,2,10,4,14,80),(527,'Casio Sheen SHE-3517L-1AUEF','527.jpeg','527.1.jpeg','527.2.jpeg',3,44990,'SHE-3517L-1AUEF',1,2,1,3,1,'41,5 × 35 × 8,1',1,1,1,1,9,2,2,3,3,2,6,4,14,80),(528,'Iron Annie 5089-1','528.jpeg','528.1.jpeg','528.2.jpeg',3,76990,'1164761',18,2,1,3,1,'38 x 9,55',1,1,1,1,9,6,2,2,3,2,19,4,14,80),(529,'Citizen Eco-Drive EM1007-47E','529.jpeg','529.1.jpeg','529.2.jpeg',4,128990,'EM1007-47E',8,2,4,3,2,'34',1,1,2,1,8,10,2,3,3,2,3,1,14,1),(530,'Tissot Le Locle T006.207.16.038.00','530.jpeg','530.1.jpeg','530.2.jpeg',3,258990,'T006.207.16.038.00',21,2,2,1,1,'29 x 9',1,1,1,1,9,12,2,3,3,2,10,4,14,80),(531,'Tommy Hilfiger Layla 1782459','531.jpeg','531.1.jpeg','531.2.jpeg',3,49990,'1782459',4,2,1,1,1,'38 x 9,55',1,1,1,1,13,4,5,2,3,2,9,5,6,80),(532,'Guess Tapestry GW0354L1','532.jpeg','532.1.jpeg','532.2.jpeg',3,37990,'GW0354L1',12,2,1,1,1,'32 x 7,5',1,1,2,1,9,8,2,2,3,1,7,1,7,80),(533,'Guess Raven GW0104L3','533.jpeg','533.1.jpeg','533.2.jpeg',3,57990,'GW0104L3',12,2,1,3,1,'38 x 10',1,1,1,1,1,3,2,2,3,1,1,1,12,80),(534,'Casio G-Shock GMA-S110GS-8AER','534.jpeg','534.1.jpeg','534.2.jpeg',3,70990,'GMA-S110GS-8AER',1,2,1,2,1,'38 x 9,55',1,1,1,1,6,5,6,2,2,2,4,2,14,80),(535,'Michael Kors Bradshaw MK6554','535.jpeg','535.1.jpeg','535.2.jpeg',3,31990,'MK6554',6,2,1,1,1,'39 x 8',1,1,2,1,9,8,2,2,3,2,7,1,12,80),(536,'Tommy Hilfiger Emma 1782481','536.jpeg','536.1.jpeg','536.2.jpeg',3,42990,'1782481',4,2,1,3,1,'38 x 8',1,1,2,1,9,4,2,2,3,2,7,1,14,80),(537,'Tommy Hilfiger Brooke 1782513','537.jpeg','537.1.jpeg','537.2.jpeg',3,41990,'1782513',4,2,1,1,1,'36 x 8',1,1,1,1,7,7,2,2,3,2,5,1,10,80),(538,'Tommy Hilfiger Lidia 1782541','538.jpeg','538.1.jpeg','538.2.jpeg',3,49990,'1782541',4,2,1,1,1,'40 x 9',1,1,1,1,1,4,2,2,3,2,9,1,4,80),(539,'Marc Malone Lauren CCE-B021S','539.jpeg','539.1.jpeg','539.2.jpeg',4,10990,'CCE-B021S',22,2,1,5,1,'38',1,1,2,1,9,8,2,2,3,2,6,4,14,1),(540,'Lacoste 2001242','540.jpeg','540.1.jpeg','540.2.jpeg',4,42990,'2001242',23,2,1,1,1,'36 x 8',1,1,2,1,1,12,2,2,3,2,1,1,12,1),(541,'Certina C031.3.11.051.00','541.jpeg','541.1.jpeg','541.2.jpeg',4,145990,'C031.3.11.051.00',24,2,1,4,1,'31,6',1,1,1,1,9,2,2,3,3,2,7,1,14,1),(542,'Olivia Burton 24000101','542.jpeg','542.1.jpeg','542.2.jpeg',4,46990,'24000101',25,2,1,1,1,'38 x 9,55',1,1,2,1,9,8,2,2,3,2,7,1,14,1),(543,'Olivia Burton 24000047','543.jpeg','543.1.jpeg','543.2.jpeg',4,30990,'24000047',25,2,1,1,1,'36 x 7',1,1,2,1,9,9,2,2,3,2,7,1,14,1),(544,'Lorus RG269TX9','544.jpeg','544.1.jpeg','544.2.jpeg',3,8990,'RG269TX9',26,2,1,4,1,'36 x 10',1,1,2,1,8,7,2,2,3,2,6,3,7,80),(545,'Lorus RG3UX9','545.jpeg','545.1.jpeg','545.2.jpeg',3,14990,'RG3UX9',26,2,1,3,1,'30 x 8',1,1,2,1,1,15,2,2,3,2,17,4,10,80),(546,'Lorus RG222SX9','546.jpeg','546.1.jpeg','546.2.jpeg',4,10990,'RG222SX9',26,2,1,1,1,'32 x 8',1,1,2,1,1,9,2,2,3,2,10,4,14,1),(547,'Hugo Boss 1502678','547.jpeg','547.1.jpeg','547.2.jpeg',4,84990,'1502678',27,2,1,1,1,'38 x 11',1,1,2,1,1,3,2,2,3,2,1,1,14,1),(548,'Hugo Boss 1502638','548.jpeg','548.1.jpeg','548.2.jpeg',3,77990,'1502638',27,2,1,1,1,'37 x 8',1,1,1,1,9,8,2,2,3,2,7,1,7,80),(550,'','tgg','fg','nf',1,37555,'gfvv5',5,1,3,2,1,'56',5,3,1,3,5,4,3,2,2,2,13,8,13,55),(553,'sdgds','','','',2,66,'',3,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,66),(554,'fth','fhg','fgh','fgdh',2,55,'dfdf',2,1,2,3,2,'66',1,2,2,3,14,15,11,2,2,2,12,3,16,55);
/*!40000 ALTER TABLE `ora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oraforma`
--

DROP TABLE IF EXISTS `oraforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oraforma` (
  `oraformaaz` int NOT NULL AUTO_INCREMENT,
  `oraforma` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`oraformaaz`),
  UNIQUE KEY `UK_oraforma_oraformaaz` (`oraformaaz`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=4096 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oraforma`
--

LOCK TABLES `oraforma` WRITE;
/*!40000 ALTER TABLE `oraforma` DISABLE KEYS */;
INSERT INTO `oraforma` VALUES (1,'Szögletes'),(2,'Kerek'),(3,'Négyzetes'),(4,'Téglalap');
/*!40000 ALTER TABLE `oraforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `oralekerdezes`
--

DROP TABLE IF EXISTS `oralekerdezes`;
/*!50001 DROP VIEW IF EXISTS `oralekerdezes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `oralekerdezes` AS SELECT 
 1 AS `oraaz`,
 1 AS `megnevezes`,
 1 AS `kep1`,
 1 AS `kep2`,
 1 AS `kep3`,
 1 AS `raktar`,
 1 AS `ar`,
 1 AS `cikszam`,
 1 AS `marka`,
 1 AS `nem`,
 1 AS `meghajtas`,
 1 AS `vizallosag`,
 1 AS `jotallas`,
 1 AS `meretmillimeterben`,
 1 AS `sulygrammban`,
 1 AS `tipus`,
 1 AS `datumkijelzes`,
 1 AS `extrafunkcio`,
 1 AS `atokszine`,
 1 AS `aszamlapszine`,
 1 AS `atok`,
 1 AS `kristalyuveg`,
 1 AS `szamlaptipus`,
 1 AS `oraforma`,
 1 AS `szijszine`,
 1 AS `szij`,
 1 AS `maxcsuklomili`,
 1 AS `db`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `raktar`
--

DROP TABLE IF EXISTS `raktar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raktar` (
  `raktaraz` int NOT NULL AUTO_INCREMENT,
  `raktar` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`raktaraz`),
  UNIQUE KEY `UK_raktar_raktaraz` (`raktaraz`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=4096 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raktar`
--

LOCK TABLES `raktar` WRITE;
/*!40000 ALTER TABLE `raktar` DISABLE KEYS */;
INSERT INTO `raktar` VALUES (1,'Raktáron'),(2,'Az utolsó darab'),(3,'Kiárusítás Raktáron'),(4,'Kiárusítás Az utolsó darab');
/*!40000 ALTER TABLE `raktar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sulygrammban`
--

DROP TABLE IF EXISTS `sulygrammban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sulygrammban` (
  `sulygrammbanaz` int NOT NULL AUTO_INCREMENT,
  `sulygrammban` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`sulygrammbanaz`),
  UNIQUE KEY `UK_sulygrammban_sulygrammbanaz` (`sulygrammbanaz`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=1489 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sulygrammban`
--

LOCK TABLES `sulygrammban` WRITE;
/*!40000 ALTER TABLE `sulygrammban` DISABLE KEYS */;
INSERT INTO `sulygrammban` VALUES (1,'85'),(2,'51'),(3,'70'),(4,'157'),(5,'186'),(6,'62,5'),(7,'88'),(8,'202'),(9,'204'),(10,'156'),(11,'60');
/*!40000 ALTER TABLE `sulygrammban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szallitassz`
--

DROP TABLE IF EXISTS `szallitassz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `szallitassz` (
  `szallitasaz` int NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `cim` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `iranyszam` int DEFAULT NULL,
  `varos` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`szallitasaz`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=4096 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szallitassz`
--

LOCK TABLES `szallitassz` WRITE;
/*!40000 ALTER TABLE `szallitassz` DISABLE KEYS */;
INSERT INTO `szallitassz` VALUES (1,'Makra Martin','Kiss utca 6',5400,'Mezőtúr'),(2,'Berényi Gergő','Makk József utca 49',5400,'Mezőtúr'),(3,'Ratkai Róbert','Ducza utca 9',5420,'Túrkeve'),(4,'Szilágyi István','Nyíl utca 67',5420,'Túrkeve');
/*!40000 ALTER TABLE `szallitassz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szamla`
--

DROP TABLE IF EXISTS `szamla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `szamla` (
  `szamlaaz` int NOT NULL AUTO_INCREMENT,
  `vasarloaz` int DEFAULT NULL,
  `fizetesmodaz` int DEFAULT NULL,
  `szallitasaz` int DEFAULT NULL,
  PRIMARY KEY (`szamlaaz`),
  KEY `FK_szamla_fizetesmodaz` (`fizetesmodaz`),
  KEY `FK_szamla_szallitasaz` (`szallitasaz`),
  KEY `FK_szamla_vasarloaz` (`vasarloaz`),
  CONSTRAINT `FK_szamla_fizetesmodaz` FOREIGN KEY (`fizetesmodaz`) REFERENCES `fizetesmod` (`fizetesmodaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_szamla_szallitasaz` FOREIGN KEY (`szallitasaz`) REFERENCES `szallitassz` (`szallitasaz`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_szamla_vasarloaz` FOREIGN KEY (`vasarloaz`) REFERENCES `vasarlo` (`vasarloaz`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=4096 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szamla`
--

LOCK TABLES `szamla` WRITE;
/*!40000 ALTER TABLE `szamla` DISABLE KEYS */;
INSERT INTO `szamla` VALUES (1,1,1,1),(2,2,2,2),(3,3,2,3),(4,4,1,4);
/*!40000 ALTER TABLE `szamla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szamlaptipus`
--

DROP TABLE IF EXISTS `szamlaptipus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `szamlaptipus` (
  `szamlaptipusaz` int NOT NULL AUTO_INCREMENT,
  `szamlaptipus` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`szamlaptipusaz`),
  UNIQUE KEY `UK_szamlaptipus_szamlaptipusaz` (`szamlaptipusaz`),
  KEY `idx_szamlaptipusaz` (`szamlaptipusaz`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=5461 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szamlaptipus`
--

LOCK TABLES `szamlaptipus` WRITE;
/*!40000 ALTER TABLE `szamlaptipus` DISABLE KEYS */;
INSERT INTO `szamlaptipus` VALUES (1,'Digitális'),(2,'Kombinált'),(3,'Analóg');
/*!40000 ALTER TABLE `szamlaptipus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szij`
--

DROP TABLE IF EXISTS `szij`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `szij` (
  `szijaz` int NOT NULL AUTO_INCREMENT,
  `szij` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`szijaz`),
  UNIQUE KEY `UK_szij_szijaz` (`szijaz`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=1638 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szij`
--

LOCK TABLES `szij` WRITE;
/*!40000 ALTER TABLE `szij` DISABLE KEYS */;
INSERT INTO `szij` VALUES (1,'Rozsdamentes acél'),(2,'Műanyag'),(3,'Szilikon'),(4,'Nemes bőr'),(5,'Acél PVD bevonattal'),(6,'Gyanta'),(7,'Gumi'),(8,'Kaucsuk'),(9,'Textil'),(10,'Titán');
/*!40000 ALTER TABLE `szij` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szijszine`
--

DROP TABLE IF EXISTS `szijszine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `szijszine` (
  `szijszineaz` int NOT NULL AUTO_INCREMENT,
  `szijszine` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`szijszineaz`),
  UNIQUE KEY `UK_szijszine_szijszineaz` (`szijszineaz`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=862 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szijszine`
--

LOCK TABLES `szijszine` WRITE;
/*!40000 ALTER TABLE `szijszine` DISABLE KEYS */;
INSERT INTO `szijszine` VALUES (1,'Vörös arany'),(2,'Arany-ezüst'),(3,'Fekete, Szürke'),(4,'Átlátszó, Szürke'),(5,'Arany'),(6,'Fekete'),(7,'Ezüst'),(8,'Szürke'),(9,'Kék'),(10,'Barna'),(11,'Piros'),(12,'Fehér'),(13,'Narancsszínű'),(14,'Titánszínű'),(15,'Zöld'),(16,'Bézs'),(17,'Rózsaszín'),(18,'Nemes Bőr'),(19,'Többszínű');
/*!40000 ALTER TABLE `szijszine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipus`
--

DROP TABLE IF EXISTS `tipus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipus` (
  `tipusaz` int NOT NULL AUTO_INCREMENT,
  `tipus` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`tipusaz`),
  UNIQUE KEY `UK_tipus_tipusaz` (`tipusaz`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=2730 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipus`
--

LOCK TABLES `tipus` WRITE;
/*!40000 ALTER TABLE `tipus` DISABLE KEYS */;
INSERT INTO `tipus` VALUES (1,'Divatos'),(2,'Sportos'),(3,'Luxus'),(4,'Sportos, Divatos'),(5,'Luxus, Sportos'),(6,'Luxus, Divatos');
/*!40000 ALTER TABLE `tipus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vasarlo`
--

DROP TABLE IF EXISTS `vasarlo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vasarlo` (
  `vasarloaz` int NOT NULL AUTO_INCREMENT,
  `nev` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `tel` varchar(11) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `jelszo` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`vasarloaz`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=4096 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vasarlo`
--

LOCK TABLES `vasarlo` WRITE;
/*!40000 ALTER TABLE `vasarlo` DISABLE KEYS */;
INSERT INTO `vasarlo` VALUES (1,'Makra Martin','36305676768','peldamartin@gmail.com',NULL),(2,'Berényi Gergő','36205984547','peldagergo@gmail.com',NULL),(3,'Ratkai Róbert','36705673435','peldarobi@gmail.com',NULL),(4,'Szilágyi István','36208966689','peldapisti@gmail.com',NULL);
/*!40000 ALTER TABLE `vasarlo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vizallosag`
--

DROP TABLE IF EXISTS `vizallosag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vizallosag` (
  `vizallosagaz` int NOT NULL AUTO_INCREMENT,
  `vizallosag` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`vizallosagaz`),
  UNIQUE KEY `UK_vizallosag_vizallosagaz` (`vizallosagaz`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci AVG_ROW_LENGTH=2730 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vizallosag`
--

LOCK TABLES `vizallosag` WRITE;
/*!40000 ALTER TABLE `vizallosag` DISABLE KEYS */;
INSERT INTO `vizallosag` VALUES (1,'30m (páraálló)        '),(2,'200m        '),(3,'50m (felszíni úszás)        '),(4,'100m        '),(5,'nem'),(6,'300m        ');
/*!40000 ALTER TABLE `vizallosag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `oralekerdezes`
--

/*!50001 DROP VIEW IF EXISTS `oralekerdezes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `oralekerdezes` AS select `ora`.`oraaz` AS `oraaz`,`ora`.`megnevezes` AS `megnevezes`,`ora`.`kep1` AS `kep1`,`ora`.`kep2` AS `kep2`,`ora`.`kep3` AS `kep3`,`raktar`.`raktar` AS `raktar`,`ora`.`ar` AS `ar`,`ora`.`cikszam` AS `cikszam`,`marka`.`marka` AS `marka`,`nem`.`nem` AS `nem`,`meghajtas`.`meghajtas` AS `meghajtas`,`vizallosag`.`vizallosag` AS `vizallosag`,`jotallas`.`jotallas` AS `jotallas`,`ora`.`meretmillimeterben` AS `meretmillimeterben`,`sulygrammban`.`sulygrammban` AS `sulygrammban`,`tipus`.`tipus` AS `tipus`,`datumkijelzes`.`datumkijelzes` AS `datumkijelzes`,`extrafunkcio`.`extrafunkcio` AS `extrafunkcio`,`atokszine`.`atokszine` AS `atokszine`,`aszamlapszine`.`aszamlapszine` AS `aszamlapszine`,`atok`.`atok` AS `atok`,`kristalyuveg`.`kristalyuveg` AS `kristalyuveg`,`szamlaptipus`.`szamlaptipus` AS `szamlaptipus`,`oraforma`.`oraforma` AS `oraforma`,`szijszine`.`szijszine` AS `szijszine`,`szij`.`szij` AS `szij`,`maxcsuklomili`.`maxcsuklomili` AS `maxcsuklomili`,`ora`.`db` AS `db` from (((((((((((((((((((`ora` straight_join `raktar` USE INDEX (PRIMARY) on((`ora`.`raktaraz` = `raktar`.`raktaraz`))) straight_join `marka` USE INDEX (PRIMARY) on((`ora`.`markaaz` = `marka`.`markaaz`))) straight_join `nem` USE INDEX (PRIMARY) on((`ora`.`nemaz` = `nem`.`nemaz`))) straight_join `meghajtas` USE INDEX (PRIMARY) on((`ora`.`meghajtasaz` = `meghajtas`.`meghajtasaz`))) straight_join `vizallosag` USE INDEX (PRIMARY) on((`ora`.`vizallosagaz` = `vizallosag`.`vizallosagaz`))) straight_join `jotallas` USE INDEX (`idx_jotallasaz`) on((`ora`.`jotallasaz` = `jotallas`.`jotallasaz`))) straight_join `sulygrammban` USE INDEX (PRIMARY) on((`ora`.`sulygrammbanaz` = `sulygrammban`.`sulygrammbanaz`))) straight_join `tipus` USE INDEX (PRIMARY) on((`ora`.`tipusaz` = `tipus`.`tipusaz`))) straight_join `datumkijelzes` USE INDEX (`idx_datumkijelzesaz`) on((`ora`.`datumkijelzesaz` = `datumkijelzes`.`datumkijelzesaz`))) straight_join `extrafunkcio` USE INDEX (PRIMARY) on((`ora`.`extrafunkcioaz` = `extrafunkcio`.`extrafunkcioaz`))) straight_join `atokszine` USE INDEX (PRIMARY) on((`ora`.`atokszineaz` = `atokszine`.`atokszineaz`))) straight_join `aszamlapszine` USE INDEX (PRIMARY) on((`ora`.`aszamlapszineaz` = `aszamlapszine`.`aszamlapszineaz`))) straight_join `atok` USE INDEX (PRIMARY) on((`ora`.`atokaz` = `atok`.`atokaz`))) straight_join `kristalyuveg` USE INDEX (PRIMARY) on((`ora`.`kristalyuvegaz` = `kristalyuveg`.`kristalyuvegaz`))) straight_join `szamlaptipus` USE INDEX (`idx_szamlaptipusaz`) on((`ora`.`szamlaptipusaz` = `szamlaptipus`.`szamlaptipusaz`))) straight_join `oraforma` USE INDEX (PRIMARY) on((`ora`.`oraformaaz` = `oraforma`.`oraformaaz`))) straight_join `szijszine` USE INDEX (PRIMARY) on((`ora`.`szijszineaz` = `szijszine`.`szijszineaz`))) straight_join `szij` USE INDEX (PRIMARY) on((`ora`.`szijaz` = `szij`.`szijaz`))) straight_join `maxcsuklomili` USE INDEX (PRIMARY) on((`ora`.`maxcsuklomiliaz` = `maxcsuklomili`.`maxcsuklomiliaz`))) order by `ora`.`oraaz` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-25 20:23:12
