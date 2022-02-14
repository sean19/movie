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

 Date: 24/11/2021 17:54:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_config_clawer
-- ----------------------------
DROP TABLE IF EXISTS `t_config_clawer`;
CREATE TABLE `t_config_clawer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userAgent` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `maxConnections` int DEFAULT NULL,
  `retries` int DEFAULT NULL,
  `retryTimeout` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;

-- ----------------------------
-- Records of t_config_clawer
-- ----------------------------
BEGIN;
INSERT INTO `t_config_clawer` VALUES (1, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.163 Safari/535.1', 11, 1, 11, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
