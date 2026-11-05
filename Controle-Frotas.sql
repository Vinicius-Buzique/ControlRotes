-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para controle_de_frotas
CREATE DATABASE IF NOT EXISTS `controle_de_frotas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `controle_de_frotas`;

-- Copiando estrutura para tabela controle_de_frotas.cadastro
CREATE TABLE IF NOT EXISTS `cadastro` (
  `email` int DEFAULT NULL,
  `senha` int DEFAULT NULL,
  `nome` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela controle_de_frotas.cadastro: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela controle_de_frotas.login
CREATE TABLE IF NOT EXISTS `login` (
  `senha` int DEFAULT NULL,
  `email` int DEFAULT NULL,
  UNIQUE KEY `senha` (`senha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela controle_de_frotas.login: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela controle_de_frotas.manutencao
CREATE TABLE IF NOT EXISTS `manutencao` (
  `id_manutencao` int DEFAULT NULL,
  `id_veiculo` int DEFAULT NULL,
  `data_manutencao` date DEFAULT NULL,
  `tipo_manutencao` enum('PREVENTIVA','CORRETIVA') DEFAULT NULL,
  `custo_total` decimal(10,2) DEFAULT NULL,
  `oficina_realizadora` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `km_manutencao` decimal(10,2) DEFAULT NULL,
  `supervisor` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela controle_de_frotas.manutencao: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela controle_de_frotas.simulacao
CREATE TABLE IF NOT EXISTS `simulacao` (
  `nome_empresa` varchar(50) DEFAULT NULL,
  `disponibilidade_investimento` enum('Até R$ 2.000 P/Mês','R$ 2.000 a R$ 6.000 P/Mês','R$ 6.000 a R$ 15.000 P/Mês','Acima de R$ 15.000 P/Mês') DEFAULT NULL,
  `quantidade_veiculos` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela controle_de_frotas.simulacao: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela controle_de_frotas.veiculos
CREATE TABLE IF NOT EXISTS `veiculos` (
  `placa` int DEFAULT NULL,
  `ano_fabricacao` int DEFAULT NULL,
  `tipo` enum('Carro, Van, Caminhão, Utilitário') DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `km` decimal(10,2) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `data_adicao` timestamp NULL DEFAULT NULL,
  `id_veiculo` int NOT NULL,
  `tipo_combustivel` enum('Gasolina','Etanol','Flex','Diesel','Elétrico') NOT NULL,
  `tamanho_tanque` decimal(10,2) NOT NULL DEFAULT '0.00',
  `camera` enum('Sim','Não') DEFAULT NULL,
  PRIMARY KEY (`id_veiculo`),
  UNIQUE KEY `placa` (`placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela controle_de_frotas.veiculos: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
