-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: project_ecommerce
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
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `idarticle` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` varchar(1500) DEFAULT NULL,
  `price` float(10,2) DEFAULT NULL,
  `stock` float(10,2) DEFAULT NULL,
  `filename1` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idarticle`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Shirt','Summer vintage shirt.',12.00,50.00,'summer-vintage-shirt.webp'),(2,'Boots','Vegan leather boots.',120.00,23.00,'vegan-leather-boots.jpeg'),(3,'Mom Jeans','Light blue mom jeans.',40.00,29.00,'light-blue-mom-jeans.avif'),(4,'Silver Earrings','Silver earrings (rounded).',13.00,102.00,'silver-earrings.webp'),(10,'Tank Top','Black, cotton male tank top.',9.00,49.00,'blac_cotton_tank_top.jpeg'),(12,'Cowboy hat','Brown cowboy hat made of vegan fabric.',22.00,80.00,'brown_cowboy_hat.webp');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `idclient` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `adress` varchar(150) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idclient`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'jon@mail.com','Jon Doe','Desengaño St, 21','San Francisco','1234','1234'),(2,'joel@amail.com','Joel Crowford','Jaume 1 St. , 4','Barcelona','0800','1234'),(3,'Bill@yahoo.com','Bill Shankly','Sant Bernat, 23','Sant Fost de Campsentelles','0801','1234'),(5,'adria@mail.com','Adria Manday','Vilapicina St, 5','Barcelona','0800','1234'),(6,'test@test.com','Alejandro Velado',NULL,NULL,NULL,'$2b$10$fISQuf7xE0WhbociWxwvqOLht3Hb3n.zdiPAx0v3JMyY5iedB4xwG'),(7,'laia@laia.com','Laia',NULL,NULL,NULL,'$2b$10$2F4Rz7LY1PZXFQCw00Zkj..2ojc6rMl3Pot5Nt/mat5.AErzkQpKW'),(8,'pau@pau.com','Pau Pau',NULL,NULL,NULL,'$2b$10$4wzBTpcWCx7vtxqTd94.MuICmGydu00go6zbCtgX6bH4Ar3moCej6'),(9,'julia@julia.com','Julia Julia',NULL,NULL,NULL,'$2b$10$JW00bABVgmgVIoJYeR56wOt9GOT0nmH5zWWfOhXTbDIs8QFw3jgIG');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `idinvoice` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `adress` varchar(150) DEFAULT NULL,
  `town` varchar(150) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `rid_client` int DEFAULT NULL,
  `number` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`idinvoice`),
  KEY `idclient_idx` (`rid_client`),
  CONSTRAINT `idclient` FOREIGN KEY (`rid_client`) REFERENCES `client` (`idclient`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'2023-01-01','Sant Bernat St, 23','Sant Fost de Campsentelles','0801','Bill Shankly',3,'23/0001'),(2,'2023-01-02','Jaume 1 St. , 4','Barcelona','0800','Joel crowford',2,'23/0002'),(5,'2023-01-03','Vilapicina St, 5','Barcelona','0800','Adria Manday',5,'23/0003');
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_line`
--

DROP TABLE IF EXISTS `invoice_line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_line` (
  `idinvoice_line` int NOT NULL AUTO_INCREMENT,
  `rid_invoice` int NOT NULL,
  `rid_article` int NOT NULL,
  `quantity` float(10,2) DEFAULT NULL,
  PRIMARY KEY (`idinvoice_line`),
  KEY `rid_article_idx` (`rid_article`),
  KEY `id_invoice_idx` (`rid_invoice`),
  CONSTRAINT `idarticle` FOREIGN KEY (`rid_article`) REFERENCES `article` (`idarticle`),
  CONSTRAINT `idinvoice` FOREIGN KEY (`rid_invoice`) REFERENCES `invoice` (`idinvoice`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_line`
--

LOCK TABLES `invoice_line` WRITE;
/*!40000 ALTER TABLE `invoice_line` DISABLE KEYS */;
INSERT INTO `invoice_line` VALUES (1,1,1,4.00),(2,1,2,2.00),(3,2,2,3.00),(4,2,3,4.00),(7,5,1,3.00);
/*!40000 ALTER TABLE `invoice_line` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-24 13:02:32
