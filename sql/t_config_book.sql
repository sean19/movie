/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : sean

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 24/11/2021 17:53:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_config_book
-- ----------------------------
DROP TABLE IF EXISTS `t_config_book`;
CREATE TABLE `t_config_book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `platformid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `pname` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `host` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `searchstr` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `searchinfo` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `searchpage` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `chapterpage` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `chapterselect` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `infotitle` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `infooption1` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `infooption2` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `infotext` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;

-- ----------------------------
-- Records of t_config_book
-- ----------------------------
BEGIN;
INSERT INTO `t_config_book` VALUES (1, '1', 'https://m.xbooktxt.net', 'https://m.xbooktxt.net', '/search.php?q=', '1', '2', '4', '5', '6', '7', '8', '3', '2021-11-24 02:50:36', '2021-11-24 07:28:17');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
