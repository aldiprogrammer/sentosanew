-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 24, 2026 at 06:25 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sentosa`
--

-- --------------------------------------------------------

--
-- Table structure for table `bahanpakais`
--

CREATE TABLE `bahanpakais` (
  `id` bigint UNSIGNED NOT NULL,
  `id_master_bahan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_bahan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `panjang` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lebar` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `satuan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bahanpakais`
--

INSERT INTO `bahanpakais` (`id`, `id_master_bahan`, `kode_bahan`, `keterangan`, `panjang`, `lebar`, `total`, `satuan`, `created_at`, `updated_at`) VALUES
(2, 'OSTD', 'OSTD1', 'MMT 280 Gsm  Uk. 3.2 x 70 M', '3.2', '70', '224', 'M2', '2026-06-21 21:36:45', '2026-06-21 21:36:45'),
(3, 'OSTD', 'OSTD2', 'MMT 280 Gsm Uk. 2.8 x 70 M', '2.8', '70', '196', 'M2', '2026-06-21 21:43:45', '2026-06-21 21:43:45'),
(4, 'OSTD', 'OSTD3', 'MMT 280 Gsm Uk. 2.6 x 70 M', '2.6', '70', '182', 'M2', '2026-06-21 21:45:56', '2026-06-21 21:45:56'),
(6, 'OSTD', 'OSTD4', 'MMT 280 Gsm Uk. 2.2 x 70 M', '2.2', '70', '154', 'M2', '2026-06-21 23:33:18', '2026-06-21 23:33:18');

-- --------------------------------------------------------

--
-- Table structure for table `bahans`
--

CREATE TABLE `bahans` (
  `id` int NOT NULL,
  `kode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bahan` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `satuan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kategori_cetak` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_bahan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `klik` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_po` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_umum` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_khusus` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_member` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_custom` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cara_perhitungan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bahans`
--

INSERT INTO `bahans` (`id`, `kode`, `bahan`, `kategori`, `satuan`, `jenis`, `kategori_cetak`, `jenis_bahan`, `klik`, `qty`, `harga`, `harga_po`, `harga_umum`, `harga_khusus`, `harga_member`, `harga_custom`, `cara_perhitungan`, `created_at`, `updated_at`) VALUES
(1, 'BSJ UV', 'Backlite Jerman UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '260000', '250000', '250000', '0', 'LUAS', NULL, NULL),
(3, 'LIVO', 'Laser Kertas Ivory 270 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '5600', '5400', '5400', '0', 'QTY KHUSUS', NULL, NULL),
(4, 'OSTD', 'MMT 280 Gsm', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '17000', '15200', '15000', '0', 'LUAS', NULL, NULL),
(5, 'OTAP', 'MMT 340 Ap Gsm', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '22000', '21000', '21000', '0', 'LUAS', NULL, NULL),
(6, 'OTBO', 'MMT 340 BO Gsm', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '23000', '22000', '22000', '0', 'LUAS', NULL, NULL),
(7, 'LIVOTB', 'Laser Kertas Ivory 270 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7800', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(8, 'OBS', 'MMT Backlite China', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '66000', '55000', '55000', '0', 'LUAS', NULL, NULL),
(9, 'OBSJ', 'MMT Backlite Singelside Jerman', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '110000', '105000', '105000', '0', 'LUAS', NULL, NULL),
(10, 'TLP40D', 'Tas Lipat Bawah Uk. 38 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '9720', '9520', '9520', '0', 'QTY KHUSUS', NULL, NULL),
(11, 'OBSK', 'MMT Backlite Singelside Korea', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '65000', '65000', '60000', '0', 'LUAS', NULL, NULL),
(12, 'OJR', 'MMT Jerman', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '107000', '107000', '92000', '0', 'LUAS', NULL, NULL),
(13, 'TLP40D', 'Tas Lipat Bawah Uk. 38 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '6084', '5985', '5985', '0', 'QTY KHUSUS', NULL, NULL),
(14, 'TLP34O', 'Tas Lipat Bawah Uk. 33 x 6 x 34 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6660', '6460', '6460', '0', 'QTY KHUSUS', NULL, NULL),
(15, 'TLP34O', 'Tas Lipat Bawah Uk. 33 x 6 x 34 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4236', '4137', '4137', '0', 'QTY KHUSUS', NULL, NULL),
(16, 'TLP34D', 'Tas Lipat Bawah Uk. 33 x 6 x 34 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '9060', '8860', '8860', '0', 'QTY KHUSUS', NULL, NULL),
(17, 'TLP34D', 'Tas Lipat Bawah Uk. 33 x 6 x 34 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '5424', '5325', '5325', '0', 'QTY KHUSUS', NULL, NULL),
(18, 'TLP25O', 'Tas Lipat Bawah Uk. 28 x 8 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6120', '5920', '5920', '0', 'QTY KHUSUS', NULL, NULL),
(19, 'TLP25O', 'Tas Lipat Bawah Uk. 28 x 8 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '3696', '3597', '3597', '0', 'QTY KHUSUS', NULL, NULL),
(20, 'OKOC', 'MMT Korea Dove 440 GSM', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '48000', '46000', '46000', '0', 'LUAS', NULL, NULL),
(21, 'O440', 'MMT 440 Glossy', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '35000', '33000', '33000', '0', 'LUAS', NULL, NULL),
(22, 'OKST', 'Kain Satin', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '29000', '28000', '28000', '0', 'LUAS', NULL, NULL),
(23, 'OSAR', 'Sticker Ap Ritrama', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '51000', '48000', '48000', '0', 'LUAS', NULL, NULL),
(24, 'OSAR MATT', 'Sticker Ap Ritrama Matt', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '66000', '60000', '60000', '0', 'LUAS', NULL, NULL),
(25, 'OSBL-IN', 'Outdoor Sticker Backlite ', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '58000', '56000', '56000', '0', 'LUAS', NULL, NULL),
(26, 'OSBO', 'Sticker Black Out ', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '69000', '65000', '65000', '0', 'LUAS', NULL, NULL),
(27, 'OSTP', 'Sticker Transparant', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '78500', '71000', '71000', '0', 'LUAS', NULL, NULL),
(28, 'OWV', 'Sticker Oneway Vision', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '77000', '75000', '75000', '0', 'LUAS', NULL, NULL),
(29, 'SS', 'Sticker Sandblust', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '90000', '85000', '85000', '0', 'LUAS', NULL, NULL),
(30, 'OV', 'Over Print', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '12000', '10000', '10000', '0', 'LUAS', NULL, NULL),
(31, 'OKSI', 'Kain Satin Import', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '78000', '75000', '75000', '0', 'LUAS', NULL, NULL),
(32, 'OTC', 'Kain TC', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '58000', '55000', '55000', '0', 'LUAS', NULL, NULL),
(33, 'MESH', 'MESH', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '95000', '86000', '86000', '0', 'LUAS', NULL, NULL),
(34, 'DALT', 'Dye Albatros', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'DYE', '0', '1', '0', '0', '99000', '85000', '85000', '0', 'LUAS', NULL, NULL),
(35, 'DPP', 'Dye Photopaper', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'DYE', '0', '1', '0', '0', '99000', '85000', '85000', '0', 'LUAS', NULL, NULL),
(36, 'DSV', 'Dye Sticker Vynil', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'DYE', '0', '1', '0', '0', '115000', '105000', '105000', '0', 'LUAS', NULL, NULL),
(37, 'DSTP', 'Dye Sticker Transparant ', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '125000', '120000', '120000', '0', 'LUAS', NULL, NULL),
(38, 'DD', 'Dye Duratrans', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '180000', '175000', '175000', '0', 'LUAS', NULL, NULL),
(39, 'LMG', 'Lamit Glossy', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '30000', '28000', '28000', '0', 'LUAS', NULL, NULL),
(40, 'LMD', 'Lamit Dove', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '30000', '28000', '28000', '0', 'LUAS', NULL, NULL),
(41, 'LMF', 'Lamit Floor', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '77000', '75000', '75000', '0', 'LUAS', NULL, NULL),
(42, 'LMP', 'Laminating Putih', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '48000', '45000', '45000', '0', 'LUAS', NULL, NULL),
(43, 'TP', 'Transparant Tape', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '18000', '16000', '16000', '0', 'LUAS', NULL, NULL),
(44, 'CSBI', 'Cutting Sticker Indoor', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '50000', '45000', '45000', '0', 'LUAS', NULL, NULL),
(45, 'JPBI', 'Jasa Potong Bahan Indoor', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'DYE', '0', '1', '0', '0', '15000', '10000', '10000', '0', 'LUAS', NULL, NULL),
(46, 'OSTDM', 'MMT 280 Gsm 5 M', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '38000', '35000', '35000', '0', 'LUAS', NULL, NULL),
(47, 'O4405M', 'MMT 440 Glossy 5 M', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '48000', '45000', '45000', '0', 'LUAS', NULL, NULL),
(48, 'OKOC5M', 'MMT Korea Dove 440 GSM 5M', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', '1', '0', '0', '58000', '55000', '55000', '0', 'LUAS', NULL, NULL),
(49, 'CSO1', 'Cutting Sticker oracel 1 warna', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'DYE', '0', '1', '0', '0', '350000', '300000', '300000', '0', 'LUAS', NULL, NULL),
(50, 'CSO2', 'Cutting Sticker oracel 2 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '550000', '520000', '520000', '0', 'LUAS', NULL, NULL),
(51, 'CSO3', 'Cutting Sticker oracel 3 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '750000', '720000', '720000', '0', 'LUAS', NULL, NULL),
(52, 'CSSO1', 'Cutting Sticker Scolight 1 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '450000', '430000', '430000', '0', 'LUAS', NULL, NULL),
(53, 'CSSO2', 'Cutting Sticker Scolight 2 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '650000', '630000', '630000', '0', 'LUAS', NULL, NULL),
(54, 'CSSO3', 'Cutting Sticker Scolight 3 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', '1', '0', '0', '850000', '830000', '830000', '0', 'LUAS', NULL, NULL),
(55, 'ALTUV', 'Albatros UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '100000', '95000', '95000', '0', 'LUAS', NULL, NULL),
(56, 'DPPUV', 'Photopaper UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '110000', '105000', '105000', '0', 'LUAS', NULL, NULL),
(57, 'LUV', 'Luster UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '110000', '105000', '105000', '0', 'LUAS', NULL, NULL),
(58, 'WUV', 'Wallpaper UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '142000', '138000', '138000', '0', 'LUAS', NULL, NULL),
(59, 'DDUV', 'Duratrans UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '280000', '270000', '270000', '0', 'LUAS', NULL, NULL),
(60, 'SUV', 'Sticker UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '125000', '110000', '110000', '0', 'LUAS', NULL, NULL),
(61, 'SMUV', 'Sticker Matte UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '120000', '113000', '113000', '0', 'LUAS', NULL, NULL),
(62, 'SBLUV', 'Sticker Backlite UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '140000', '135000', '135000', '0', 'LUAS', NULL, NULL),
(63, 'SBOUV', 'Sticker BO UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '130000', '125000', '125000', '0', 'LUAS', NULL, NULL),
(64, 'STPUV', 'Sticker Transparant UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '180000', '178000', '178000', '0', 'LUAS', NULL, NULL),
(65, 'SOWUV', 'Sticker Oracel White UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '225000', '218000', '218000', '0', 'LUAS', NULL, NULL),
(66, 'OWUV', 'Oneway UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '145000', '140000', '140000', '0', 'LUAS', NULL, NULL),
(67, 'SSUV', 'Sticker Sandblust UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '145000', '140000', '140000', '0', 'LUAS', NULL, NULL),
(68, 'SCSUV', 'Sticker Scolight Silver UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '270000', '260000', '260000', '0', 'LUAS', NULL, NULL),
(69, 'SHUV', 'Sticker Hologram UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '160000', '150000', '150000', '0', 'LUAS', NULL, NULL),
(70, 'BSUV', 'Backlite UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '135000', '130000', '130000', '0', 'LUAS', NULL, NULL),
(71, 'BSK UV', 'Backlite Korea UV', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '230000', '220000', '220000', '0', 'LUAS', NULL, NULL),
(72, 'TTSJC25T', 'Tas Tali Sistem Jahit Canvas Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '33564', '33465', '33465', '0', 'QTY KHUSUS', NULL, NULL),
(73, 'TTUT40O', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 30 X 10 X 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '13200', '13000', '13000', '0', 'QTY KHUSUS', NULL, NULL),
(74, 'TTUT40O', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 30 X 10 X 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '11988', '11889', '11889', '0', 'QTY KHUSUS', NULL, NULL),
(75, 'TTUT40T', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 30 X 10 X 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '13200', '13000', '13000', '0', 'QTY KHUSUS', NULL, NULL),
(76, 'TTUT40T', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 30 X 10 X 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '11988', '11889', '11889', '0', 'QTY KHUSUS', NULL, NULL),
(77, 'TTUT35O', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 25 X 10 X 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '10800', '10600', '10600', '0', 'QTY KHUSUS', NULL, NULL),
(78, 'TTUT35O', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 25 X 10 X 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '9588', '9489', '9489', '0', 'QTY KHUSUS', NULL, NULL),
(79, 'TTUT35T', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 25 X 10 X 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '10800', '10600', '10600', '0', 'QTY KHUSUS', NULL, NULL),
(80, 'TTUT35T', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 25 X 10 X 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '9588', '9489', '9489', '0', 'QTY KHUSUS', NULL, NULL),
(81, '440UV', 'MMT 440 glossy UV', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '100000', '95000', '95000', '0', 'LUAS', NULL, NULL),
(82, 'TTUT25O', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 20 X 10 X 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8400', '8200', '8200', '0', 'QTY KHUSUS', NULL, NULL),
(83, 'TTUT25O', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 20 X 10 X 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '7188', '7089', '7089', '0', 'QTY KHUSUS', NULL, NULL),
(84, 'TTUT25T', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 20 X 10 X 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8400', '8200', '8200', '0', 'QTY KHUSUS', NULL, NULL),
(85, 'TTUT25T', 'Tas Tali Sistem Jahit Ulang Tahun Uk. 20 X 10 X 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '7188', '7089', '7089', '0', 'QTY KHUSUS', NULL, NULL),
(86, 'KOCUV', 'MMT Korea dove UV', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '115000', '110000', '110000', '0', 'LUAS', NULL, NULL),
(87, 'PIN1', 'Pin uk. 4.4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '01-10', '0', '0', '5500', '5000', '5000', '0', 'QTY KHUSUS', NULL, NULL),
(88, 'PIN1', 'Pin uk. 4.4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '11-50', '0', '0', '5000', '4500', '4500', '0', 'QTY KHUSUS', NULL, NULL),
(89, 'PIN1', 'Pin uk. 4.4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '4500', '4000', '4000', '0', 'QTY KHUSUS', NULL, NULL),
(90, 'TBOUV', 'MMT 340 BO Gsm UV', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '85000', '80000', '80000', '0', 'LUAS', NULL, NULL),
(91, 'PIN2', 'Pin uk. 5.8', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '01-10', '0', '0', '6000', '5500', '5500', '0', 'QTY KHUSUS', NULL, NULL),
(92, 'FAB1', 'Fabric + Jahit', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '300000', '280000', '280000', '0', 'LUAS', NULL, NULL),
(93, 'PIN2', 'Pin uk. 5.8', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '11-50', '0', '0', '5500', '5000', '5000', '0', 'QTY KHUSUS', NULL, NULL),
(94, 'PIN2', 'Pin uk. 5.8', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '5000', '4500', '4500', '0', 'QTY KHUSUS', NULL, NULL),
(95, 'STPUVW', 'Sticker Transparant UV + WHITE', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', '1', '0', '0', '230000', '220000', '220000', '0', 'LUAS', NULL, NULL),
(96, 'GTGP1', 'Gantungan Pin uk. 4.4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '01-10', '0', '0', '7500', '7000', '7000', '0', 'QTY KHUSUS', NULL, NULL),
(97, 'GTGP1', 'Gantungan Pin uk. 4.4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '11-50', '0', '0', '7000', '6500', '6500', '0', 'QTY KHUSUS', NULL, NULL),
(98, 'FB', 'Foamboard uk. 100 x 100 cm', 'DIGITAL', 'M2', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '85000', '80000', '80000', '0', 'QTY', NULL, NULL),
(99, 'GTGP1', 'Gantungan Pin uk. 4.4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6500', '6000', '6000', '0', 'QTY KHUSUS', NULL, NULL),
(100, 'GTGP2', 'Gantungan Pin uk. 5.8', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '01-10', '0', '0', '8100', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(101, 'GTGP2', 'Gantungan Pin uk. 5.8', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '11-50', '0', '0', '7700', '7100', '7100', '0', 'QTY KHUSUS', NULL, NULL),
(102, 'GTGP2', 'Gantungan Pin uk. 5.8', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '7200', '6600', '6600', '0', 'QTY KHUSUS', NULL, NULL),
(103, 'GTGA1', 'Gantungan Kunci Arcylic uk. 4 x 4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1 sisi', '0', '0', '5000', '4500', '4500', '0', 'QTY KHUSUS', NULL, NULL),
(104, 'GTGA1', 'Gantungan Kunci Arcylic uk. 4 x 4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '2 sisi', '0', '0', '6500', '6000', '6000', '0', 'QTY KHUSUS', NULL, NULL),
(105, 'GTGA2', 'Gantungan Kunci Arcylic uk. 5 x 5', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1 sisi', '0', '0', '6000', '5500', '5500', '0', 'QTY KHUSUS', NULL, NULL),
(106, 'GTGA2', 'Gantungan Kunci Arcylic uk. 5 x 5', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '2 sisi', '0', '0', '9000', '8000', '8000', '0', 'QTY KHUSUS', NULL, NULL),
(107, 'GTGA3', 'Gantungan Kunci Arcylic uk. 6 x 6', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1 sisi', '0', '0', '7000', '6500', '6500', '0', 'QTY KHUSUS', NULL, NULL),
(108, 'GTGA3', 'Gantungan Kunci Arcylic uk. 6 x 6', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '2 sisi', '0', '0', '14000', '13000', '13000', '0', 'QTY KHUSUS', NULL, NULL),
(109, 'GTG4', 'Gantungan Kunci Arcylic uk. 6 x 2, 3 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1 sisi', '0', '0', '8000', '8000', '8000', '0', 'QTY KHUSUS', NULL, NULL),
(110, 'GTG5', 'Gantungan Kunci Arcylic uk. 6 x 2, 3 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '2 sisi', '0', '0', '15000', '15000', '15000', '0', 'QTY KHUSUS', NULL, NULL),
(111, 'GTG6', 'Gantungan Kunci Arcylic uk. 6 x 2, 5 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1 sisi', '0', '0', '9000', '9000', '9000', '0', 'QTY KHUSUS', NULL, NULL),
(112, 'GTG7', 'Gantungan Kunci Arcylic uk. 6 x 2, 5 mm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '2 sisi', '0', '0', '18000', '18000', '18000', '0', 'QTY KHUSUS', NULL, NULL),
(113, 'JP', 'Jasa Potong Uk. A3', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '700', '600', '600', '0', 'QTY', NULL, NULL),
(114, 'PTP', 'Penambahan Tinta Putih Uk. A3', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '17000', '16000', '16000', '0', 'QTY', NULL, NULL),
(115, 'INF', 'Infraboard uk. 100 x 100 cm', 'DIGITAL', 'M2', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '120000', '110000', '110000', '0', 'QTY', NULL, NULL),
(116, 'PET', 'Laser Kertas PET 200 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '27000', '25000', '25000', '0', 'QTY', NULL, NULL),
(117, 'PETTB', 'Laser Kertas PET 200 2 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '32000', '30000', '30000', '0', 'QTY', NULL, NULL),
(118, 'LHVS8065', 'Laser Kertas HVS 80 1 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '6000', '5000', '5000', '0', 'QTY', NULL, NULL),
(119, 'PVC', 'PVC uk. 100 x 100 cm', 'DIGITAL', 'M2', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '200000', '190000', '190000', '0', 'QTY', NULL, NULL),
(120, 'BFB', 'Bentuk Foamboard', 'DIGITAL', 'M2', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '30000', '25000', '25000', '0', 'QTY', NULL, NULL),
(121, 'KMB', 'Kaki Mini Banner uk. 25 x 40 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '15000', '12500', '12500', '0', 'QTY', NULL, NULL),
(122, 'LHVS8065TB', 'Laser Kertas HVS 80 2 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '12000', '10000', '10000', '0', 'QTY', NULL, NULL),
(123, 'LkS12065', 'Laser Kertas Konstruk 120 1 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '6000', '5000', '5000', '0', 'QTY', NULL, NULL),
(124, 'KXB', 'Kaki X-banner uk. 60 x 160 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '38000', '35000', '35000', '0', 'QTY', NULL, NULL),
(125, 'LkS12065TB', 'Laser Kertas Konstruk 120 2 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '12000', '10000', '10000', '0', 'QTY', NULL, NULL),
(126, 'LIVOTB', 'Laser Kertas Ivory 270 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '7600', '7400', '7400', '0', 'QTY KHUSUS', NULL, NULL),
(127, 'LkS15065', 'Laser Kertas Konstruk 150 1 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '6000', '5000', '5000', '0', 'QTY', NULL, NULL),
(128, 'KYB1', 'Kaki Y-Banner uk. 60 x 160 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '47000', '45000', '45000', '0', 'QTY', NULL, NULL),
(129, 'KYB2', 'Kaki Y-Banner uk. 80 x 180 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '58000', '55000', '55000', '0', 'QTY', NULL, NULL),
(130, 'KRB1', 'Kaki R-Banner uk. 60 x 160 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '190000', '180000', '180000', '0', 'QTY', NULL, NULL),
(131, 'LIVOTB', 'Laser Kertas Ivory 270 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '7400', '7200', '7200', '0', 'QTY KHUSUS', NULL, NULL),
(132, 'LkS15065TB', 'Laser Kertas Konstruk 150 2 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '12000', '10000', '10000', '0', 'QTY', NULL, NULL),
(133, 'LHVS8090', 'Laser Kertas HVS 80 1 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '7000', '6000', '6000', '0', 'QTY', NULL, NULL),
(134, 'KRB2', 'Kaki R-Banner uk. 80 x 200 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '200000', '190000', '190000', '0', 'QTY', NULL, NULL),
(135, 'LHVS8090TB', 'Laser Kertas HVS 80 2 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '13000', '12000', '12000', '0', 'QTY', NULL, NULL),
(136, 'KRB3', 'Kaki R-Banner uk. 85 x 200 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '210000', '200000', '200000', '0', 'QTY', NULL, NULL),
(137, 'LkS12090', 'Laser Kertas Konstruk 120 1 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '7000', '6000', '6000', '0', 'QTY', NULL, NULL),
(138, 'LkS12090TB', 'Laser Kertas Konstruk 120 2 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '13000', '12000', '12000', '0', 'QTY', NULL, NULL),
(139, 'LkS15090', 'Laser Kertas Konstruk 150 1 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '7000', '6000', '6000', '0', 'QTY', NULL, NULL),
(140, 'LkS15090TB', 'Laser Kertas Konstruk 150 2 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '13000', '12000', '12000', '0', 'QTY', NULL, NULL),
(141, 'LHVS80109', 'Laser Kertas HVS 80 1 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '8000', '7000', '7000', '0', 'QTY', NULL, NULL),
(142, 'LHVS80109TB', 'Laser Kertas HVS 80 2 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '15000', '14000', '14000', '0', 'QTY', NULL, NULL),
(143, 'LkS120109', 'Laser Kertas Konstruk 120 1 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '8000', '7000', '7000', '0', 'QTY', NULL, NULL),
(144, 'LkS120109TB', 'Laser Kertas Konstruk 120 2 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '15000', '14000', '14000', '0', 'QTY', NULL, NULL),
(145, 'KD1', 'Kaki Door Frame uk. 60 x 160 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '170000', '160000', '160000', '0', 'QTY', NULL, NULL),
(146, 'LkS150109', 'Laser Kertas Konstruk 150 1 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '8000', '7000', '7000', '0', 'QTY', NULL, NULL),
(147, 'KD2', 'Kaki Door Frame uk. 80 x 180 cm ', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '195000', '190000', '190000', '0', 'QTY', NULL, NULL),
(148, 'LkS150109TB', 'Laser Kertas Konstruk 150 2 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '15000', '14000', '14000', '0', 'QTY', NULL, NULL),
(149, 'KF', 'Kaki Flag Banner uk 3M', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '720000', '700000', '700000', '0', 'QTY', NULL, NULL),
(150, 'LTIK21065', 'Laser Kertas TIK 210 1 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '9000', '8800', '8800', '0', 'QTY', NULL, NULL),
(151, 'KTP1', 'Kaki Tripod Banner 1 sisi', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '140000', '135000', '135000', '0', 'QTY', NULL, NULL),
(152, 'LTIK21065TB', 'Laser Kertas TIK 210 2 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '18000', '17600', '17600', '0', 'QTY', NULL, NULL),
(153, 'KTP2', 'Kaki Tripod Banner 2 sisi', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '130000', '125000', '125000', '0', 'QTY', NULL, NULL),
(154, 'LTIK26065', 'Laser Kertas TIK 260 1 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '9000', '8800', '8800', '0', 'QTY', NULL, NULL),
(155, 'KEDSEK', 'Kaki Event Desk', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '590000', '570000', '570000', '0', 'QTY', NULL, NULL),
(156, 'LTIK26065TB', 'Laser Kertas TIK 260 2 Sisi Uk. 32 x 65 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '18000', '17600', '17600', '0', 'QTY', NULL, NULL),
(157, 'LTIK21090', 'Laser Kertas TIK 210 1 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '11000', '10000', '10000', '0', 'QTY', NULL, NULL),
(158, 'KPOPT', 'Kaki Pop Up Table', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '1200000', '1100000', '1100000', '0', 'QTY', NULL, NULL),
(159, 'KSPW1', 'Kaki Spin Wheel 60 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '690000', '670000', '670000', '0', 'QTY', NULL, NULL),
(160, 'LTIK21090TB', 'Laser Kertas TIK 210 2 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '20000', '19000', '19000', '0', 'QTY', NULL, NULL),
(161, 'KSPW2', 'Kaki Spin Wheel 80 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '710000', '690000', '690000', '0', 'QTY', NULL, NULL),
(162, 'LTIK26090', 'Laser Kertas TIK 260 1 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '11000', '10000', '10000', '0', 'QTY', NULL, NULL),
(163, 'PR', 'Pemasangan Roller Banner', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', '1', '0', '0', '18000', '15000', '15000', '0', 'QTY', NULL, NULL),
(164, 'Harga KERTAS Per QTY', 'Pemasangan Roller Banner', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY (/lbr)', '0', '0', '0', '0', '0', '0', 'QTY', NULL, NULL),
(165, 'LMKD1', 'Laminating Bahan Kertas Dove Uk. A3 1 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '2700', '2500', '2500', '0', 'QTY KHUSUS', NULL, NULL),
(166, 'LMKD1', 'Laminating Bahan Kertas Dove Uk. A3 1 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '2500', '2300', '2300', '0', 'QTY KHUSUS', NULL, NULL),
(167, 'LMKD1', 'Laminating Bahan Kertas Dove Uk. A3 1 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '2300', '2000', '2000', '0', 'QTY KHUSUS', NULL, NULL),
(168, 'LMKD2', 'Laminating Bahan Kertas Dove Uk. A3 2sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '4200', '4000', '4000', '0', 'QTY KHUSUS', NULL, NULL),
(169, 'LMKD2', 'Laminating Bahan Kertas Dove Uk. A3 2sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4000', '3800', '3800', '0', 'QTY KHUSUS', NULL, NULL),
(170, 'LMKD2', 'Laminating Bahan Kertas Dove Uk. A3 2sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '3800', '3500', '3500', '0', 'QTY KHUSUS', NULL, NULL),
(171, 'LMKG1', 'Laminating Bahan Kertas Glossy Uk. A3 1 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '2700', '2500', '2500', '0', 'QTY KHUSUS', NULL, NULL),
(172, 'LTIK26090TB', 'Laser Kertas TIK 260 2 Sisi Uk. 32 x 90 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '20000', '19000', '19000', '0', 'QTY', NULL, NULL),
(173, 'LMKG1', 'Laminating Bahan Kertas Glossy Uk. A3 1 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '2500', '2300', '2300', '0', 'QTY KHUSUS', NULL, NULL),
(174, 'LMKG1', 'Laminating Bahan Kertas Glossy Uk. A3 1 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '2300', '2000', '2000', '0', 'QTY KHUSUS', NULL, NULL),
(175, 'LTIK210109', 'Laser Kertas TIK 210 1 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '12000', '11500', '11500', '0', 'QTY', NULL, NULL),
(176, 'LMKG2', 'Laminating Bahan Kertas Glossy Uk. A3 2 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '4200', '4000', '4000', '0', 'QTY KHUSUS', NULL, NULL),
(177, 'LTIK210109TB', 'Laser Kertas TIK 210 2 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '23000', '22000', '22000', '0', 'QTY', NULL, NULL),
(178, 'LMKG2', 'Laminating Bahan Kertas Glossy Uk. A3 2 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4000', '3800', '3800', '0', 'QTY KHUSUS', NULL, NULL),
(179, 'LTIK260109', 'Laser Kertas TIK 260 1 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '12000', '11500', '11500', '0', 'QTY', NULL, NULL),
(180, 'LTIK260109TB', 'Laser Kertas TIK 260 2 Sisi Uk. 32 x 109 cm', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '23000', '22000', '22000', '0', 'QTY', NULL, NULL),
(181, 'LMKG2', 'Laminating Bahan Kertas Glossy Uk. A3 2 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '3800', '3500', '3500', '0', 'QTY KHUSUS', NULL, NULL),
(182, 'KSS', 'Kartunama Singel Side', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '25000', '25000', '23000', '0', 'QTY', NULL, NULL),
(183, 'LSK', 'Laser Sticker Kertas Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '5800', '5600', '5600', '0', 'QTY KHUSUS', NULL, NULL),
(184, 'KDS', 'Kartunama Double Side', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '38000', '38000', '35000', '0', 'QTY', NULL, NULL),
(185, 'LSK', 'Laser Sticker Kertas Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '5600', '5400', '5400', '0', 'QTY KHUSUS', NULL, NULL),
(186, 'LSK', 'Laser Sticker Kertas Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '5400', '5200', '5200', '0', 'QTY KHUSUS', NULL, NULL),
(187, 'KSSL', 'Kartunama Singel Side Lamit', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '42000', '40000', '40000', '0', 'QTY', NULL, NULL),
(188, 'TLP25D', 'Tas Lipat Bawah Uk. 28 x 8 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8520', '8320', '8320', '0', 'QTY KHUSUS', NULL, NULL),
(189, 'KDSL', 'Kartunama Double Side Lamit', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '1', '0', '0', '52000', '50000', '50000', '0', 'QTY', NULL, NULL),
(190, 'LSTP', 'Laser Sticker Transparant Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '13200', '13000', '13000', '0', 'QTY KHUSUS', NULL, NULL),
(191, 'PLTA1', 'Plakat Arcylic 5 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '190000', '180000', '180000', '0', 'QTY', NULL, NULL),
(192, 'TLP25D', 'Tas Lipat Bawah Uk. 28 x 8 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4884', '4785', '4785', '0', 'QTY KHUSUS', NULL, NULL),
(193, 'PLTA2', 'Plakat Arcylic 8 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '220000', '210000', '210000', '0', 'QTY', NULL, NULL),
(194, 'TTSJ45O', 'Tas Tali Sistem Jahit 100 gr Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '12000', '11800', '11800', '0', 'QTY KHUSUS', NULL, NULL),
(195, 'PLTA3', 'Plakat Arcylic 10 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '235000', '230000', '230000', '0', 'QTY', NULL, NULL),
(196, 'TTSJ45O', 'Tas Tali Sistem Jahit 100 gr Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '9576', '9477', '9477', '0', 'QTY KHUSUS', NULL, NULL),
(197, 'LSTP', 'Laser Sticker Transparant Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '13000', '12800', '12800', '0', 'QTY KHUSUS', NULL, NULL),
(198, 'TTSJ45D', 'Tas Tali Sistem Jahit 100 gr Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '14400', '14200', '14200', '0', 'QTY KHUSUS', NULL, NULL),
(199, 'LSTP', 'Laser Sticker Transparant Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '12800', '12600', '12600', '0', 'QTY KHUSUS', NULL, NULL),
(200, 'PONDG', 'POND GARIS', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '100000', '95000', '95000', '0', 'QTY', NULL, NULL),
(201, 'LSV', 'Laser Sticker Vynil Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '12800', '12600', '12600', '0', 'QTY KHUSUS', NULL, NULL),
(202, 'TTSJ45D', 'Tas Tali Sistem Jahit 100 gr Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '10764', '10665', '10665', '0', 'QTY KHUSUS', NULL, NULL),
(203, 'PONDB', 'POND BULAT', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '110000', '100000', '100000', '0', 'QTY', NULL, NULL),
(204, 'BNKP', 'Bad Nama Kuningan Peniti', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '25000', '23000', '23000', '0', 'QTY', NULL, NULL),
(205, 'TTSJ40O', 'Tas Tali Sistem Jahit 100 gr Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '11280', '11080', '11080', '0', 'QTY KHUSUS', NULL, NULL),
(206, 'BNKM', 'Bad Nama Kuningan Magnet', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '31000', '29000', '29000', '0', 'QTY', NULL, NULL),
(207, 'TTSJ40O', 'Tas Tali Sistem Jahit 100 gr Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '8856', '8757', '8757', '0', 'QTY KHUSUS', NULL, NULL),
(208, 'TTSJ40D', 'Tas Tali Sistem Jahit 100 gr Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '13680', '13480', '13480', '0', 'QTY KHUSUS', NULL, NULL),
(209, 'BNKK', 'Bad Nama Kuningan KNOP', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '29000', '26000', '26000', '0', 'QTY', NULL, NULL),
(210, 'TTSJ40D', 'Tas Tali Sistem Jahit 100 gr Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '10044', '9945', '9945', '0', 'QTY KHUSUS', NULL, NULL),
(211, 'BNAP', 'Bad Nama Arcylic Peniti + Resin', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '23000', '21000', '21000', '0', 'QTY', NULL, NULL),
(212, 'BNAM', 'Bad Nama Arcylic Magnet + Resin', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '29000', '27000', '27000', '0', 'QTY', NULL, NULL),
(213, 'TTSJ35O', 'Tas Tali Sistem Jahit 100 gr Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '10320', '10120', '10120', '0', 'QTY KHUSUS', NULL, NULL),
(214, 'BNAK', 'Bad Nama Arcylic KNOP + Resin', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '28000', '26000', '26000', '0', 'QTY', NULL, NULL),
(215, 'TTSJ35O', 'Tas Tali Sistem Jahit 100 gr Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '7896', '7797', '7797', '0', 'QTY KHUSUS', NULL, NULL),
(216, 'BNTP', 'Bad Nama Timbul Peniti ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '33000', '31000', '31000', '0', 'QTY', NULL, NULL),
(217, 'TTSJ35D', 'Tas Tali Sistem Jahit 100 gr Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '12720', '12520', '12520', '0', 'QTY KHUSUS', NULL, NULL),
(218, 'TTSJ35D', 'Tas Tali Sistem Jahit 100 gr Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '9084', '8985', '8985', '0', 'QTY KHUSUS', NULL, NULL),
(219, 'BNTM', 'Bad Nama Timbul Magnet ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '39000', '37000', '37000', '0', 'QTY', NULL, NULL),
(220, 'BNTK', 'Bad Nama Timbul KNOP', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '39000', '37000', '37000', '0', 'QTY', NULL, NULL),
(221, 'TTSJ25O', 'Tas Tali Sistem Jahit 100 gr Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '9600', '9400', '9400', '0', 'QTY KHUSUS', NULL, NULL),
(222, 'LYD', 'Lanyard', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '20000', '18000', '18000', '0', 'QTY', NULL, NULL),
(223, 'TTSJ25O', 'Tas Tali Sistem Jahit 100 gr Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '7176', '7077', '7077', '0', 'QTY KHUSUS', NULL, NULL),
(224, 'HC', 'Hard Cartoon', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '38000', '36500', '36500', '0', 'QTY', NULL, NULL),
(225, 'LSV', 'Laser Sticker Vynil Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '12600', '12400', '12400', '0', 'QTY KHUSUS', NULL, NULL),
(226, 'TTSJ25D', 'Tas Tali Sistem Jahit 100 gr Uk. 20 x 10 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '12000', '11800', '11800', '0', 'QTY KHUSUS', NULL, NULL),
(227, 'KN', 'Kotak Kartu Nama', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DISPLAY', '0', '1', '0', '0', '2500', '2200', '2200', '0', 'QTY', NULL, NULL),
(228, 'TTSJ25D', 'Tas Tali Sistem Jahit 100 gr Uk. 20 x 10 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '8364', '8265', '8265', '0', 'QTY KHUSUS', NULL, NULL),
(229, 'ID', 'Idcard', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '13000', '12000', '12000', '0', 'QTY', NULL, NULL),
(230, 'LSV', 'Laser Sticker Vynil Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '12400', '12200', '12200', '0', 'QTY KHUSUS', NULL, NULL),
(231, 'TTSJT45O', 'Tas Tali Sistem Jahit Terpal 600D Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '24000', '23800', '23800', '0', 'QTY KHUSUS', NULL, NULL),
(232, 'MB', 'MIKA BELALAI', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '700', '600', '600', '0', 'QTY', NULL, NULL),
(233, 'LSVM', 'Laser Sticker Vynil Matt Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '15200', '15000', '15000', '0', 'QTY KHUSUS', NULL, NULL),
(234, 'TTSJT45O', 'Tas Tali Sistem Jahit Terpal 600D Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '21576', '21477', '21477', '0', 'QTY KHUSUS', NULL, NULL),
(235, 'LSVM', 'Laser Sticker Vynil Matt Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '15000', '14800', '14800', '0', 'QTY KHUSUS', NULL, NULL),
(236, 'STP1', 'Stempel 1 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '35000', '35000', '35000', '0', 'QTY', NULL, NULL),
(237, 'STP2', 'Stempel <4 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '55000', '50000', '50000', '0', 'QTY', NULL, NULL),
(238, 'TTSJT45D', 'Tas Tali Sistem Jahit Terpal 600D Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '26400', '26200', '26200', '0', 'QTY KHUSUS', NULL, NULL),
(239, 'LSVM', 'Laser Sticker Vynil Matt Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '14800', '14600', '14600', '0', 'QTY KHUSUS', NULL, NULL),
(240, 'TTSJT45D', 'Tas Tali Sistem Jahit Terpal 600D Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '22764', '22665', '22665', '0', 'QTY KHUSUS', NULL, NULL),
(241, 'LSS', 'Laser Sticker Silver Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '15500', '14900', '14900', '0', 'QTY KHUSUS', NULL, NULL),
(242, 'TTSJT40O', 'Tas Tali Sistem Jahit Terpal 600D Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '21600', '21400', '21400', '0', 'QTY KHUSUS', NULL, NULL),
(243, 'STP3', 'Stempel >4 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '65000', '60000', '60000', '0', 'QTY', NULL, NULL),
(244, 'STP4', 'Stempel >5 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '70000', '65000', '65000', '0', 'QTY', NULL, NULL),
(245, 'TTSJT40O', 'Tas Tali Sistem Jahit Terpal 600D Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '19176', '19077', '19077', '0', 'QTY KHUSUS', NULL, NULL),
(246, 'LS', 'Lem Setan', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '5500', '5000', '5000', '0', 'QTY', NULL, NULL),
(247, 'LSS', 'Laser Sticker Silver Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '15300', '14700', '14700', '0', 'QTY KHUSUS', NULL, NULL),
(248, 'SRG', 'Sarung Idcard', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '3000', '2500', '2500', '0', 'QTY', NULL, NULL),
(249, 'TTSJT40D', 'Tas Tali Sistem Jahit Terpal 600D Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '24000', '23800', '23800', '0', 'QTY KHUSUS', NULL, NULL),
(250, 'LSS', 'Laser Sticker Silver Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '15100', '14500', '14500', '0', 'QTY KHUSUS', NULL, NULL),
(251, 'TTSJT40D', 'Tas Tali Sistem Jahit Terpal 600D Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '20364', '20265', '20265', '0', 'QTY KHUSUS', NULL, NULL),
(252, 'SRGA', 'Sarung Idcard Arcylic', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '4500', '4000', '4000', '0', 'QTY', NULL, NULL),
(253, 'TTSJT35O', 'Tas Tali Sistem Jahit Terpal 600D Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '19920', '19720', '19720', '0', 'QTY KHUSUS', NULL, NULL),
(254, 'LTA4', 'Lamit A4', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '8000', '7000', '7000', '0', 'QTY', NULL, NULL),
(255, 'LSG', 'Laser Sticker Gold Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '15500', '14900', '14900', '0', 'QTY KHUSUS', NULL, NULL),
(256, 'LSG', 'Laser Sticker Gold Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '15300', '14700', '14700', '0', 'QTY KHUSUS', NULL, NULL),
(257, 'TTSJT35O', 'Tas Tali Sistem Jahit Terpal 600D Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '17496', '17397', '17397', '0', 'QTY KHUSUS', NULL, NULL),
(258, 'LTA3', 'Lamit A3', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '9000', '8000', '8000', '0', 'QTY', NULL, NULL),
(259, 'MA', 'Mata Ayam', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', '1', '0', '0', '600', '500', '500', '0', 'QTY', NULL, NULL),
(260, 'LSG', 'Laser Sticker Gold Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '15100', '14500', '14500', '0', 'QTY KHUSUS', NULL, NULL),
(261, 'TTSJT35D', 'Tas Tali Sistem Jahit Terpal 600D Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '22320', '22120', '22120', '0', 'QTY KHUSUS', NULL, NULL),
(262, 'CUD125', 'Cup Datar 12 Oz 5gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '690000', '680000', '680000', '0', 'QTY', NULL, NULL),
(263, 'LSCP', 'Laser Sticker Craft Paper Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '15500', '14900', '14900', '0', 'QTY KHUSUS', NULL, NULL),
(264, 'TTSJT35D', 'Tas Tali Sistem Jahit Terpal 600D Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '18684', '18585', '18585', '0', 'QTY KHUSUS', NULL, NULL),
(265, 'TTSJT25O', 'Tas Tali Sistem Jahit Terpal 600D Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '18000', '17800', '17800', '0', 'QTY KHUSUS', NULL, NULL),
(266, 'CUD127', 'Cup Datar 12 Oz 7gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '650000', '640000', '640000', '0', 'QTY', NULL, NULL),
(267, 'LSCP', 'Laser Sticker Craft Paper Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '15300', '14700', '14700', '0', 'QTY KHUSUS', NULL, NULL),
(268, 'TTSJT25O', 'Tas Tali Sistem Jahit Terpal 600D Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '15576', '15477', '15477', '0', 'QTY KHUSUS', NULL, NULL),
(269, 'LSCP', 'Laser Sticker Craft Paper Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '15100', '14500', '14500', '0', 'QTY KHUSUS', NULL, NULL),
(270, 'LTIK190', 'Laser Kertas TIK 190 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '5000', '4800', '4800', '0', 'QTY KHUSUS', NULL, NULL),
(271, 'TTSJT25T', 'Tas Tali Sistem Jahit Terpal 600D Uk. 20 x 10 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '20400', '20200', '20200', '0', 'QTY KHUSUS', NULL, NULL),
(272, 'TTSJT25T', 'Tas Tali Sistem Jahit Terpal 600D Uk. 20 x 10 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '16764', '16665', '16665', '0', 'QTY KHUSUS', NULL, NULL),
(273, 'LTIK190', 'Laser Kertas TIK 190 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4800', '4600', '4600', '0', 'QTY KHUSUS', NULL, NULL),
(274, 'TTSJB45O', 'Tas Tali Sistem Jahit Blacu Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '25200', '25000', '25000', '0', 'QTY KHUSUS', NULL, NULL),
(275, 'TTSJB45O', 'Tas Tali Sistem Jahit Blacu Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '22776', '22677', '22677', '0', 'QTY KHUSUS', NULL, NULL),
(276, 'LTIK190', 'Laser Kertas TIK 190 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '4600', '4400', '4400', '0', 'QTY KHUSUS', NULL, NULL),
(277, 'LTIK190TB', 'Laser Kertas TIK 190 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7300', '7100', '7100', '0', 'QTY KHUSUS', NULL, NULL),
(278, 'LTIK190TB', 'Laser Kertas TIK 190 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6900', '6700', '6700', '0', 'QTY KHUSUS', NULL, NULL),
(279, 'TTSJB45T', 'Tas Tali Sistem Jahit Blacu Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '27600', '27400', '27400', '0', 'QTY KHUSUS', NULL, NULL),
(280, 'TTSJB45T', 'Tas Tali Sistem Jahit Blacu Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '23964', '23865', '23865', '0', 'QTY KHUSUS', NULL, NULL),
(281, 'LTIK190TB', 'Laser Kertas TIK 190 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6700', '6500', '6500', '0', 'QTY KHUSUS', NULL, NULL);
INSERT INTO `bahans` (`id`, `kode`, `bahan`, `kategori`, `satuan`, `jenis`, `kategori_cetak`, `jenis_bahan`, `klik`, `qty`, `harga`, `harga_po`, `harga_umum`, `harga_khusus`, `harga_member`, `harga_custom`, `cara_perhitungan`, `created_at`, `updated_at`) VALUES
(282, 'TTSJB40O', 'Tas Tali Sistem Jahit Blacu Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '22200', '22000', '22000', '0', 'QTY KHUSUS', NULL, NULL),
(283, 'TTSJB40O', 'Tas Tali Sistem Jahit Blacu Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '19776', '19677', '19677', '0', 'QTY KHUSUS', NULL, NULL),
(284, 'LTIK210', 'Laser Kertas TIK 210 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '5000', '4800', '4800', '0', 'QTY KHUSUS', NULL, NULL),
(285, 'LTIK210', 'Laser Kertas TIK 210 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4800', '4600', '4600', '0', 'QTY KHUSUS', NULL, NULL),
(286, 'CUD145', 'Cup Datar 14 Oz 5gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '690000', '680000', '680000', '0', 'QTY', NULL, NULL),
(287, 'LTIK210', 'Laser Kertas TIK 210 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '4600', '4400', '4400', '0', 'QTY KHUSUS', NULL, NULL),
(288, 'CUD147', 'Cup Datar 14 Oz 7gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '690000', '680000', '680000', '0', 'QTY', NULL, NULL),
(289, 'LTIK210TB', 'Laser Kertas TIK 210 UK 2 SISI Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7300', '7100', '7100', '0', 'QTY KHUSUS', NULL, NULL),
(290, 'CUD165', 'Cup Datar 16 Oz 5gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '690000', '680000', '680000', '0', 'QTY', NULL, NULL),
(291, 'CUD167', 'Cup Datar 16 Oz 7gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '760000', '750000', '750000', '0', 'QTY', NULL, NULL),
(292, 'LTIK210TB', 'Laser Kertas TIK 210 UK 2 SISI Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6900', '6700', '6700', '0', 'QTY KHUSUS', NULL, NULL),
(293, 'CUD229', 'Cup Datar 22 Oz 9.5gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '860000', '850000', '850000', '0', 'QTY', NULL, NULL),
(294, 'LTIK210TB', 'Laser Kertas TIK 210 UK 2 SISI Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6700', '6500', '6500', '0', 'QTY KHUSUS', NULL, NULL),
(295, 'LTIK230', 'Laser Kertas TIK 230 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '5000', '4800', '4800', '0', 'QTY KHUSUS', NULL, NULL),
(296, 'LTIK230', 'Laser Kertas TIK 230 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4800', '4600', '4600', '0', 'QTY KHUSUS', NULL, NULL),
(297, 'LTIK230', 'Laser Kertas TIK 230 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '4600', '4400', '4400', '0', 'QTY KHUSUS', NULL, NULL),
(298, 'LTIK230TB', 'Laser Kertas TIK 230 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7300', '7100', '7100', '0', 'QTY KHUSUS', NULL, NULL),
(299, 'LTIK230TB', 'Laser Kertas TIK 230 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6900', '6700', '6700', '0', 'QTY KHUSUS', NULL, NULL),
(300, 'CUO148', 'Cup Oval 14 Oz 8gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '800000', '790000', '790000', '0', 'QTY', NULL, NULL),
(301, 'TTSJB40T', 'Tas Tali Sistem Jahit Blacu Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '24600', '24400', '24400', '0', 'QTY KHUSUS', NULL, NULL),
(302, 'LTIK230TB', 'Laser Kertas TIK 230 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6700', '6500', '6500', '0', 'QTY KHUSUS', NULL, NULL),
(303, 'CUO147', 'Cup Oval 14 Oz 7gr BSM', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '710000', '700000', '700000', '0', 'QTY', NULL, NULL),
(304, 'CUO168', 'Cup Oval 16 Oz 8gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '860000', '850000', '850000', '0', 'QTY', NULL, NULL),
(305, 'TTSJB40T', 'Tas Tali Sistem Jahit Blacu Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '20964', '20865', '20865', '0', 'QTY KHUSUS', NULL, NULL),
(306, 'LTIK260', 'Laser Kertas TIK 260 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '5000', '4800', '4800', '0', 'QTY KHUSUS', NULL, NULL),
(307, 'TTSJB35O', 'Tas Tali Sistem Jahit Blacu Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '19800', '19600', '19600', '0', 'QTY KHUSUS', NULL, NULL),
(308, 'CUO167', 'Cup Oval 14 Oz 7gr BSM', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '710000', '700000', '700000', '0', 'QTY', NULL, NULL),
(309, 'TTSJB35O', 'Tas Tali Sistem Jahit Blacu Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '17376', '17277', '17277', '0', 'QTY KHUSUS', NULL, NULL),
(310, 'CUO188', 'Cup Oval 18 Oz 8gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '800000', '790000', '790000', '0', 'QTY', NULL, NULL),
(311, 'LTIK260', 'Laser Kertas TIK 260 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4800', '4600', '4600', '0', 'QTY KHUSUS', NULL, NULL),
(312, 'CUO2210', 'Cup Oval 22 Oz 8gr Starindo', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '860000', '850000', '850000', '0', 'QTY', NULL, NULL),
(313, 'LTIK260', 'Laser Kertas TIK 260 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '4600', '4400', '4400', '0', 'QTY KHUSUS', NULL, NULL),
(314, 'TTSJB35T', 'Tas Tali Sistem Jahit Blacu Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '22200', '22000', '22000', '0', 'QTY KHUSUS', NULL, NULL),
(315, 'CPP6', 'Cup Paper Putih 6.5 Oz', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '910000', '900000', '900000', '0', 'QTY', NULL, NULL),
(316, 'LTIK260TB', 'Laser Kertas TIK 260 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7000', '6800', '6800', '0', 'QTY KHUSUS', NULL, NULL),
(317, 'CPP8', 'Cup Paper Putih 8 Oz', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '1000', '0', '0', '910000', '900000', '900000', '0', 'QTY', NULL, NULL),
(318, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '370000', '510000', '510000', '510000', '0', 'QTY', NULL, NULL),
(319, 'LTIK260TB', 'Laser Kertas TIK 260 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6600', '6400', '6400', '0', 'QTY KHUSUS', NULL, NULL),
(320, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '450000', '590000', '590000', '590000', '0', 'QTY', NULL, NULL),
(321, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '500000', '640000', '640000', '640000', '0', 'QTY', NULL, NULL),
(322, 'LTIK260TB', 'Laser Kertas TIK 260 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6400', '6200', '6200', '0', 'QTY KHUSUS', NULL, NULL),
(323, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '565000', '705000', '705000', '705000', '0', 'QTY', NULL, NULL),
(324, 'LTIK310', 'Laser Kertas TIK 310 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6000', '5800', '5800', '0', 'QTY KHUSUS', NULL, NULL),
(325, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '630000', '770000', '770000', '770000', '0', 'QTY', NULL, NULL),
(326, 'LTIK310', 'Laser Kertas TIK 310 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '5800', '5600', '5600', '0', 'QTY KHUSUS', NULL, NULL),
(327, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '680000', '820000', '820000', '820000', '0', 'QTY', NULL, NULL),
(328, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '760000', '900000', '900000', '900000', '0', 'QTY', NULL, NULL),
(329, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '830000', '970000', '970000', '970000', '0', 'QTY', NULL, NULL),
(330, 'LTIK310', 'Laser Kertas TIK 310 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '5600', '5400', '5400', '0', 'QTY KHUSUS', NULL, NULL),
(331, 'TTSJB35T', 'Tas Tali Sistem Jahit Blacu Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '18564', '18465', '18465', '0', 'QTY KHUSUS', NULL, NULL),
(332, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '880000', '1020000', '1020000', '1020000', '0', 'QTY', NULL, NULL),
(333, 'LTIK310TB', 'Laser Kertas TIK 310 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7800', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(334, 'TTSJB25O', 'Tas Tali Sistem Jahit Blacu Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '18600', '18400', '18400', '0', 'QTY KHUSUS', NULL, NULL),
(335, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '950000', '1090000', '1090000', '1090000', '0', 'QTY', NULL, NULL),
(336, 'TTSJB25O', 'Tas Tali Sistem Jahit Blacu Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '16176', '16077', '16077', '0', 'QTY KHUSUS', NULL, NULL),
(337, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '370000', '510000', '510000', '510000', '0', 'QTY', NULL, NULL),
(338, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '450000', '590000', '590000', '590000', '0', 'QTY', NULL, NULL),
(339, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '500000', '640000', '640000', '640000', '0', 'QTY', NULL, NULL),
(340, 'TTSJB25T', 'Tas Tali Sistem Jahit Blacu Uk. 20 x 10 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '21000', '20800', '20800', '0', 'QTY KHUSUS', NULL, NULL),
(341, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '565000', '705000', '705000', '705000', '0', 'QTY', NULL, NULL),
(342, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '630000', '770000', '770000', '770000', '0', 'QTY', NULL, NULL),
(343, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '680000', '820000', '820000', '820000', '0', 'QTY', NULL, NULL),
(344, 'TTSJB25T', 'Tas Tali Sistem Jahit Blacu Uk. 20 x 10 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '17364', '17265', '17265', '0', 'QTY KHUSUS', NULL, NULL),
(345, 'TTSJAD45O', 'Tas Tali Sistem Jahit American Drill Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '28800', '28600', '28600', '0', 'QTY KHUSUS', NULL, NULL),
(346, 'TTSJAD45O', 'Tas Tali Sistem Jahit American Drill Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '26376', '26277', '26277', '0', 'QTY KHUSUS', NULL, NULL),
(347, 'TTSJAD45T', 'Tas Tali Sistem Jahit American Drill Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '31200', '31000', '31000', '0', 'QTY KHUSUS', NULL, NULL),
(348, 'TTSJAD45T', 'Tas Tali Sistem Jahit American Drill Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '27564', '27465', '27465', '0', 'QTY KHUSUS', NULL, NULL),
(349, 'TTSJAD40O', 'Tas Tali Sistem Jahit American Drill Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '26400', '26200', '26200', '0', 'QTY KHUSUS', NULL, NULL),
(350, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '760000', '900000', '900000', '900000', '0', 'QTY', NULL, NULL),
(351, 'TTSJAD40O', 'Tas Tali Sistem Jahit American Drill Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '23976', '23877', '23877', '0', 'QTY KHUSUS', NULL, NULL),
(352, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '830000', '970000', '970000', '970000', '0', 'QTY', NULL, NULL),
(353, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '930000', '1070000', '1070000', '1070000', '0', 'QTY', NULL, NULL),
(354, 'TTSJAD40T', 'Tas Tali Sistem Jahit American Drill Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '28800', '28600', '28600', '0', 'QTY KHUSUS', NULL, NULL),
(355, 'LTIK310TB', 'Laser Kertas TIK 310 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '7600', '7400', '7400', '0', 'QTY KHUSUS', NULL, NULL),
(356, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1000000', '1140000', '1140000', '1140000', '0', 'QTY', NULL, NULL),
(357, 'TTSJAD40T', 'Tas Tali Sistem Jahit American Drill Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '25164', '25065', '25065', '0', 'QTY KHUSUS', NULL, NULL),
(358, 'LTIK310TB', 'Laser Kertas TIK 310 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '7400', '7200', '7200', '0', 'QTY KHUSUS', NULL, NULL),
(359, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '400000', '540000', '540000', '540000', '0', 'QTY', NULL, NULL),
(360, 'TTSJAD35O', 'Tas Tali Sistem Jahit American Drill Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '24000', '23800', '23800', '0', 'QTY KHUSUS', NULL, NULL),
(361, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '500000', '640000', '640000', '640000', '0', 'QTY', NULL, NULL),
(362, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '560000', '700000', '700000', '700000', '0', 'QTY', NULL, NULL),
(363, 'TTSJAD35O', 'Tas Tali Sistem Jahit American Drill Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '21576', '21477', '21477', '0', 'QTY KHUSUS', NULL, NULL),
(364, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '640000', '780000', '780000', '780000', '0', 'QTY', NULL, NULL),
(365, 'LHVS80', 'Laser Kertas HVS 80 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '5000', '4700', '4700', '0', 'QTY KHUSUS', NULL, NULL),
(366, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '720000', '860000', '860000', '860000', '0', 'QTY', NULL, NULL),
(367, 'LHVS80', 'Laser Kertas HVS 80 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4800', '4400', '4400', '0', 'QTY KHUSUS', NULL, NULL),
(368, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '780000', '920000', '920000', '920000', '0', 'QTY', NULL, NULL),
(369, 'TTSJAD35T', 'Tas Tali Sistem Jahit American Drill Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '26400', '26200', '26200', '0', 'QTY KHUSUS', NULL, NULL),
(370, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '880000', '1020000', '1020000', '1020000', '0', 'QTY', NULL, NULL),
(371, 'TTSJAD35T', 'Tas Tali Sistem Jahit American Drill Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '22764', '22665', '22665', '0', 'QTY KHUSUS', NULL, NULL),
(372, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '930000', '1070000', '1070000', '1070000', '0', 'QTY', NULL, NULL),
(373, 'TTSJAD25O', 'Tas Tali Sistem Jahit American Drill Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '22200', '22000', '22000', '0', 'QTY KHUSUS', NULL, NULL),
(374, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '980000', '1120000', '1120000', '1120000', '0', 'QTY', NULL, NULL),
(375, 'LHVS80', 'Laser Kertas HVS 80 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '4600', '4200', '4200', '0', 'QTY KHUSUS', NULL, NULL),
(376, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1050000', '1190000', '1190000', '1190000', '0', 'QTY', NULL, NULL),
(377, 'LHVS80TB', 'Laser Kertas HVS 80 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6800', '6500', '6500', '0', 'QTY KHUSUS', NULL, NULL),
(378, 'TTSJAD25O', 'Tas Tali Sistem Jahit American Drill Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '19776', '19677', '19677', '0', 'QTY KHUSUS', NULL, NULL),
(379, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '400000', '540000', '540000', '540000', '0', 'QTY', NULL, NULL),
(380, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '500000', '640000', '640000', '640000', '0', 'QTY', NULL, NULL),
(381, 'LHVS80TB', 'Laser Kertas HVS 80 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6600', '6200', '6200', '0', 'QTY KHUSUS', NULL, NULL),
(382, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '560000', '700000', '700000', '700000', '0', 'QTY', NULL, NULL),
(383, 'TTSJAD25T', 'Tas Tali Sistem Jahit American Drill Uk. 20 x 10 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '24600', '24400', '24400', '0', 'QTY KHUSUS', NULL, NULL),
(384, 'LHVS80TB', 'Laser Kertas HVS 80 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6400', '6000', '6000', '0', 'QTY KHUSUS', NULL, NULL),
(385, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '640000', '780000', '780000', '780000', '0', 'QTY', NULL, NULL),
(386, 'TTSJAD25T', 'Tas Tali Sistem Jahit American Drill Uk. 20 x 10 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '20964', '20865', '20865', '0', 'QTY KHUSUS', NULL, NULL),
(387, 'LHVS100', 'Laser Kertas HVS 100 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '5000', '4700', '4700', '0', 'QTY KHUSUS', NULL, NULL),
(388, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '720000', '860000', '860000', '860000', '0', 'QTY', NULL, NULL),
(389, 'TTSJC45O', 'Tas Tali Sistem Jahit Canvas Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '58800', '58600', '58600', '0', 'QTY KHUSUS', NULL, NULL),
(390, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '780000', '920000', '920000', '920000', '0', 'QTY', NULL, NULL),
(391, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '880000', '1020000', '1020000', '1020000', '0', 'QTY', NULL, NULL),
(392, 'LHVS100', 'Laser Kertas HVS 100 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4800', '4400', '4400', '0', 'QTY KHUSUS', NULL, NULL),
(393, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '930000', '1070000', '1070000', '1070000', '0', 'QTY', NULL, NULL),
(394, 'TTSJC45O', 'Tas Tali Sistem Jahit Canvas Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '56376', '56277', '56277', '0', 'QTY KHUSUS', NULL, NULL),
(395, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '1030000', '1170000', '1170000', '1170000', '0', 'QTY', NULL, NULL),
(396, 'BKS1500A5EX', 'Brosur Konstruk 150gsm A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1100000', '1240000', '1240000', '1240000', '0', 'QTY', NULL, NULL),
(397, 'LHVS100', 'Laser Kertas HVS 100 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '4600', '4200', '4200', '0', 'QTY KHUSUS', NULL, NULL),
(398, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(399, 'TTSJC45T', 'Tas Tali Sistem Jahit Canvas Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '61200', '61000', '61000', '0', 'QTY KHUSUS', NULL, NULL),
(400, 'LHVS100TB', 'Laser Kertas HVS 100 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6800', '6500', '6500', '0', 'QTY KHUSUS', NULL, NULL),
(401, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(402, 'TTSJC45T', 'Tas Tali Sistem Jahit Canvas Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '57564', '57465', '57465', '0', 'QTY KHUSUS', NULL, NULL),
(403, 'LHVS100TB', 'Laser Kertas HVS 100 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6600', '6200', '6200', '0', 'QTY KHUSUS', NULL, NULL),
(404, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(405, 'TTSJC40O', 'Tas Tali Sistem Jahit Canvas Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '50400', '50200', '50200', '0', 'QTY KHUSUS', NULL, NULL),
(406, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '190000', '270000', '270000', '270000', '0', 'QTY', NULL, NULL),
(407, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '240000', '320000', '320000', '320000', '0', 'QTY', NULL, NULL),
(408, 'LHVS100TB', 'Laser Kertas HVS 100 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6400', '6000', '6000', '0', 'QTY KHUSUS', NULL, NULL),
(409, 'TTSJC40O', 'Tas Tali Sistem Jahit Canvas Uk. 30 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '47976', '47877', '47877', '0', 'QTY KHUSUS', NULL, NULL),
(410, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '285000', '365000', '365000', '365000', '0', 'QTY', NULL, NULL),
(411, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '335000', '415000', '415000', '415000', '0', 'QTY', NULL, NULL),
(412, 'LIVO', 'Laser Kertas Ivory 270 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6000', '5800', '5800', '0', 'QTY KHUSUS', NULL, NULL),
(413, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '380000', '460000', '460000', '460000', '0', 'QTY', NULL, NULL),
(414, 'TTSJC40T', 'Tas Tali Sistem Jahit Canvas Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '52800', '52600', '52600', '0', 'QTY KHUSUS', NULL, NULL),
(415, 'LIVO', 'Laser Kertas Ivory 270 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '5800', '5600', '5600', '0', 'QTY KHUSUS', NULL, NULL),
(416, 'TTSJC40T', 'Tas Tali Sistem Jahit Canvas Uk. 30 x 10 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '49164', '49065', '49065', '0', 'QTY KHUSUS', NULL, NULL),
(417, 'TTSJC35O', 'Tas Tali Sistem Jahit Canvas Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '40800', '40600', '40600', '0', 'QTY KHUSUS', NULL, NULL),
(418, 'TTSJC35O', 'Tas Tali Sistem Jahit Canvas Uk. 25 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '38376', '38277', '38277', '0', 'QTY KHUSUS', NULL, NULL),
(419, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '430000', '510000', '510000', '510000', '0', 'QTY', NULL, NULL),
(420, 'LMGA5EX', 'Laminating Kilat A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '475000', '555000', '555000', '555000', '0', 'QTY', NULL, NULL),
(421, 'TTSJC35T', 'Tas Tali Sistem Jahit Canvas Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '43200', '43000', '43000', '0', 'QTY KHUSUS', NULL, NULL),
(422, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(423, 'TTSJC35T', 'Tas Tali Sistem Jahit Canvas Uk. 25 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '39564', '39465', '39465', '0', 'QTY KHUSUS', NULL, NULL),
(424, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(425, 'TTSJC25O', 'Tas Tali Sistem Jahit Canvas Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '34800', '34600', '34600', '0', 'QTY KHUSUS', NULL, NULL),
(426, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(427, 'TTSJC25O', 'Tas Tali Sistem Jahit Canvas Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '32376', '32277', '32277', '0', 'QTY KHUSUS', NULL, NULL),
(428, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1850000', '2000000', '2000000', '2000000', '0', 'QTY', NULL, NULL),
(429, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '190000', '270000', '270000', '270000', '0', 'QTY', NULL, NULL),
(430, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '500000', '640000', '640000', '640000', '0', 'QTY', NULL, NULL),
(431, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '240000', '320000', '320000', '320000', '0', 'QTY', NULL, NULL),
(432, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '650000', '790000', '790000', '790000', '0', 'QTY', NULL, NULL),
(433, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '285000', '365000', '365000', '365000', '0', 'QTY', NULL, NULL),
(434, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '800000', '940000', '940000', '940000', '0', 'QTY', NULL, NULL),
(435, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '950000', '1090000', '1090000', '1090000', '0', 'QTY', NULL, NULL),
(436, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '335000', '415000', '415000', '415000', '0', 'QTY', NULL, NULL),
(437, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '1100000', '1240000', '1240000', '1240000', '0', 'QTY', NULL, NULL),
(438, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '380000', '460000', '460000', '460000', '0', 'QTY', NULL, NULL),
(439, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '1250000', '1400000', '1400000', '1400000', '0', 'QTY', NULL, NULL),
(440, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '1400000', '1550000', '1550000', '1550000', '0', 'QTY', NULL, NULL),
(441, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '430000', '510000', '510000', '510000', '0', 'QTY', NULL, NULL),
(442, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '1500000', '1650000', '1650000', '1650000', '0', 'QTY', NULL, NULL),
(443, 'LMGA5EX', 'Laminating Kilat A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '475000', '555000', '555000', '555000', '0', 'QTY', NULL, NULL),
(444, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '1650000', '1800000', '1800000', '1800000', '0', 'QTY', NULL, NULL),
(445, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1800000', '1950000', '1950000', '1950000', '0', 'QTY', NULL, NULL),
(446, 'LMDA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '200000', '280000', '280000', '280000', '0', 'QTY', NULL, NULL),
(447, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '500000', '640000', '640000', '640000', '0', 'QTY', NULL, NULL),
(448, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '200000', '280000', '280000', '280000', '0', 'QTY', NULL, NULL),
(449, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '650000', '790000', '790000', '790000', '0', 'QTY', NULL, NULL),
(450, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '800000', '940000', '940000', '940000', '0', 'QTY', NULL, NULL),
(451, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '200000', '280000', '280000', '280000', '0', 'QTY', NULL, NULL),
(452, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '950000', '1090000', '1090000', '1090000', '0', 'QTY', NULL, NULL),
(453, 'TTSJC25T', 'Tas Tali Sistem Jahit Canvas Uk. 20 x 10 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '37200', '37000', '37000', '0', 'QTY KHUSUS', NULL, NULL),
(454, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '230000', '310000', '310000', '310000', '0', 'QTY', NULL, NULL),
(455, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '1150000', '1290000', '1290000', '1290000', '0', 'QTY', NULL, NULL),
(456, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '1350000', '1500000', '1500000', '1500000', '0', 'QTY', NULL, NULL),
(457, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '290000', '370000', '370000', '370000', '0', 'QTY', NULL, NULL),
(458, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '1550000', '1700000', '1700000', '1700000', '0', 'QTY', NULL, NULL),
(459, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '350000', '430000', '430000', '430000', '0', 'QTY', NULL, NULL),
(460, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '400000', '480000', '480000', '480000', '0', 'QTY', NULL, NULL),
(461, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '1680000', '1830000', '1830000', '1830000', '0', 'QTY', NULL, NULL),
(462, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '1870000', '2020000', '2020000', '2020000', '0', 'QTY', NULL, NULL),
(463, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '465000', '545000', '545000', '545000', '0', 'QTY', NULL, NULL),
(464, 'BKS150A4EX', 'Brosur Konstruk 150gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '2070000', '2220000', '2220000', '2220000', '0', 'QTY', NULL, NULL),
(465, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '520000', '600000', '600000', '600000', '0', 'QTY', NULL, NULL),
(466, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(467, 'NCR15', 'Bon uk. 11 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '450000', '585000', '', '565000', '0', 'QTY', NULL, NULL),
(468, 'LMGA5EX', 'Laminating Dove A5 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '580000', '660000', '660000', '660000', '0', 'QTY', NULL, NULL),
(469, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(470, 'LMDA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '200000', '280000', '280000', '280000', '0', 'QTY', NULL, NULL),
(471, 'NCR15', 'Bon uk. 11 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '900000', '1050000', '', '1030000', '0', 'QTY', NULL, NULL),
(472, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '260000', '340000', '340000', '340000', '0', 'QTY', NULL, NULL),
(473, 'NCR15', 'Bon uk. 11 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '1350000', '1525000', '', '1515000', '0', 'QTY', NULL, NULL),
(474, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '350000', '430000', '430000', '430000', '0', 'QTY', NULL, NULL),
(475, 'NCR15', 'Bon uk. 11 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1800000', '2000000', '', '1990000', '0', 'QTY', NULL, NULL),
(476, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '435000', '515000', '515000', '515000', '0', 'QTY', NULL, NULL),
(477, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '230000', '310000', '310000', '310000', '0', 'QTY', NULL, NULL),
(478, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '525000', '605000', '605000', '605000', '0', 'QTY', NULL, NULL),
(479, 'NCR16', 'Bon uk. 11 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '249000', '399000', '', '379000', '0', 'QTY', NULL, NULL),
(480, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '610000', '690000', '690000', '690000', '0', 'QTY', NULL, NULL),
(481, 'NCR16', 'Bon uk. 11 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '498000', '678000', '', '658000', '0', 'QTY', NULL, NULL),
(482, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '350000', '430000', '430000', '430000', '0', 'QTY', NULL, NULL),
(483, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '700000', '780000', '780000', '780000', '0', 'QTY', NULL, NULL),
(484, 'NCR16', 'Bon uk. 11 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '747000', '967000', '', '957000', '0', 'QTY', NULL, NULL),
(485, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '460000', '540000', '540000', '540000', '0', 'QTY', NULL, NULL),
(486, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '785000', '865000', '865000', '865000', '0', 'QTY', NULL, NULL),
(487, 'NCR16', 'Bon uk. 11 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '996000', '1256000', '', '1246000', '0', 'QTY', NULL, NULL),
(488, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '580000', '660000', '660000', '660000', '0', 'QTY', NULL, NULL),
(489, 'LMGA4EX', 'Laminating Kilat A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '875000', '955000', '955000', '955000', '0', 'QTY', NULL, NULL),
(490, 'NCR17', 'Bon uk. 11 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '360000', '510000', '', '490000', '0', 'QTY', NULL, NULL),
(491, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '700000', '780000', '780000', '780000', '0', 'QTY', NULL, NULL),
(492, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '180000', '260000', '260000', '260000', '0', 'QTY', NULL, NULL),
(493, 'NCR17', 'Bon uk. 11 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '720000', '900000', '', '880000', '0', 'QTY', NULL, NULL),
(494, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '350000', '430000', '430000', '430000', '0', 'QTY', NULL, NULL),
(495, 'NCR17', 'Bon uk. 11 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '1080000', '1300000', '', '1290000', '0', 'QTY', NULL, NULL),
(496, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '520000', '600000', '600000', '600000', '0', 'QTY', NULL, NULL),
(497, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '800000', '880000', '880000', '880000', '0', 'QTY', NULL, NULL),
(498, 'NCR17', 'Bon uk. 11 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1440000', '1700000', '', '1690000', '0', 'QTY', NULL, NULL),
(499, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '700000', '780000', '780000', '780000', '0', 'QTY', NULL, NULL),
(500, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '930000', '1010000', '1010000', '1010000', '0', 'QTY', NULL, NULL),
(501, 'NCR18', 'Bon uk. 11 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '465000', '615000', '', '595000', '0', 'QTY', NULL, NULL),
(502, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '870000', '950000', '950000', '950000', '0', 'QTY', NULL, NULL),
(503, 'NCR18', 'Bon uk. 11 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '930000', '1110000', '', '1090000', '0', 'QTY', NULL, NULL),
(504, 'NCR18', 'Bon uk. 11 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '1395000', '1615000', '', '1605000', '0', 'QTY', NULL, NULL),
(505, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '1050000', '1130000', '1130000', '1130000', '0', 'QTY', NULL, NULL),
(506, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '1050000', '1130000', '1130000', '1130000', '0', 'QTY', NULL, NULL),
(507, 'NCR18', 'Bon uk. 11 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1860000', '2120000', '', '2110000', '0', 'QTY', NULL, NULL),
(508, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '1220000', '1300000', '1300000', '1300000', '0', 'QTY', NULL, NULL),
(509, 'LMGA5EX', 'Laminating Dove A5 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1160000', '1240000', '1240000', '1240000', '0', 'QTY', NULL, NULL),
(510, 'NCR19', 'Bon uk. 16.5 x21.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '220000', '340000', '', '320000', '0', 'QTY', NULL, NULL),
(511, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '1400000', '1480000', '1480000', '1480000', '0', 'QTY', NULL, NULL),
(512, 'NCR19', 'Bon uk. 16.5 x21.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '440000', '560000', '', '540000', '0', 'QTY', NULL, NULL),
(513, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '1570000', '1650000', '1650000', '1650000', '0', 'QTY', NULL, NULL),
(514, 'NCR19', 'Bon uk. 16.5 x21.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '660000', '780000', '', '760000', '0', 'QTY', NULL, NULL),
(515, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '450000', '590000', '590000', '590000', '0', 'QTY', NULL, NULL),
(516, 'NCR19', 'Bon uk. 16.5 x21.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '880000', '1010000', '', '1000000', '0', 'QTY', NULL, NULL),
(517, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '575000', '715000', '715000', '715000', '0', 'QTY', NULL, NULL),
(518, 'LMGA4EX', 'Laminating Kilat A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1750000', '1830000', '1830000', '1830000', '0', 'QTY', NULL, NULL),
(519, 'NCR19', 'Bon uk. 16.5 x21.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '1100000', '1240000', '', '1230000', '0', 'QTY', NULL, NULL),
(520, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '700000', '840000', '840000', '840000', '0', 'QTY', NULL, NULL),
(521, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '200000', '280000', '280000', '280000', '0', 'QTY', NULL, NULL),
(522, 'NCR19', 'Bon uk. 16.5 x21.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1320000', '1460000', '', '1450000', '0', 'QTY', NULL, NULL),
(523, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '800000', '940000', '940000', '940000', '0', 'QTY', NULL, NULL),
(524, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '215000', '295000', '295000', '295000', '0', 'QTY', NULL, NULL),
(525, 'NCR19', 'Bon uk. 16.5 x21.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '2200000', '2340000', '', '2330000', '0', 'QTY', NULL, NULL),
(526, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '950000', '1090000', '1090000', '1090000', '0', 'QTY', NULL, NULL),
(527, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '330000', '450000', '', '430000', '0', 'QTY', NULL, NULL),
(528, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '320000', '400000', '400000', '400000', '0', 'QTY', NULL, NULL),
(529, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '660000', '780000', '', '760000', '0', 'QTY', NULL, NULL),
(530, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '425000', '505000', '505000', '505000', '0', 'QTY', NULL, NULL),
(531, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '1100000', '1250000', '1250000', '1250000', '0', 'QTY', NULL, NULL),
(532, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '990000', '1110000', '', '1090000', '0', 'QTY', NULL, NULL),
(533, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '530000', '610000', '610000', '610000', '0', 'QTY', NULL, NULL),
(534, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '1250000', '1400000', '1400000', '1400000', '0', 'QTY', NULL, NULL),
(535, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1320000', '1450000', '', '1440000', '0', 'QTY', NULL, NULL),
(536, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '640000', '720000', '720000', '720000', '0', 'QTY', NULL, NULL),
(537, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '1400000', '1550000', '1550000', '1550000', '0', 'QTY', NULL, NULL),
(538, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '1650000', '1790000', '', '1780000', '0', 'QTY', NULL, NULL),
(539, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '745000', '825000', '825000', '825000', '0', 'QTY', NULL, NULL),
(540, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1980000', '2120000', '', '2110000', '0', 'QTY', NULL, NULL),
(541, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '3300000', '3440000', '', '3430000', '0', 'QTY', NULL, NULL),
(542, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '850000', '930000', '930000', '930000', '0', 'QTY', NULL, NULL),
(543, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '440000', '560000', '', '540000', '0', 'QTY', NULL, NULL),
(544, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '955000', '1035000', '1035000', '1035000', '0', 'QTY', NULL, NULL),
(545, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '880000', '1000000', '', '980000', '0', 'QTY', NULL, NULL),
(546, 'LMDA4EX', 'Laminating Dove A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1065000', '1145000', '1145000', '1145000', '0', 'QTY', NULL, NULL),
(547, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '215000', '295000', '295000', '295000', '0', 'QTY', NULL, NULL),
(548, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '1320000', '1440000', '', '1420000', '0', 'QTY', NULL, NULL);
INSERT INTO `bahans` (`id`, `kode`, `bahan`, `kategori`, `satuan`, `jenis`, `kategori_cetak`, `jenis_bahan`, `klik`, `qty`, `harga`, `harga_po`, `harga_umum`, `harga_khusus`, `harga_member`, `harga_custom`, `cara_perhitungan`, `created_at`, `updated_at`) VALUES
(549, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '430000', '510000', '510000', '510000', '0', 'QTY', NULL, NULL),
(550, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1760000', '1890000', '', '1880000', '0', 'QTY', NULL, NULL),
(551, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '640000', '720000', '720000', '720000', '0', 'QTY', NULL, NULL),
(552, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '2200000', '2340000', '', '2330000', '0', 'QTY', NULL, NULL),
(553, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '850000', '930000', '930000', '930000', '0', 'QTY', NULL, NULL),
(554, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '2640000', '2780000', '', '2770000', '0', 'QTY', NULL, NULL),
(555, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '1060000', '1140000', '1140000', '1140000', '0', 'QTY', NULL, NULL),
(556, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '4400000', '4540000', '', '4530000', '0', 'QTY', NULL, NULL),
(557, 'NC22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '230000', '360000', '', '340000', '0', 'QTY', NULL, NULL),
(558, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '1280000', '1360000', '1360000', '1360000', '0', 'QTY', NULL, NULL),
(559, 'NC22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '460000', '600000', '', '580000', '0', 'QTY', NULL, NULL),
(560, 'NC22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '690000', '840000', '', '820000', '0', 'QTY', NULL, NULL),
(561, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '1490000', '1570000', '1570000', '1570000', '0', 'QTY', NULL, NULL),
(562, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '1700000', '1780000', '1780000', '1780000', '0', 'QTY', NULL, NULL),
(563, 'NC22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '920000', '1090000', '', '1080000', '0', 'QTY', NULL, NULL),
(564, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '1900000', '1980000', '1980000', '1980000', '0', 'QTY', NULL, NULL),
(565, 'NC22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '1150000', '1340000', '', '1330000', '0', 'QTY', NULL, NULL),
(566, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '1550000', '1700000', '1700000', '1700000', '0', 'QTY', NULL, NULL),
(567, 'NC22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1380000', '1580000', '', '1570000', '0', 'QTY', NULL, NULL),
(568, 'NC22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '2300000', '2540000', '', '2530000', '0', 'QTY', NULL, NULL),
(569, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '1650000', '1800000', '1800000', '1800000', '0', 'QTY', NULL, NULL),
(570, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '340000', '470000', '', '450000', '0', 'QTY', NULL, NULL),
(571, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '450000', '590000', '590000', '590000', '0', 'QTY', NULL, NULL),
(572, 'LMDA4EX', 'Laminating Dove A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '2130000', '2210000', '2210000', '2210000', '0', 'QTY', NULL, NULL),
(573, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '680000', '820000', '', '800000', '0', 'QTY', NULL, NULL),
(574, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '575000', '715000', '715000', '715000', '0', 'QTY', NULL, NULL),
(575, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '1020000', '1170000', '', '1150000', '0', 'QTY', NULL, NULL),
(576, 'NCR1', 'Bon uk. 16.5 x 10.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '220000', '340000', '', '320000', '0', 'QTY', NULL, NULL),
(577, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1360000', '1530000', '', '1520000', '0', 'QTY', NULL, NULL),
(578, 'NCR1', 'Bon uk. 16.5 x 10.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '440000', '570000', '', '560000', '0', 'QTY', NULL, NULL),
(579, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '3', '0', '700000', '840000', '840000', '840000', '0', 'QTY', NULL, NULL),
(580, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '1700000', '1890000', '', '1880000', '0', 'QTY', NULL, NULL),
(581, 'NCR1', 'Bon uk. 16.5 x 10.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '660000', '800000', '', '790000', '0', 'QTY', NULL, NULL),
(582, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '800000', '940000', '940000', '940000', '0', 'QTY', NULL, NULL),
(583, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '2040000', '2240000', '', '2230000', '0', 'QTY', NULL, NULL),
(584, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '3400000', '3640000', '', '3630000', '0', 'QTY', NULL, NULL),
(585, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '450000', '580000', '', '560000', '0', 'QTY', NULL, NULL),
(586, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '1000000', '1140000', '1140000', '1140000', '0', 'QTY', NULL, NULL),
(587, 'NCR2', 'Bon uk. 16.5 x 10.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '330000', '450000', '', '430000', '0', 'QTY', NULL, NULL),
(588, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '6', '0', '1200000', '1350000', '1350000', '1350000', '0', 'QTY', NULL, NULL),
(589, 'NCR2', 'Bon uk. 16.5 x 10.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '660000', '790000', '', '780000', '0', 'QTY', NULL, NULL),
(590, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '900000', '1040000', '', '1020000', '0', 'QTY', NULL, NULL),
(591, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '7', '0', '1380000', '1530000', '1530000', '1530000', '0', 'QTY', NULL, NULL),
(592, 'NCR2', 'Bon uk. 16.5 x 10.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '990000', '1130000', '', '1120000', '0', 'QTY', NULL, NULL),
(593, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '1350000', '1500000', '', '1480000', '0', 'QTY', NULL, NULL),
(594, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '1550000', '1700000', '1700000', '1700000', '0', 'QTY', NULL, NULL),
(595, 'NCR3', 'Bon uk.  10.5x16.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '440000', '560000', '', '540000', '0', 'QTY', NULL, NULL),
(596, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1800000', '1970000', '', '1960000', '0', 'QTY', NULL, NULL),
(597, 'BKS120A4EX', 'Brosur Konstruk 120gsm A4 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '9', '0', '1700000', '1850000', '1850000', '1850000', '0', 'QTY', NULL, NULL),
(598, 'NCR3', 'Bon uk.  10.5x16.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '880000', '1010000', '', '1000000', '0', 'QTY', NULL, NULL),
(599, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '2250000', '2440000', '', '2430000', '0', 'QTY', NULL, NULL),
(600, 'NCR3', 'Bon uk.  10.5x16.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1320000', '1460000', '', '1450000', '0', 'QTY', NULL, NULL),
(601, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '2700000', '2900000', '', '2890000', '0', 'QTY', NULL, NULL),
(602, 'NCR4', 'Bon uk. 10.5x16.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '240000', '380000', '', '360000', '0', 'QTY', NULL, NULL),
(603, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '4500000', '4740000', '', '4730000', '0', 'QTY', NULL, NULL),
(604, 'NCR4', 'Bon uk. 10.5x16.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '480000', '650000', '', '640000', '0', 'QTY', NULL, NULL),
(605, 'NCR22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '240000', '380000', '', '360000', '0', 'QTY', NULL, NULL),
(606, 'NCR4', 'Bon uk. 10.5x16.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '720000', '920000', '', '910000', '0', 'QTY', NULL, NULL),
(607, 'NCR22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '480000', '640000', '', '620000', '0', 'QTY', NULL, NULL),
(608, 'NCR5', 'Bon uk. 10.5x16.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '350000', '490000', '', '470000', '0', 'QTY', NULL, NULL),
(609, 'NCR22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '720000', '900000', '', '880000', '0', 'QTY', NULL, NULL),
(610, 'NCR22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '960000', '1170000', '', '1160000', '0', 'QTY', NULL, NULL),
(611, 'NCR5', 'Bon uk. 10.5x16.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '700000', '870000', '', '860000', '0', 'QTY', NULL, NULL),
(612, 'NCR22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '1200000', '1440000', '', '1430000', '0', 'QTY', NULL, NULL),
(613, 'NCR5', 'Bon uk. 10.5x16.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1050000', '1250000', '', '1240000', '0', 'QTY', NULL, NULL),
(614, 'NCR6', 'Bon uk. 10.5x16.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '460000', '600000', '', '580000', '0', 'QTY', NULL, NULL),
(615, 'NCR22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1440000', '1700000', '', '1690000', '0', 'QTY', NULL, NULL),
(616, 'NCR29', 'Bon uk. 33 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '335000', '460000', '', '440000', '0', 'QTY', NULL, NULL),
(617, 'NCR6', 'Bon uk. 10.5x16.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '920000', '1090000', '', '1080000', '0', 'QTY', NULL, NULL),
(618, 'NCR29', 'Bon uk. 33 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '670000', '800000', '', '780000', '0', 'QTY', NULL, NULL),
(619, 'NCR22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '2400000', '2740000', '', '2730000', '0', 'QTY', NULL, NULL),
(620, 'NCR29', 'Bon uk. 33 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '1005000', '1140000', '', '1120000', '0', 'QTY', NULL, NULL),
(621, 'NCR23', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '350000', '490000', '', '470000', '0', 'QTY', NULL, NULL),
(622, 'NCR6', 'Bon uk. 10.5x16.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1380000', '1580000', '', '1570000', '0', 'QTY', NULL, NULL),
(623, 'NCR29', 'Bon uk. 33 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '1340000', '1480000', '', '1460000', '0', 'QTY', NULL, NULL),
(624, 'NCR23', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '700000', '860000', '', '840000', '0', 'QTY', NULL, NULL),
(625, 'NCR7', 'Bon uk. 10.5x16.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '260000', '420000', '', '400000', '0', 'QTY', NULL, NULL),
(626, 'NCR29', 'Bon uk. 33 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '2680000', '2850000', '', '2840000', '0', 'QTY', NULL, NULL),
(627, 'NCR23', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '1050000', '1230000', '', '1210000', '0', 'QTY', NULL, NULL),
(628, 'NCR29', 'Bon uk. 33 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '3350000', '3540000', '', '3530000', '0', 'QTY', NULL, NULL),
(629, 'NCR7', 'Bon uk. 10.5x16.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '520000', '730000', '', '720000', '0', 'QTY', NULL, NULL),
(630, 'NCR29', 'Bon uk. 33 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '6700000', '6940000', '', '6930000', '0', 'QTY', NULL, NULL),
(631, 'NCR23', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1400000', '1610000', '', '1600000', '0', 'QTY', NULL, NULL),
(632, 'NCR30', 'Bon uk. 33 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '445000', '570000', '', '550000', '0', 'QTY', NULL, NULL),
(633, 'NCR7', 'Bon uk. 10.5x16.5cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '780000', '1040000', '', '1030000', '0', 'QTY', NULL, NULL),
(634, 'NCR23', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '1750000', '1990000', '', '1980000', '0', 'QTY', NULL, NULL),
(635, 'NCR30', 'Bon uk. 33 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '890000', '1020000', '', '1000000', '0', 'QTY', NULL, NULL),
(636, 'NCR8', 'Bon uk. 10.5x16.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '370000', '530000', '', '510000', '0', 'QTY', NULL, NULL),
(637, 'NCR23', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '2100000', '2360000', '', '2350000', '0', 'QTY', NULL, NULL),
(638, 'NCR30', 'Bon uk. 33 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '1335000', '1470000', '', '1450000', '0', 'QTY', NULL, NULL),
(639, 'NCR23', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '3500000', '3840000', '', '3830000', '0', 'QTY', NULL, NULL),
(640, 'NCR30', 'Bon uk. 33 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '1780000', '1920000', '', '1900000', '0', 'QTY', NULL, NULL),
(641, 'NCR30', 'Bon uk. 33 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '3560000', '3730000', '', '3720000', '0', 'QTY', NULL, NULL),
(642, 'NCR30', 'Bon uk. 33 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '4450000', '4640000', '', '4630000', '0', 'QTY', NULL, NULL),
(643, 'NCR30', 'Bon uk. 33 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '8900000', '9140000', '', '9130000', '0', 'QTY', NULL, NULL),
(644, 'NCR24', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '460000', '600000', '', '580000', '0', 'QTY', NULL, NULL),
(645, 'NCR31', 'Bon uk. 33 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '230000', '360000', '', '340000', '0', 'QTY', NULL, NULL),
(646, 'NCR24', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '920000', '1080000', '', '1060000', '0', 'QTY', NULL, NULL),
(647, 'NCR31', 'Bon uk. 33 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '460000', '600000', '', '580000', '0', 'QTY', NULL, NULL),
(648, 'NCR24', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '1380000', '1560000', '', '1540000', '0', 'QTY', NULL, NULL),
(649, 'NCR31', 'Bon uk. 33 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '690000', '840000', '', '820000', '0', 'QTY', NULL, NULL),
(650, 'NCR24', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1840000', '2050000', '', '2040000', '0', 'QTY', NULL, NULL),
(651, 'NCR31', 'Bon uk. 33 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '920000', '1080000', '', '1060000', '0', 'QTY', NULL, NULL),
(652, 'NCR31', 'Bon uk. 33 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1840000', '2050000', '', '2040000', '0', 'QTY', NULL, NULL),
(653, 'NCR31', 'Bon uk. 33 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '2300000', '2540000', '', '2530000', '0', 'QTY', NULL, NULL),
(654, 'NCR24', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '2300000', '2540000', '', '2530000', '0', 'QTY', NULL, NULL),
(655, 'NCR31', 'Bon uk. 33 x 21cm+Rangkap 2+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '4600000', '4940000', '', '4930000', '0', 'QTY', NULL, NULL),
(656, 'NCR24', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '2760000', '3020000', '', '3010000', '0', 'QTY', NULL, NULL),
(657, 'NCR32', 'Bon uk. 33 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '340000', '470000', '', '450000', '0', 'QTY', NULL, NULL),
(658, 'NCR24', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '4600000', '4940000', '', '4930000', '0', 'QTY', NULL, NULL),
(659, 'NCR32', 'Bon uk. 33 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '680000', '820000', '', '800000', '0', 'QTY', NULL, NULL),
(660, 'NCR25', 'Bon uk. 33 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '220000', '340000', '', '320000', '0', 'QTY', NULL, NULL),
(661, 'NCR32', 'Bon uk. 33 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '1020000', '1170000', '', '1150000', '0', 'QTY', NULL, NULL),
(662, 'NCR32', 'Bon uk. 33 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '1360000', '1520000', '', '1500000', '0', 'QTY', NULL, NULL),
(663, 'NCR25', 'Bon uk. 33 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '440000', '560000', '', '540000', '0', 'QTY', NULL, NULL),
(664, 'NCR32', 'Bon uk. 33 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '2720000', '2930000', '', '2920000', '0', 'QTY', NULL, NULL),
(665, 'NCR8', 'Bon uk. 10.5x16.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '740000', '950000', '', '940000', '0', 'QTY', NULL, NULL),
(666, 'NCR32', 'Bon uk. 33 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '3400000', '3640000', '', '3630000', '0', 'QTY', NULL, NULL),
(667, 'NCR25', 'Bon uk. 33 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '660000', '780000', '', '760000', '0', 'QTY', NULL, NULL),
(668, 'NCR32', 'Bon uk. 33 x 21cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '6800000', '7140000', '', '7130000', '0', 'QTY', NULL, NULL),
(669, 'NCR25', 'Bon uk. 33 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '880000', '1000000', '', '980000', '0', 'QTY', NULL, NULL),
(670, 'NCR8', 'Bon uk. 10.5x16.5cm+Rangkap 3+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1110000', '1370000', '', '1360000', '0', 'QTY', NULL, NULL),
(671, 'NCR33', 'Bon uk. 33 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '450000', '580000', '', '560000', '0', 'QTY', NULL, NULL),
(672, 'NCR25', 'Bon uk. 33 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1760000', '1890000', '', '1880000', '0', 'QTY', NULL, NULL),
(673, 'NCR9', 'Bon uk. 10.5x16.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '480000', '640000', '', '620000', '0', 'QTY', NULL, NULL),
(674, 'NCR33', 'Bon uk. 33 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '900000', '1040000', '', '1020000', '0', 'QTY', NULL, NULL),
(675, 'NCR33', 'Bon uk. 33 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '1350000', '1500000', '', '1480000', '0', 'QTY', NULL, NULL),
(676, 'NCR9', 'Bon uk. 10.5x16.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '960000', '1170000', '', '1160000', '0', 'QTY', NULL, NULL),
(677, 'NCR25', 'Bon uk. 33 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '2200000', '2340000', '', '2330000', '0', 'QTY', NULL, NULL),
(678, 'NCR33', 'Bon uk. 33 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '1800000', '1960000', '', '1940000', '0', 'QTY', NULL, NULL),
(679, 'NCR33', 'Bon uk. 33 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '3600000', '3810000', '', '3800000', '0', 'QTY', NULL, NULL),
(680, 'NCR25', 'Bon uk. 33 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '4400000', '4540000', '', '4530000', '0', 'QTY', NULL, NULL),
(681, 'NCR33', 'Bon uk. 33 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '4500000', '4740000', '', '4730000', '0', 'QTY', NULL, NULL),
(682, 'NCR9', 'Bon uk. 10.5x16.5cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1440000', '1700000', '', '1690000', '0', 'QTY', NULL, NULL),
(683, 'NCR33', 'Bon uk. 33 x 21cm+Rangkap 4+No+Porporasi', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '9000000', '9340000', '', '9330000', '0', 'QTY', NULL, NULL),
(684, 'NCR26', 'Bon uk. 33 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '330000', '450000', '', '430000', '0', 'QTY', NULL, NULL),
(685, 'NCR34', 'Bon uk. 20 x 15cm+Rangkap 1', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '120000', '220000', '', '220000', '0', 'QTY', NULL, NULL),
(686, 'NCR26', 'Bon uk. 33 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '660000', '780000', '', '760000', '0', 'QTY', NULL, NULL),
(687, 'NCR10', 'Bon uk. 11 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '219000', '339000', '', '319000', '0', 'QTY', NULL, NULL),
(688, 'NCR34', 'Bon uk. 20 x 15cm+Rangkap 1', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '200000', '310000', '', '300000', '0', 'QTY', NULL, NULL),
(689, 'NCR34', 'Bon uk. 20 x 15cm+Rangkap 1', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '340000', '450000', '', '440000', '0', 'QTY', NULL, NULL),
(690, 'NCR26', 'Bon uk. 33 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '990000', '1110000', '', '1090000', '0', 'QTY', NULL, NULL),
(691, 'NCR10', 'Bon uk. 11 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '438000', '558000', '', '538000', '0', 'QTY', NULL, NULL),
(692, ' BHVS70A4HP ', ' Brosur HVSA4 70gsm+ 1 warna 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 1 ', '0', '75000', '125000', '125000', '125000', '0', 'QTY', NULL, NULL),
(693, 'NCR26', 'Bon uk. 33 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '1320000', '1440000', '', '1420000', '0', 'QTY', NULL, NULL),
(694, 'NCR10', 'Bon uk. 11 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '657000', '787000', '', '777000', '0', 'QTY', NULL, NULL),
(695, ' BHVS70A4HP ', ' Brosur HVSA4 70gsm+ 1 warna 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 2 ', '0', '140000', '200000', '200000', '200000', '0', 'QTY', NULL, NULL),
(696, 'NCR10', 'Bon uk. 11 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '876000', '1016000', '', '1006000', '0', 'QTY', NULL, NULL),
(697, ' BHVS70A4HP ', ' Brosur HVSA4 70gsm+ 1 warna 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 4 ', '0', '280000', '340000', '340000', '340000', '0', 'QTY', NULL, NULL),
(698, ' BHVS70A3HP ', ' Brosur HVSA4 70gsm+ Full colour 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 1 ', '0', '210000', '290000', '290000', '290000', '0', 'QTY', NULL, NULL),
(699, ' BHVS70A3HP ', ' Brosur HVSA4 70gsm+ Full colour 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 2 ', '0', '350000', '430000', '430000', '430000', '0', 'QTY', NULL, NULL),
(700, ' BHVS70A3HP ', ' Brosur HVSA4 70gsm+ Full colour 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 3 ', '0', '', '', '', '', '0', 'QTY', NULL, NULL),
(701, 'NCR11', 'Bon uk. 11 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '330000', '450000', '', '430000', '0', 'QTY', NULL, NULL),
(702, ' BHVS70A4FC ', ' Brosur HVSA4 70gsm+ Full colour 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 25 ', '0', '2175000', '2425000', '2425000', '2425000', '0', 'QTY', NULL, NULL),
(703, 'NCR11', 'Bon uk. 11 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '660000', '780000', '', '760000', '0', 'QTY', NULL, NULL),
(704, ' BHVS70A4FC ', ' Brosur HVSA4 70gsm+ Full colour 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 40 ', '0', '3480000', '3880000', '3880000', '3880000', '0', 'QTY', NULL, NULL),
(705, 'NCR11', 'Bon uk. 11 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '990000', '1120000', '', '1110000', '0', 'QTY', NULL, NULL),
(706, ' BHVS70A3FC ', ' Brosur HVSA4 70gsm+ Full colour 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 1 ', '0', '600000', '720000', '720000', '720000', '0', 'QTY', NULL, NULL),
(707, 'NCR11', 'Bon uk. 11 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1320000', '1460000', '', '1450000', '0', 'QTY', NULL, NULL),
(708, ' BHVS70A3FC ', ' Brosur HVSA4 70gsm+ Full colour 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 2 ', '0', '700000', '820000', '820000', '820000', '0', 'QTY', NULL, NULL),
(709, ' BHVS70A3FC ', ' Brosur HVSA4 70gsm+ Full colour 1 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 4 ', '0', '900000', '1040000', '1040000', '1040000', '0', 'QTY', NULL, NULL),
(710, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 4 ', '0', '220000', '320000', '320000', '320000', '0', 'QTY', NULL, NULL),
(711, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '320000', '430000', '430000', '430000', '0', 'QTY', NULL, NULL),
(712, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '12', '0', '480000', '630000', '630000', '630000', '0', 'QTY', NULL, NULL),
(713, 'NCR12', 'Bon uk. 11 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '435000', '555000', '', '535000', '0', 'QTY', NULL, NULL),
(714, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '16', '0', '640000', '840000', '840000', '840000', '0', 'QTY', NULL, NULL),
(715, 'NCR12', 'Bon uk. 11 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '870000', '990000', '', '970000', '0', 'QTY', NULL, NULL),
(716, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '160000', '250000', '250000', '250000', '0', 'QTY', NULL, NULL),
(717, 'NCR12', 'Bon uk. 11 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '1305000', '1435000', '', '1425000', '0', 'QTY', NULL, NULL),
(718, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '320000', '424000', '424000', '424000', '0', 'QTY', NULL, NULL),
(719, 'NCR26', 'Bon uk. 33 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '2640000', '2770000', '', '2760000', '0', 'QTY', NULL, NULL),
(720, 'NCR12', 'Bon uk. 11 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1740000', '1880000', '', '1870000', '0', 'QTY', NULL, NULL),
(721, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '640000', '848000', '848000', '848000', '0', 'QTY', NULL, NULL),
(722, 'NCR26', 'Bon uk. 33 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '3300000', '3440000', '', '3430000', '0', 'QTY', NULL, NULL),
(723, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna 1 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '16', '0', '1280000', '1696000', '1696000', '1696000', '0', 'QTY', NULL, NULL),
(724, ' BHVS70A4HP ', ' Brosur HVSA4 70gsm+ 1 warna 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 1 ', '0', '90000', '140000', '140000', '140000', '0', 'QTY', NULL, NULL),
(725, 'NCR13', 'Bon uk. 11 x 21cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '234000', '369000', '', '349000', '0', 'QTY', NULL, NULL),
(726, 'NCR26', 'Bon uk. 33 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '6600000', '6740000', '', '6730000', '0', 'QTY', NULL, NULL),
(727, 'NCR27', 'Bon uk. 33 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '440000', '560000', '', '540000', '0', 'QTY', NULL, NULL),
(728, ' BHVS70A4HP ', ' Brosur HVSA4 70gsm+ 1 warna 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 2 ', '0', '160000', '220000', '220000', '220000', '0', 'QTY', NULL, NULL),
(729, 'NCR13', 'Bon uk. 11 x 21cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '468000', '618000', '', '598000', '0', 'QTY', NULL, NULL),
(730, ' BHVS70A4HP ', ' Brosur HVSA4 70gsm+ 1 warna 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 4 ', '0', '300000', '360000', '360000', '360000', '0', 'QTY', NULL, NULL),
(731, 'NCR13', 'Bon uk. 11 x 21cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '702000', '877000', '', '867000', '0', 'QTY', NULL, NULL),
(732, 'NCR13', 'Bon uk. 11 x 21cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '936000', '1136000', '', '1126000', '0', 'QTY', NULL, NULL),
(733, 'NCR27', 'Bon uk. 33 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '880000', '1000000', '', '980000', '0', 'QTY', NULL, NULL),
(734, ' BHVS70A3HP ', ' Brosur HVSA4 70gsm+ Full colour 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 1 ', '0', '210000', '290000', '290000', '290000', '0', 'QTY', NULL, NULL),
(735, 'NCR27', 'Bon uk. 33 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '1320000', '1440000', '', '1420000', '0', 'QTY', NULL, NULL),
(736, ' BHVS70A3HP ', ' Brosur HVSA4 70gsm+ Full colour 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 2 ', '0', '350000', '430000', '430000', '430000', '0', 'QTY', NULL, NULL),
(737, 'NCR14', 'Bon uk. 11 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '345000', '480000', '', '460000', '0', 'QTY', NULL, NULL),
(738, 'NCR27', 'Bon uk. 33 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '1760000', '1880000', '', '1860000', '0', 'QTY', NULL, NULL),
(739, ' BHVS70A3HP ', ' Brosur HVSA4 70gsm+ Full colour 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 3 ', '0', '', '', '', '', '0', 'QTY', NULL, NULL),
(740, 'NCR27', 'Bon uk. 33 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '3520000', '3650000', '', '3640000', '0', 'QTY', NULL, NULL),
(741, ' BHVS70A4FC ', ' Brosur HVSA4 70gsm+ Full colour 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 25 ', '0', '2175000', '2425000', '2425000', '2425000', '0', 'QTY', NULL, NULL),
(742, 'NCR14', 'Bon uk. 11 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '60', '0', '690000', '840000', '', '820000', '0', 'QTY', NULL, NULL),
(743, 'NCR27', 'Bon uk. 33 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '4400000', '4540000', '', '4530000', '0', 'QTY', NULL, NULL),
(744, 'NCR14', 'Bon uk. 11 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '90', '0', '1035000', '1210000', '', '1200000', '0', 'QTY', NULL, NULL),
(745, ' BHVS70A4FC ', ' Brosur HVSA4 70gsm+ Full colour 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 40 ', '0', '3480000', '3880000', '3880000', '3880000', '0', 'QTY', NULL, NULL),
(746, 'NCR14', 'Bon uk. 11 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '120', '0', '1380000', '1580000', '', '1570000', '0', 'QTY', NULL, NULL),
(747, 'NCR27', 'Bon uk. 33 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '8800000', '8940000', '', '8930000', '0', 'QTY', NULL, NULL),
(748, ' BHVS70A3FC ', ' Brosur HVSA4 70gsm+ Full colour 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 1 ', '0', '600000', '720000', '720000', '720000', '0', 'QTY', NULL, NULL),
(749, ' BHVS70A3FC ', ' Brosur HVSA4 70gsm+ Full colour 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 2 ', '0', '700000', '820000', '820000', '820000', '0', 'QTY', NULL, NULL),
(750, 'NCR28', 'Bon uk. 33 x 21cm+Rangkap 2+NO', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '10', '0', '225000', '350000', '', '330000', '0', 'QTY', NULL, NULL),
(751, 'NCR28', 'Bon uk. 33 x 21cm+Rangkap 2+NO', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '20', '0', '450000', '580000', '', '560000', '0', 'QTY', NULL, NULL),
(752, ' BHVS70A3FC ', ' Brosur HVSA4 70gsm+ Full colour 2 SISI ', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 4 ', '0', '900000', '1040000', '1040000', '1040000', '0', 'QTY', NULL, NULL),
(753, 'NCR28', 'Bon uk. 33 x 21cm+Rangkap 2+NO', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '30', '0', '675000', '810000', '', '790000', '0', 'QTY', NULL, NULL),
(754, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', ' 4 ', '0', '220000', '320000', '320000', '320000', '0', 'QTY', NULL, NULL),
(755, 'NCR28', 'Bon uk. 33 x 21cm+Rangkap 2+NO', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '40', '0', '900000', '1040000', '', '1020000', '0', 'QTY', NULL, NULL),
(756, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '320000', '430000', '430000', '430000', '0', 'QTY', NULL, NULL),
(757, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '12', '0', '480000', '630000', '630000', '630000', '0', 'QTY', NULL, NULL),
(758, 'NCR28', 'Bon uk. 33 x 21cm+Rangkap 2+NO', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '80', '0', '1800000', '1970000', '', '1960000', '0', 'QTY', NULL, NULL),
(759, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '16', '0', '640000', '840000', '840000', '840000', '0', 'QTY', NULL, NULL),
(760, 'NCR28', 'Bon uk. 33 x 21cm+Rangkap 2+NO', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '100', '0', '2250000', '2440000', '', '2430000', '0', 'QTY', NULL, NULL),
(761, 'NCR28', 'Bon uk. 33 x 21cm+Rangkap 2+NO', 'OFFSET', 'BLOCK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '200', '0', '4500000', '4740000', '', '4730000', '0', 'QTY', NULL, NULL),
(762, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '2', '0', '160000', '250000', '250000', '250000', '0', 'QTY', NULL, NULL),
(763, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '4', '0', '320000', '424000', '424000', '424000', '0', 'QTY', NULL, NULL),
(764, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '8', '0', '640000', '848000', '848000', '848000', '0', 'QTY', NULL, NULL),
(765, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna 2 SISI', 'OFFSET', 'RIM', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '16', '0', '1280000', '1696000', '1696000', '1696000', '0', 'QTY', NULL, NULL),
(766, 'AMP1', 'Amplop AA uk. 21 x 11 cm', 'OFFSET', 'KOTAK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '1', '0', '', '300000', '300000', '', '0', 'QTY', NULL, NULL),
(767, 'AMP1', 'Amplop AA uk. 21 x 11 cm', 'OFFSET', 'KOTAK', 'ESKTERNAL', 'OFFSET', 'OFFSET', '0', '5', '0', '', '450000', '450000', '', '0', 'QTY', NULL, NULL),
(768, 'LBW', 'Laser Kertas Blue White 250 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6000', '5800', '5800', '0', 'QTY KHUSUS', NULL, NULL),
(769, 'LBW', 'Laser Kertas Blue White 250 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '5800', '5600', '5600', '0', 'QTY KHUSUS', NULL, NULL),
(770, 'LBW', 'Laser Kertas Blue White 250 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '5600', '5400', '5400', '0', 'QTY KHUSUS', NULL, NULL),
(771, 'LBWTB', 'Laser Kertas Blue White 250 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7800', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(772, 'LBWTB', 'Laser Kertas Blue White 250 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '7600', '7400', '7400', '0', 'QTY KHUSUS', NULL, NULL),
(773, 'LBWTB', 'Laser Kertas Blue White 250 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '7400', '7200', '7200', '0', 'QTY KHUSUS', NULL, NULL),
(774, 'LBC', 'Laser Kertas Brief Card 200 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6000', '5800', '5800', '0', 'QTY KHUSUS', NULL, NULL),
(775, 'LBC', 'Laser Kertas Brief Card 200 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '5800', '5600', '5600', '0', 'QTY KHUSUS', NULL, NULL),
(776, 'LBC', 'Laser Kertas Brief Card 200 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '5600', '5400', '5400', '0', 'QTY KHUSUS', NULL, NULL),
(777, 'LBCTB', 'Laser Kertas Brief Card 200 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7800', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(778, 'LBCTB', 'Laser Kertas Brief Card 200 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '7600', '7400', '7400', '0', 'QTY KHUSUS', NULL, NULL),
(779, 'LBCTB', 'Laser Kertas Brief Card 200 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '7400', '7200', '7200', '0', 'QTY KHUSUS', NULL, NULL),
(780, 'LC', 'Laser Kertas Concord 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6000', '5800', '5800', '0', 'QTY KHUSUS', NULL, NULL),
(781, 'LC', 'Laser Kertas Concord 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '5800', '5600', '5600', '0', 'QTY KHUSUS', NULL, NULL),
(782, 'LC', 'Laser Kertas Concord 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '5600', '5400', '5400', '0', 'QTY KHUSUS', NULL, NULL),
(783, 'LCTB', 'Laser Kertas Concord 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7800', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(784, 'LCTB', 'Laser Kertas Concord 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '7600', '7400', '7400', '0', 'QTY KHUSUS', NULL, NULL),
(785, 'LCTB', 'Laser Kertas Concord 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '7400', '7200', '7200', '0', 'QTY KHUSUS', NULL, NULL),
(786, 'LCP', 'Laser Kertas Craft Paper 310 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6000', '5800', '5800', '0', 'QTY KHUSUS', NULL, NULL),
(787, 'LCP', 'Laser Kertas Craft Paper 310 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '5800', '5600', '5600', '0', 'QTY KHUSUS', NULL, NULL),
(788, 'LCP', 'Laser Kertas Craft Paper 310 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '5600', '5400', '5400', '0', 'QTY KHUSUS', NULL, NULL),
(789, 'LCPTB', 'Laser Kertas Craft Paper 310 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7800', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(790, 'LCPTB', 'Laser Kertas Craft Paper 310 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '7600', '7400', '7400', '0', 'QTY KHUSUS', NULL, NULL),
(791, 'LCPTB', 'Laser Kertas Craft Paper 310 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '7400', '7200', '7200', '0', 'QTY KHUSUS', NULL, NULL),
(792, 'LKS120', 'Laser Kertas Konstruk 120 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '4800', '4600', '4600', '0', 'QTY KHUSUS', NULL, NULL),
(793, 'LKS120', 'Laser Kertas Konstruk 120 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4600', '4400', '4400', '0', 'QTY KHUSUS', NULL, NULL),
(794, 'LKS120', 'Laser Kertas Konstruk 120 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '4400', '4200', '4200', '0', 'QTY KHUSUS', NULL, NULL),
(795, 'LKS120TB', 'Laser Kertas Konstruk 120 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6800', '6600', '6600', '0', 'QTY KHUSUS', NULL, NULL),
(796, 'LKS120TB', 'Laser Kertas Konstruk 120 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6400', '6200', '6200', '0', 'QTY KHUSUS', NULL, NULL),
(797, 'LKS120TB', 'Laser Kertas Konstruk 120 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6200', '6000', '6000', '0', 'QTY KHUSUS', NULL, NULL),
(798, 'LKS150', 'Laser Kertas Konstruk 150 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '4800', '4600', '4600', '0', 'QTY KHUSUS', NULL, NULL),
(799, 'LKS150', 'Laser Kertas Konstruk 150 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '4600', '4400', '4400', '0', 'QTY KHUSUS', NULL, NULL),
(800, 'LKS150', 'Laser Kertas Konstruk 150 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '4400', '4200', '4200', '0', 'QTY KHUSUS', NULL, NULL),
(801, 'LKS150TB', 'Laser Kertas Konstruk 150 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '6800', '6600', '6600', '0', 'QTY KHUSUS', NULL, NULL),
(802, 'LKS150TB', 'Laser Kertas Konstruk 150 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6400', '6200', '6200', '0', 'QTY KHUSUS', NULL, NULL),
(803, 'LKS150TB', 'Laser Kertas Konstruk 150 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6200', '6000', '6000', '0', 'QTY KHUSUS', NULL, NULL),
(804, 'CLA3S', 'Cutting Laser Uk. A3 Sticker', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '7200', '7000', '7000', '0', 'QTY KHUSUS', NULL, NULL),
(805, 'CLA3S', 'Cutting Laser Uk. A3 Sticker', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '6800', '6500', '6500', '0', 'QTY KHUSUS', NULL, NULL),
(806, 'CLA3S', 'Cutting Laser Uk. A3 Sticker', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '6500', '6000', '6000', '0', 'QTY KHUSUS', NULL, NULL),
(807, 'CLA3K', 'Cutting Laser Uk. A3 Kertas', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '01-20', '0', '0', '9000', '8000', '8000', '0', 'QTY KHUSUS', NULL, NULL),
(808, 'CLA3K', 'Cutting Laser Uk. A3 Kertas', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '21-50', '0', '0', '8800', '7800', '7800', '0', 'QTY KHUSUS', NULL, NULL),
(809, 'CLA3K', 'Cutting Laser Uk. A3 Kertas', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', '51-500', '0', '0', '7800', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(810, 'MUG', 'Mug', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '01-20', '0', '0', '23000', '20000', '20000', '0', 'QTY KHUSUS', NULL, NULL),
(811, 'MUG', 'Mug', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '21-50', '0', '0', '19000', '18000', '18000', '0', 'QTY KHUSUS', NULL, NULL),
(812, 'MUG', 'Mug', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '51-500', '0', '0', '18000', '17000', '17000', '0', 'QTY KHUSUS', NULL, NULL),
(813, 'TTSP45O', 'Tas Tali Sistem Press 75 gr Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '7320', '7120', '7120', '0', 'QTY KHUSUS', NULL, NULL),
(814, 'TTSP45O', 'Tas Tali Sistem Press 75 gr Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4896', '4797', '4797', '0', 'QTY KHUSUS', NULL, NULL),
(815, 'TTSP45T', 'Tas Tali Sistem Press 75 gr Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '9720', '9520', '9520', '0', 'QTY KHUSUS', NULL, NULL),
(816, 'TTSP45T', 'Tas Tali Sistem Press 75 gr Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '6084', '5985', '5985', '0', 'QTY KHUSUS', NULL, NULL),
(817, 'TTSP40O', 'Tas Tali Sistem Press 75 gr Uk. 30 x 8 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6660', '6460', '6460', '0', 'QTY KHUSUS', NULL, NULL),
(818, 'TTSP40O', 'Tas Tali Sistem Press 75 gr Uk. 30 x 8 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4236', '4137', '4137', '0', 'QTY KHUSUS', NULL, NULL),
(819, 'TTSP40T', 'Tas Tali Sistem Press 75 gr Uk. 30 x 8 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '9060', '8860', '8860', '0', 'QTY KHUSUS', NULL, NULL);
INSERT INTO `bahans` (`id`, `kode`, `bahan`, `kategori`, `satuan`, `jenis`, `kategori_cetak`, `jenis_bahan`, `klik`, `qty`, `harga`, `harga_po`, `harga_umum`, `harga_khusus`, `harga_member`, `harga_custom`, `cara_perhitungan`, `created_at`, `updated_at`) VALUES
(820, 'TTSP40T', 'Tas Tali Sistem Press 75 gr Uk. 30 x 8 x 40 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '5424', '5325', '5325', '0', 'QTY KHUSUS', NULL, NULL),
(821, 'TTSP35O', 'Tas Tali Sistem Press 75 gr Uk. 26 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6420', '6220', '6220', '0', 'QTY KHUSUS', NULL, NULL),
(822, 'TTSP35O', 'Tas Tali Sistem Press 75 gr Uk. 26 x 10 x 35 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '3996', '3897', '3897', '0', 'QTY KHUSUS', NULL, NULL),
(823, 'TTSP35T', 'Tas Tali Sistem Press 75 gr Uk. 26 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8820', '8620', '8620', '0', 'QTY KHUSUS', NULL, NULL),
(824, 'TTSP35T', 'Tas Tali Sistem Press 75 gr Uk. 26 x 10 x 35 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '5184', '5085', '5085', '0', 'QTY KHUSUS', NULL, NULL),
(825, 'TTSP30O', 'Tas Tali Sistem Press 75 gr Uk. 20 x 6 x 30 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6000', '5800', '5800', '0', 'QTY KHUSUS', NULL, NULL),
(826, 'TTSP30O', 'Tas Tali Sistem Press 75 gr Uk. 20 x 6 x 30 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '3576', '3477', '3477', '0', 'QTY KHUSUS', NULL, NULL),
(827, 'TTSP30T', 'Tas Tali Sistem Press 75 gr Uk. 20 x 6 x 30 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8400', '8200', '8200', '0', 'QTY KHUSUS', NULL, NULL),
(828, 'TTSP30T', 'Tas Tali Sistem Press 75 gr Uk. 20 x 6 x 30 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4764', '4665', '4665', '0', 'QTY KHUSUS', NULL, NULL),
(829, 'TLAP40O', 'Tas Lobang Atas Press 75 gr Uk. 40 x 30 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6120', '5920', '5920', '0', 'QTY KHUSUS', NULL, NULL),
(830, 'TLAP40O', 'Tas Lobang Atas Press 75 gr Uk. 40 x 30 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '3696', '3597', '3597', '0', 'QTY KHUSUS', NULL, NULL),
(831, 'TLAP40T', 'Tas Lobang Atas Press 75 gr Uk. 40 x 30 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8520', '8320', '8320', '0', 'QTY KHUSUS', NULL, NULL),
(832, 'TLAP40T', 'Tas Lobang Atas Press 75 gr Uk. 40 x 30 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4884', '4785', '4785', '0', 'QTY KHUSUS', NULL, NULL),
(833, 'TLAP35O', 'Tas Lobang Atas Press 75 gr Uk. 35 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '5820', '5620', '5620', '0', 'QTY KHUSUS', NULL, NULL),
(834, 'TLAP35O', 'Tas Lobang Atas Press 75 gr Uk. 35 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '3396', '3297', '3297', '0', 'QTY KHUSUS', NULL, NULL),
(835, 'TLAP35T', 'Tas Lobang Atas Press 75 gr Uk. 35 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8220', '8020', '8020', '0', 'QTY KHUSUS', NULL, NULL),
(836, 'TLAP35T', 'Tas Lobang Atas Press 75 gr Uk. 35 x 25 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4584', '4485', '4485', '0', 'QTY KHUSUS', NULL, NULL),
(837, 'TLAP25O', 'Tas Lobang Atas Press 75 gr Uk. 25 x 20 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '5520', '5320', '5320', '0', 'QTY KHUSUS', NULL, NULL),
(838, 'TLAP25O', 'Tas Lobang Atas Press 75 gr Uk. 25 x 20 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '3096', '2997', '2997', '0', 'QTY KHUSUS', NULL, NULL),
(839, 'TLAP25T', 'Tas Lobang Atas Press 75 gr Uk. 25 x 20 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '7920', '7720', '7720', '0', 'QTY KHUSUS', NULL, NULL),
(840, 'TLAP25T', 'Tas Lobang Atas Press 75 gr Uk. 25 x 20 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4284', '4185', '4185', '0', 'QTY KHUSUS', NULL, NULL),
(841, 'TP45O', 'Tas Petak 75 gr Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8400', '8200', '8200', '0', 'QTY KHUSUS', NULL, NULL),
(842, 'TP45O', 'Tas Petak 75 gr Uk. 38 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '5976', '5877', '5877', '0', 'QTY KHUSUS', NULL, NULL),
(843, 'TP45T', 'Tas Petak 75 gr Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '10800', '10600', '10600', '0', 'QTY KHUSUS', NULL, NULL),
(844, 'TP45T', 'Tas Petak 75 gr Uk. 38 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '7164', '7065', '7065', '0', 'QTY KHUSUS', NULL, NULL),
(845, 'TP40O', 'Tas Petak 75 gr Uk. 30 x 8 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '7800', '7600', '7600', '0', 'QTY KHUSUS', NULL, NULL),
(846, 'TP40O', 'Tas Petak 75 gr Uk. 30 x 8 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '5376', '5277', '5277', '0', 'QTY KHUSUS', NULL, NULL),
(847, 'TP40T', 'Tas Petak 75 gr Uk. 30 x 8 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '10200', '10000', '10000', '0', 'QTY KHUSUS', NULL, NULL),
(848, 'TP40T', 'Tas Petak 75 gr Uk. 30 x 8 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '6564', '6465', '6465', '0', 'QTY KHUSUS', NULL, NULL),
(849, 'TP30O', 'Tas Petak 75 gr Uk. 25 x 8 x 30 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6960', '6760', '6760', '0', 'QTY KHUSUS', NULL, NULL),
(850, 'TP30O', 'Tas Petak 75 gr Uk. 25 x 8 x 30 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4536', '4437', '4437', '0', 'QTY KHUSUS', NULL, NULL),
(851, 'TP30', 'Tas Petak 75 gr Uk. 25 x 8 x 30 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '9360', '9160', '9160', '0', 'QTY KHUSUS', NULL, NULL),
(852, 'TP30', 'Tas Petak 75 gr Uk. 25 x 8 x 30 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '5724', '5625', '5625', '0', 'QTY KHUSUS', NULL, NULL),
(853, 'TP25O', 'Tas Petak 75 gr Uk. 20 x 8 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '6360', '6160', '6160', '0', 'QTY KHUSUS', NULL, NULL),
(854, 'TP25O', 'Tas Petak 75 gr Uk. 20 x 8 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '3936', '3837', '3837', '0', 'QTY KHUSUS', NULL, NULL),
(855, 'TP25', 'Tas Petak 75 gr Uk. 20 x 8 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '8760', '8560', '8560', '0', 'QTY KHUSUS', NULL, NULL),
(856, 'TP25', 'Tas Petak 75 gr Uk. 20 x 8 x 25 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '5124', '5025', '5025', '0', 'QTY KHUSUS', NULL, NULL),
(857, 'TLP48O', 'Tas Lipat Bawah Uk. 48 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '7980', '7780', '7780', '0', 'QTY KHUSUS', NULL, NULL),
(858, 'TLP48O', 'Tas Lipat Bawah Uk. 48 x 10 x 45 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '5556', '5457', '5457', '0', 'QTY KHUSUS', NULL, NULL),
(859, 'TLP48T', 'Tas Lipat Bawah Uk. 48 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '10380', '10180', '10180', '0', 'QTY KHUSUS', NULL, NULL),
(860, 'TLP48T', 'Tas Lipat Bawah Uk. 48 x 10 x 45 cm 2 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '6744', '6645', '6645', '0', 'QTY KHUSUS', NULL, NULL),
(861, 'TLP40O', 'Tas Lipat Bawah Uk. 38 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '50-100', '0', '0', '7320', '7120', '7120', '0', 'QTY KHUSUS', NULL, NULL),
(862, 'TLP40O', 'Tas Lipat Bawah Uk. 38 x 10 x 40 cm 1 sisi', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', '101-200', '0', '0', '4896', '4797', '4797', '0', 'QTY KHUSUS', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-anto|127.0.0.1', 'i:2;', 1781358041),
('laravel-cache-anto|127.0.0.1:timer', 'i:1781358041;', 1781358041),
('laravel-cache-sentosa|127.0.0.1', 'i:1;', 1781587126),
('laravel-cache-sentosa|127.0.0.1:timer', 'i:1781587126;', 1781587126),
('laravel-cache-uje|127.0.0.1', 'i:1;', 1778940573),
('laravel-cache-uje|127.0.0.1:timer', 'i:1778940573;', 1778940573),
('sentosa-cache-adelia|103.125.175.109', 'i:1;', 1780892826),
('sentosa-cache-adelia|103.125.175.109:timer', 'i:1780892826;', 1780892826),
('sentosa-cache-admn|138.199.35.205', 'i:2;', 1780881577),
('sentosa-cache-admn|138.199.35.205:timer', 'i:1780881577;', 1780881577),
('sentosa-cache-aldi|127.0.0.1', 'i:1;', 1781859597),
('sentosa-cache-aldi|127.0.0.1:timer', 'i:1781859597;', 1781859597);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sapaan` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nohp` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `limit` bigint NOT NULL DEFAULT '0',
  `limit_akhir` bigint NOT NULL DEFAULT '0',
  `jatuh_tempo` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `kode`, `sapaan`, `nama`, `nohp`, `alamat`, `kategori`, `created_at`, `updated_at`, `limit`, `limit_akhir`, `jatuh_tempo`) VALUES
(8, 'CS-82229', 'Bapak', 'bodrek', '35446577676', 'stabat', 'Umum', '2026-04-25 20:25:01', '2026-06-19 02:04:19', 5000000, 5000000, 0),
(9, 'CS-49561', 'Ibu', 'Antonito', '083131383435', 'Medan', 'Khusus', '2026-04-25 20:58:17', '2026-06-07 23:15:14', 1000000, 0, NULL),
(10, 'CS-14944', 'Bapak', 'Antono', '083434334343', 'Medan Denai', 'Khusus', '2026-05-23 07:52:19', '2026-06-07 23:15:19', 20000, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `databahans`
--

CREATE TABLE `databahans` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bahan` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `satuan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kategori_cetak` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_bahan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `klik` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cara_perhitungan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `databahans`
--

INSERT INTO `databahans` (`id`, `kode`, `bahan`, `kategori`, `satuan`, `jenis`, `kategori_cetak`, `jenis_bahan`, `klik`, `cara_perhitungan`, `created_at`, `updated_at`) VALUES
(2, 'OSTD', 'MMT 280 Gsm', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(3, 'OTAP', 'MMT 340 Ap Gsm', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(4, 'OTBO', 'MMT 340 BO Gsm', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(5, 'OBS', 'MMT Backlite China', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(6, 'OBSJ', 'MMT Backlite Singelside Jerman', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(7, 'OBSK', 'MMT Backlite Singelside Korea', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(8, 'OJR', 'MMT Jerman', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(9, 'OKOC', 'MMT Korea Dove 440 GSM', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(10, 'O440', 'MMT 440 Glossy', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(11, 'OKST', 'Kain Satin', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(12, 'OSAR', 'Sticker Ap Ritrama', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(13, 'OSAR MATT', 'Sticker Ap Ritrama Matt', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(14, 'OSBL-IN', 'Outdoor Sticker Backlite ', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(15, 'OSBO', 'Sticker Black Out ', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(16, 'OSTP', 'Sticker Transparant', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(17, 'OWV', 'Sticker Oneway Vision', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(18, 'SS', 'Sticker Sandblust', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(19, 'OV', 'Over Print', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(20, 'OKSI', 'Kain Satin Import', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(21, 'OTC', 'Kain TC', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(22, 'MESH', 'MESH', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(23, 'DALT', 'Dye Albatros', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(24, 'DPP', 'Dye Photopaper', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(25, 'DSV', 'Dye Sticker Vynil', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(26, 'DSTP', 'Dye Sticker Transparant ', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(27, 'DD', 'Dye Duratrans', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(28, 'LMG', 'Lamit Glossy', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(29, 'LMD', 'Lamit Dove', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(30, 'LMF', 'Lamit Floor', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(31, 'LMP', 'Laminating Putih', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(32, 'TP', 'Transparant Tape', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(33, 'CSBI', 'Cutting Sticker Indoor', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(34, 'JPBI', 'Jasa Potong Bahan Indoor', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(35, 'OSTDM', 'MMT 280 Gsm 5 M', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(36, 'O4405M', 'MMT 440 Glossy 5 M', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(37, 'OKOC5M', 'MMT Korea Dove 440 GSM 5M', 'DIGITAL', 'M2', 'EKSTERNAL', 'OUTDOOR', 'SOLVENT', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(38, 'CSO1', 'Cutting Sticker oracel 1 warna', 'DIGITAL', 'M2', 'INTERNAL', 'OUTDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(39, 'CSO2', 'Cutting Sticker oracel 2 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(40, 'CSO3', 'Cutting Sticker oracel 3 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(41, 'CSSO1', 'Cutting Sticker Scolight 1 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(42, 'CSSO2', 'Cutting Sticker Scolight 2 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(43, 'CSSO3', 'Cutting Sticker Scolight 3 warna', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'DYE', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(44, 'ALTUV', 'Albatros UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(45, 'DPPUV', 'Photopaper UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(46, 'LUV', 'Luster UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(47, 'WUV', 'Wallpaper UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(48, 'DDUV', 'Duratrans UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(49, 'SUV', 'Sticker UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(50, 'SMUV', 'Sticker Matte UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(51, 'SBLUV', 'Sticker Backlite UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(52, 'SBOUV', 'Sticker BO UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(53, 'STPUV', 'Sticker Transparant UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(54, 'SOWUV', 'Sticker Oracel White UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(55, 'OWUV', 'Oneway UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(56, 'SSUV', 'Sticker Sandblust UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(57, 'SCSUV', 'Sticker Scolight Silver UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(58, 'SHUV', 'Sticker Hologram UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(59, 'BSUV', 'Backlite UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(60, 'BSJ UV', 'Backlite Jerman UV', 'DIGITAL', 'M2', 'INTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(61, 'BSK UV', 'Backlite Korea UV', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(62, '440UV', 'MMT 440 glossy UV', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(63, 'KOCUV', 'MMT Korea dove UV', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(64, 'TBOUV', 'MMT 340 BO Gsm UV', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(65, 'FAB1', 'Fabric + Jahit', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(66, 'STPUVW', 'Sticker Transparant UV + WHITE', 'DIGITAL', 'M2', 'EKSTERNAL', 'INDOOR', 'UV', '0', 'LUAS', '0000-00-00 00:00:00', NULL),
(67, 'Harga PERPC', '', 'DIGITAL', 'M2', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(68, 'FB', 'Foamboard uk. 100 x 100 cm', 'DIGITAL', 'M2', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(69, 'INF', 'Infraboard uk. 100 x 100 cm', 'DIGITAL', 'M2', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(70, 'PVC', 'PVC uk. 100 x 100 cm', 'DIGITAL', 'M2', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(71, 'BFB', 'Bentuk Foamboard', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(72, 'KMB', 'Kaki Mini Banner uk. 25 x 40 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(73, 'KXB', 'Kaki X-banner uk. 60 x 160 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(74, 'KYB1', 'Kaki Y-Banner uk. 60 x 160 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(75, 'KYB2', 'Kaki Y-Banner uk. 80 x 180 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(76, 'KRB1', 'Kaki R-Banner uk. 60 x 160 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(77, 'KRB2', 'Kaki R-Banner uk. 80 x 200 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(78, 'KRB3', 'Kaki R-Banner uk. 85 x 200 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(79, 'KD1', 'Kaki Door Frame uk. 60 x 160 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(80, 'KD2', 'Kaki Door Frame uk. 80 x 180 cm ', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(81, 'KF', 'Kaki Flag Banner uk 3M', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(82, 'KTP1', 'Kaki Tripod Banner 1 sisi', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(83, 'KTP2', 'Kaki Tripod Banner 2 sisi', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(84, 'KEDSEK', 'Kaki Event Desk', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(85, 'KPOPT', 'Kaki Pop Up Table', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(86, 'KSPW1', 'Kaki Spin Wheel 60 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(87, 'KSPW2', 'Kaki Spin Wheel 80 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(88, 'PR', 'Pemasangan Roller Banner', 'DIGITAL', 'PCS', 'INTERNAL', 'DISPLAY', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(89, 'Harga KERTAS Per QTY', '', '', '', '', '', '', '', '', '0000-00-00 00:00:00', NULL),
(90, 'LMKD1', 'Laminating Bahan Kertas Dove Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(91, 'LMKD2', 'Laminating Bahan Kertas Dove Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(92, 'LMKG1', 'Laminating Bahan Kertas Glossy Uk. ', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(93, 'LMKG2', 'Laminating Bahan Kertas Glossy Uk. ', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(94, 'LSK', 'Laser Sticker Kertas Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(95, 'LSTP', 'Laser Sticker Transparant Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(96, 'LSV', 'Laser Sticker Vynil Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(97, 'LSVM', 'Laser Sticker Vynil Matt Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(98, 'LSS', 'Laser Sticker Silver Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(99, 'LSG', 'Laser Sticker Gold Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(100, 'LSCP', 'Laser Sticker Craft Paper Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(101, 'LTIK190', 'Laser Kertas TIK 190 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(102, 'LTIK190TB', 'Laser Kertas TIK 190 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(103, 'LTIK210', 'Laser Kertas TIK 210 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(104, 'LTIK210TB', 'Laser Kertas TIK 210 UK 2 SISI Uk. ', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(105, 'LTIK230', 'Laser Kertas TIK 230 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(106, 'LTIK230TB', 'Laser Kertas TIK 230 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(107, 'LTIK260', 'Laser Kertas TIK 260 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(108, 'LTIK260TB', 'Laser Kertas TIK 260 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(109, 'LTIK310', 'Laser Kertas TIK 310 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(110, 'LTIK310TB', 'Laser Kertas TIK 310 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(111, 'LHVS80', 'Laser Kertas HVS 80 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(112, 'LHVS80TB', 'Laser Kertas HVS 80 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(113, 'LHVS100', 'Laser Kertas HVS 100 1 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(114, 'LHVS100TB', 'Laser Kertas HVS 100 2 Sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(115, 'LIVO', 'Laser Kertas Ivory 270 1 Sisi Uk. A', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(116, 'LIVOTB', 'Laser Kertas Ivory 270 2 Sisi Uk. A', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(117, 'LBW', 'Laser Kertas Blue White 250 1 Sisi ', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(118, 'LBWTB', 'Laser Kertas Blue White 250 2 sisi ', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(119, 'LBC', 'Laser Kertas Brief Card 200 1 Sisi ', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(120, 'LBCTB', 'Laser Kertas Brief Card 200 2 sisi ', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(121, 'LC', 'Laser Kertas Concord 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(122, 'LCTB', 'Laser Kertas Concord 2 sisi Uk. A3', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(123, 'LCP', 'Laser Kertas Craft Paper 310 1 Sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(124, 'LCPTB', 'Laser Kertas Craft Paper 310 2 sisi', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(125, 'LKS120', 'Laser Kertas Konstruk 120 1 Sisi  U', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(126, 'LKS120TB', 'Laser Kertas Konstruk 120 2 Sisi Uk', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(127, 'LKS150', 'Laser Kertas Konstruk 150 1 Sisi  U', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(128, 'LKS150TB', 'Laser Kertas Konstruk 150 2 Sisi Uk', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(129, 'CLA3S', 'Cutting Laser Uk. A3 Sticker', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(130, 'CLA3K', 'Cutting Laser Uk. A3 Kertas', 'DIGITAL', 'LEMBAR', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(131, 'MUG', 'Mug', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(132, 'TTSP45O', 'Tas Tali Sistem Press 75 gr Uk. 38 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(133, 'TTSP45T', 'Tas Tali Sistem Press 75 gr Uk. 38 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(134, 'TTSP40O', 'Tas Tali Sistem Press 75 gr Uk. 30 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(135, 'TTSP40T', 'Tas Tali Sistem Press 75 gr Uk. 30 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(136, 'TTSP35O', 'Tas Tali Sistem Press 75 gr Uk. 26 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(137, 'TTSP35T', 'Tas Tali Sistem Press 75 gr Uk. 26 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(138, 'TTSP30O', 'Tas Tali Sistem Press 75 gr Uk. 20 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(139, 'TTSP30T', 'Tas Tali Sistem Press 75 gr Uk. 20 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(140, 'TLAP40O', 'Tas Lobang Atas Press 75 gr Uk. 40 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(141, 'TLAP40T', 'Tas Lobang Atas Press 75 gr Uk. 40 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(142, 'TLAP35O', 'Tas Lobang Atas Press 75 gr Uk. 35 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(143, 'TLAP35T', 'Tas Lobang Atas Press 75 gr Uk. 35 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(144, 'TLAP25O', 'Tas Lobang Atas Press 75 gr Uk. 25 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(145, 'TLAP25T', 'Tas Lobang Atas Press 75 gr Uk. 25 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(146, 'TP45O', 'Tas Petak 75 gr Uk. 38 x 10 x 45 cm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(147, 'TP45T', 'Tas Petak 75 gr Uk. 38 x 10 x 45 cm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(148, 'TP40O', 'Tas Petak 75 gr Uk. 30 x 8 x 40 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(149, 'TP40T', 'Tas Petak 75 gr Uk. 30 x 8 x 40 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(150, 'TP30O', 'Tas Petak 75 gr Uk. 25 x 8 x 30 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(151, 'TP30', 'Tas Petak 75 gr Uk. 25 x 8 x 30 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(152, 'TP25O', 'Tas Petak 75 gr Uk. 20 x 8 x 25 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(153, 'TP25', 'Tas Petak 75 gr Uk. 20 x 8 x 25 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(154, 'TLP48O', 'Tas Lipat Bawah Uk. 48 x 10 x 45 cm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(155, 'TLP48T', 'Tas Lipat Bawah Uk. 48 x 10 x 45 cm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(156, 'TLP40O', 'Tas Lipat Bawah Uk. 38 x 10 x 40 cm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(157, 'TLP40D', 'Tas Lipat Bawah Uk. 38 x 10 x 40 cm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(158, 'TLP34O', 'Tas Lipat Bawah Uk. 33 x 6 x 34 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(159, 'TLP34D', 'Tas Lipat Bawah Uk. 33 x 6 x 34 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(160, 'TLP25O', 'Tas Lipat Bawah Uk. 28 x 8 x 25 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(161, 'TLP25D', 'Tas Lipat Bawah Uk. 28 x 8 x 25 cm ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(162, 'TTSJ45O', 'Tas Tali Sistem Jahit 100 gr Uk. 38', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(163, 'TTSJ45D', 'Tas Tali Sistem Jahit 100 gr Uk. 38', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(164, 'TTSJ40O', 'Tas Tali Sistem Jahit 100 gr Uk. 30', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(165, 'TTSJ40D', 'Tas Tali Sistem Jahit 100 gr Uk. 30', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(166, 'TTSJ35O', 'Tas Tali Sistem Jahit 100 gr Uk. 25', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(167, 'TTSJ35D', 'Tas Tali Sistem Jahit 100 gr Uk. 25', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(168, 'TTSJ25O', 'Tas Tali Sistem Jahit 100 gr Uk. 20', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(169, 'TTSJ25D', 'Tas Tali Sistem Jahit 100 gr Uk. 20', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(170, 'TTSJT45O', 'Tas Tali Sistem Jahit Terpal 600D U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(171, 'TTSJT45D', 'Tas Tali Sistem Jahit Terpal 600D U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(172, 'TTSJT40O', 'Tas Tali Sistem Jahit Terpal 600D U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(173, 'TTSJT40D', 'Tas Tali Sistem Jahit Terpal 600D U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(174, 'TTSJT35O', 'Tas Tali Sistem Jahit Terpal 600D U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(175, 'TTSJT35D', 'Tas Tali Sistem Jahit Terpal 600D U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(176, 'TTSJT25O', 'Tas Tali Sistem Jahit Terpal 600D U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(177, 'TTSJT25T', 'Tas Tali Sistem Jahit Terpal 600D U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(178, 'TTSJB45O', 'Tas Tali Sistem Jahit Blacu Uk. 38 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(179, 'TTSJB45T', 'Tas Tali Sistem Jahit Blacu Uk. 38 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(180, 'TTSJB40O', 'Tas Tali Sistem Jahit Blacu Uk. 30 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(181, 'TTSJB40T', 'Tas Tali Sistem Jahit Blacu Uk. 30 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(182, 'TTSJB35O', 'Tas Tali Sistem Jahit Blacu Uk. 25 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(183, 'TTSJB35T', 'Tas Tali Sistem Jahit Blacu Uk. 25 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(184, 'TTSJB25O', 'Tas Tali Sistem Jahit Blacu Uk. 20 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(185, 'TTSJB25T', 'Tas Tali Sistem Jahit Blacu Uk. 20 ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(186, 'TTSJAD45O', 'Tas Tali Sistem Jahit American Dril', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(187, 'TTSJAD45T', 'Tas Tali Sistem Jahit American Dril', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(188, 'TTSJAD40O', 'Tas Tali Sistem Jahit American Dril', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(189, 'TTSJAD40T', 'Tas Tali Sistem Jahit American Dril', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(190, 'TTSJAD35O', 'Tas Tali Sistem Jahit American Dril', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(191, 'TTSJAD35T', 'Tas Tali Sistem Jahit American Dril', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(192, 'TTSJAD25O', 'Tas Tali Sistem Jahit American Dril', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(193, 'TTSJAD25T', 'Tas Tali Sistem Jahit American Dril', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(194, 'TTSJC45O', 'Tas Tali Sistem Jahit Canvas Uk. 38', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(195, 'TTSJC45T', 'Tas Tali Sistem Jahit Canvas Uk. 38', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(196, 'TTSJC40O', 'Tas Tali Sistem Jahit Canvas Uk. 30', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(197, 'TTSJC40T', 'Tas Tali Sistem Jahit Canvas Uk. 30', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(198, 'TTSJC35O', 'Tas Tali Sistem Jahit Canvas Uk. 25', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(199, 'TTSJC35T', 'Tas Tali Sistem Jahit Canvas Uk. 25', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(200, 'TTSJC25O', 'Tas Tali Sistem Jahit Canvas Uk. 20', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(201, 'TTSJC25T', 'Tas Tali Sistem Jahit Canvas Uk. 20', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(202, 'TTUT40O', 'Tas Tali Sistem Jahit Ulang Tahun U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(203, 'TTUT40T', 'Tas Tali Sistem Jahit Ulang Tahun U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(204, 'TTUT35O', 'Tas Tali Sistem Jahit Ulang Tahun U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(205, 'TTUT35T', 'Tas Tali Sistem Jahit Ulang Tahun U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(206, 'TTUT25O', 'Tas Tali Sistem Jahit Ulang Tahun U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(207, 'TTUT25T', 'Tas Tali Sistem Jahit Ulang Tahun U', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(208, 'PIN1', 'Pin uk. 4.4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(209, 'PIN2', 'Pin uk. 5.8', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(210, 'GTGP1', 'Gantungan Pin uk. 4.4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(211, 'GTGP2', 'Gantungan Pin uk. 5.8', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(212, 'GTGA1', 'Gantungan Kunci Arcylic uk. 4 x 4', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(213, 'GTGA2', 'Gantungan Kunci Arcylic uk. 5 x 5', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(214, 'GTGA3', 'Gantungan Kunci Arcylic uk. 6 x 6', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(215, 'GTG4', 'Gantungan Kunci Arcylic uk. 6 x 2, ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(216, 'GTG5', 'Gantungan Kunci Arcylic uk. 6 x 2, ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(217, 'GTG6', 'Gantungan Kunci Arcylic uk. 6 x 2, ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(218, 'GTG7', 'Gantungan Kunci Arcylic uk. 6 x 2, ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(219, 'Harga KERTAS Per PC', '', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(220, 'JP', 'Jasa Potong Uk. A3', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(221, 'PTP', 'Penambahan Tinta Putih Uk. A3', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(222, 'PET', 'Laser Kertas PET 200 1 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(223, 'PETTB', 'Laser Kertas PET 200 2 Sisi  Uk. A3', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(224, 'LHVS8065', 'Laser Kertas HVS 80 1 Sisi Uk. 32 x', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(225, 'LHVS8065TB', 'Laser Kertas HVS 80 2 Sisi Uk. 32 x', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(226, 'LkS12065', 'Laser Kertas Konstruk 120 1 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(227, 'LkS12065TB', 'Laser Kertas Konstruk 120 2 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(228, 'LkS15065', 'Laser Kertas Konstruk 150 1 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(229, 'LkS15065TB', 'Laser Kertas Konstruk 150 2 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(230, 'LHVS8090', 'Laser Kertas HVS 80 1 Sisi Uk. 32 x', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(231, 'LHVS8090TB', 'Laser Kertas HVS 80 2 Sisi Uk. 32 x', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(232, 'LkS12090', 'Laser Kertas Konstruk 120 1 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(233, 'LkS12090TB', 'Laser Kertas Konstruk 120 2 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(234, 'LkS15090', 'Laser Kertas Konstruk 150 1 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(235, 'LkS15090TB', 'Laser Kertas Konstruk 150 2 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(236, 'LHVS80109', 'Laser Kertas HVS 80 1 Sisi Uk. 32 x', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(237, 'LHVS80109TB', 'Laser Kertas HVS 80 2 Sisi Uk. 32 x', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(238, 'LkS120109', 'Laser Kertas Konstruk 120 1 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(239, 'LkS120109TB', 'Laser Kertas Konstruk 120 2 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(240, 'LkS150109', 'Laser Kertas Konstruk 150 1 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(241, 'LkS150109TB', 'Laser Kertas Konstruk 150 2 Sisi Uk', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(242, 'LTIK21065', 'Laser Kertas TIK 210 1 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(243, 'LTIK21065TB', 'Laser Kertas TIK 210 2 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(244, 'LTIK26065', 'Laser Kertas TIK 260 1 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(245, 'LTIK26065TB', 'Laser Kertas TIK 260 2 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(246, 'LTIK21090', 'Laser Kertas TIK 210 1 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(247, 'LTIK21090TB', 'Laser Kertas TIK 210 2 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(248, 'LTIK26090', 'Laser Kertas TIK 260 1 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(249, 'LTIK26090TB', 'Laser Kertas TIK 260 2 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(250, 'LTIK210109', 'Laser Kertas TIK 210 1 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(251, 'LTIK210109TB', 'Laser Kertas TIK 210 2 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(252, 'LTIK260109', 'Laser Kertas TIK 260 1 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(253, 'LTIK260109TB', 'Laser Kertas TIK 260 2 Sisi Uk. 32 ', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(254, 'KSS', 'Kartunama Singel Side', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(255, 'KDS', 'Kartunama Double Side', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(256, 'KSSL', 'Kartunama Singel Side Lamit', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(257, 'KDSL', 'Kartunama Double Side Lamit', 'DIGITAL', 'LEMBAR', 'EKSTERNAL', 'INDOOR 2', 'TONER', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(258, 'PLTA1', 'Plakat Arcylic 5 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(259, 'PLTA2', 'Plakat Arcylic 8 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(260, 'PLTA3', 'Plakat Arcylic 10 mm', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(261, 'PONDG', 'POND GARIS', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(262, 'PONDB', 'POND BULAT', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(263, 'BNKP', 'Bad Nama Kuningan Peniti', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(264, 'BNKM', 'Bad Nama Kuningan Magnet', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(265, 'BNKK', 'Bad Nama Kuningan KNOP', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(266, 'BNAP', 'Bad Nama Arcylic Peniti + Resin', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(267, 'BNAM', 'Bad Nama Arcylic Magnet + Resin', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(268, 'BNAK', 'Bad Nama Arcylic KNOP + Resin', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(269, 'BNTP', 'Bad Nama Timbul Peniti ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(270, 'BNTM', 'Bad Nama Timbul Magnet ', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(271, 'BNTK', 'Bad Nama Timbul KNOP', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(272, 'LYD', 'Lanyard', 'DIGITAL', 'PCS', 'EKSTERNAL', 'INDOOR 2', 'DISPLAY', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(273, 'HC', 'Hard Cartoon', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(274, 'KN', 'Kotak Kartu Nama', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(275, 'ID', 'Idcard', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(276, 'MB', 'MIKA BELALAI', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(277, 'STP1', 'Stempel 1 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(278, 'STP2', 'Stempel <4 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(279, 'STP3', 'Stempel >4 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(280, 'STP4', 'Stempel >5 cm', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(281, 'LS', 'Lem Setan', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(282, 'SRG', 'Sarung Idcard', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(283, 'SRGA', 'Sarung Idcard Arcylic', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(284, 'LTA4', 'Lamit A4', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(285, 'LTA3', 'Lamit A3', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(286, 'MA', 'Mata Ayam', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(287, 'CUD125', 'Cup Datar 12 Oz 5gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(288, 'CUD127', 'Cup Datar 12 Oz 7gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(289, 'CUD145', 'Cup Datar 14 Oz 5gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(290, 'CUD147', 'Cup Datar 14 Oz 7gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(291, 'CUD165', 'Cup Datar 16 Oz 5gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(292, 'CUD167', 'Cup Datar 16 Oz 7gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(293, 'CUD229', 'Cup Datar 22 Oz 9.5gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(294, 'CUO148', 'Cup Oval 14 Oz 8gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(295, 'CUO147', 'Cup Oval 14 Oz 7gr BSM', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(296, 'CUO168', 'Cup Oval 16 Oz 8gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(297, 'CUO167', 'Cup Oval 14 Oz 7gr BSM', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(298, 'CUO188', 'Cup Oval 18 Oz 8gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(299, 'CUO2210', 'Cup Oval 22 Oz 8gr Starindo', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(300, 'CPP6', 'Cup Paper Putih 6.5 Oz', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(301, 'CPP8', 'Cup Paper Putih 8 Oz', 'DIGITAL', 'PCS', 'INTERNAL', 'INDOOR 2', 'DLL', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(302, 'BKS120A5EX', 'Brosur Konstruk 120gsm A5', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(303, 'BKS150A5EX', 'Brosur Konstruk 150gsm A5', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(304, 'LMGA5EX', 'Laminating Kilat A5', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(305, 'LMDA5EX', 'Laminating Dove A5', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(306, 'NCR1', 'Bon uk. 16.5 x 10.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(307, 'NCR2', 'Bon uk. 16.5 x 10.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(308, 'NCR3', 'Bon uk.  10.5x16.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(309, 'NCR4', 'Bon uk. 10.5x16.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(310, 'NCR5', 'Bon uk. 10.5x16.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(311, 'NCR6', 'Bon uk. 10.5x16.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(312, 'NCR7', 'Bon uk. 10.5x16.5cm+Rangkap 2+No+Po', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(313, 'NCR8', 'Bon uk. 10.5x16.5cm+Rangkap 3+No+Po', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(314, 'NCR9', 'Bon uk. 10.5x16.5cm+Rangkap 4+No+Po', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(315, 'NCR10', 'Bon uk. 11 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(316, 'NCR11', 'Bon uk. 11 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(317, 'NCR12', 'Bon uk. 11 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(318, 'NCR13', 'Bon uk. 11 x 21cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(319, 'NCR14', 'Bon uk. 11 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(320, 'NCR15', 'Bon uk. 11 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(321, 'NCR16', 'Bon uk. 11 x 21cm+Rangkap 2+No+Porp', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(322, 'NCR17', 'Bon uk. 11 x 21cm+Rangkap 3+No+Porp', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(323, 'NCR18', 'Bon uk. 11 x 21cm+Rangkap 4+No+Porp', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(324, 'NCR19', 'Bon uk. 16.5 x21.5cm+Rangkap 2', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(325, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(326, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(327, 'NC22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(328, 'NCR20', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(329, 'NCR21', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(330, 'NCR22', 'Bon uk. 16.5 x21.5cm+Rangkap 2+No+P', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(331, 'NCR23', 'Bon uk. 16.5 x21.5cm+Rangkap 3+No+P', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(332, 'NCR24', 'Bon uk. 16.5 x21.5cm+Rangkap 4+No+P', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(333, 'NCR25', 'Bon uk. 33 x 21cm+Rangkap 2', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(334, 'NCR26', 'Bon uk. 33 x 21cm+Rangkap 3', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(335, 'NCR27', 'Bon uk. 33 x 21cm+Rangkap 4', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(336, 'NCR28', 'Bon uk. 33 x 21cm+Rangkap 2+NO', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(337, 'NCR29', 'Bon uk. 33 x 21cm+Rangkap 3+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(338, 'NCR30', 'Bon uk. 33 x 21cm+Rangkap 4+No', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(339, 'NCR31', 'Bon uk. 33 x 21cm+Rangkap 2+No+Porp', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(340, 'NCR32', 'Bon uk. 33 x 21cm+Rangkap 3+No+Porp', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(341, 'NCR33', 'Bon uk. 33 x 21cm+Rangkap 4+No+Porp', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(342, 'NCR34', 'Bon uk. 20 x 15cm+Rangkap 1', 'OFFSET', 'BLOCK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY KHUSUS', '0000-00-00 00:00:00', NULL),
(343, ' BHVS70A4HP ', ' Brosur HVSA4 70gsm+ 1 warna ', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(344, ' BHVS70A3HP ', ' Brosur HVSA4 70gsm+ Full colour ', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(345, ' BHVS70A4FC ', ' Brosur HVSA4 70gsm+ Full colour ', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(346, ' BHVS70A3FC ', ' Brosur HVSA3 70gsm+ Full colour ', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(347, 'BHVSKA5HP', 'Brosur HVS KuningA5+1 warna', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(348, 'BHVSKA4HP', 'Brosur HVS KuningA4+1 warna', 'OFFSET', 'RIM', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY', '0000-00-00 00:00:00', NULL),
(349, 'AMP1', 'Amplop AA uk. 21 x 11 cm', 'OFFSET', 'KOTAK', 'EKSTERNAL', 'OFFSET', 'OFFSET', '0', 'QTY', '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `desains`
--

CREATE TABLE `desains` (
  `id` bigint UNSIGNED NOT NULL,
  `tanggal` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_invoice` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_antrian` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_customer` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_kategori_desain` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_harga` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_desain` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pembayaran` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `distributors`
--

CREATE TABLE `distributors` (
  `id` bigint UNSIGNED NOT NULL,
  `nama` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kota` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nohp` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `norek` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jt` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `distributors`
--

INSERT INTO `distributors` (`id`, `nama`, `kode`, `alamat`, `kota`, `nohp`, `bank`, `norek`, `jt`, `created_at`, `updated_at`) VALUES
(1, '343', '343', '3343', '3434343', '343434343', '3434343', '3434343', 'lorem', '2026-05-13 09:53:06', '2026-05-13 09:53:17'),
(2, '8yuhj', 'DS-5007', '8u999', 'u990909', '789898980880', 'kokooo', '7980909089', '67', '2026-05-13 10:00:34', '2026-05-13 10:00:34');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hargabahans`
--

CREATE TABLE `hargabahans` (
  `id` bigint UNSIGNED NOT NULL,
  `kode_bahan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sisi` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty_min` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty_max` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_po` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_umum` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_member` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_khusus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga_custom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hargabahans`
--

INSERT INTO `hargabahans` (`id`, `kode_bahan`, `sisi`, `qty_min`, `qty_max`, `harga_po`, `harga_umum`, `harga_member`, `harga_khusus`, `harga_custom`, `created_at`, `updated_at`) VALUES
(2, 'OSTD', '', '1', '', '', '17000', '15000', '15200', '', NULL, NULL),
(3, 'OTAP', '', '1', '', '', '22000', '21000', '21000', '', NULL, NULL),
(4, 'OTBO', '', '1', '', '', '23000', '22000', '22000', '', NULL, NULL),
(5, 'OBS', '', '1', '', '', '66000', '55000', '55000', '', NULL, NULL),
(6, 'OBSJ', '', '1', '', '', '110000', '105000', '105000', '', NULL, NULL),
(7, 'OBSK', '', '1', '', '', '65000', '60000', '65000', '', NULL, NULL),
(8, 'OJR', '', '1', '', '', '107000', '92000', '107000', '', NULL, NULL),
(9, 'OKOC', '', '1', '', '', '48000', '46000', '46000', '', NULL, NULL),
(10, 'O440', '', '1', '', '', '35000', '33000', '33000', '', NULL, NULL),
(11, 'OKST', '', '1', '', '', '29000', '28000', '28000', '', NULL, NULL),
(12, 'OSAR', '', '1', '', '', '51000', '48000', '48000', '', NULL, NULL),
(13, 'OSAR MATT', '', '1', '', '', '66000', '60000', '60000', '', NULL, NULL),
(14, 'OSBL-IN', '', '1', '', '', '58000', '56000', '56000', '', NULL, NULL),
(15, 'OSBO', '', '1', '', '', '69000', '65000', '65000', '', NULL, NULL),
(16, 'OSTP', '', '1', '', '', '78500', '71000', '71000', '', NULL, NULL),
(17, 'OWV', '', '1', '', '', '77000', '75000', '75000', '', NULL, NULL),
(18, 'SS', '', '1', '', '', '90000', '85000', '85000', '', NULL, NULL),
(19, 'OV', '', '1', '', '', '12000', '10000', '10000', '', NULL, NULL),
(20, 'OKSI', '', '1', '', '', '78000', '75000', '75000', '', NULL, NULL),
(21, 'OTC', '', '1', '', '', '58000', '55000', '55000', '', NULL, NULL),
(22, 'MESH', '', '1', '', '', '95000', '86000', '86000', '', NULL, NULL),
(23, 'DALT', '', '1', '', '', '99000', '85000', '85000', '', NULL, NULL),
(24, 'DPP', '', '1', '', '', '99000', '85000', '85000', '', NULL, NULL),
(25, 'DSV', '', '1', '', '', '115000', '105000', '105000', '', NULL, NULL),
(26, 'DSTP', '', '1', '', '', '125000', '120000', '120000', '', NULL, NULL),
(27, 'DD', '', '1', '', '', '180000', '175000', '175000', '', NULL, NULL),
(28, 'LMG', '', '1', '', '', '30000', '28000', '28000', '', NULL, NULL),
(29, 'LMD', '', '1', '', '', '30000', '28000', '28000', '', NULL, NULL),
(30, 'LMF', '', '1', '', '', '77000', '75000', '75000', '', NULL, NULL),
(31, 'LMP', '', '1', '', '', '48000', '45000', '45000', '', NULL, NULL),
(32, 'TP', '', '1', '', '', '18000', '16000', '16000', '', NULL, NULL),
(33, 'CSBI', '', '1', '', '', '50000', '45000', '45000', '', NULL, NULL),
(34, 'JPBI', '', '1', '', '', '15000', '10000', '10000', '', NULL, NULL),
(35, 'OSTDM', '', '1', '', '', '38000', '35000', '35000', '', NULL, NULL),
(36, 'O4405M', '', '1', '', '', '48000', '45000', '45000', '', NULL, NULL),
(37, 'OKOC5M', '', '1', '', '', '58000', '55000', '55000', '', NULL, NULL),
(38, 'CSO1', '', '1', '', '', '350000', '300000', '300000', '', NULL, NULL),
(39, 'CSO2', '', '1', '', '', '550000', '520000', '520000', '', NULL, NULL),
(40, 'CSO3', '', '1', '', '', '750000', '720000', '720000', '', NULL, NULL),
(41, 'CSSO1', '', '1', '', '', '450000', '430000', '430000', '', NULL, NULL),
(42, 'CSSO2', '', '1', '', '', '650000', '630000', '630000', '', NULL, NULL),
(43, 'CSSO3', '', '1', '', '', '850000', '830000', '830000', '', NULL, NULL),
(44, 'ALTUV', '', '1', '', '', '100000', '95000', '95000', '', NULL, NULL),
(45, 'DPPUV', '', '1', '', '', '110000', '105000', '105000', '', NULL, NULL),
(46, 'LUV', '', '1', '', '', '110000', '105000', '105000', '', NULL, NULL),
(47, 'WUV', '', '1', '', '', '142000', '138000', '138000', '', NULL, NULL),
(48, 'DDUV', '', '1', '', '', '280000', '270000', '270000', '', NULL, NULL),
(49, 'SUV', '', '1', '', '', '125000', '110000', '110000', '', NULL, NULL),
(50, 'SMUV', '', '1', '', '', '120000', '113000', '113000', '', NULL, NULL),
(51, 'SBLUV', '', '1', '', '', '140000', '135000', '135000', '', NULL, NULL),
(52, 'SBOUV', '', '1', '', '', '130000', '125000', '125000', '', NULL, NULL),
(53, 'STPUV', '', '1', '', '', '180000', '178000', '178000', '', NULL, NULL),
(54, 'SOWUV', '', '1', '', '', '225000', '218000', '218000', '', NULL, NULL),
(55, 'OWUV', '', '1', '', '', '145000', '140000', '140000', '', NULL, NULL),
(56, 'SSUV', '', '1', '', '', '145000', '140000', '140000', '', NULL, NULL),
(57, 'SCSUV', '', '1', '', '', '270000', '260000', '260000', '', NULL, NULL),
(58, 'SHUV', '', '1', '', '', '160000', '150000', '150000', '', NULL, NULL),
(59, 'BSUV', '', '1', '', '', '135000', '130000', '130000', '', NULL, NULL),
(60, 'BSJ UV', '', '1', '', '', '260000', '250000', '250000', '', NULL, NULL),
(61, 'BSK UV', '', '1', '', '', '230000', '220000', '220000', '', NULL, NULL),
(62, '440UV', '', '1', '', '', '100000', '95000', '95000', '', NULL, NULL),
(63, 'KOCUV', '', '1', '', '', '115000', '110000', '110000', '', NULL, NULL),
(64, 'TBOUV', '', '1', '', '', '85000', '80000', '80000', '', NULL, NULL),
(65, 'FAB1', '', '1', '', '', '300000', '280000', '280000', '', NULL, NULL),
(66, 'STPUVW', '', '1', '', '', '230000', '220000', '220000', '', NULL, NULL),
(67, 'FB', '', '1', '', '', '85000', '80000', '80000', '', NULL, NULL),
(68, 'INF', '', '1', '', '', '120000', '110000', '110000', '', NULL, NULL),
(69, 'PVC', '', '1', '', '', '200000', '190000', '190000', '', NULL, NULL),
(70, 'BFB', '', '1', '', '', '30000', '25000', '25000', '', NULL, NULL),
(71, 'KMB', '', '1', '', '', '15000', '12500', '12500', '', NULL, NULL),
(72, 'KXB', '', '1', '', '', '38000', '35000', '35000', '', NULL, NULL),
(73, 'KYB1', '', '1', '', '', '47000', '45000', '45000', '', NULL, NULL),
(74, 'KYB2', '', '1', '', '', '58000', '55000', '55000', '', NULL, NULL),
(75, 'KRB1', '', '1', '', '', '190000', '180000', '180000', '', NULL, NULL),
(76, 'KRB2', '', '1', '', '', '200000', '190000', '190000', '', NULL, NULL),
(77, 'KRB3', '', '1', '', '', '210000', '200000', '200000', '', NULL, NULL),
(78, 'KD1', '', '1', '', '', '170000', '160000', '160000', '', NULL, NULL),
(79, 'KD2', '', '1', '', '', '195000', '190000', '190000', '', NULL, NULL),
(80, 'KF', '', '1', '', '', '720000', '700000', '700000', '', NULL, NULL),
(81, 'KTP1', '', '1', '', '', '140000', '135000', '135000', '', NULL, NULL),
(82, 'KTP2', '', '1', '', '', '130000', '125000', '125000', '', NULL, NULL),
(83, 'KEDSEK', '', '1', '', '', '590000', '570000', '570000', '', NULL, NULL),
(84, 'KPOPT', '', '1', '', '', '1200000', '1100000', '1100000', '', NULL, NULL),
(85, 'KSPW1', '', '1', '', '', '690000', '670000', '670000', '', NULL, NULL),
(86, 'KSPW2', '', '1', '', '', '710000', '690000', '690000', '', NULL, NULL),
(87, 'PR', '', '1', '', '', '18000', '15000', '15000', '', NULL, NULL),
(88, 'LMKD1', '', '1', '20', '', '2700', '2500', '2500', '', NULL, NULL),
(89, 'LMKD1', '', '21', '50', '', '2500', '2300', '2300', '', NULL, NULL),
(90, 'LMKD1', '', '51', '500', '', '2300', '2000', '2000', '', NULL, NULL),
(91, 'LMKD2', '', '1', '20', '', '4200', '4000', '4000', '', NULL, NULL),
(92, 'LMKD2', '', '21', '50', '', '4000', '3800', '3800', '', NULL, NULL),
(93, 'LMKD2', '', '51', '500', '', '3800', '3500', '3500', '', NULL, NULL),
(94, 'LMKG1', '', '1', '20', '', '2700', '2500', '2500', '', NULL, NULL),
(95, 'LMKG1', '', '21', '50', '', '2500', '2300', '2300', '', NULL, NULL),
(96, 'LMKG1', '', '51', '500', '', '2300', '2000', '2000', '', NULL, NULL),
(97, 'LMKG2', '', '1', '20', '', '4200', '4000', '4000', '', NULL, NULL),
(98, 'LMKG2', '', '21', '50', '', '4000', '3800', '3800', '', NULL, NULL),
(99, 'LMKG2', '', '51', '500', '', '3800', '3500', '3500', '', NULL, NULL),
(100, 'LSK', '', '1', '20', '', '5800', '5600', '5600', '', NULL, NULL),
(101, 'LSK', '', '21', '50', '', '5600', '5400', '5400', '', NULL, NULL),
(102, 'LSK', '', '51', '500', '', '5400', '5200', '5200', '', NULL, NULL),
(103, 'LSTP', '', '1', '20', '', '13200', '13000', '13000', '', NULL, NULL),
(104, 'LSTP', '', '21', '50', '', '13000', '12800', '12800', '', NULL, NULL),
(105, 'LSTP', '', '51', '500', '', '12800', '12600', '12600', '', NULL, NULL),
(106, 'LSV', '', '1', '20', '', '12800', '12600', '12600', '', NULL, NULL),
(107, 'LSV', '', '21', '50', '', '12600', '12400', '12400', '', NULL, NULL),
(108, 'LSV', '', '51', '500', '', '12400', '12200', '12200', '', NULL, NULL),
(109, 'LSVM', '', '1', '20', '', '15200', '15000', '15000', '', NULL, NULL),
(110, 'LSVM', '', '21', '50', '', '15000', '14800', '14800', '', NULL, NULL),
(111, 'LSVM', '', '51', '500', '', '14800', '14600', '14600', '', NULL, NULL),
(112, 'LSS', '', '1', '20', '', '15500', '14900', '14900', '', NULL, NULL),
(113, 'LSS', '', '21', '50', '', '15300', '14700', '14700', '', NULL, NULL),
(114, 'LSS', '', '51', '500', '', '15100', '14500', '14500', '', NULL, NULL),
(115, 'LSG', '', '1', '20', '', '15500', '14900', '14900', '', NULL, NULL),
(116, 'LSG', '', '21', '50', '', '15300', '14700', '14700', '', NULL, NULL),
(117, 'LSG', '', '51', '500', '', '15100', '14500', '14500', '', NULL, NULL),
(118, 'LSCP', '', '1', '20', '', '15500', '14900', '14900', '', NULL, NULL),
(119, 'LSCP', '', '21', '50', '', '15300', '14700', '14700', '', NULL, NULL),
(120, 'LSCP', '', '51', '500', '', '15100', '14500', '14500', '', NULL, NULL),
(121, 'LTIK190', '', '1', '20', '', '5000', '4800', '4800', '', NULL, NULL),
(122, 'LTIK190', '', '21', '50', '', '4800', '4600', '4600', '', NULL, NULL),
(123, 'LTIK190', '', '51', '500', '', '4600', '4400', '4400', '', NULL, NULL),
(124, 'LTIK190TB', '', '1', '20', '', '7300', '7100', '7100', '', NULL, NULL),
(125, 'LTIK190TB', '', '21', '50', '', '6900', '6700', '6700', '', NULL, NULL),
(126, 'LTIK190TB', '', '51', '500', '', '6700', '6500', '6500', '', NULL, NULL),
(127, 'LTIK210', '', '1', '20', '', '5000', '4800', '4800', '', NULL, NULL),
(128, 'LTIK210', '', '21', '50', '', '4800', '4600', '4600', '', NULL, NULL),
(129, 'LTIK210', '', '51', '500', '', '4600', '4400', '4400', '', NULL, NULL),
(130, 'LTIK210TB', '', '1', '20', '', '7300', '7100', '7100', '', NULL, NULL),
(131, 'LTIK210TB', '', '21', '50', '', '6900', '6700', '6700', '', NULL, NULL),
(132, 'LTIK210TB', '', '51', '500', '', '6700', '6500', '6500', '', NULL, NULL),
(133, 'LTIK230', '', '1', '20', '', '5000', '4800', '4800', '', NULL, NULL),
(134, 'LTIK230', '', '21', '50', '', '4800', '4600', '4600', '', NULL, NULL),
(135, 'LTIK230', '', '51', '500', '', '4600', '4400', '4400', '', NULL, NULL),
(136, 'LTIK230TB', '', '1', '20', '', '7300', '7100', '7100', '', NULL, NULL),
(137, 'LTIK230TB', '', '21', '50', '', '6900', '6700', '6700', '', NULL, NULL),
(138, 'LTIK230TB', '', '51', '500', '', '6700', '6500', '6500', '', NULL, NULL),
(139, 'LTIK260', '', '1', '20', '', '5000', '4800', '4800', '', NULL, NULL),
(140, 'LTIK260', '', '21', '50', '', '4800', '4600', '4600', '', NULL, NULL),
(141, 'LTIK260', '', '51', '500', '', '4600', '4400', '4400', '', NULL, NULL),
(142, 'LTIK260TB', '', '1', '20', '', '7000', '6800', '6800', '', NULL, NULL),
(143, 'LTIK260TB', '', '21', '50', '', '6600', '6400', '6400', '', NULL, NULL),
(144, 'LTIK260TB', '', '51', '500', '', '6400', '6200', '6200', '', NULL, NULL),
(145, 'LTIK310', '', '1', '20', '', '6000', '5800', '5800', '', NULL, NULL),
(146, 'LTIK310', '', '21', '50', '', '5800', '5600', '5600', '', NULL, NULL),
(147, 'LTIK310', '', '51', '500', '', '5600', '5400', '5400', '', NULL, NULL),
(148, 'LTIK310TB', '', '1', '20', '', '7800', '7600', '7600', '', NULL, NULL),
(149, 'LTIK310TB', '', '21', '50', '', '7600', '7400', '7400', '', NULL, NULL),
(150, 'LTIK310TB', '', '51', '500', '', '7400', '7200', '7200', '', NULL, NULL),
(151, 'LHVS80', '', '1', '20', '', '5000', '4700', '4700', '', NULL, NULL),
(152, 'LHVS80', '', '21', '50', '', '4800', '4400', '4400', '', NULL, NULL),
(153, 'LHVS80', '', '51', '500', '', '4600', '4200', '4200', '', NULL, NULL),
(154, 'LHVS80TB', '', '1', '20', '', '6800', '6500', '6500', '', NULL, NULL),
(155, 'LHVS80TB', '', '21', '50', '', '6600', '6200', '6200', '', NULL, NULL),
(156, 'LHVS80TB', '', '51', '500', '', '6400', '6000', '6000', '', NULL, NULL),
(157, 'LHVS100', '', '1', '20', '', '5000', '4700', '4700', '', NULL, NULL),
(158, 'LHVS100', '', '21', '50', '', '4800', '4400', '4400', '', NULL, NULL),
(159, 'LHVS100', '', '51', '500', '', '4600', '4200', '4200', '', NULL, NULL),
(160, 'LHVS100TB', '', '1', '20', '', '6800', '6500', '6500', '', NULL, NULL),
(161, 'LHVS100TB', '', '21', '50', '', '6600', '6200', '6200', '', NULL, NULL),
(162, 'LHVS100TB', '', '51', '500', '', '6400', '6000', '6000', '', NULL, NULL),
(163, 'LIVO', '', '1', '20', '', '6000', '5800', '5800', '', NULL, NULL),
(164, 'LIVO', '', '21', '50', '', '5800', '5600', '5600', '', NULL, NULL),
(165, 'LIVO', '', '51', '500', '', '5600', '5400', '5400', '', NULL, NULL),
(166, 'LIVOTB', '', '1', '20', '', '7800', '7600', '7600', '', NULL, NULL),
(167, 'LIVOTB', '', '21', '50', '', '7600', '7400', '7400', '', NULL, NULL),
(168, 'LIVOTB', '', '51', '500', '', '7400', '7200', '7200', '', NULL, NULL),
(169, 'LBW', '', '1', '20', '', '6000', '5800', '5800', '', NULL, NULL),
(170, 'LBW', '', '21', '50', '', '5800', '5600', '5600', '', NULL, NULL),
(171, 'LBW', '', '51', '500', '', '5600', '5400', '5400', '', NULL, NULL),
(172, 'LBWTB', '', '1', '20', '', '7800', '7600', '7600', '', NULL, NULL),
(173, 'LBWTB', '', '21', '50', '', '7600', '7400', '7400', '', NULL, NULL),
(174, 'LBWTB', '', '51', '500', '', '7400', '7200', '7200', '', NULL, NULL),
(175, 'LBC', '', '1', '20', '', '6000', '5800', '5800', '', NULL, NULL),
(176, 'LBC', '', '21', '50', '', '5800', '5600', '5600', '', NULL, NULL),
(177, 'LBC', '', '51', '500', '', '5600', '5400', '5400', '', NULL, NULL),
(178, 'LBCTB', '', '1', '20', '', '7800', '7600', '7600', '', NULL, NULL),
(179, 'LBCTB', '', '21', '50', '', '7600', '7400', '7400', '', NULL, NULL),
(180, 'LBCTB', '', '51', '500', '', '7400', '7200', '7200', '', NULL, NULL),
(181, 'LC', '', '1', '20', '', '6000', '5800', '5800', '', NULL, NULL),
(182, 'LC', '', '21', '50', '', '5800', '5600', '5600', '', NULL, NULL),
(183, 'LC', '', '51', '500', '', '5600', '5400', '5400', '', NULL, NULL),
(184, 'LCTB', '', '1', '20', '', '7800', '7600', '7600', '', NULL, NULL),
(185, 'LCTB', '', '21', '50', '', '7600', '7400', '7400', '', NULL, NULL),
(186, 'LCTB', '', '51', '500', '', '7400', '7200', '7200', '', NULL, NULL),
(187, 'LCP', '', '1', '20', '', '6000', '5800', '5800', '', NULL, NULL),
(188, 'LCP', '', '21', '50', '', '5800', '5600', '5600', '', NULL, NULL),
(189, 'LCP', '', '51', '500', '', '5600', '5400', '5400', '', NULL, NULL),
(190, 'LCPTB', '', '1', '20', '', '7800', '7600', '7600', '', NULL, NULL),
(191, 'LCPTB', '', '21', '50', '', '7600', '7400', '7400', '', NULL, NULL),
(192, 'LCPTB', '', '51', '500', '', '7400', '7200', '7200', '', NULL, NULL),
(193, 'LKS120', '', '1', '20', '', '4800', '4600', '4600', '', NULL, NULL),
(194, 'LKS120', '', '21', '50', '', '4600', '4400', '4400', '', NULL, NULL),
(195, 'LKS120', '', '51', '500', '', '4400', '4200', '4200', '', NULL, NULL),
(196, 'LKS120TB', '', '1', '20', '', '6800', '6600', '6600', '', NULL, NULL),
(197, 'LKS120TB', '', '21', '50', '', '6400', '6200', '6200', '', NULL, NULL),
(198, 'LKS120TB', '', '51', '500', '', '6200', '6000', '6000', '', NULL, NULL),
(199, 'LKS150', '', '1', '20', '', '4800', '4600', '4600', '', NULL, NULL),
(200, 'LKS150', '', '21', '50', '', '4600', '4400', '4400', '', NULL, NULL),
(201, 'LKS150', '', '51', '500', '', '4400', '4200', '4200', '', NULL, NULL),
(202, 'LKS150TB', '', '1', '20', '', '6800', '6600', '6600', '', NULL, NULL),
(203, 'LKS150TB', '', '21', '50', '', '6400', '6200', '6200', '', NULL, NULL),
(204, 'LKS150TB', '', '51', '500', '', '6200', '6000', '6000', '', NULL, NULL),
(205, 'CLA3S', '', '1', '20', '', '7200', '7000', '7000', '', NULL, NULL),
(206, 'CLA3S', '', '21', '50', '', '6800', '6500', '6500', '', NULL, NULL),
(207, 'CLA3S', '', '51', '500', '', '6500', '6000', '6000', '', NULL, NULL),
(208, 'CLA3K', '', '1', '20', '', '9000', '8000', '8000', '', NULL, NULL),
(209, 'CLA3K', '', '21', '50', '', '8800', '7800', '7800', '', NULL, NULL),
(210, 'CLA3K', '', '51', '500', '', '7800', '7600', '7600', '', NULL, NULL),
(211, 'MUG', '', '1', '20', '', '23000', '20000', '20000', '', NULL, NULL),
(212, 'MUG', '', '21', '50', '', '19000', '18000', '18000', '', NULL, NULL),
(213, 'MUG', '', '51', '500', '', '18000', '17000', '17000', '', NULL, NULL),
(214, 'TTSP45O', '', '50', '100', '4920', '7320', '7120', '7120', '', NULL, NULL),
(215, 'TTSP45O', '', '101', '200', '3708', '4896', '4797', '4797', '', NULL, NULL),
(216, 'TTSP45T', '', '50', '100', '7320', '9720', '9520', '9520', '', NULL, NULL),
(217, 'TTSP45T', '', '101', '200', '4896', '6084', '5985', '5985', '', NULL, NULL),
(218, 'TTSP40O', '', '50', '100', '4260', '6660', '6460', '6460', '', NULL, NULL),
(219, 'TTSP40O', '', '101', '200', '3048', '4236', '4137', '4137', '', NULL, NULL),
(220, 'TTSP40T', '', '50', '100', '6660', '9060', '8860', '8860', '', NULL, NULL),
(221, 'TTSP40T', '', '101', '200', '4236', '5424', '5325', '5325', '', NULL, NULL),
(222, 'TTSP35O', '', '50', '100', '4020', '6420', '6220', '6220', '', NULL, NULL),
(223, 'TTSP35O', '', '101', '200', '2808', '3996', '3897', '3897', '', NULL, NULL),
(224, 'TTSP35T', '', '50', '100', '6420', '8820', '8620', '8620', '', NULL, NULL),
(225, 'TTSP35T', '', '101', '200', '3996', '5184', '5085', '5085', '', NULL, NULL),
(226, 'TTSP30O', '', '50', '100', '3600', '6000', '5800', '5800', '', NULL, NULL),
(227, 'TTSP30O', '', '101', '200', '2388', '3576', '3477', '3477', '', NULL, NULL),
(228, 'TTSP30T', '', '50', '100', '6000', '8400', '8200', '8200', '', NULL, NULL),
(229, 'TTSP30T', '', '101', '200', '3576', '4764', '4665', '4665', '', NULL, NULL),
(230, 'TLAP40O', '', '50', '100', '3720', '6120', '5920', '5920', '', NULL, NULL),
(231, 'TLAP40O', '', '101', '200', '2508', '3696', '3597', '3597', '', NULL, NULL),
(232, 'TLAP40T', '', '50', '100', '6120', '8520', '8320', '8320', '', NULL, NULL),
(233, 'TLAP40T', '', '101', '200', '3696', '4884', '4785', '4785', '', NULL, NULL),
(234, 'TLAP35O', '', '50', '100', '3420', '5820', '5620', '5620', '', NULL, NULL),
(235, 'TLAP35O', '', '101', '200', '2208', '3396', '3297', '3297', '', NULL, NULL),
(236, 'TLAP35T', '', '50', '100', '5820', '8220', '8020', '8020', '', NULL, NULL),
(237, 'TLAP35T', '', '101', '200', '3396', '4584', '4485', '4485', '', NULL, NULL),
(238, 'TLAP25O', '', '50', '100', '3120', '5520', '5320', '5320', '', NULL, NULL),
(239, 'TLAP25O', '', '101', '200', '1908', '3096', '2997', '2997', '', NULL, NULL),
(240, 'TLAP25T', '', '50', '100', '5520', '7920', '7720', '7720', '', NULL, NULL),
(241, 'TLAP25T', '', '101', '200', '3096', '4284', '4185', '4185', '', NULL, NULL),
(242, 'TP45O', '', '50', '100', '6000', '8400', '8200', '8200', '', NULL, NULL),
(243, 'TP45O', '', '101', '200', '4788', '5976', '5877', '5877', '', NULL, NULL),
(244, 'TP45T', '', '50', '100', '8400', '10800', '10600', '10600', '', NULL, NULL),
(245, 'TP45T', '', '101', '200', '5976', '7164', '7065', '7065', '', NULL, NULL),
(246, 'TP40O', '', '50', '100', '5400', '7800', '7600', '7600', '', NULL, NULL),
(247, 'TP40O', '', '101', '200', '4188', '5376', '5277', '5277', '', NULL, NULL),
(248, 'TP40T', '', '50', '100', '7800', '10200', '10000', '10000', '', NULL, NULL),
(249, 'TP40T', '', '101', '200', '5376', '6564', '6465', '6465', '', NULL, NULL),
(250, 'TP30O', '', '50', '100', '4560', '6960', '6760', '6760', '', NULL, NULL),
(251, 'TP30O', '', '101', '200', '3348', '4536', '4437', '4437', '', NULL, NULL),
(252, 'TP30', '', '50', '100', '6960', '9360', '9160', '9160', '', NULL, NULL),
(253, 'TP30', '', '101', '200', '4536', '5724', '5625', '5625', '', NULL, NULL),
(254, 'TP25O', '', '50', '100', '3960', '6360', '6160', '6160', '', NULL, NULL),
(255, 'TP25O', '', '101', '200', '2748', '3936', '3837', '3837', '', NULL, NULL),
(256, 'TP25', '', '50', '100', '6360', '8760', '8560', '8560', '', NULL, NULL),
(257, 'TP25', '', '101', '200', '3936', '5124', '5025', '5025', '', NULL, NULL),
(258, 'TLP48O', '', '50', '100', '5580', '7980', '7780', '7780', '', NULL, NULL),
(259, 'TLP48O', '', '101', '200', '4368', '5556', '5457', '5457', '', NULL, NULL),
(260, 'TLP48T', '', '50', '100', '7980', '10380', '10180', '10180', '', NULL, NULL),
(261, 'TLP48T', '', '101', '200', '5556', '6744', '6645', '6645', '', NULL, NULL),
(262, 'TLP40O', '', '50', '100', '4920', '7320', '7120', '7120', '', NULL, NULL),
(263, 'TLP40O', '', '101', '200', '3708', '4896', '4797', '4797', '', NULL, NULL),
(264, 'TLP40D', '', '50', '100', '7320', '9720', '9520', '9520', '', NULL, NULL),
(265, 'TLP40D', '', '101', '200', '4896', '6084', '5985', '5985', '', NULL, NULL),
(266, 'TLP34O', '', '50', '100', '4260', '6660', '6460', '6460', '', NULL, NULL),
(267, 'TLP34O', '', '101', '200', '3048', '4236', '4137', '4137', '', NULL, NULL),
(268, 'TLP34D', '', '50', '100', '6660', '9060', '8860', '8860', '', NULL, NULL),
(269, 'TLP34D', '', '101', '200', '4236', '5424', '5325', '5325', '', NULL, NULL),
(270, 'TLP25O', '', '50', '100', '3720', '6120', '5920', '5920', '', NULL, NULL),
(271, 'TLP25O', '', '101', '200', '2508', '3696', '3597', '3597', '', NULL, NULL),
(272, 'TLP25D', '', '50', '100', '6120', '8520', '8320', '8320', '', NULL, NULL),
(273, 'TLP25D', '', '101', '200', '3696', '4884', '4785', '4785', '', NULL, NULL),
(274, 'TTSJ45O', '', '50', '100', '9600', '12000', '11800', '11800', '', NULL, NULL),
(275, 'TTSJ45O', '', '101', '200', '8388', '9576', '9477', '9477', '', NULL, NULL),
(276, 'TTSJ45D', '', '50', '100', '12000', '14400', '14200', '14200', '', NULL, NULL),
(277, 'TTSJ45D', '', '101', '200', '9576', '10764', '10665', '10665', '', NULL, NULL),
(278, 'TTSJ40O', '', '50', '100', '8880', '11280', '11080', '11080', '', NULL, NULL),
(279, 'TTSJ40O', '', '101', '200', '7668', '8856', '8757', '8757', '', NULL, NULL),
(280, 'TTSJ40D', '', '50', '100', '11280', '13680', '13480', '13480', '', NULL, NULL),
(281, 'TTSJ40D', '', '101', '200', '8856', '10044', '9945', '9945', '', NULL, NULL),
(282, 'TTSJ35O', '', '50', '100', '7920', '10320', '10120', '10120', '', NULL, NULL),
(283, 'TTSJ35O', '', '101', '200', '6708', '7896', '7797', '7797', '', NULL, NULL),
(284, 'TTSJ35D', '', '50', '100', '10320', '12720', '12520', '12520', '', NULL, NULL),
(285, 'TTSJ35D', '', '101', '200', '7896', '9084', '8985', '8985', '', NULL, NULL),
(286, 'TTSJ25O', '', '50', '100', '7200', '9600', '9400', '9400', '', NULL, NULL),
(287, 'TTSJ25O', '', '101', '200', '5988', '7176', '7077', '7077', '', NULL, NULL),
(288, 'TTSJ25D', '', '50', '100', '9600', '12000', '11800', '11800', '', NULL, NULL),
(289, 'TTSJ25D', '', '101', '200', '7176', '8364', '8265', '8265', '', NULL, NULL),
(290, 'TTSJT45O', '', '50', '100', '21600', '24000', '23800', '23800', '', NULL, NULL),
(291, 'TTSJT45O', '', '101', '200', '20388', '21576', '21477', '21477', '', NULL, NULL),
(292, 'TTSJT45D', '', '50', '100', '24000', '26400', '26200', '26200', '', NULL, NULL),
(293, 'TTSJT45D', '', '101', '200', '21576', '22764', '22665', '22665', '', NULL, NULL),
(294, 'TTSJT40O', '', '50', '100', '19200', '21600', '21400', '21400', '', NULL, NULL),
(295, 'TTSJT40O', '', '101', '200', '17988', '19176', '19077', '19077', '', NULL, NULL),
(296, 'TTSJT40D', '', '50', '100', '21600', '24000', '23800', '23800', '', NULL, NULL),
(297, 'TTSJT40D', '', '101', '200', '19176', '20364', '20265', '20265', '', NULL, NULL),
(298, 'TTSJT35O', '', '50', '100', '17520', '19920', '19720', '19720', '', NULL, NULL),
(299, 'TTSJT35O', '', '101', '200', '16308', '17496', '17397', '17397', '', NULL, NULL),
(300, 'TTSJT35D', '', '50', '100', '19920', '22320', '22120', '22120', '', NULL, NULL),
(301, 'TTSJT35D', '', '101', '200', '17496', '18684', '18585', '18585', '', NULL, NULL),
(302, 'TTSJT25O', '', '50', '100', '15600', '18000', '17800', '17800', '', NULL, NULL),
(303, 'TTSJT25O', '', '101', '200', '14388', '15576', '15477', '15477', '', NULL, NULL),
(304, 'TTSJT25T', '', '50', '100', '18000', '20400', '20200', '20200', '', NULL, NULL),
(305, 'TTSJT25T', '', '101', '200', '15576', '16764', '16665', '16665', '', NULL, NULL),
(306, 'TTSJB45O', '', '50', '100', '22800', '25200', '25000', '25000', '', NULL, NULL),
(307, 'TTSJB45O', '', '101', '200', '21588', '22776', '22677', '22677', '', NULL, NULL),
(308, 'TTSJB45T', '', '50', '100', '25200', '27600', '27400', '27400', '', NULL, NULL),
(309, 'TTSJB45T', '', '101', '200', '22776', '23964', '23865', '23865', '', NULL, NULL),
(310, 'TTSJB40O', '', '50', '100', '19800', '22200', '22000', '22000', '', NULL, NULL),
(311, 'TTSJB40O', '', '101', '200', '18588', '19776', '19677', '19677', '', NULL, NULL),
(312, 'TTSJB40T', '', '50', '100', '22200', '24600', '24400', '24400', '', NULL, NULL),
(313, 'TTSJB40T', '', '101', '200', '19776', '20964', '20865', '20865', '', NULL, NULL),
(314, 'TTSJB35O', '', '50', '100', '17400', '19800', '19600', '19600', '', NULL, NULL),
(315, 'TTSJB35O', '', '101', '200', '16188', '17376', '17277', '17277', '', NULL, NULL),
(316, 'TTSJB35T', '', '50', '100', '19800', '22200', '22000', '22000', '', NULL, NULL),
(317, 'TTSJB35T', '', '101', '200', '17376', '18564', '18465', '18465', '', NULL, NULL),
(318, 'TTSJB25O', '', '50', '100', '16200', '18600', '18400', '18400', '', NULL, NULL),
(319, 'TTSJB25O', '', '101', '200', '14988', '16176', '16077', '16077', '', NULL, NULL),
(320, 'TTSJB25T', '', '50', '100', '18600', '21000', '20800', '20800', '', NULL, NULL),
(321, 'TTSJB25T', '', '101', '200', '16176', '17364', '17265', '17265', '', NULL, NULL),
(322, 'TTSJAD45O', '', '50', '100', '26400', '28800', '28600', '28600', '', NULL, NULL),
(323, 'TTSJAD45O', '', '101', '200', '25188', '26376', '26277', '26277', '', NULL, NULL),
(324, 'TTSJAD45T', '', '50', '100', '28800', '31200', '31000', '31000', '', NULL, NULL),
(325, 'TTSJAD45T', '', '101', '200', '26376', '27564', '27465', '27465', '', NULL, NULL),
(326, 'TTSJAD40O', '', '50', '100', '24000', '26400', '26200', '26200', '', NULL, NULL),
(327, 'TTSJAD40O', '', '101', '200', '22788', '23976', '23877', '23877', '', NULL, NULL),
(328, 'TTSJAD40T', '', '50', '100', '26400', '28800', '28600', '28600', '', NULL, NULL),
(329, 'TTSJAD40T', '', '101', '200', '23976', '25164', '25065', '25065', '', NULL, NULL),
(330, 'TTSJAD35O', '', '50', '100', '21600', '24000', '23800', '23800', '', NULL, NULL),
(331, 'TTSJAD35O', '', '101', '200', '20388', '21576', '21477', '21477', '', NULL, NULL),
(332, 'TTSJAD35T', '', '50', '100', '24000', '26400', '26200', '26200', '', NULL, NULL),
(333, 'TTSJAD35T', '', '101', '200', '21576', '22764', '22665', '22665', '', NULL, NULL),
(334, 'TTSJAD25O', '', '50', '100', '19800', '22200', '22000', '22000', '', NULL, NULL),
(335, 'TTSJAD25O', '', '101', '200', '18588', '19776', '19677', '19677', '', NULL, NULL),
(336, 'TTSJAD25T', '', '50', '100', '22200', '24600', '24400', '24400', '', NULL, NULL),
(337, 'TTSJAD25T', '', '101', '200', '19776', '20964', '20865', '20865', '', NULL, NULL),
(338, 'TTSJC45O', '', '50', '100', '56400', '58800', '58600', '58600', '', NULL, NULL),
(339, 'TTSJC45O', '', '101', '200', '55188', '56376', '56277', '56277', '', NULL, NULL),
(340, 'TTSJC45T', '', '50', '100', '58800', '61200', '61000', '61000', '', NULL, NULL),
(341, 'TTSJC45T', '', '101', '200', '56376', '57564', '57465', '57465', '', NULL, NULL),
(342, 'TTSJC40O', '', '50', '100', '48000', '50400', '50200', '50200', '', NULL, NULL),
(343, 'TTSJC40O', '', '101', '200', '46788', '47976', '47877', '47877', '', NULL, NULL),
(344, 'TTSJC40T', '', '50', '100', '50400', '52800', '52600', '52600', '', NULL, NULL),
(345, 'TTSJC40T', '', '101', '200', '47976', '49164', '49065', '49065', '', NULL, NULL),
(346, 'TTSJC35O', '', '50', '100', '38400', '40800', '40600', '40600', '', NULL, NULL),
(347, 'TTSJC35O', '', '101', '200', '37188', '38376', '38277', '38277', '', NULL, NULL),
(348, 'TTSJC35T', '', '50', '100', '40800', '43200', '43000', '43000', '', NULL, NULL),
(349, 'TTSJC35T', '', '101', '200', '38376', '39564', '39465', '39465', '', NULL, NULL),
(350, 'TTSJC25O', '', '50', '100', '32400', '34800', '34600', '34600', '', NULL, NULL),
(351, 'TTSJC25O', '', '101', '200', '31188', '32376', '32277', '32277', '', NULL, NULL),
(352, 'TTSJC25T', '', '50', '100', '34800', '37200', '37000', '37000', '', NULL, NULL),
(353, 'TTSJC25T', '', '101', '200', '32376', '33564', '33465', '33465', '', NULL, NULL),
(354, 'TTUT40O', '', '50', '100', '10800', '13200', '13000', '13000', '', NULL, NULL),
(355, 'TTUT40O', '', '101', '200', '10800', '11988', '11889', '11889', '', NULL, NULL),
(356, 'TTUT40T', '', '50', '100', '10800', '13200', '13000', '13000', '', NULL, NULL),
(357, 'TTUT40T', '', '101', '200', '10800', '11988', '11889', '11889', '', NULL, NULL),
(358, 'TTUT35O', '', '50', '100', '8400', '10800', '10600', '10600', '', NULL, NULL),
(359, 'TTUT35O', '', '101', '200', '8400', '9588', '9489', '9489', '', NULL, NULL),
(360, 'TTUT35T', '', '50', '100', '8400', '10800', '10600', '10600', '', NULL, NULL),
(361, 'TTUT35T', '', '101', '200', '8400', '9588', '9489', '9489', '', NULL, NULL),
(362, 'TTUT25O', '', '50', '100', '6000', '8400', '8200', '8200', '', NULL, NULL),
(363, 'TTUT25O', '', '101', '200', '6000', '7188', '7089', '7089', '', NULL, NULL),
(364, 'TTUT25T', '', '50', '100', '6000', '8400', '8200', '8200', '', NULL, NULL),
(365, 'TTUT25T', '', '101', '200', '6000', '7188', '7089', '7089', '', NULL, NULL),
(366, 'PIN1', '', '1', '10', '', '5500', '5000', '5000', '', NULL, NULL),
(367, 'PIN1', '', '11', '50', '', '5000', '4500', '4500', '', NULL, NULL),
(368, 'PIN1', '', '50', '100', '', '4500', '4000', '4000', '', NULL, NULL),
(369, 'PIN2', '', '1', '10', '', '6000', '5500', '5500', '', NULL, NULL),
(370, 'PIN2', '', '11', '50', '', '5500', '5000', '5000', '', NULL, NULL),
(371, 'PIN2', '', '50', '100', '', '5000', '4500', '4500', '', NULL, NULL),
(372, 'GTGP1', '', '1', '10', '', '7500', '7000', '7000', '', NULL, NULL),
(373, 'GTGP1', '', '11', '50', '', '7000', '6500', '6500', '', NULL, NULL),
(374, 'GTGP1', '', '50', '100', '', '6500', '6000', '6000', '', NULL, NULL),
(375, 'GTGP2', '', '1', '10', '', '8100', '7600', '7600', '', NULL, NULL),
(376, 'GTGP2', '', '11', '50', '', '7700', '7100', '7100', '', NULL, NULL),
(377, 'GTGP2', '', '50', '100', '', '7200', '6600', '6600', '', NULL, NULL),
(378, 'GTGA1', '', '1 sisi', '', '', '5000', '4500', '4500', '', NULL, NULL),
(379, 'GTGA1', '', '2 sisi', '', '', '6500', '6000', '6000', '', NULL, NULL),
(380, 'GTGA2', '', '1 sisi', '', '', '6000', '5500', '5500', '', NULL, NULL),
(381, 'GTGA2', '', '2 sisi', '', '', '9000', '8000', '8000', '', NULL, NULL),
(382, 'GTGA3', '', '1 sisi', '', '', '7000', '6500', '6500', '', NULL, NULL),
(383, 'GTGA3', '', '2 sisi', '', '', '14000', '13000', '13000', '', NULL, NULL),
(384, 'GTG4', '', '1 sisi', '', '', '8000', '8000', '8000', '', NULL, NULL),
(385, 'GTG5', '', '2 sisi', '', '', '15000', '15000', '15000', '', NULL, NULL),
(386, 'GTG6', '', '1 sisi', '', '', '9000', '9000', '9000', '', NULL, NULL),
(387, 'GTG7', '', '2 sisi', '', '', '18000', '18000', '18000', '', NULL, NULL),
(388, 'JP', '', '1', '', '', '700', '600', '600', '', NULL, NULL),
(389, 'PTP', '', '1', '', '', '17000', '16000', '16000', '', NULL, NULL),
(390, 'PET', '', '1', '', '', '27000', '25000', '25000', '', NULL, NULL),
(391, 'PETTB', '', '1', '', '', '32000', '30000', '30000', '', NULL, NULL),
(392, 'LHVS8065', '', '1', '', '', '6000', '5000', '5000', '', NULL, NULL),
(393, 'LHVS8065TB', '', '1', '', '', '12000', '10000', '10000', '', NULL, NULL),
(394, 'LkS12065', '', '1', '', '', '6000', '5000', '5000', '', NULL, NULL),
(395, 'LkS12065TB', '', '1', '', '', '12000', '10000', '10000', '', NULL, NULL),
(396, 'LkS15065', '', '1', '', '', '6000', '5000', '5000', '', NULL, NULL),
(397, 'LkS15065TB', '', '1', '', '', '12000', '10000', '10000', '', NULL, NULL),
(398, 'LHVS8090', '', '1', '', '', '7000', '6000', '6000', '', NULL, NULL),
(399, 'LHVS8090TB', '', '1', '', '', '13000', '12000', '12000', '', NULL, NULL),
(400, 'LkS12090', '', '1', '', '', '7000', '6000', '6000', '', NULL, NULL),
(401, 'LkS12090TB', '', '1', '', '', '13000', '12000', '12000', '', NULL, NULL),
(402, 'LkS15090', '', '1', '', '', '7000', '6000', '6000', '', NULL, NULL),
(403, 'LkS15090TB', '', '1', '', '', '13000', '12000', '12000', '', NULL, NULL),
(404, 'LHVS80109', '', '1', '', '', '8000', '7000', '7000', '', NULL, NULL),
(405, 'LHVS80109TB', '', '1', '', '', '15000', '14000', '14000', '', NULL, NULL),
(406, 'LkS120109', '', '1', '', '', '8000', '7000', '7000', '', NULL, NULL),
(407, 'LkS120109TB', '', '1', '', '', '15000', '14000', '14000', '', NULL, NULL),
(408, 'LkS150109', '', '1', '', '', '8000', '7000', '7000', '', NULL, NULL),
(409, 'LkS150109TB', '', '1', '', '', '15000', '14000', '14000', '', NULL, NULL),
(410, 'LTIK21065', '', '1', '', '', '9000', '8800', '8800', '', NULL, NULL),
(411, 'LTIK21065TB', '', '1', '', '', '18000', '17600', '17600', '', NULL, NULL),
(412, 'LTIK26065', '', '1', '', '', '9000', '8800', '8800', '', NULL, NULL),
(413, 'LTIK26065TB', '', '1', '', '', '18000', '17600', '17600', '', NULL, NULL),
(414, 'LTIK21090', '', '1', '', '', '11000', '10000', '10000', '', NULL, NULL),
(415, 'LTIK21090TB', '', '1', '', '', '20000', '19000', '19000', '', NULL, NULL),
(416, 'LTIK26090', '', '1', '', '', '11000', '10000', '10000', '', NULL, NULL),
(417, 'LTIK26090TB', '', '1', '', '', '20000', '19000', '19000', '', NULL, NULL),
(418, 'LTIK210109', '', '1', '', '', '12000', '11500', '11500', '', NULL, NULL),
(419, 'LTIK210109TB', '', '1', '', '', '23000', '22000', '22000', '', NULL, NULL),
(420, 'LTIK260109', '', '1', '', '', '12000', '11500', '11500', '', NULL, NULL),
(421, 'LTIK260109TB', '', '1', '', '', '23000', '22000', '22000', '', NULL, NULL),
(422, 'KSS', '', '1', '', '', '25000', '23000', '25000', '', NULL, NULL),
(423, 'KDS', '', '1', '', '', '38000', '35000', '38000', '', NULL, NULL),
(424, 'KSSL', '', '1', '', '', '42000', '40000', '40000', '', NULL, NULL),
(425, 'KDSL', '', '1', '', '', '52000', '50000', '50000', '', NULL, NULL),
(426, 'PLTA1', '', '1', '', '', '190000', '180000', '180000', '', NULL, NULL),
(427, 'PLTA2', '', '1', '', '', '220000', '210000', '210000', '', NULL, NULL),
(428, 'PLTA3', '', '1', '', '', '235000', '230000', '230000', '', NULL, NULL),
(429, 'PONDG', '', '1', '', '', '100000', '95000', '95000', '', NULL, NULL),
(430, 'PONDB', '', '1', '', '', '110000', '100000', '100000', '', NULL, NULL),
(431, 'BNKP', '', '1', '', '', '25000', '23000', '23000', '', NULL, NULL),
(432, 'BNKM', '', '1', '', '', '31000', '29000', '29000', '', NULL, NULL),
(433, 'BNKK', '', '1', '', '', '29000', '26000', '26000', '', NULL, NULL),
(434, 'BNAP', '', '1', '', '', '23000', '21000', '21000', '', NULL, NULL),
(435, 'BNAM', '', '1', '', '', '29000', '27000', '27000', '', NULL, NULL),
(436, 'BNAK', '', '1', '', '', '28000', '26000', '26000', '', NULL, NULL),
(437, 'BNTP', '', '1', '', '', '33000', '31000', '31000', '', NULL, NULL),
(438, 'BNTM', '', '1', '', '', '39000', '37000', '37000', '', NULL, NULL),
(439, 'BNTK', '', '1', '', '', '39000', '37000', '37000', '', NULL, NULL),
(440, 'LYD', '', '1', '', '', '20000', '18000', '18000', '', NULL, NULL),
(441, 'HC', '', '1', '', '', '38000', '36500', '36500', '', NULL, NULL),
(442, 'KN', '', '1', '', '', '2500', '2200', '2200', '', NULL, NULL),
(443, 'ID', '', '1', '', '', '13000', '12000', '12000', '', NULL, NULL),
(444, 'MB', '', '1', '', '', '700', '600', '600', '', NULL, NULL),
(445, 'STP1', '', '1', '', '', '35000', '35000', '35000', '', NULL, NULL),
(446, 'STP2', '', '1', '', '', '55000', '50000', '50000', '', NULL, NULL),
(447, 'STP3', '', '1', '', '', '65000', '60000', '60000', '', NULL, NULL),
(448, 'STP4', '', '', '', '', '70000', '65000', '65000', '', NULL, NULL),
(449, 'LS', '', '1', '', '', '5500', '5000', '5000', '', NULL, NULL),
(450, 'SRG', '', '1', '', '', '3000', '2500', '2500', '', NULL, NULL),
(451, 'SRGA', '', '1', '', '', '4500', '4000', '4000', '', NULL, NULL),
(452, 'LTA4', '', '1', '', '', '8000', '7000', '7000', '', NULL, NULL),
(453, 'LTA3', '', '1', '', '', '9000', '8000', '8000', '', NULL, NULL),
(454, 'MA', '', '1', '', '', '600', '500', '500', '', NULL, NULL),
(455, 'CUD125', '', '1000', '', '', '690000', '680000', '680000', '', NULL, NULL),
(456, 'CUD127', '', '1000', '', '', '650000', '640000', '640000', '', NULL, NULL),
(457, 'CUD145', '', '1000', '', '', '690000', '680000', '680000', '', NULL, NULL),
(458, 'CUD147', '', '1000', '', '', '690000', '680000', '680000', '', NULL, NULL),
(459, 'CUD165', '', '1000', '', '', '690000', '680000', '680000', '', NULL, NULL),
(460, 'CUD167', '', '1000', '', '', '760000', '750000', '750000', '', NULL, NULL),
(461, 'CUD229', '', '1000', '', '', '860000', '850000', '850000', '', NULL, NULL),
(462, 'CUO148', '', '1000', '', '', '800000', '790000', '790000', '', NULL, NULL),
(463, 'CUO147', '', '1000', '', '', '710000', '700000', '700000', '', NULL, NULL),
(464, 'CUO168', '', '1000', '', '', '860000', '850000', '850000', '', NULL, NULL),
(465, 'CUO167', '', '1000', '', '', '710000', '700000', '700000', '', NULL, NULL),
(466, 'CUO188', '', '1000', '', '', '800000', '790000', '790000', '', NULL, NULL),
(467, 'CUO2210', '', '1000', '', '', '860000', '850000', '850000', '', NULL, NULL),
(468, 'CPP6', '', '1000', '', '', '910000', '900000', '900000', '', NULL, NULL),
(469, 'CPP8', '', '1000', '', '', '910000', '900000', '900000', '', NULL, NULL),
(470, 'BKS120A5EX', '1 SISI', '1', '', '370000', '510000', '510000', '510000', '', NULL, NULL),
(471, 'BKS120A5EX', '1 SISI', '2', '', '450000', '590000', '590000', '590000', '', NULL, NULL),
(472, 'BKS120A5EX', '1 SISI', '3', '', '500000', '640000', '640000', '640000', '', NULL, NULL),
(473, 'BKS120A5EX', '1 SISI', '4', '', '565000', '705000', '705000', '705000', '', NULL, NULL),
(474, 'BKS120A5EX', '1 SISI', '5', '', '630000', '770000', '770000', '770000', '', NULL, NULL),
(475, 'BKS120A5EX', '1 SISI', '6', '', '680000', '820000', '820000', '820000', '', NULL, NULL),
(476, 'BKS120A5EX', '1 SISI', '7', '', '760000', '900000', '900000', '900000', '', NULL, NULL),
(477, 'BKS120A5EX', '1 SISI', '8', '', '830000', '970000', '970000', '970000', '', NULL, NULL),
(478, 'BKS120A5EX', '1 SISI', '9', '', '880000', '1020000', '1020000', '1020000', '', NULL, NULL),
(479, 'BKS120A5EX', '1 SISI', '10', '', '950000', '1090000', '1090000', '1090000', '', NULL, NULL),
(480, 'BKS120A5EX', '2 SISI', '1', '', '370000', '510000', '510000', '510000', '', NULL, NULL),
(481, 'BKS120A5EX', '2 SISI', '2', '', '450000', '590000', '590000', '590000', '', NULL, NULL),
(482, 'BKS120A5EX', '2 SISI', '3', '', '500000', '640000', '640000', '640000', '', NULL, NULL),
(483, 'BKS120A5EX', '2 SISI', '4', '', '565000', '705000', '705000', '705000', '', NULL, NULL),
(484, 'BKS120A5EX', '2 SISI', '5', '', '630000', '770000', '770000', '770000', '', NULL, NULL),
(485, 'BKS120A5EX', '2 SISI', '6', '', '680000', '820000', '820000', '820000', '', NULL, NULL),
(486, 'BKS120A5EX', '2 SISI', '7', '', '760000', '900000', '900000', '900000', '', NULL, NULL),
(487, 'BKS120A5EX', '2 SISI', '8', '', '830000', '970000', '970000', '970000', '', NULL, NULL),
(488, 'BKS120A5EX', '2 SISI', '9', '', '930000', '1070000', '1070000', '1070000', '', NULL, NULL),
(489, 'BKS120A5EX', '2 SISI', '10', '', '1000000', '1140000', '1140000', '1140000', '', NULL, NULL),
(490, 'BKS150A5EX', '1 SISI', '1', '', '400000', '540000', '540000', '540000', '', NULL, NULL),
(491, 'BKS150A5EX', '1 SISI', '2', '', '500000', '640000', '640000', '640000', '', NULL, NULL),
(492, 'BKS150A5EX', '1 SISI', '3', '', '560000', '700000', '700000', '700000', '', NULL, NULL),
(493, 'BKS150A5EX', '1 SISI', '4', '', '640000', '780000', '780000', '780000', '', NULL, NULL),
(494, 'BKS150A5EX', '1 SISI', '5', '', '720000', '860000', '860000', '860000', '', NULL, NULL),
(495, 'BKS150A5EX', '1 SISI', '6', '', '780000', '920000', '920000', '920000', '', NULL, NULL),
(496, 'BKS150A5EX', '1 SISI', '7', '', '880000', '1020000', '1020000', '1020000', '', NULL, NULL),
(497, 'BKS150A5EX', '1 SISI', '8', '', '930000', '1070000', '1070000', '1070000', '', NULL, NULL),
(498, 'BKS150A5EX', '1 SISI', '9', '', '980000', '1120000', '1120000', '1120000', '', NULL, NULL),
(499, 'BKS150A5EX', '1 SISI', '10', '', '1050000', '1190000', '1190000', '1190000', '', NULL, NULL),
(500, 'BKS150A5EX', '2 SISI', '1', '', '400000', '540000', '540000', '540000', '', NULL, NULL),
(501, 'BKS150A5EX', '2 SISI', '2', '', '500000', '640000', '640000', '640000', '', NULL, NULL),
(502, 'BKS150A5EX', '2 SISI', '3', '', '560000', '700000', '700000', '700000', '', NULL, NULL),
(503, 'BKS150A5EX', '2 SISI', '4', '', '640000', '780000', '780000', '780000', '', NULL, NULL),
(504, 'BKS150A5EX', '2 SISI', '5', '', '720000', '860000', '860000', '860000', '', NULL, NULL),
(505, 'BKS150A5EX', '2 SISI', '6', '', '780000', '920000', '920000', '920000', '', NULL, NULL),
(506, 'BKS150A5EX', '2 SISI', '7', '', '880000', '1020000', '1020000', '1020000', '', NULL, NULL),
(507, 'BKS150A5EX', '2 SISI', '8', '', '930000', '1070000', '1070000', '1070000', '', NULL, NULL),
(508, 'BKS150A5EX', '2 SISI', '9', '', '1030000', '1170000', '1170000', '1170000', '', NULL, NULL),
(509, 'BKS150A5EX', '2 SISI', '10', '', '1100000', '1240000', '1240000', '1240000', '', NULL, NULL),
(510, 'LMGA5EX', '1 SISI', '1', '', '180000', '260000', '260000', '260000', '', NULL, NULL),
(511, 'LMGA5EX', '1 SISI', '2', '', '180000', '260000', '260000', '260000', '', NULL, NULL),
(512, 'LMGA5EX', '1 SISI', '3', '', '180000', '260000', '260000', '260000', '', NULL, NULL),
(513, 'LMGA5EX', '1 SISI', '4', '', '190000', '270000', '270000', '270000', '', NULL, NULL),
(514, 'LMGA5EX', '1 SISI', '5', '', '240000', '320000', '320000', '320000', '', NULL, NULL),
(515, 'LMGA5EX', '1 SISI', '6', '', '285000', '365000', '365000', '365000', '', NULL, NULL),
(516, 'LMGA5EX', '1 SISI', '7', '', '335000', '415000', '415000', '415000', '', NULL, NULL),
(517, 'LMGA5EX', '1 SISI', '8', '', '380000', '460000', '460000', '460000', '', NULL, NULL),
(518, 'LMGA5EX', '1 SISI', '9', '', '430000', '510000', '510000', '510000', '', NULL, NULL),
(519, 'LMGA5EX', '1 SISI', '10', '', '475000', '555000', '555000', '555000', '', NULL, NULL),
(520, 'LMGA5EX', '2 SISI', '1', '', '180000', '260000', '260000', '260000', '', NULL, NULL),
(521, 'LMGA5EX', '2 SISI', '2', '', '190000', '270000', '270000', '270000', '', NULL, NULL),
(522, 'LMGA5EX', '2 SISI', '3', '', '285000', '365000', '365000', '365000', '', NULL, NULL),
(523, 'LMGA5EX', '2 SISI', '4', '', '380000', '460000', '460000', '460000', '', NULL, NULL),
(524, 'LMGA5EX', '2 SISI', '5', '', '480000', '560000', '560000', '560000', '', NULL, NULL),
(525, 'LMGA5EX', '2 SISI', '6', '', '570000', '650000', '650000', '650000', '', NULL, NULL),
(526, 'LMGA5EX', '2 SISI', '7', '', '670000', '750000', '750000', '750000', '', NULL, NULL),
(527, 'LMGA5EX', '2 SISI', '8', '', '760000', '840000', '840000', '840000', '', NULL, NULL),
(528, 'LMGA5EX', '2 SISI', '9', '', '860000', '940000', '940000', '940000', '', NULL, NULL),
(529, 'LMGA5EX', '2 SISI', '10', '', '950000', '1030000', '1030000', '1030000', '', NULL, NULL),
(530, 'LMDA5EX', '1 SISI', '1', '', '200000', '280000', '280000', '280000', '', NULL, NULL),
(531, 'LMDA5EX', '1 SISI', '2', '', '200000', '280000', '280000', '280000', '', NULL, NULL),
(532, 'LMDA5EX', '1 SISI', '3', '', '200000', '280000', '280000', '280000', '', NULL, NULL),
(533, 'LMDA5EX', '1 SISI', '4', '', '230000', '310000', '310000', '310000', '', NULL, NULL),
(534, 'LMDA5EX', '1 SISI', '5', '', '290000', '370000', '370000', '370000', '', NULL, NULL),
(535, 'LMDA5EX', '1 SISI', '6', '', '350000', '430000', '430000', '430000', '', NULL, NULL),
(536, 'LMDA5EX', '1 SISI', '7', '', '400000', '480000', '480000', '480000', '', NULL, NULL),
(537, 'LMDA5EX', '1 SISI', '8', '', '465000', '545000', '545000', '545000', '', NULL, NULL),
(538, 'LMDA5EX', '1 SISI', '9', '', '520000', '600000', '600000', '600000', '', NULL, NULL),
(539, 'LMDA5EX', '1 SISI', '10', '', '580000', '660000', '660000', '660000', '', NULL, NULL),
(540, 'LMDA5EX', '2 SISI', '1', '', '200000', '280000', '280000', '280000', '', NULL, NULL),
(541, 'LMDA5EX', '2 SISI', '2', '', '230000', '310000', '310000', '310000', '', NULL, NULL),
(542, 'LMDA5EX', '2 SISI', '3', '', '350000', '430000', '430000', '430000', '', NULL, NULL),
(543, 'LMDA5EX', '2 SISI', '4', '', '460000', '540000', '540000', '540000', '', NULL, NULL),
(544, 'LMDA5EX', '2 SISI', '5', '', '580000', '660000', '660000', '660000', '', NULL, NULL),
(545, 'LMDA5EX', '2 SISI', '6', '', '700000', '780000', '780000', '780000', '', NULL, NULL),
(546, 'LMDA5EX', '2 SISI', '7', '', '800000', '880000', '880000', '880000', '', NULL, NULL),
(547, 'LMDA5EX', '2 SISI', '8', '', '930000', '1010000', '1010000', '1010000', '', NULL, NULL),
(548, 'LMDA5EX', '2 SISI', '9', '', '1050000', '1130000', '1130000', '1130000', '', NULL, NULL),
(549, 'LMDA5EX', '2 SISI', '10', '', '1160000', '1240000', '1240000', '1240000', '', NULL, NULL),
(550, 'BKS120A4EX', '1 SISI', '1', '', '450000', '590000', '590000', '590000', '', NULL, NULL),
(551, 'BKS120A4EX', '1 SISI', '2', '', '575000', '715000', '715000', '715000', '', NULL, NULL),
(552, 'BKS120A4EX', '1 SISI', '3', '', '700000', '840000', '840000', '840000', '', NULL, NULL),
(553, 'BKS120A4EX', '1 SISI', '4', '', '800000', '940000', '940000', '940000', '', NULL, NULL),
(554, 'BKS120A4EX', '1 SISI', '5', '', '950000', '1090000', '1090000', '1090000', '', NULL, NULL),
(555, 'BKS120A4EX', '1 SISI', '6', '', '1100000', '1250000', '1250000', '1250000', '', NULL, NULL),
(556, 'BKS120A4EX', '1 SISI', '7', '', '1250000', '1400000', '1400000', '1400000', '', NULL, NULL),
(557, 'BKS120A4EX', '1 SISI', '8', '', '1400000', '1550000', '1550000', '1550000', '', NULL, NULL),
(558, 'BKS120A4EX', '1 SISI', '9', '', '1550000', '1700000', '1700000', '1700000', '', NULL, NULL),
(559, 'BKS120A4EX', '1 SISI', '10', '', '1650000', '1800000', '1800000', '1800000', '', NULL, NULL),
(560, 'BKS120A4EX', '2 SISI', '1', '', '450000', '590000', '590000', '590000', '', NULL, NULL),
(561, 'BKS120A4EX', '2 SISI', '2', '', '575000', '715000', '715000', '715000', '', NULL, NULL),
(562, 'BKS120A4EX', '2 SISI', '3', '', '700000', '840000', '840000', '840000', '', NULL, NULL),
(563, 'BKS120A4EX', '2 SISI', '4', '', '800000', '940000', '940000', '940000', '', NULL, NULL),
(564, 'BKS120A4EX', '2 SISI', '5', '', '1000000', '1140000', '1140000', '1140000', '', NULL, NULL),
(565, 'BKS120A4EX', '2 SISI', '6', '', '1200000', '1350000', '1350000', '1350000', '', NULL, NULL),
(566, 'BKS120A4EX', '2 SISI', '7', '', '1380000', '1530000', '1530000', '1530000', '', NULL, NULL),
(567, 'BKS120A4EX', '2 SISI', '8', '', '1550000', '1700000', '1700000', '1700000', '', NULL, NULL),
(568, 'BKS120A4EX', '2 SISI', '9', '', '1700000', '1850000', '1850000', '1850000', '', NULL, NULL),
(569, 'BKS120A4EX', '2 SISI', '10', '', '1850000', '2000000', '2000000', '2000000', '', NULL, NULL),
(570, 'BKS150A4EX', '1 SISI', '1', '', '500000', '640000', '640000', '640000', '', NULL, NULL),
(571, 'BKS150A4EX', '1 SISI', '2', '', '650000', '790000', '790000', '790000', '', NULL, NULL),
(572, 'BKS150A4EX', '1 SISI', '3', '', '800000', '940000', '940000', '940000', '', NULL, NULL),
(573, 'BKS150A4EX', '1 SISI', '4', '', '950000', '1090000', '1090000', '1090000', '', NULL, NULL),
(574, 'BKS150A4EX', '1 SISI', '5', '', '1100000', '1240000', '1240000', '1240000', '', NULL, NULL),
(575, 'BKS150A4EX', '1 SISI', '6', '', '1250000', '1400000', '1400000', '1400000', '', NULL, NULL),
(576, 'BKS150A4EX', '1 SISI', '7', '', '1400000', '1550000', '1550000', '1550000', '', NULL, NULL),
(577, 'BKS150A4EX', '1 SISI', '8', '', '1500000', '1650000', '1650000', '1650000', '', NULL, NULL),
(578, 'BKS150A4EX', '1 SISI', '9', '', '1650000', '1800000', '1800000', '1800000', '', NULL, NULL),
(579, 'BKS150A4EX', '1 SISI', '10', '', '1800000', '1950000', '1950000', '1950000', '', NULL, NULL),
(580, 'BKS150A4EX', '2 SISI', '1', '', '500000', '640000', '640000', '640000', '', NULL, NULL),
(581, 'BKS150A4EX', '2 SISI', '2', '', '650000', '790000', '790000', '790000', '', NULL, NULL),
(582, 'BKS150A4EX', '2 SISI', '3', '', '800000', '940000', '940000', '940000', '', NULL, NULL),
(583, 'BKS150A4EX', '2 SISI', '4', '', '950000', '1090000', '1090000', '1090000', '', NULL, NULL),
(584, 'BKS150A4EX', '2 SISI', '5', '', '1150000', '1290000', '1290000', '1290000', '', NULL, NULL),
(585, 'BKS150A4EX', '2 SISI', '6', '', '1350000', '1500000', '1500000', '1500000', '', NULL, NULL),
(586, 'BKS150A4EX', '2 SISI', '7', '', '1550000', '1700000', '1700000', '1700000', '', NULL, NULL),
(587, 'BKS150A4EX', '2 SISI', '8', '', '1680000', '1830000', '1830000', '1830000', '', NULL, NULL),
(588, 'BKS150A4EX', '2 SISI', '9', '', '1870000', '2020000', '2020000', '2020000', '', NULL, NULL),
(589, 'BKS150A4EX', '2 SISI', '10', '', '2070000', '2220000', '2220000', '2220000', '', NULL, NULL),
(590, 'LMGA4EX', '1 SISI', '1', '', '180000', '260000', '260000', '260000', '', NULL, NULL),
(591, 'LMGA4EX', '1 SISI', '2', '', '180000', '260000', '260000', '260000', '', NULL, NULL),
(592, 'LMGA4EX', '1 SISI', '3', '', '260000', '340000', '340000', '340000', '', NULL, NULL),
(593, 'LMGA4EX', '1 SISI', '4', '', '350000', '430000', '430000', '430000', '', NULL, NULL),
(594, 'LMGA4EX', '1 SISI', '5', '', '435000', '515000', '515000', '515000', '', NULL, NULL),
(595, 'LMGA4EX', '1 SISI', '6', '', '525000', '605000', '605000', '605000', '', NULL, NULL),
(596, 'LMGA4EX', '1 SISI', '7', '', '610000', '690000', '690000', '690000', '', NULL, NULL),
(597, 'LMGA4EX', '1 SISI', '8', '', '700000', '780000', '780000', '780000', '', NULL, NULL),
(598, 'LMGA4EX', '1 SISI', '9', '', '785000', '865000', '865000', '865000', '', NULL, NULL),
(599, 'LMGA4EX', '1 SISI', '10', '', '875000', '955000', '955000', '955000', '', NULL, NULL),
(600, 'LMGA4EX', '2 SISI', '1', '', '180000', '260000', '260000', '260000', '', NULL, NULL),
(601, 'LMGA4EX', '2 SISI', '2', '', '350000', '430000', '430000', '430000', '', NULL, NULL),
(602, 'LMGA4EX', '2 SISI', '3', '', '520000', '600000', '600000', '600000', '', NULL, NULL),
(603, 'LMGA4EX', '2 SISI', '4', '', '700000', '780000', '780000', '780000', '', NULL, NULL),
(604, 'LMGA4EX', '2 SISI', '5', '', '870000', '950000', '950000', '950000', '', NULL, NULL),
(605, 'LMGA4EX', '2 SISI', '6', '', '1050000', '1130000', '1130000', '1130000', '', NULL, NULL),
(606, 'LMGA4EX', '2 SISI', '7', '', '1220000', '1300000', '1300000', '1300000', '', NULL, NULL),
(607, 'LMGA4EX', '2 SISI', '8', '', '1400000', '1480000', '1480000', '1480000', '', NULL, NULL),
(608, 'LMGA4EX', '2 SISI', '9', '', '1570000', '1650000', '1650000', '1650000', '', NULL, NULL),
(609, 'LMGA4EX', '2 SISI', '10', '', '1750000', '1830000', '1830000', '1830000', '', NULL, NULL),
(610, 'LMDA4EX', '1 SISI', '1', '', '200000', '280000', '280000', '280000', '', NULL, NULL),
(611, 'LMDA4EX', '1 SISI', '2', '', '215000', '295000', '295000', '295000', '', NULL, NULL),
(612, 'LMDA4EX', '1 SISI', '3', '', '320000', '400000', '400000', '400000', '', NULL, NULL);
INSERT INTO `hargabahans` (`id`, `kode_bahan`, `sisi`, `qty_min`, `qty_max`, `harga_po`, `harga_umum`, `harga_member`, `harga_khusus`, `harga_custom`, `created_at`, `updated_at`) VALUES
(613, 'LMDA4EX', '1 SISI', '4', '', '425000', '505000', '505000', '505000', '', NULL, NULL),
(614, 'LMDA4EX', '1 SISI', '5', '', '530000', '610000', '610000', '610000', '', NULL, NULL),
(615, 'LMDA4EX', '1 SISI', '6', '', '640000', '720000', '720000', '720000', '', NULL, NULL),
(616, 'LMDA4EX', '1 SISI', '7', '', '745000', '825000', '825000', '825000', '', NULL, NULL),
(617, 'LMDA4EX', '1 SISI', '8', '', '850000', '930000', '930000', '930000', '', NULL, NULL),
(618, 'LMDA4EX', '1 SISI', '9', '', '955000', '1035000', '1035000', '1035000', '', NULL, NULL),
(619, 'LMDA4EX', '1 SISI', '10', '', '1065000', '1145000', '1145000', '1145000', '', NULL, NULL),
(620, 'LMDA4EX', '2 SISI', '1', '', '215000', '295000', '295000', '295000', '', NULL, NULL),
(621, 'LMDA4EX', '2 SISI', '2', '', '430000', '510000', '510000', '510000', '', NULL, NULL),
(622, 'LMDA4EX', '2 SISI', '3', '', '640000', '720000', '720000', '720000', '', NULL, NULL),
(623, 'LMDA4EX', '2 SISI', '4', '', '850000', '930000', '930000', '930000', '', NULL, NULL),
(624, 'LMDA4EX', '2 SISI', '5', '', '1060000', '1140000', '1140000', '1140000', '', NULL, NULL),
(625, 'LMDA4EX', '2 SISI', '6', '', '1280000', '1360000', '1360000', '1360000', '', NULL, NULL),
(626, 'LMDA4EX', '2 SISI', '7', '', '1490000', '1570000', '1570000', '1570000', '', NULL, NULL),
(627, 'LMDA4EX', '2 SISI', '8', '', '1700000', '1780000', '1780000', '1780000', '', NULL, NULL),
(628, 'LMDA4EX', '2 SISI', '9', '', '1900000', '1980000', '1980000', '1980000', '', NULL, NULL),
(629, 'LMDA4EX', '2 SISI', '10', '', '2130000', '2210000', '2210000', '2210000', '', NULL, NULL),
(630, 'NCR1', '1 SISI', '40', '', '220000', '340000', '320000', '', '', NULL, NULL),
(631, 'NCR1', '1 SISI', '80', '', '440000', '570000', '560000', '', '', NULL, NULL),
(632, 'NCR1', '1 SISI', '120', '', '660000', '800000', '790000', '', '', NULL, NULL),
(633, 'NCR2', '1 SISI', '40', '', '330000', '450000', '430000', '', '', NULL, NULL),
(634, 'NCR2', '1 SISI', '80', '', '660000', '790000', '780000', '', '', NULL, NULL),
(635, 'NCR2', '1 SISI', '120', '', '990000', '1130000', '1120000', '', '', NULL, NULL),
(636, 'NCR3', '1 SISI', '40', '', '440000', '560000', '540000', '', '', NULL, NULL),
(637, 'NCR3', '1 SISI', '80', '', '880000', '1010000', '1000000', '', '', NULL, NULL),
(638, 'NCR3', '1 SISI', '120', '', '1320000', '1460000', '1450000', '', '', NULL, NULL),
(639, 'NCR4', '1 SISI', '40', '', '240000', '380000', '360000', '', '', NULL, NULL),
(640, 'NCR4', '1 SISI', '80', '', '480000', '650000', '640000', '', '', NULL, NULL),
(641, 'NCR4', '1 SISI', '120', '', '720000', '920000', '910000', '', '', NULL, NULL),
(642, 'NCR5', '1 SISI', '40', '', '350000', '490000', '470000', '', '', NULL, NULL),
(643, 'NCR5', '1 SISI', '80', '', '700000', '870000', '860000', '', '', NULL, NULL),
(644, 'NCR5', '1 SISI', '120', '', '1050000', '1250000', '1240000', '', '', NULL, NULL),
(645, 'NCR6', '1 SISI', '40', '', '460000', '600000', '580000', '', '', NULL, NULL),
(646, 'NCR6', '1 SISI', '80', '', '920000', '1090000', '1080000', '', '', NULL, NULL),
(647, 'NCR6', '1 SISI', '120', '', '1380000', '1580000', '1570000', '', '', NULL, NULL),
(648, 'NCR7', '1 SISI', '40', '', '260000', '420000', '400000', '', '', NULL, NULL),
(649, 'NCR7', '1 SISI', '80', '', '520000', '730000', '720000', '', '', NULL, NULL),
(650, 'NCR7', '1 SISI', '120', '', '780000', '1040000', '1030000', '', '', NULL, NULL),
(651, 'NCR8', '1 SISI', '40', '', '370000', '530000', '510000', '', '', NULL, NULL),
(652, 'NCR8', '1 SISI', '80', '', '740000', '950000', '940000', '', '', NULL, NULL),
(653, 'NCR8', '1 SISI', '120', '', '1110000', '1370000', '1360000', '', '', NULL, NULL),
(654, 'NCR9', '1 SISI', '40', '', '480000', '640000', '620000', '', '', NULL, NULL),
(655, 'NCR9', '1 SISI', '80', '', '960000', '1170000', '1160000', '', '', NULL, NULL),
(656, 'NCR9', '1 SISI', '120', '', '1440000', '1700000', '1690000', '', '', NULL, NULL),
(657, 'NCR10', '1 SISI', '30', '', '219000', '339000', '319000', '', '', NULL, NULL),
(658, 'NCR10', '1 SISI', '60', '', '438000', '558000', '538000', '', '', NULL, NULL),
(659, 'NCR10', '1 SISI', '90', '', '657000', '787000', '777000', '', '', NULL, NULL),
(660, 'NCR10', '1 SISI', '120', '', '876000', '1016000', '1006000', '', '', NULL, NULL),
(661, 'NCR11', '1 SISI', '30', '', '330000', '450000', '430000', '', '', NULL, NULL),
(662, 'NCR11', '1 SISI', '60', '', '660000', '780000', '760000', '', '', NULL, NULL),
(663, 'NCR11', '1 SISI', '90', '', '990000', '1120000', '1110000', '', '', NULL, NULL),
(664, 'NCR11', '1 SISI', '120', '', '1320000', '1460000', '1450000', '', '', NULL, NULL),
(665, 'NCR12', '1 SISI', '30', '', '435000', '555000', '535000', '', '', NULL, NULL),
(666, 'NCR12', '1 SISI', '60', '', '870000', '990000', '970000', '', '', NULL, NULL),
(667, 'NCR12', '1 SISI', '90', '', '1305000', '1435000', '1425000', '', '', NULL, NULL),
(668, 'NCR12', '1 SISI', '120', '', '1740000', '1880000', '1870000', '', '', NULL, NULL),
(669, 'NCR13', '1 SISI', '30', '', '234000', '369000', '349000', '', '', NULL, NULL),
(670, 'NCR13', '1 SISI', '60', '', '468000', '618000', '598000', '', '', NULL, NULL),
(671, 'NCR13', '1 SISI', '90', '', '702000', '877000', '867000', '', '', NULL, NULL),
(672, 'NCR13', '1 SISI', '120', '', '936000', '1136000', '1126000', '', '', NULL, NULL),
(673, 'NCR14', '1 SISI', '30', '', '345000', '480000', '460000', '', '', NULL, NULL),
(674, 'NCR14', '1 SISI', '60', '', '690000', '840000', '820000', '', '', NULL, NULL),
(675, 'NCR14', '1 SISI', '90', '', '1035000', '1210000', '1200000', '', '', NULL, NULL),
(676, 'NCR14', '1 SISI', '120', '', '1380000', '1580000', '1570000', '', '', NULL, NULL),
(677, 'NCR15', '1 SISI', '30', '', '450000', '585000', '565000', '', '', NULL, NULL),
(678, 'NCR15', '1 SISI', '60', '', '900000', '1050000', '1030000', '', '', NULL, NULL),
(679, 'NCR15', '1 SISI', '90', '', '1350000', '1525000', '1515000', '', '', NULL, NULL),
(680, 'NCR15', '1 SISI', '120', '', '1800000', '2000000', '1990000', '', '', NULL, NULL),
(681, 'NCR16', '1 SISI', '30', '', '249000', '399000', '379000', '', '', NULL, NULL),
(682, 'NCR16', '1 SISI', '60', '', '498000', '678000', '658000', '', '', NULL, NULL),
(683, 'NCR16', '1 SISI', '90', '', '747000', '967000', '957000', '', '', NULL, NULL),
(684, 'NCR16', '1 SISI', '120', '', '996000', '1256000', '1246000', '', '', NULL, NULL),
(685, 'NCR17', '1 SISI', '30', '', '360000', '510000', '490000', '', '', NULL, NULL),
(686, 'NCR17', '1 SISI', '60', '', '720000', '900000', '880000', '', '', NULL, NULL),
(687, 'NCR17', '1 SISI', '90', '', '1080000', '1300000', '1290000', '', '', NULL, NULL),
(688, 'NCR17', '1 SISI', '120', '', '1440000', '1700000', '1690000', '', '', NULL, NULL),
(689, 'NCR18', '1 SISI', '30', '', '465000', '615000', '595000', '', '', NULL, NULL),
(690, 'NCR18', '1 SISI', '60', '', '930000', '1110000', '1090000', '', '', NULL, NULL),
(691, 'NCR18', '1 SISI', '90', '', '1395000', '1615000', '1605000', '', '', NULL, NULL),
(692, 'NCR18', '1 SISI', '120', '', '1860000', '2120000', '2110000', '', '', NULL, NULL),
(693, 'NCR19', '1 SISI', '20', '', '220000', '340000', '320000', '', '', NULL, NULL),
(694, 'NCR19', '1 SISI', '40', '', '440000', '560000', '540000', '', '', NULL, NULL),
(695, 'NCR19', '1 SISI', '60', '', '660000', '780000', '760000', '', '', NULL, NULL),
(696, 'NCR19', '1 SISI', '80', '', '880000', '1010000', '1000000', '', '', NULL, NULL),
(697, 'NCR19', '1 SISI', '100', '', '1100000', '1240000', '1230000', '', '', NULL, NULL),
(698, 'NCR19', '1 SISI', '120', '', '1320000', '1460000', '1450000', '', '', NULL, NULL),
(699, 'NCR19', '1 SISI', '200', '', '2200000', '2340000', '2330000', '', '', NULL, NULL),
(700, 'NCR20', '1 SISI', '20', '', '330000', '450000', '430000', '', '', NULL, NULL),
(701, 'NCR20', '1 SISI', '40', '', '660000', '780000', '760000', '', '', NULL, NULL),
(702, 'NCR20', '1 SISI', '60', '', '990000', '1110000', '1090000', '', '', NULL, NULL),
(703, 'NCR20', '1 SISI', '80', '', '1320000', '1450000', '1440000', '', '', NULL, NULL),
(704, 'NCR20', '1 SISI', '100', '', '1650000', '1790000', '1780000', '', '', NULL, NULL),
(705, 'NCR20', '1 SISI', '120', '', '1980000', '2120000', '2110000', '', '', NULL, NULL),
(706, 'NCR20', '1 SISI', '200', '', '3300000', '3440000', '3430000', '', '', NULL, NULL),
(707, 'NCR21', '1 SISI', '20', '', '440000', '560000', '540000', '', '', NULL, NULL),
(708, 'NCR21', '1 SISI', '40', '', '880000', '1000000', '980000', '', '', NULL, NULL),
(709, 'NCR21', '1 SISI', '60', '', '1320000', '1440000', '1420000', '', '', NULL, NULL),
(710, 'NCR21', '1 SISI', '80', '', '1760000', '1890000', '1880000', '', '', NULL, NULL),
(711, 'NCR21', '1 SISI', '100', '', '2200000', '2340000', '2330000', '', '', NULL, NULL),
(712, 'NCR21', '1 SISI', '120', '', '2640000', '2780000', '2770000', '', '', NULL, NULL),
(713, 'NCR21', '1 SISI', '200', '', '4400000', '4540000', '4530000', '', '', NULL, NULL),
(714, 'NC22', '1 SISI', '20', '', '230000', '360000', '340000', '', '', NULL, NULL),
(715, 'NC22', '1 SISI', '40', '', '460000', '600000', '580000', '', '', NULL, NULL),
(716, 'NC22', '1 SISI', '60', '', '690000', '840000', '820000', '', '', NULL, NULL),
(717, 'NC22', '1 SISI', '80', '', '920000', '1090000', '1080000', '', '', NULL, NULL),
(718, 'NC22', '1 SISI', '100', '', '1150000', '1340000', '1330000', '', '', NULL, NULL),
(719, 'NC22', '1 SISI', '120', '', '1380000', '1580000', '1570000', '', '', NULL, NULL),
(720, 'NC22', '1 SISI', '200', '', '2300000', '2540000', '2530000', '', '', NULL, NULL),
(721, 'NCR20', '1 SISI', '20', '', '340000', '470000', '450000', '', '', NULL, NULL),
(722, 'NCR20', '1 SISI', '40', '', '680000', '820000', '800000', '', '', NULL, NULL),
(723, 'NCR20', '1 SISI', '60', '', '1020000', '1170000', '1150000', '', '', NULL, NULL),
(724, 'NCR20', '1 SISI', '80', '', '1360000', '1530000', '1520000', '', '', NULL, NULL),
(725, 'NCR20', '1 SISI', '100', '', '1700000', '1890000', '1880000', '', '', NULL, NULL),
(726, 'NCR20', '1 SISI', '120', '', '2040000', '2240000', '2230000', '', '', NULL, NULL),
(727, 'NCR20', '1 SISI', '200', '', '3400000', '3640000', '3630000', '', '', NULL, NULL),
(728, 'NCR21', '1 SISI', '20', '', '450000', '580000', '560000', '', '', NULL, NULL),
(729, 'NCR21', '1 SISI', '40', '', '900000', '1040000', '1020000', '', '', NULL, NULL),
(730, 'NCR21', '1 SISI', '60', '', '1350000', '1500000', '1480000', '', '', NULL, NULL),
(731, 'NCR21', '1 SISI', '80', '', '1800000', '1970000', '1960000', '', '', NULL, NULL),
(732, 'NCR21', '1 SISI', '100', '', '2250000', '2440000', '2430000', '', '', NULL, NULL),
(733, 'NCR21', '1 SISI', '120', '', '2700000', '2900000', '2890000', '', '', NULL, NULL),
(734, 'NCR21', '1 SISI', '200', '', '4500000', '4740000', '4730000', '', '', NULL, NULL),
(735, 'NCR22', '1 SISI', '20', '', '240000', '380000', '360000', '', '', NULL, NULL),
(736, 'NCR22', '1 SISI', '40', '', '480000', '640000', '620000', '', '', NULL, NULL),
(737, 'NCR22', '1 SISI', '60', '', '720000', '900000', '880000', '', '', NULL, NULL),
(738, 'NCR22', '1 SISI', '80', '', '960000', '1170000', '1160000', '', '', NULL, NULL),
(739, 'NCR22', '1 SISI', '100', '', '1200000', '1440000', '1430000', '', '', NULL, NULL),
(740, 'NCR22', '1 SISI', '120', '', '1440000', '1700000', '1690000', '', '', NULL, NULL),
(741, 'NCR22', '1 SISI', '200', '', '2400000', '2740000', '2730000', '', '', NULL, NULL),
(742, 'NCR23', '1 SISI', '20', '', '350000', '490000', '470000', '', '', NULL, NULL),
(743, 'NCR23', '1 SISI', '40', '', '700000', '860000', '840000', '', '', NULL, NULL),
(744, 'NCR23', '1 SISI', '60', '', '1050000', '1230000', '1210000', '', '', NULL, NULL),
(745, 'NCR23', '1 SISI', '80', '', '1400000', '1610000', '1600000', '', '', NULL, NULL),
(746, 'NCR23', '1 SISI', '100', '', '1750000', '1990000', '1980000', '', '', NULL, NULL),
(747, 'NCR23', '1 SISI', '120', '', '2100000', '2360000', '2350000', '', '', NULL, NULL),
(748, 'NCR23', '1 SISI', '200', '', '3500000', '3840000', '3830000', '', '', NULL, NULL),
(749, 'NCR24', '1 SISI', '20', '', '460000', '600000', '580000', '', '', NULL, NULL),
(750, 'NCR24', '1 SISI', '40', '', '920000', '1080000', '1060000', '', '', NULL, NULL),
(751, 'NCR24', '1 SISI', '60', '', '1380000', '1560000', '1540000', '', '', NULL, NULL),
(752, 'NCR24', '1 SISI', '80', '', '1840000', '2050000', '2040000', '', '', NULL, NULL),
(753, 'NCR24', '1 SISI', '100', '', '2300000', '2540000', '2530000', '', '', NULL, NULL),
(754, 'NCR24', '1 SISI', '120', '', '2760000', '3020000', '3010000', '', '', NULL, NULL),
(755, 'NCR24', '1 SISI', '200', '', '4600000', '4940000', '4930000', '', '', NULL, NULL),
(756, 'NCR25', '1 SISI', '10', '', '220000', '340000', '320000', '', '', NULL, NULL),
(757, 'NCR25', '1 SISI', '20', '', '440000', '560000', '540000', '', '', NULL, NULL),
(758, 'NCR25', '1 SISI', '30', '', '660000', '780000', '760000', '', '', NULL, NULL),
(759, 'NCR25', '1 SISI', '40', '', '880000', '1000000', '980000', '', '', NULL, NULL),
(760, 'NCR25', '1 SISI', '80', '', '1760000', '1890000', '1880000', '', '', NULL, NULL),
(761, 'NCR25', '1 SISI', '100', '', '2200000', '2340000', '2330000', '', '', NULL, NULL),
(762, 'NCR25', '1 SISI', '200', '', '4400000', '4540000', '4530000', '', '', NULL, NULL),
(763, 'NCR26', '1 SISI', '10', '', '330000', '450000', '430000', '', '', NULL, NULL),
(764, 'NCR26', '1 SISI', '20', '', '660000', '780000', '760000', '', '', NULL, NULL),
(765, 'NCR26', '1 SISI', '30', '', '990000', '1110000', '1090000', '', '', NULL, NULL),
(766, 'NCR26', '1 SISI', '40', '', '1320000', '1440000', '1420000', '', '', NULL, NULL),
(767, 'NCR26', '1 SISI', '80', '', '2640000', '2770000', '2760000', '', '', NULL, NULL),
(768, 'NCR26', '1 SISI', '100', '', '3300000', '3440000', '3430000', '', '', NULL, NULL),
(769, 'NCR26', '1 SISI', '200', '', '6600000', '6740000', '6730000', '', '', NULL, NULL),
(770, 'NCR27', '1 SISI', '10', '', '440000', '560000', '540000', '', '', NULL, NULL),
(771, 'NCR27', '1 SISI', '20', '', '880000', '1000000', '980000', '', '', NULL, NULL),
(772, 'NCR27', '1 SISI', '30', '', '1320000', '1440000', '1420000', '', '', NULL, NULL),
(773, 'NCR27', '1 SISI', '40', '', '1760000', '1880000', '1860000', '', '', NULL, NULL),
(774, 'NCR27', '1 SISI', '80', '', '3520000', '3650000', '3640000', '', '', NULL, NULL),
(775, 'NCR27', '1 SISI', '100', '', '4400000', '4540000', '4530000', '', '', NULL, NULL),
(776, 'NCR27', '1 SISI', '200', '', '8800000', '8940000', '8930000', '', '', NULL, NULL),
(777, 'NCR28', '1 SISI', '10', '', '225000', '350000', '330000', '', '', NULL, NULL),
(778, 'NCR28', '1 SISI', '20', '', '450000', '580000', '560000', '', '', NULL, NULL),
(779, 'NCR28', '1 SISI', '30', '', '675000', '810000', '790000', '', '', NULL, NULL),
(780, 'NCR28', '1 SISI', '40', '', '900000', '1040000', '1020000', '', '', NULL, NULL),
(781, 'NCR28', '1 SISI', '80', '', '1800000', '1970000', '1960000', '', '', NULL, NULL),
(782, 'NCR28', '1 SISI', '100', '', '2250000', '2440000', '2430000', '', '', NULL, NULL),
(783, 'NCR28', '1 SISI', '200', '', '4500000', '4740000', '4730000', '', '', NULL, NULL),
(784, 'NCR29', '1 SISI', '10', '', '335000', '460000', '440000', '', '', NULL, NULL),
(785, 'NCR29', '1 SISI', '20', '', '670000', '800000', '780000', '', '', NULL, NULL),
(786, 'NCR29', '1 SISI', '30', '', '1005000', '1140000', '1120000', '', '', NULL, NULL),
(787, 'NCR29', '1 SISI', '40', '', '1340000', '1480000', '1460000', '', '', NULL, NULL),
(788, 'NCR29', '1 SISI', '80', '', '2680000', '2850000', '2840000', '', '', NULL, NULL),
(789, 'NCR29', '1 SISI', '100', '', '3350000', '3540000', '3530000', '', '', NULL, NULL),
(790, 'NCR29', '1 SISI', '200', '', '6700000', '6940000', '6930000', '', '', NULL, NULL),
(791, 'NCR30', '1 SISI', '10', '', '445000', '570000', '550000', '', '', NULL, NULL),
(792, 'NCR30', '1 SISI', '20', '', '890000', '1020000', '1000000', '', '', NULL, NULL),
(793, 'NCR30', '1 SISI', '30', '', '1335000', '1470000', '1450000', '', '', NULL, NULL),
(794, 'NCR30', '1 SISI', '40', '', '1780000', '1920000', '1900000', '', '', NULL, NULL),
(795, 'NCR30', '1 SISI', '80', '', '3560000', '3730000', '3720000', '', '', NULL, NULL),
(796, 'NCR30', '1 SISI', '100', '', '4450000', '4640000', '4630000', '', '', NULL, NULL),
(797, 'NCR30', '1 SISI', '200', '', '8900000', '9140000', '9130000', '', '', NULL, NULL),
(798, 'NCR31', '1 SISI', '10', '', '230000', '360000', '340000', '', '', NULL, NULL),
(799, 'NCR31', '1 SISI', '20', '', '460000', '600000', '580000', '', '', NULL, NULL),
(800, 'NCR31', '1 SISI', '30', '', '690000', '840000', '820000', '', '', NULL, NULL),
(801, 'NCR31', '1 SISI', '40', '', '920000', '1080000', '1060000', '', '', NULL, NULL),
(802, 'NCR31', '1 SISI', '80', '', '1840000', '2050000', '2040000', '', '', NULL, NULL),
(803, 'NCR31', '1 SISI', '100', '', '2300000', '2540000', '2530000', '', '', NULL, NULL),
(804, 'NCR31', '1 SISI', '200', '', '4600000', '4940000', '4930000', '', '', NULL, NULL),
(805, 'NCR32', '1 SISI', '10', '', '340000', '470000', '450000', '', '', NULL, NULL),
(806, 'NCR32', '1 SISI', '20', '', '680000', '820000', '800000', '', '', NULL, NULL),
(807, 'NCR32', '1 SISI', '30', '', '1020000', '1170000', '1150000', '', '', NULL, NULL),
(808, 'NCR32', '1 SISI', '40', '', '1360000', '1520000', '1500000', '', '', NULL, NULL),
(809, 'NCR32', '1 SISI', '80', '', '2720000', '2930000', '2920000', '', '', NULL, NULL),
(810, 'NCR32', '1 SISI', '100', '', '3400000', '3640000', '3630000', '', '', NULL, NULL),
(811, 'NCR32', '1 SISI', '200', '', '6800000', '7140000', '7130000', '', '', NULL, NULL),
(812, 'NCR33', '1 SISI', '10', '', '450000', '580000', '560000', '', '', NULL, NULL),
(813, 'NCR33', '1 SISI', '20', '', '900000', '1040000', '1020000', '', '', NULL, NULL),
(814, 'NCR33', '1 SISI', '30', '', '1350000', '1500000', '1480000', '', '', NULL, NULL),
(815, 'NCR33', '1 SISI', '40', '', '1800000', '1960000', '1940000', '', '', NULL, NULL),
(816, 'NCR33', '1 SISI', '80', '', '3600000', '3810000', '3800000', '', '', NULL, NULL),
(817, 'NCR33', '1 SISI', '100', '', '4500000', '4740000', '4730000', '', '', NULL, NULL),
(818, 'NCR33', '1 SISI', '200', '', '9000000', '9340000', '9330000', '', '', NULL, NULL),
(819, 'NCR34', '1 SISI', '10', '', '120000', '220000', '220000', '', '', NULL, NULL),
(820, 'NCR34', '1 SISI', '20', '', '200000', '310000', '300000', '', '', NULL, NULL),
(821, 'NCR34', '1 SISI', '40', '', '340000', '450000', '440000', '', '', NULL, NULL),
(822, ' BHVS70A4HP ', ' 1 SISI ', ' 1 ', '', '75000', '125000', '125000', '125000', '', NULL, NULL),
(823, ' BHVS70A4HP ', ' 1 SISI ', ' 2 ', '', '140000', '200000', '200000', '200000', '', NULL, NULL),
(824, ' BHVS70A4HP ', ' 1 SISI ', ' 4 ', '', '280000', '340000', '340000', '340000', '', NULL, NULL),
(825, ' BHVS70A3HP ', ' 1 SISI ', ' 1 ', '', '210000', '290000', '290000', '290000', '', NULL, NULL),
(826, ' BHVS70A3HP ', ' 1 SISI ', ' 2 ', '', '350000', '430000', '430000', '430000', '', NULL, NULL),
(827, ' BHVS70A3HP ', ' 1 SISI ', '', '', '', '', '', '', '', NULL, NULL),
(828, ' BHVS70A4FC ', ' 1 SISI ', ' 25 ', '', '2175000', '2425000', '2425000', '2425000', '', NULL, NULL),
(829, ' BHVS70A4FC ', ' 1 SISI ', ' 40 ', '', '3480000', '3880000', '3880000', '3880000', '', NULL, NULL),
(830, ' BHVS70A3FC ', ' 1 SISI ', ' 1 ', '', '600000', '720000', '720000', '720000', '', NULL, NULL),
(831, ' BHVS70A3FC ', ' 1 SISI ', ' 2 ', '', '700000', '820000', '820000', '820000', '', NULL, NULL),
(832, ' BHVS70A3FC ', ' 1 SISI ', ' 4 ', '', '900000', '1040000', '1040000', '1040000', '', NULL, NULL),
(833, 'BHVSKA5HP', ' 1 SISI ', ' 4 ', '', '220000', '320000', '320000', '320000', '', NULL, NULL),
(834, 'BHVSKA5HP', ' 1 SISI ', '8', '', '320000', '430000', '430000', '430000', '', NULL, NULL),
(835, 'BHVSKA5HP', ' 1 SISI ', '12', '', '480000', '630000', '630000', '630000', '', NULL, NULL),
(836, 'BHVSKA5HP', ' 1 SISI ', '16', '', '640000', '840000', '840000', '840000', '', NULL, NULL),
(837, 'BHVSKA4HP', ' 1 SISI ', '2', '', '160000', '250000', '250000', '250000', '', NULL, NULL),
(838, 'BHVSKA4HP', ' 1 SISI ', '4', '', '320000', '424000', '424000', '424000', '', NULL, NULL),
(839, 'BHVSKA4HP', ' 1 SISI ', '8', '', '640000', '848000', '848000', '848000', '', NULL, NULL),
(840, 'BHVSKA4HP', ' 1 SISI ', '16', '', '1280000', '1696000', '1696000', '1696000', '', NULL, NULL),
(841, ' BHVS70A4HP ', ' 2 SISI ', ' 1 ', '', '90000', '140000', '140000', '140000', '', NULL, NULL),
(842, ' BHVS70A4HP ', ' 2 SISI ', ' 2 ', '', '160000', '220000', '220000', '220000', '', NULL, NULL),
(843, ' BHVS70A4HP ', ' 2 SISI ', ' 4 ', '', '300000', '360000', '360000', '360000', '', NULL, NULL),
(844, ' BHVS70A3HP ', ' 2 SISI ', ' 1 ', '', '210000', '290000', '290000', '290000', '', NULL, NULL),
(845, ' BHVS70A3HP ', ' 2 SISI ', ' 2 ', '', '350000', '430000', '430000', '430000', '', NULL, NULL),
(846, ' BHVS70A3HP ', ' 2 SISI ', '', '', '', '', '', '', '', NULL, NULL),
(847, ' BHVS70A4FC ', ' 2 SISI ', ' 25 ', '', '2175000', '2425000', '2425000', '2425000', '', NULL, NULL),
(848, ' BHVS70A4FC ', ' 2 SISI ', ' 40 ', '', '3480000', '3880000', '3880000', '3880000', '', NULL, NULL),
(849, ' BHVS70A3FC ', ' 2 SISI ', ' 1 ', '', '600000', '720000', '720000', '720000', '', NULL, NULL),
(850, ' BHVS70A3FC ', ' 2 SISI ', ' 2 ', '', '700000', '820000', '820000', '820000', '', NULL, NULL),
(851, ' BHVS70A3FC ', ' 2 SISI ', ' 4 ', '', '900000', '1040000', '1040000', '1040000', '', NULL, NULL),
(852, 'BHVSKA5HP', ' 2 SISI ', ' 4 ', '', '220000', '320000', '320000', '320000', '', NULL, NULL),
(853, 'BHVSKA5HP', ' 2 SISI ', '8', '', '320000', '430000', '430000', '430000', '', NULL, NULL),
(854, 'BHVSKA5HP', ' 2 SISI ', '12', '', '480000', '630000', '630000', '630000', '', NULL, NULL),
(855, 'BHVSKA5HP', ' 2 SISI ', '16', '', '640000', '840000', '840000', '840000', '', NULL, NULL),
(856, 'BHVSKA4HP', ' 2 SISI ', '2', '', '160000', '250000', '250000', '250000', '', NULL, NULL),
(857, 'BHVSKA4HP', ' 2 SISI ', '4', '', '320000', '424000', '424000', '424000', '', NULL, NULL),
(858, 'BHVSKA4HP', ' 2 SISI ', '8', '', '640000', '848000', '848000', '848000', '', NULL, NULL),
(859, 'BHVSKA4HP', ' 2 SISI ', '16', '', '1280000', '1696000', '1696000', '1696000', '', NULL, NULL),
(860, 'AMP1', '', ' 1 ', '', '', '300000', '300000', '300000', '', NULL, NULL),
(861, 'AMP1', '', ' 5 ', '', '', '450000', '450000', '450000', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `itemstokbahans`
--

CREATE TABLE `itemstokbahans` (
  `id` bigint UNSIGNED NOT NULL,
  `kode_bahan_pakai` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `luas` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `po_pembelian_bahan_id` bigint UNSIGNED DEFAULT NULL,
  `po_pembelian_bahan_item_id` bigint UNSIGNED DEFAULT NULL,
  `kode_po` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `panjang` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lebar` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `satuan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `kode_label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `itemstokbahans`
--

INSERT INTO `itemstokbahans` (`id`, `kode_bahan_pakai`, `luas`, `qty`, `created_at`, `updated_at`, `po_pembelian_bahan_id`, `po_pembelian_bahan_item_id`, `kode_po`, `panjang`, `lebar`, `satuan`, `keterangan`, `kode_label`) VALUES
(10, 'OSTD2', '196', '1', '2026-06-22 00:34:27', '2026-06-22 00:34:27', 4, 2, 'PB-2606-0001', '2.8', '70', 'M2', 'MMT 280 GSM UK 2.8 x 70', 'LB-OSTD2-001'),
(11, 'OSTD2', '196', '1', '2026-06-22 00:34:27', '2026-06-22 00:34:27', 4, 2, 'PB-2606-0001', '2.8', '70', 'M2', 'MMT 280 GSM UK 2.8 x 70', 'LB-OSTD2-002'),
(12, 'OSTD1', '0', '1', '2026-06-22 00:34:27', '2026-06-23 08:26:13', 4, 3, 'PB-2606-0001', '3.2', '70', 'M2', 'MMT 20 GSM uk 3.2 x 70', 'LB-OSTD1-001'),
(13, 'OSTD1', '224', '1', '2026-06-22 00:34:27', '2026-06-22 00:34:27', 4, 3, 'PB-2606-0001', '3.2', '70', 'M2', 'MMT 20 GSM uk 3.2 x 70', 'LB-OSTD1-002'),
(14, 'OSTD3', '182', '1', '2026-06-22 00:34:27', '2026-06-22 00:34:27', 4, 4, 'PB-2606-0001', '2.6', '70', 'M2', 'lorem ipsum danger', 'LB4-4-1'),
(15, 'OSTD3', '182', '1', '2026-06-22 00:34:27', '2026-06-22 00:34:27', 4, 4, 'PB-2606-0001', '2.6', '70', 'M2', 'lorem ipsum danger', 'LB4-4-2'),
(16, 'OSTD3', '182', '1', '2026-06-22 00:34:27', '2026-06-22 00:34:27', 4, 4, 'PB-2606-0001', '2.6', '70', 'M2', 'lorem ipsum danger', 'LB4-4-3'),
(17, 'OSTD3', '182', '1', '2026-06-22 00:34:27', '2026-06-22 00:34:27', 4, 4, 'PB-2606-0001', '2.6', '70', 'M2', 'lorem ipsum danger', 'LB4-4-4'),
(18, 'OSTD3', '182', '1', '2026-06-22 00:34:27', '2026-06-22 00:34:27', 4, 4, 'PB-2606-0001', '2.6', '70', 'M2', 'lorem ipsum danger', 'LB4-4-5'),
(19, 'OSTD1', '224', '1', '2026-06-23 08:34:29', '2026-06-23 08:34:29', 5, 5, 'PB-2606-0002', '3.2', '70', 'M2', 'tidak ada', 'LB5-5-1'),
(20, 'OSTD2', '196', '1', '2026-06-23 08:57:05', '2026-06-23 08:57:05', 6, 6, 'PB-2606-0003', '2.8', '70', 'M2', 'lorem ipsum', 'LB6-6-1');

-- --------------------------------------------------------

--
-- Table structure for table `jabatans`
--

CREATE TABLE `jabatans` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jabatan` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_akses` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jabatans`
--

INSERT INTO `jabatans` (`id`, `kode`, `jabatan`, `menu_akses`, `created_at`, `updated_at`) VALUES
(16, 'JB-85182', 'Admin', '[\"dashboard\", \"pengguna\", \"customer\", \"kurir\", \"master-bahan\", \"master-kategoridesain\", \"master-jabatan\", \"desain\", \"produksi-order\", \"proses-produksi\", \"proses-finishing\", \"data-produksi\", \"logistik\", \"data-desain\", \"otorisasi\", \"tambah-produksi\", \"tambah-desain\", \"laporan-pembukuan\", \"data-order\", \"po-eksternal\", \"po-pembelian-bahan\", \"suplayer-pembelian-bahan\", \"suplayer\"]', '2026-05-14 02:17:08', '2026-06-19 19:34:39'),
(17, 'JB-13777', 'Desainer', '[\"dashboard\", \"desain\", \"tambah-desain\", \"tambah-produksi\", \"customer\"]', '2026-05-14 02:17:33', '2026-06-11 19:14:56'),
(18, 'JB-13265', 'Customer Service', '[\"desain\", \"dashboard\", \"customer\", \"produksi-order\", \"tambah-desain\", \"tambah-produksi\", \"otorisasi\", \"data-desain\", \"data-produksi\"]', '2026-05-23 17:37:30', '2026-06-11 19:23:43'),
(19, 'JB-25324', 'Produksi', '[\"dashboard\", \"proses-produksi\"]', '2026-05-23 17:37:37', '2026-06-11 19:15:28'),
(20, 'JB-59694', 'Logistik', '[\"dashboard\", \"desain\", \"produksi-order\", \"logistik\"]', '2026-06-08 04:07:14', '2026-06-11 19:15:40'),
(21, 'JB-96673', 'Finishing', '[\"proses-finishing\"]', '2026-06-08 04:07:23', '2026-06-08 20:07:43');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategoridesains`
--

CREATE TABLE `kategoridesains` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fee` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_point` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategoridesains`
--

INSERT INTO `kategoridesains` (`id`, `kode`, `kategori`, `harga`, `qty`, `fee`, `status_point`, `created_at`, `updated_at`) VALUES
(1, 'KD-56914', 'Desain Baru', '100000', '1', '2000', 1, '2026-04-25 23:30:01', '2026-06-08 20:28:18'),
(3, 'KD-67808', '34343', '334343', '1', '5000', 0, '2026-06-08 20:28:10', '2026-06-08 20:28:10');

-- --------------------------------------------------------

--
-- Table structure for table `kurirs`
--

CREATE TABLE `kurirs` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nohp` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kurirs`
--

INSERT INTO `kurirs` (`id`, `kode`, `nama`, `nohp`, `created_at`, `updated_at`) VALUES
(3, 'KR-00001', 'Aldi', '0831-3818-4145', '2026-06-16 20:23:14', '2026-06-16 20:23:14');

-- --------------------------------------------------------

--
-- Table structure for table `list_po_eksternals`
--

CREATE TABLE `list_po_eksternals` (
  `id` bigint UNSIGNED NOT NULL,
  `po_eksternal_id` bigint UNSIGNED NOT NULL,
  `invoice` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_bahan` bigint UNSIGNED DEFAULT NULL,
  `spk` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tinggi` decimal(12,2) NOT NULL DEFAULT '0.00',
  `lebar` decimal(12,2) NOT NULL DEFAULT '0.00',
  `luas` decimal(12,2) NOT NULL DEFAULT '0.00',
  `qty` decimal(12,2) NOT NULL DEFAULT '0.00',
  `satuan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `harga` decimal(15,2) NOT NULL DEFAULT '0.00',
  `total` decimal(15,2) NOT NULL DEFAULT '0.00',
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `list_po_eksternals`
--

INSERT INTO `list_po_eksternals` (`id`, `po_eksternal_id`, `invoice`, `id_bahan`, `spk`, `tinggi`, `lebar`, `luas`, `qty`, `satuan`, `harga`, `total`, `keterangan`, `created_at`, `updated_at`) VALUES
(10, 5, 'INVOICE-2606193801', 303, 'SPK-2606194831', '20.00', '25.00', '500.00', '4.00', 'RIM', '640000.00', '640000.00', 'brosuer', '2026-06-19 01:54:30', '2026-06-19 01:54:30'),
(11, 5, 'INVOICE-2606193801', 303, 'SPK-2606194831', '20.00', '25.00', '500.00', '4.00', 'RIM', '640000.00', '640000.00', 'tidak ada', '2026-06-19 18:35:31', '2026-06-19 18:35:31');

-- --------------------------------------------------------

--
-- Table structure for table `mata_ayams`
--

CREATE TABLE `mata_ayams` (
  `id` bigint UNSIGNED NOT NULL,
  `kode_spk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `atas` tinyint(1) NOT NULL DEFAULT '0',
  `bawah` tinyint(1) NOT NULL DEFAULT '0',
  `kiri` tinyint(1) NOT NULL DEFAULT '0',
  `kanan` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mata_ayams`
--

INSERT INTO `mata_ayams` (`id`, `kode_spk`, `atas`, `bawah`, `kiri`, `kanan`, `created_at`, `updated_at`) VALUES
(5, 'SPK-2606099373', 1, 1, 0, 0, '2026-06-08 23:43:23', '2026-06-08 23:43:23'),
(12, 'SPK-2606136089', 1, 1, 1, 1, '2026-06-12 20:07:11', '2026-06-12 20:07:11'),
(13, 'SPK-2606136049', 1, 1, 1, 1, '2026-06-13 10:18:28', '2026-06-13 10:18:28'),
(14, 'SPK-2606146253', 1, 1, 1, 1, '2026-06-13 18:37:44', '2026-06-13 18:37:44'),
(15, 'SPK-260616247', 0, 0, 0, 0, '2026-06-15 22:39:43', '2026-06-15 22:39:43'),
(16, 'SPK-2606168511', 0, 0, 0, 0, '2026-06-15 23:00:06', '2026-06-15 23:00:06'),
(17, 'SPK-2606174781', 0, 0, 0, 0, '2026-06-16 19:41:50', '2026-06-16 19:41:50'),
(18, 'SPK-2606173375', 0, 0, 0, 0, '2026-06-16 20:08:14', '2026-06-16 20:08:14'),
(28, 'SPK-2606226061', 1, 1, 1, 1, '2026-06-22 00:40:57', '2026-06-22 00:40:57'),
(30, 'SPK-2606231195', 1, 1, 1, 1, '2026-06-23 06:32:43', '2026-06-23 06:33:43'),
(31, 'SPK-2606239567', 0, 0, 0, 0, '2026-06-23 08:22:51', '2026-06-23 08:22:51');

-- --------------------------------------------------------

--
-- Table structure for table `materbahans`
--

CREATE TABLE `materbahans` (
  `id` bigint UNSIGNED NOT NULL,
  `kode_bahan_pakai` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `materbahans`
--

INSERT INTO `materbahans` (`id`, `kode_bahan_pakai`, `keterangan`, `tanggal`, `created_at`, `updated_at`) VALUES
(3, 'OSTD', 'tidak ada', '22/06/2026', NULL, NULL),
(4, 'OTAP', 'tidak ada', '23/06/2026', NULL, NULL),
(5, 'OTBO', 'tidak ada', '24/06/2026', NULL, NULL),
(6, 'OBS', 'tidak ada', '25/06/2026', NULL, NULL),
(7, 'OBSJ', 'tidak ada', '26/06/2026', NULL, NULL),
(8, 'OBSK', 'tidak ada', '27/06/2026', NULL, NULL),
(9, 'OJR', 'tidak ada', '28/06/2026', NULL, NULL),
(10, 'OKOC', 'tidak ada', '29/06/2026', NULL, NULL),
(11, 'O440', 'tidak ada', '30/06/2026', NULL, NULL),
(12, 'OKST', 'tidak ada', '01/07/2026', NULL, NULL),
(13, 'OSAR', 'tidak ada', '02/07/2026', NULL, NULL),
(14, 'OSAR MATT', 'tidak ada', '03/07/2026', NULL, NULL),
(15, 'OSBL-IN', 'tidak ada', '04/07/2026', NULL, NULL),
(16, 'OSBO', 'tidak ada', '05/07/2026', NULL, NULL),
(17, 'OSTP', 'tidak ada', '06/07/2026', NULL, NULL),
(18, 'OWV', 'tidak ada', '07/07/2026', NULL, NULL),
(19, 'SS', 'tidak ada', '08/07/2026', NULL, NULL),
(20, 'DALT', 'tidak ada', '09/07/2026', NULL, NULL),
(21, 'DPP', 'tidak ada', '10/07/2026', NULL, NULL),
(22, 'DSV', 'tidak ada', '11/07/2026', NULL, NULL),
(23, 'DD', 'tidak ada', '12/07/2026', NULL, NULL),
(24, 'DSTP', 'tidak ada', '13/07/2026', NULL, NULL),
(25, 'TBOUV', 'tidak ada', '14/07/2026', NULL, NULL),
(26, 'BSUV', 'tidak ada', '15/07/2026', NULL, NULL),
(27, 'BSJ UV', 'tidak ada', '16/07/2026', NULL, NULL),
(28, 'BSK UV', 'tidak ada', '17/07/2026', NULL, NULL),
(29, 'KOCUV', 'tidak ada', '18/07/2026', NULL, NULL),
(30, '440UV', 'tidak ada', '19/07/2026', NULL, NULL),
(31, 'SUV', 'tidak ada', '20/07/2026', NULL, NULL),
(32, 'SMUV', 'tidak ada', '21/07/2026', NULL, NULL),
(33, 'SBLUV', 'tidak ada', '22/07/2026', NULL, NULL),
(34, 'SBOUV', 'tidak ada', '23/07/2026', NULL, NULL),
(35, 'STPUV', 'tidak ada', '24/07/2026', NULL, NULL),
(36, 'OWUV', 'tidak ada', '25/07/2026', NULL, NULL),
(37, 'SSUV', 'tidak ada', '26/07/2026', NULL, NULL),
(38, 'ALTUV', 'tidak ada', '27/07/2026', NULL, NULL),
(39, 'DPPUV', 'tidak ada', '28/07/2026', NULL, NULL),
(40, 'DDUV', 'tidak ada', '29/07/2026', NULL, NULL),
(41, 'LMG', 'tidak ada', '30/07/2026', NULL, NULL),
(42, 'LMD', 'tidak ada', '31/07/2026', NULL, NULL),
(43, 'LMF', 'tidak ada', '01/08/2026', NULL, NULL),
(44, 'SOWUV', 'tidak ada', '02/08/2026', NULL, NULL),
(45, 'SCSUV', 'tidak ada', '03/08/2026', NULL, NULL),
(46, 'LMP', 'tidak ada', '04/08/2026', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_04_25_164842_create_customers_table', 2),
(5, '2026_04_26_040029_create_jabatans_table', 3),
(6, '2026_04_26_061646_create_kategoridesains_table', 4),
(7, '2026_04_26_064046_create_penggunas_table', 5),
(9, '2026_04_28_013933_create_desains_table', 7),
(10, '2026_04_28_065153_create_produksis_table', 7),
(12, '2026_04_29_064909_create_distributors_table', 7),
(13, '2026_04_29_071756_create_kurirs_table', 7),
(14, '2026_05_13_083643_add_limit_to_customers_table', 7),
(15, '2026_04_27_091939_create_bahans_table', 8),
(16, '2026_04_28_074152_create_pinisings_table', 9),
(17, '2026_05_14_000003_create_mata_ayams_table', 10),
(18, '2026_05_16_141606_create_suplayers_table', 11),
(19, '2026_05_16_142331_create_rekening_suplayers_table', 12),
(20, '2026_05_16_143837_fix_rekening_suplayers_table', 13),
(21, '2026_05_19_091325_add_harga_to_bahans_table', 14),
(22, '2026_06_08_000002_add_harga_types_to_bahans_table', 15),
(23, '2026_06_08_000003_add_sapaan_to_customers_table', 16),
(24, '2026_06_08_000004_add_qty_to_bahans_table', 17),
(25, '2026_06_08_000005_change_bahan_length_in_bahans_table', 18),
(26, '2026_05_25_071700_create_noantrians_table', 19),
(27, '2026_05_25_072411_create_orders_table', 19),
(28, '2026_06_09_023637_add_harga_beli_to_bahans_table', 19),
(29, '2026_06_09_030145_add_menu_akses_to_jabatans_table', 20),
(30, '2026_06_09_031444_add_qty_fee_to_kategoridesains_table', 21),
(31, '2026_06_10_065154_add_status_selesai_to_produksis_table', 22),
(32, '2026_06_10_092356_add_limit_akhir_to_customers_table', 23),
(33, '2026_06_10_092357_add_pembayaran_to_produksis_table', 24),
(34, '2026_06_10_092358_add_pembayaran_to_desains_table', 24),
(35, '2026_06_10_092359_add_jatuh_tempo_to_customers_table', 24),
(36, '2026_06_10_093000_change_jatuh_tempo_type_in_customers_table', 24),
(37, '2026_06_10_094000_create_otorisasis_table', 24),
(38, '2026_06_10_095000_add_status_to_otorisasis_table', 24),
(39, '2026_06_10_100000_add_otorisasi_to_produksis_table', 24),
(40, '2026_06_13_000001_add_catatan_to_pinisings_table', 25),
(41, '2026_06_15_000001_create_po_eksternals_table', 26),
(42, '2026_06_15_000003_add_jatuh_tempo_to_suplayers_table', 26),
(43, '2026_06_16_000002_create_list_po_eksternals_table', 27),
(44, '2026_06_16_000003_add_sub_total_to_po_eksternals_table', 28),
(45, '2026_06_16_000004_create_po_pembelian_bahans_table', 29),
(46, '2026_06_16_000005_create_po_pembelian_bahan_items_table', 30),
(48, '2026_06_16_000007_drop_keterangan_from_po_pembelian_bahan_items_table', 32),
(49, '2026_06_16_000006_add_keterangan_to_po_pembelian_bahan_items_table', 33),
(50, '2026_06_16_130947_add_diskon_ppn_sub_total_to_po_pembelian_bahans_table', 34),
(51, '2026_06_17_064517_add_harga_po_to_bahans_table', 35),
(52, '2026_06_17_071216_add_satuan_to_list_po_eksternals_table', 36),
(55, '2026_06_16_000001_drop_unique_no_po_from_po_eksternals_table', 37),
(56, '2026_06_18_140530_create_databahans_table', 37),
(57, '2026_06_18_140837_create_hargabahans_table', 37),
(58, '2026_06_20_000001_add_pembayaran_to_po_tables', 38),
(59, '2026_06_20_000002_add_jenis_suplayer_to_suplayers_table', 39),
(60, '2026_06_22_024625_create_materbahans_table', 40),
(61, '2026_06_22_032122_create_typebahans_table', 41),
(62, '2026_06_22_041020_create_bahanbelis_table', 42),
(63, '2026_06_22_071131_create_itemstokbahans_table', 43),
(64, '2026_06_22_072338_add_status_to_po_pembelian_bahans_table', 44),
(65, '2026_06_22_072339_add_po_relations_to_itemstokbahans_table', 44),
(66, '2026_06_22_073153_add_kode_label_to_itemstokbahans_table', 45),
(67, '2026_06_22_081028_add_sisa_putih_to_produksis_table', 46),
(69, '2026_06_22_084728_add_kode_bahanbeli_to_produksis_table', 47),
(70, '2026_06_23_155124_rename_bahanbeli_columns_to_bahanpakai', 48);

-- --------------------------------------------------------

--
-- Table structure for table `noantrians`
--

CREATE TABLE `noantrians` (
  `id` bigint UNSIGNED NOT NULL,
  `no_antrian` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `no_antrian` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_desain` int NOT NULL,
  `id_produksi` int NOT NULL,
  `id_bahan` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_harga` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metode_pembayaran` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `uang` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kembalian` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otorisasis`
--

CREATE TABLE `otorisasis` (
  `id` bigint UNSIGNED NOT NULL,
  `kode_spk` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_customer` bigint UNSIGNED NOT NULL,
  `tanggal_pengajuan` date NOT NULL,
  `tanggal_disetujui` date DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `otorisasis`
--

INSERT INTO `otorisasis` (`id`, `kode_spk`, `id_customer`, `tanggal_pengajuan`, `tanggal_disetujui`, `status`, `created_at`, `updated_at`) VALUES
(1, 'SPK-2606123194', 8, '2026-06-12', '2026-06-12', 1, '2026-06-11 20:13:22', '2026-06-11 20:16:04');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penggunas`
--

CREATE TABLE `penggunas` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penggunas`
--

INSERT INTO `penggunas` (`id`, `username`, `role`, `password`, `created_at`, `updated_at`) VALUES
(2, 'admin', 'admin', '$2y$12$YkqJSIK9E1IG6ikWfyh2ZeL6kFVFgfPzFKxTqltXaP/8tkuS4hB.O', '2026-05-14 02:17:53', '2026-05-23 17:32:52'),
(6, 'customerservice', 'Customer Service', '$2y$12$UORWEnaZL9VIlrPS8eHtp.iHOitcmvm8Q5QZWbqHopr0SGBP2Zkym', '2026-06-08 01:34:00', '2026-06-08 01:34:00'),
(7, 'desainer', 'Desainer', '$2y$12$WRvhw7IVGk.a8468CL81nOzgzmjNdt3G5BUiaYIETeukNonKihxrO', '2026-06-08 01:34:22', '2026-06-08 01:34:29'),
(8, 'produksi', 'Produksi', '$2y$12$L7My2Si/lKjjfqbOwqV93Ode2zUhL2A443PVrlc1p/od3SLlN1Hri', '2026-06-08 01:34:41', '2026-06-11 19:16:04'),
(9, 'Ernawaty', 'Admin', '$2y$12$4bcioHdLBt7EzAxBplxi2ekl51AWozPYi/pV5cxGHR3O7MieiIIoG', '2026-06-08 04:05:44', '2026-06-08 04:05:44'),
(10, 'finishing', 'Finishing', '$2y$12$lTMFCYwWKFau62eUnOq1kONJNT2SAS2oyiuWxWixZKknLjid/4ADe', '2026-06-08 20:08:18', '2026-06-08 20:08:18'),
(11, 'logistik', 'Logistik', '$2y$12$esJMbTMqn1yVSqQ3wJPGG.aBx28tweQ5/J408/vdj5K1vfzUy6s1C', '2026-06-11 19:16:20', '2026-06-11 19:16:20');

-- --------------------------------------------------------

--
-- Table structure for table `pinisings`
--

CREATE TABLE `pinisings` (
  `id` bigint UNSIGNED NOT NULL,
  `kode_spk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `atas` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bawah` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kanan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kiri` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `catatan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pinisings`
--

INSERT INTO `pinisings` (`id`, `kode_spk`, `atas`, `bawah`, `kanan`, `kiri`, `catatan`, `created_at`, `updated_at`) VALUES
(5, 'SPK-2606099373', 'Lipat Pas Gambar', 'Potong Pas Gambar', 'Kantongan', 'Lipat Sisa Putih', NULL, '2026-06-08 23:43:23', '2026-06-08 23:43:23'),
(12, 'SPK-2606136089', 'Potong Pas Gambar', 'Potong Pas Gambar', 'Lipat Pas Gambar', 'Potong Pas Gambar', 'tidaka da', '2026-06-12 20:07:11', '2026-06-12 20:07:11'),
(13, 'SPK-2606136049', 'Kantongan', 'Lipat Pas Gambar', 'Lipat Pas Gambar', 'Lipat Pas Gambar', 'Cetak Sepanduk 4 Item', '2026-06-13 10:18:28', '2026-06-13 10:18:28'),
(14, 'SPK-2606146253', 'Potong Pas Gambar', 'Potong Pas Gambar', 'Potong Pas Gambar', 'Potong Pas Gambar', 'Cetak Sepanduk Uk 3 x 1 M', '2026-06-13 18:37:44', '2026-06-13 18:37:44'),
(15, 'SPK-260616247', '', '', '', '', '', '2026-06-15 22:39:43', '2026-06-15 22:39:43'),
(16, 'SPK-2606168511', '', '', '', '', '', '2026-06-15 23:00:06', '2026-06-15 23:00:06'),
(17, 'SPK-2606174781', 'Kantongan', 'Potong Pas Gambar', 'Potong Pas Gambar', 'Lipat Pas Gambar', '', '2026-06-16 19:41:50', '2026-06-16 19:41:50'),
(18, 'SPK-2606173375', '', '', '', '', '', '2026-06-16 20:08:14', '2026-06-16 20:08:14'),
(28, 'SPK-2606226061', 'Kantongan', 'Lipat Pas Gambar', 'Lipat Pas Gambar', 'Potong Pas Gambar', 'harus selsai siapnya', '2026-06-22 00:40:56', '2026-06-22 00:40:56'),
(30, 'SPK-2606231195', 'Kantongan', 'Kantongan', 'Kantongan', 'Kantongan', 'Seusai detail', '2026-06-23 06:32:43', '2026-06-23 06:33:43'),
(31, 'SPK-2606239567', 'Sisa Putih', 'Sisa Putih', '', 'Sisa Putih', 'sepdnauk ostd new', '2026-06-23 08:22:51', '2026-06-23 08:22:51');

-- --------------------------------------------------------

--
-- Table structure for table `po_eksternals`
--

CREATE TABLE `po_eksternals` (
  `id` bigint UNSIGNED NOT NULL,
  `tgl` date NOT NULL,
  `no_po` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hal` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_distributor` bigint UNSIGNED DEFAULT NULL,
  `mata_uang` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `batas_bayar` date DEFAULT NULL,
  `pembayaran` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_suplayer` bigint UNSIGNED DEFAULT NULL,
  `diskon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ppn` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_total` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_harga` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `po_eksternals`
--

INSERT INTO `po_eksternals` (`id`, `tgl`, `no_po`, `hal`, `id_distributor`, `mata_uang`, `batas_bayar`, `pembayaran`, `id_suplayer`, `diskon`, `ppn`, `sub_total`, `total_harga`, `created_at`, `updated_at`) VALUES
(7, '2026-06-23', 'PO-2606-0001', 'Cetak sepanduk new', NULL, 'IDR', '2026-07-23', 'CASH', 1, NULL, NULL, '0', '0', '2026-06-23 05:47:57', '2026-06-23 05:48:18');

-- --------------------------------------------------------

--
-- Table structure for table `po_pembelian_bahans`
--

CREATE TABLE `po_pembelian_bahans` (
  `id` bigint UNSIGNED NOT NULL,
  `tgl` date NOT NULL,
  `no_po` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_suplayer` bigint UNSIGNED DEFAULT NULL,
  `hal` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pembayaran` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diskon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ppn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_total` decimal(15,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `po_pembelian_bahans`
--

INSERT INTO `po_pembelian_bahans` (`id`, `tgl`, `no_po`, `id_suplayer`, `hal`, `pembayaran`, `diskon`, `ppn`, `sub_total`, `created_at`, `updated_at`, `status`) VALUES
(4, '2026-06-22', 'PB-2606-0001', 1, 'BELI BAHAN OSTD', 'CASH', NULL, NULL, '150000.00', '2026-06-21 23:33:56', '2026-06-23 08:48:20', 1),
(5, '2026-06-23', 'PB-2606-0002', 1, 'beli bahan ostd', 'CASH', NULL, NULL, '50000.00', '2026-06-23 08:31:42', '2026-06-23 08:34:29', 1),
(6, '2026-06-23', 'PB-2606-0003', 1, NULL, 'CASH', NULL, NULL, '50000.00', '2026-06-23 08:56:31', '2026-06-23 08:57:06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `po_pembelian_bahan_items`
--

CREATE TABLE `po_pembelian_bahan_items` (
  `id` bigint UNSIGNED NOT NULL,
  `po_pembelian_bahan_id` bigint UNSIGNED NOT NULL,
  `id_bahan` bigint UNSIGNED DEFAULT NULL,
  `panjang` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lebar` varchar(39) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `luas` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0.00',
  `harga` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0.00',
  `satuan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_harga` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0.00',
  `keterangan` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `po_pembelian_bahan_items`
--

INSERT INTO `po_pembelian_bahan_items` (`id`, `po_pembelian_bahan_id`, `id_bahan`, `panjang`, `lebar`, `luas`, `harga`, `qty`, `satuan`, `total_harga`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 1, 831, '2.00', '1.00', '2.00', '200.00', '3.00', 'RIM', '1200.00', 'tisda adaa', '2026-06-16 06:03:38', '2026-06-16 06:03:38'),
(2, 4, 3, '2.8', '70', '196', '20000', '2', 'M2', '40000', 'MMT 280 GSM UK 2.8 x 70', '2026-06-21 23:45:30', '2026-06-21 23:53:41'),
(3, 4, 2, '3.2', '70', '224', '50000', '2', 'M2', '100000', 'MMT 20 GSM uk 3.2 x 70', '2026-06-21 23:54:46', '2026-06-21 23:54:46'),
(4, 4, 4, '2.6', '70', '182', '2000', '5', 'M2', '10000', 'lorem ipsum danger', '2026-06-21 23:55:59', '2026-06-21 23:55:59'),
(5, 5, 2, '3.2', '70', '224', '50000', '1', 'M2', '50000', 'tidak ada', '2026-06-23 08:33:30', '2026-06-23 08:33:30'),
(6, 6, 3, '2.8', '70', '196', '50000', '1', 'M2', '50000', 'lorem ipsum', '2026-06-23 08:56:59', '2026-06-23 08:56:59');

-- --------------------------------------------------------

--
-- Table structure for table `produksis`
--

CREATE TABLE `produksis` (
  `id` bigint UNSIGNED NOT NULL,
  `tanggal` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_invoice` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_desain` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_desainer` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_antrian` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_spk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_customer` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_bahan` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `satuan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tinggi` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lebar` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sisi` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_kategori_desain` int NOT NULL,
  `catatan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pembayaran` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `metode_pengantaran` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_kirim` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cara_perhitungan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga_bahan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_harga` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_produksi` int NOT NULL,
  `status_finishing` int NOT NULL,
  `status_logistik` int DEFAULT NULL,
  `status_selesai` tinyint NOT NULL DEFAULT '0',
  `otorisasi` tinyint NOT NULL DEFAULT '0',
  `selesai` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `sisa_putih_panjang` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sisa_putih_lebar` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sisa_putih_total` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kode_bahanpakai` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `produksis`
--

INSERT INTO `produksis` (`id`, `tanggal`, `no_invoice`, `id_desain`, `id_desainer`, `no_antrian`, `kode_spk`, `id_customer`, `id_bahan`, `keterangan`, `satuan`, `tinggi`, `lebar`, `qty`, `sisi`, `id_kategori_desain`, `catatan`, `pembayaran`, `metode_pengantaran`, `tgl_kirim`, `cara_perhitungan`, `harga_bahan`, `total_harga`, `status_produksi`, `status_finishing`, `status_logistik`, `status_selesai`, `otorisasi`, `selesai`, `created_at`, `updated_at`, `sisa_putih_panjang`, `sisa_putih_lebar`, `sisa_putih_total`, `kode_bahanpakai`) VALUES
(30, '2026-06-22', 'INVOICE-2606227587', NULL, '2', 'ANT-00001', 'SPK-2606226061', '8', '2', 'cetak sepanduk', 'Meter', '3', '1', '1', '1 SISI', 0, '1', 'lunas', 'Diambil Sendiri', '2026-06-22', 'LUAS', '17000', '51000', 1, 1, 1, 1, 0, NULL, '2026-06-22 00:40:56', '2026-06-23 06:29:28', '3.05', '1.05', '3.2025', 'OSTD1'),
(32, '2026-06-23', 'INVOICE-260623957', NULL, '2', 'ANT-00002', 'SPK-2606231195', '9', '2', 'bodresk', 'Cm', '100', '300', '1', '1 SISI', 0, '1', 'lunas', 'Diambil Sendiri', '2026-06-23', 'LUAS', '15200', '45600', 1, 0, NULL, 0, 0, NULL, '2026-06-23 06:32:43', '2026-06-23 06:34:20', NULL, NULL, NULL, NULL),
(33, '2026-06-23', 'INVOICE-2606238098', NULL, '2', 'ANT-00003', 'SPK-2606239567', '8', '2', 'sepdnauk ostd new', 'Cm', '100', '100', '1', '1 SISI', 0, '1', 'lunas', 'Diambil Sendiri', '2026-06-23', 'LUAS', '17000', '17000', 1, 1, NULL, 0, 0, NULL, '2026-06-23 08:22:51', '2026-06-23 08:26:13', '100', '100', '1', 'OSTD1');

-- --------------------------------------------------------

--
-- Table structure for table `rekening_suplayers`
--

CREATE TABLE `rekening_suplayers` (
  `id` bigint UNSIGNED NOT NULL,
  `id_suplayer` bigint UNSIGNED NOT NULL,
  `nama_bank` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_rekening` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_rekening` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rekening_suplayers`
--

INSERT INTO `rekening_suplayers` (`id`, `id_suplayer`, `nama_bank`, `no_rekening`, `nama_rekening`, `created_at`, `updated_at`) VALUES
(3, 1, 'Bunda', '435545', '34343434343', '2026-06-19 19:14:24', '2026-06-19 19:14:24'),
(4, 2, '3434', '3434', '343434', '2026-06-19 19:20:37', '2026-06-19 19:20:37'),
(5, 2, '34343', '334343', '34343', '2026-06-19 19:20:37', '2026-06-19 19:20:37');

-- --------------------------------------------------------

--
-- Table structure for table `rekening_suplayer_pembelian_bahans`
--

CREATE TABLE `rekening_suplayer_pembelian_bahans` (
  `id` bigint UNSIGNED NOT NULL,
  `id_suplayer_pembelian_bahan` bigint UNSIGNED NOT NULL,
  `nama_bank` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_rekening` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_rekening` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rekening_suplayer_pembelian_bahans`
--

INSERT INTO `rekening_suplayer_pembelian_bahans` (`id`, `id_suplayer_pembelian_bahan`, `nama_bank`, `no_rekening`, `nama_rekening`, `created_at`, `updated_at`) VALUES
(1, 1, '343', '343', '34343', '2026-06-19 19:29:16', '2026-06-19 19:29:16'),
(2, 1, '343', '343', '334', '2026-06-19 19:29:16', '2026-06-19 19:29:16');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('NoAN8jdTmysVPXPPVN1yIRVNsZQDDzqcsn6iatv6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJsVURPMzFSeHpFdzlmNzZsYTF5NzFZYnJjSjlSenBsYkxMR0VWeXVnIiwidXJsIjp7ImludGVuZGVkIjoiaHR0cDpcL1wvMTI3LjAuMC4xOjgwMDBcL3Byb2R1a3NpXC9wcm9kdWtzaSJ9LCJfcHJldmlvdXMiOnsidXJsIjoiaHR0cDpcL1wvMTI3LjAuMC4xOjgwMDBcL2xvZ2luIiwicm91dGUiOiJsb2dpbiJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782282049),
('rBszXYlRRYkVq9jjSBCzHPKWOrBWSsNmHOQ7dkKT', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI2MzgwQ1VTam5NczRRMWN3UWZ4anZHcXVxVU9TVWd6QlFPVHVFNjdQIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9iYWhhbnBha2FpIiwicm91dGUiOiJiYWhhbnBha2FpIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfSwidXJsIjpbXSwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjJ9', 1782230233);

-- --------------------------------------------------------

--
-- Table structure for table `suplayers`
--

CREATE TABLE `suplayers` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_suplayer` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nohp` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `produk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jatuh_tempo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suplayers`
--

INSERT INTO `suplayers` (`id`, `kode`, `nama_suplayer`, `alamat`, `nohp`, `produk`, `harga`, `jatuh_tempo`, `created_at`, `updated_at`) VALUES
(1, 'SP-30354', 'Bintang terang', 'Medan denai', '083138184144', 'Buku', '50000', '30', '2026-05-16 07:50:38', '2026-06-19 19:14:24'),
(2, 'SP-74161', '3434343', '3434343', '3434343434343', '34343', '434343', '34', '2026-06-19 19:20:37', '2026-06-19 19:20:37');

-- --------------------------------------------------------

--
-- Table structure for table `suplayer_pembelian_bahans`
--

CREATE TABLE `suplayer_pembelian_bahans` (
  `id` bigint UNSIGNED NOT NULL,
  `kode` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_suplayer` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nohp` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `produk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jatuh_tempo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suplayer_pembelian_bahans`
--

INSERT INTO `suplayer_pembelian_bahans` (`id`, `kode`, `nama_suplayer`, `alamat`, `nohp`, `produk`, `harga`, `jatuh_tempo`, `created_at`, `updated_at`) VALUES
(1, 'SPB-88652', '3434', '3434343', '34343434', '34343', '3443', '343', '2026-06-19 19:29:16', '2026-06-19 19:29:16');

-- --------------------------------------------------------

--
-- Table structure for table `typebahans`
--

CREATE TABLE `typebahans` (
  `id` bigint UNSIGNED NOT NULL,
  `id_master_bahan` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_bahan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `panjang` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lebar` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `satuan` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'aldi', 'aldi@gmail.com', NULL, '$2y$12$jF./N68a4icJWBA.ltsYNOLh96CuFHdxCxfT7axbqIqauG06Rbhve', NULL, '2026-04-25 09:17:19', '2026-04-25 09:17:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bahanpakais`
--
ALTER TABLE `bahanpakais`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bahans`
--
ALTER TABLE `bahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `databahans`
--
ALTER TABLE `databahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `desains`
--
ALTER TABLE `desains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `distributors`
--
ALTER TABLE `distributors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `hargabahans`
--
ALTER TABLE `hargabahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itemstokbahans`
--
ALTER TABLE `itemstokbahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jabatans`
--
ALTER TABLE `jabatans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategoridesains`
--
ALTER TABLE `kategoridesains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kurirs`
--
ALTER TABLE `kurirs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `list_po_eksternals`
--
ALTER TABLE `list_po_eksternals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mata_ayams`
--
ALTER TABLE `mata_ayams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materbahans`
--
ALTER TABLE `materbahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `noantrians`
--
ALTER TABLE `noantrians`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otorisasis`
--
ALTER TABLE `otorisasis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `otorisasis_id_customer_foreign` (`id_customer`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `penggunas`
--
ALTER TABLE `penggunas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pinisings`
--
ALTER TABLE `pinisings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `po_eksternals`
--
ALTER TABLE `po_eksternals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `po_pembelian_bahans`
--
ALTER TABLE `po_pembelian_bahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `po_pembelian_bahan_items`
--
ALTER TABLE `po_pembelian_bahan_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produksis`
--
ALTER TABLE `produksis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rekening_suplayers`
--
ALTER TABLE `rekening_suplayers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rekening_suplayers_id_suplayer_foreign` (`id_suplayer`);

--
-- Indexes for table `rekening_suplayer_pembelian_bahans`
--
ALTER TABLE `rekening_suplayer_pembelian_bahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `suplayers`
--
ALTER TABLE `suplayers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suplayer_pembelian_bahans`
--
ALTER TABLE `suplayer_pembelian_bahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `typebahans`
--
ALTER TABLE `typebahans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bahanpakais`
--
ALTER TABLE `bahanpakais`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bahans`
--
ALTER TABLE `bahans`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=863;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `databahans`
--
ALTER TABLE `databahans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=350;

--
-- AUTO_INCREMENT for table `desains`
--
ALTER TABLE `desains`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `distributors`
--
ALTER TABLE `distributors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hargabahans`
--
ALTER TABLE `hargabahans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=862;

--
-- AUTO_INCREMENT for table `itemstokbahans`
--
ALTER TABLE `itemstokbahans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `jabatans`
--
ALTER TABLE `jabatans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategoridesains`
--
ALTER TABLE `kategoridesains`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kurirs`
--
ALTER TABLE `kurirs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `list_po_eksternals`
--
ALTER TABLE `list_po_eksternals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `mata_ayams`
--
ALTER TABLE `mata_ayams`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `materbahans`
--
ALTER TABLE `materbahans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `noantrians`
--
ALTER TABLE `noantrians`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otorisasis`
--
ALTER TABLE `otorisasis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `penggunas`
--
ALTER TABLE `penggunas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pinisings`
--
ALTER TABLE `pinisings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `po_eksternals`
--
ALTER TABLE `po_eksternals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `po_pembelian_bahans`
--
ALTER TABLE `po_pembelian_bahans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `po_pembelian_bahan_items`
--
ALTER TABLE `po_pembelian_bahan_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `produksis`
--
ALTER TABLE `produksis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `rekening_suplayers`
--
ALTER TABLE `rekening_suplayers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `rekening_suplayer_pembelian_bahans`
--
ALTER TABLE `rekening_suplayer_pembelian_bahans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `suplayers`
--
ALTER TABLE `suplayers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `suplayer_pembelian_bahans`
--
ALTER TABLE `suplayer_pembelian_bahans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `typebahans`
--
ALTER TABLE `typebahans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `otorisasis`
--
ALTER TABLE `otorisasis`
  ADD CONSTRAINT `otorisasis_id_customer_foreign` FOREIGN KEY (`id_customer`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rekening_suplayers`
--
ALTER TABLE `rekening_suplayers`
  ADD CONSTRAINT `rekening_suplayers_id_suplayer_foreign` FOREIGN KEY (`id_suplayer`) REFERENCES `suplayers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
