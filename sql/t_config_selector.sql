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

 Date: 24/11/2021 17:54:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_config_selector
-- ----------------------------
DROP TABLE IF EXISTS `t_config_selector`;
CREATE TABLE `t_config_selector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `info` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `datatype` varchar(255) COLLATE utf8mb4_zh_0900_as_cs DEFAULT NULL,
  `selector` text CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs,
  `attribs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_zh_0900_as_cs,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_zh_0900_as_cs;

-- ----------------------------
-- Records of t_config_selector
-- ----------------------------
BEGIN;
INSERT INTO `t_config_selector` VALUES (1, '搜索小说https://m.xbooktxt.net', 'https://m.xbooktxt.net/search.php?q=%E5%93%88%E5%93%88', NULL, 'body > div.result-list > div', '[{\"name\":\"img\",\"path\":\"div.result-game-item-pic > a > img\",\"att\":\"src\",\"deel\":\"\"},{\"name\":\"title\",\"path\":\"div.result-game-item-detail > h3 > a\",\"att\":\"text\",\"deel\":\"\"},{\"name\":\"info\",\"path\":\"div.result-game-item-detail > p\",\"att\":\"text\",\"deel\":\"\"},{\"name\":\"master\",\"path\":\"div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)\",\"att\":\"text\",\"deel\":\"\"},{\"name\":\"link\",\"path\":\"div.result-game-item-detail > h3 > a\",\"att\":\"href\",\"deel\":\"\"}]', '2021-11-24 03:06:00', '2021-11-24 03:56:34');
INSERT INTO `t_config_selector` VALUES (2, '搜索上下页', 'https://m.xbooktxt.net/search.php?q=a', NULL, 'body > div.search-result-page > div > a', '[{\"name\":\"txt\",\"path\":\"\",\"att\":\"title\",\"deel\":\"\"},{\"name\":\"link\",\"path\":\"\",\"att\":\"href\",\"deel\":\"\"}]', '2021-11-24 03:19:25', '2021-11-24 06:38:24');
INSERT INTO `t_config_selector` VALUES (3, '获取book内容', 'https://m.xbooktxt.net/3/w3216/234313.html', NULL, '#nr1', '[{\"name\":\"info\",\"path\":\"\",\"att\":\"text\",\"deel\":\"\"}]', '2021-11-24 07:10:35', '2021-11-24 07:10:35');
INSERT INTO `t_config_selector` VALUES (4, '获取章节【列表】', 'https://m.xbooktxt.net/3/w3216/', NULL, 'body > div.cover > ul:nth-child(11) > li', '[{\"name\":\"title\",\"path\":\"\",\"att\":\"text\",\"deel\":\"\"},{\"name\":\"link\",\"path\":\"a\",\"att\":\"href\",\"deel\":\"\"}]', '2021-11-24 07:13:52', '2021-11-24 07:13:52');
INSERT INTO `t_config_selector` VALUES (5, '获取章节列表的【页码】', 'https://m.xbooktxt.net/3/w3216/', NULL, 'body > div.cover > div.listpage > span.middle > select > option', '[{\"name\":\"title\",\"path\":\"\",\"att\":\"text\",\"deel\":\"\"},{\"name\":\"link\",\"path\":\"\",\"att\":\"value\",\"deel\":\"\"}]', '2021-11-24 07:16:01', '2021-11-24 07:16:01');
INSERT INTO `t_config_selector` VALUES (6, '章节名', 'https://m.xbooktxt.net/wapbook/63636_332619.html', NULL, '#nr_title', '[{\"name\":\"title\",\"path\":\"\",\"att\":\"\",\"deel\":\"\"}]', '2021-11-24 07:22:05', '2021-11-24 07:49:30');
INSERT INTO `t_config_selector` VALUES (7, '内容界面上一页', 'https://m.xbooktxt.net/3/w3216/234308.html', NULL, 'td.prev_chapter > a', '[{\"name\":\"title\",\"path\":\"\",\"att\":\"text\",\"deel\":\"\"},{\"name\":\"link\",\"path\":\"\",\"att\":\"href\",\"deel\":\"\"}]', '2021-11-24 07:27:14', '2021-11-24 07:27:14');
INSERT INTO `t_config_selector` VALUES (8, '内容界面下一页', 'https://m.xbooktxt.net/3/w3216/234308.html', NULL, 'td.next_chapter > a', '[{\"name\":\"link\",\"path\":\"\",\"att\":\"href\",\"deel\":\"\"},{\"name\":\"title\",\"path\":\"\",\"att\":\"text\",\"deel\":\"\"}]', '2021-11-24 07:28:11', '2021-11-24 07:28:11');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
