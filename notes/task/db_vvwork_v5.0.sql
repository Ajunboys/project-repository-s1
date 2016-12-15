/*
Navicat MySQL Data Transfer

Source Server         : vvwork
Source Server Version : 50710
Source Host           : 192.168.10.130:3306
Source Database       : vvwork_db

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-08-26 17:50:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_platform_application
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_application`;
CREATE TABLE `tb_platform_application` (
  `application_id` int(11) NOT NULL AUTO_INCREMENT,
  `application_name` varchar(255) NOT NULL,
  `application_url` varchar(255) NOT NULL,
  `application_auth_auto_state` int(11) NOT NULL,
  `application_auth_url` varchar(255) DEFAULT NULL,
  `application_auth_after_state` int(11) NOT NULL,
  `application_auth_after_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`application_id`,`application_name`),
  UNIQUE KEY `platform_application_name` (`application_name`) USING BTREE,
  KEY `application_id` (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_application_group
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_application_group`;
CREATE TABLE `tb_platform_application_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`group_id`,`group_name`),
  UNIQUE KEY `group_name` (`group_name`) USING BTREE,
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_app_application_group
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_app_application_group`;
CREATE TABLE `tb_platform_app_application_group` (
  `application_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`application_id`,`group_id`),
  KEY `tb_application_group_app_ibfk_2` (`group_id`),
  CONSTRAINT `tb_application_group_app_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `tb_platform_application` (`application_id`) ON DELETE CASCADE,
  CONSTRAINT `tb_application_group_app_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `tb_platform_application_group` (`group_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_system_permission
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_system_permission`;
CREATE TABLE `tb_platform_system_permission` (
  `user_id` int(11) NOT NULL,
  `permission` enum('CREATE_CONNECTION','CREATE_CONNECTION_GROUP','CREATE_USER','CREATE_USER_GROUP','ADMINISTER') NOT NULL,
  PRIMARY KEY (`user_id`,`permission`),
  CONSTRAINT `tb_platform_system_permission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_platform_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user`;
CREATE TABLE `tb_platform_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user_application
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user_application`;
CREATE TABLE `tb_platform_user_application` (
  `user_application_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`user_application_id`),
  KEY `tb_platform_user_application_ibfk_1` (`user_id`),
  KEY `tb_platform_user_application_ibfk_2` (`application_id`),
  CONSTRAINT `tb_platform_user_application_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_platform_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `tb_platform_user_application_ibfk_2` FOREIGN KEY (`application_id`) REFERENCES `tb_platform_application` (`application_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user_app_group
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user_app_group`;
CREATE TABLE `tb_platform_user_app_group` (
  `user_group_id` int(11) NOT NULL,
  `app_group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_group_id`,`app_group_id`),
  KEY `tb_platform_user_app_group_ibfk_2` (`app_group_id`),
  CONSTRAINT `tb_platform_user_app_group_ibfk_1` FOREIGN KEY (`user_group_id`) REFERENCES `tb_platform_user_group` (`group_id`) ON DELETE CASCADE,
  CONSTRAINT `tb_platform_user_app_group_ibfk_2` FOREIGN KEY (`app_group_id`) REFERENCES `tb_platform_application_group` (`group_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user_group
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user_group`;
CREATE TABLE `tb_platform_user_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `platform_user_group` (`group_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user_group_permission
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user_group_permission`;
CREATE TABLE `tb_platform_user_group_permission` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `tb_platform_user_group_permission_ibfk_1` (`group_id`) USING BTREE,
  CONSTRAINT `tb_platform_user_group_permission_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `tb_platform_user_group` (`group_id`) ON DELETE CASCADE,
  CONSTRAINT `tb_platform_user_group_permission_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_platform_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user_info
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user_info`;
CREATE TABLE `tb_platform_user_info` (
  `user_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `sex` varchar(16) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_info_id`,`user_id`),
  KEY `user_info_user_ibfk_1` (`user_id`) USING BTREE,
  CONSTRAINT `tb_platform_user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_platform_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user_info_temp
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user_info_temp`;
CREATE TABLE `tb_platform_user_info_temp` (
  `user_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `sex` varchar(16) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_info_id`,`user_id`),
  KEY `user_info_user_temp_ibfk_1` (`user_id`) USING BTREE,
  CONSTRAINT `tb_user_info_user_temp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_platform_user_temp` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user_permission
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user_permission`;
CREATE TABLE `tb_platform_user_permission` (
  `user_id` int(11) NOT NULL,
  `affected_user_id` int(11) NOT NULL,
  `permission` enum('ADMINISTER','DELETE','UPDATE','READ') NOT NULL,
  PRIMARY KEY (`user_id`,`affected_user_id`,`permission`),
  KEY `tb_platform_user_affected_permission_ibfk_1` (`affected_user_id`) USING BTREE,
  CONSTRAINT `tb_platform_user_permission_ibfk_1` FOREIGN KEY (`affected_user_id`) REFERENCES `tb_platform_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `tb_platform_user_permission_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tb_platform_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_platform_user_temp
-- ----------------------------
DROP TABLE IF EXISTS `tb_platform_user_temp`;
CREATE TABLE `tb_platform_user_temp` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `execute_state` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`username`),
  UNIQUE KEY `platform_username_temp` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
