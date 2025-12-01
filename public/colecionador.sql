-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18-Nov-2025 às 18:36
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `colecionador`
--

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AtualizarAvaliacaoItem` (IN `p_item` INT, IN `p_valor` DECIMAL(10,2), IN `p_data` DATE)   BEGIN
    INSERT INTO Avaliacao (id_item, valor, data_avaliacao)
    VALUES (p_item, p_valor, p_data);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CalcularValorTotalColecao` (IN `p_id` INT)   BEGIN
    SELECT SUM(valor) AS valor_total
    FROM Avaliacao a
    JOIN Item i ON a.id_item = i.id_item
    WHERE i.id_colecionador = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GerarRelatorioItensAntigos` (IN `anos_minimos` INT)   BEGIN
    SELECT *
    FROM Item
    WHERE YEAR(CURDATE()) - YEAR(data_aquisicao) >= anos_minimos;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ListarItensPorCondicao` (IN `p_condicao` VARCHAR(50))   BEGIN
    SELECT * FROM Item WHERE condicao = p_condicao;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `RegistrarTransacaoItem` (IN `p_item` INT, IN `p_tipo` ENUM('Compra','Venda','Emprestimo'), IN `p_data` DATE, IN `p_valor` DECIMAL(10,2))   BEGIN
    INSERT INTO Transacao (id_item, tipo, data_transacao, valor)
    VALUES (p_item, p_tipo, p_data, p_valor);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `autor`
--

CREATE TABLE `autor` (
  `id_autor` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `tipo` enum('Artista','Autor','Fabricante') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `avaliacao`
--

CREATE TABLE `avaliacao` (
  `id_avaliacao` int(11) NOT NULL,
  `id_item` int(11) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `data_avaliacao` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Acionadores `avaliacao`
--
DELIMITER $$
CREATE TRIGGER `TRG_ValidarValorAvaliacao` BEFORE INSERT ON `avaliacao` FOR EACH ROW BEGIN
    IF NEW.valor <= 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'O valor da avaliação deve ser positivo.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `total_itens` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Acionadores `categoria`
--
DELIMITER $$
CREATE TRIGGER `TRG_ImpedirExclusaoCategoriaComItens` BEFORE DELETE ON `categoria` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM Item WHERE id_categoria = OLD.id_categoria) > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Não é possível excluir categoria com itens associados.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `colecionador`
--

CREATE TABLE `colecionador` (
  `id_colecionador` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `colecionador`
--

INSERT INTO `colecionador` (`id_colecionador`, `nome`, `email`, `telefone`) VALUES
(1, 'Colecionador Teste', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `historico_condicao_item`
--

CREATE TABLE `historico_condicao_item` (
  `id_historico` int(11) NOT NULL,
  `id_item` int(11) DEFAULT NULL,
  `condicao_antiga` varchar(50) DEFAULT NULL,
  `condicao_nova` varchar(50) DEFAULT NULL,
  `data_modificacao` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `item`
--

CREATE TABLE `item` (
  `id_item` int(11) NOT NULL,
  `titulo` varchar(150) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `ano` int(11) DEFAULT NULL,
  `condicao` varchar(50) DEFAULT NULL,
  `data_aquisicao` date DEFAULT NULL,
  `data_ultima_modificacao` datetime DEFAULT NULL,
  `id_colecionador` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_autor` int(11) DEFAULT NULL,
  `id_local` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Acionadores `item`
--
DELIMITER $$
CREATE TRIGGER `TRG_AtualizarDataUltimaModificacaoItem` BEFORE UPDATE ON `item` FOR EACH ROW BEGIN
    SET NEW.data_ultima_modificacao = NOW();
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TRG_AumentarItensCategoria` AFTER INSERT ON `item` FOR EACH ROW BEGIN
    UPDATE Categoria
    SET total_itens = total_itens + 1
    WHERE id_categoria = NEW.id_categoria;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `TRG_RegistrarHistoricoCondicaoItem` AFTER UPDATE ON `item` FOR EACH ROW BEGIN
    IF OLD.condicao <> NEW.condicao THEN
        INSERT INTO Historico_Condicao_Item
        (id_item, condicao_antiga, condicao_nova, data_modificacao)
        VALUES (OLD.id_item, OLD.condicao, NEW.condicao, NOW());
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `local_aquisicao`
--

CREATE TABLE `local_aquisicao` (
  `id_local` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `transacao`
--

CREATE TABLE `transacao` (
  `id_transacao` int(11) NOT NULL,
  `id_item` int(11) DEFAULT NULL,
  `tipo` enum('Compra','Venda','Emprestimo') DEFAULT NULL,
  `data_transacao` date DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`id_autor`);

--
-- Índices para tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD PRIMARY KEY (`id_avaliacao`),
  ADD KEY `id_item` (`id_item`);

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Índices para tabela `colecionador`
--
ALTER TABLE `colecionador`
  ADD PRIMARY KEY (`id_colecionador`);

--
-- Índices para tabela `historico_condicao_item`
--
ALTER TABLE `historico_condicao_item`
  ADD PRIMARY KEY (`id_historico`),
  ADD KEY `id_item` (`id_item`);

--
-- Índices para tabela `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id_item`),
  ADD KEY `id_colecionador` (`id_colecionador`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_autor` (`id_autor`),
  ADD KEY `id_local` (`id_local`);

--
-- Índices para tabela `local_aquisicao`
--
ALTER TABLE `local_aquisicao`
  ADD PRIMARY KEY (`id_local`);

--
-- Índices para tabela `transacao`
--
ALTER TABLE `transacao`
  ADD PRIMARY KEY (`id_transacao`),
  ADD KEY `id_item` (`id_item`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `autor`
--
ALTER TABLE `autor`
  MODIFY `id_autor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  MODIFY `id_avaliacao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `colecionador`
--
ALTER TABLE `colecionador`
  MODIFY `id_colecionador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `historico_condicao_item`
--
ALTER TABLE `historico_condicao_item`
  MODIFY `id_historico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `item`
--
ALTER TABLE `item`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `local_aquisicao`
--
ALTER TABLE `local_aquisicao`
  MODIFY `id_local` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `transacao`
--
ALTER TABLE `transacao`
  MODIFY `id_transacao` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`);

--
-- Limitadores para a tabela `historico_condicao_item`
--
ALTER TABLE `historico_condicao_item`
  ADD CONSTRAINT `historico_condicao_item_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`);

--
-- Limitadores para a tabela `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`id_colecionador`) REFERENCES `colecionador` (`id_colecionador`),
  ADD CONSTRAINT `item_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `item_ibfk_3` FOREIGN KEY (`id_autor`) REFERENCES `autor` (`id_autor`),
  ADD CONSTRAINT `item_ibfk_4` FOREIGN KEY (`id_local`) REFERENCES `local_aquisicao` (`id_local`);

--
-- Limitadores para a tabela `transacao`
--
ALTER TABLE `transacao`
  ADD CONSTRAINT `transacao_ibfk_1` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
