-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.33 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para fxvapi
CREATE DATABASE IF NOT EXISTS `fxvapi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `fxvapi`;

-- Copiando estrutura para tabela fxvapi.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(21) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isPremium` tinyint(4) NOT NULL DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birthday` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `terms` tinyint(3) DEFAULT NULL,
  `photo` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela fxvapi.users: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `name`, `isPremium`, `created`, `updated`, `birthday`, `terms`, `photo`) VALUES
	('cH9eBTjWybffECjpWpwRy', 'adm@igor.com', '$2a$10$Ri51L7NtcckCoy8dxok9qOy1o/9xLViO/O1ZySl3JDONojUCIAGD6', 'Igor Suzart', 0, '2022-11-13 19:59:06', '2022-11-13 20:15:22', '08/05/1998', 1, NULL),
	('NCCbmQNRSxPu0_ClnOTv5', 'igorarsuzart@gmail.com', 'IGU@!@#!35289', 'Igor Suzart', 0, '2022-10-24 18:57:52', '2022-10-31 19:11:49', '08/05/1998', NULL, NULL),
	('q-AxebgPI5av6rb-K8Yfj', 'igor@proton.me', '$2a$10$DEqYoy3M.X23QAQioxhr7ecUZwc1cSwmsdf01/9F3.kkcl8A/A1T.', 'igor', 0, '2022-11-01 14:50:47', '2022-11-01 14:50:47', '08/05/1998', NULL, NULL),
	('QtCHlbTA-y_LW8nWmRHaj', 'Igor@pm.me', '$2a$10$vhjGrG.CD5fEcGCdqVrMz.iwDk7S5JUWQ.BIi2zt3xKoSry5XGglC', 'Igor@pm.me1', 0, '2022-10-31 18:32:58', '2022-11-03 19:01:27', NULL, NULL, NULL),
	('S-stWAA586B9Oj0sqgCDl', 'pameladcarmo@gmail.com', '$2a$10$FoGKldpGVI5IzX716EsA8enl5NK7.omVdZxb.sWLv.9fymwyQ/Ol2', 'Pamela Alves', 0, '2022-11-01 21:16:24', '2022-11-01 21:16:24', '31/01/1998', NULL, NULL),
	('vgIhpr5rW5ScchzV3RmUX', 'igorsuzart@pm.me', '$2a$10$kOXIR1hpE5v2uaRyYFNQWuH8w2jssazZIQaQ9r0uQjU4Awusm48s6', 'igor suzart', 0, '2022-11-11 20:20:48', '2022-11-11 20:20:48', '08/05/1998', 0, NULL),
	('VkhxumgsLegUWeVRK_Z9O', 'adm@gabi.com', '$2a$10$UgkwYuYLyqKan7vBzvGOSOhQcYqlhx0DgL8JdZg9I2Wt8vOgh1FYG', 'Gabi', 0, '2022-11-14 18:09:19', '2022-11-14 20:19:20', '06/06/1998', 1, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
