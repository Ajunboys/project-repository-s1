/*
Navicat MySQL Data Transfer

Source Server         : vvwork
Source Server Version : 50710
Source Host           : 192.168.10.130:3306
Source Database       : vvwork_db

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2016-09-05 13:09:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_vvwork_connection
-- ----------------------------
DROP TABLE IF EXISTS `tb_vvwork_connection`;
CREATE TABLE `tb_vvwork_connection` (
  `connection_id` int(11) NOT NULL AUTO_INCREMENT,
  `connection_name` varchar(128) NOT NULL,
  `connection_create_time` datetime NOT NULL,
  `connection_modified_time` datetime NOT NULL,
  `connection_state` int(11) NOT NULL,
  PRIMARY KEY (`connection_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_vvwork_connection_machine
-- ----------------------------
DROP TABLE IF EXISTS `tb_vvwork_connection_machine`;
CREATE TABLE `tb_vvwork_connection_machine` (
  `machine_id` int(11) NOT NULL AUTO_INCREMENT,
  `machine_name` varchar(128) NOT NULL,
  `machine_hostname` varchar(128) NOT NULL,
  `machine_port` varchar(16) NOT NULL,
  `machine_max_connection` int(11) NOT NULL,
  `machine_state` int(11) NOT NULL,
  PRIMARY KEY (`machine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_vvwork_connection_machine_software
-- ----------------------------
DROP TABLE IF EXISTS `tb_vvwork_connection_machine_software`;
CREATE TABLE `tb_vvwork_connection_machine_software` (
  `connection_id` int(11) NOT NULL,
  `software_id` int(11) NOT NULL,
  PRIMARY KEY (`software_id`,`connection_id`),
  KEY `vvwork_connection_ibfk_1` (`connection_id`) USING BTREE,
  KEY `vvwork_connection_software_ibfk_2` (`software_id`),
  CONSTRAINT `vvwork_cms_connection_ibfk_1` FOREIGN KEY (`connection_id`) REFERENCES `tb_vvwork_connection` (`connection_id`) ON DELETE CASCADE,
  CONSTRAINT `vvwork_cms_connection_software_ibfk_2` FOREIGN KEY (`software_id`) REFERENCES `tb_vvwork_connection_software` (`software_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_vvwork_connection_software
-- ----------------------------
DROP TABLE IF EXISTS `tb_vvwork_connection_software`;
CREATE TABLE `tb_vvwork_connection_software` (
  `software_id` int(11) NOT NULL AUTO_INCREMENT,
  `software_name` varchar(128) NOT NULL,
  `machine_id` int(11) NOT NULL,
  `software_state` int(11) NOT NULL,
  PRIMARY KEY (`software_id`,`machine_id`),
  KEY `vvwork_software_machine_ibfk_1` (`machine_id`),
  CONSTRAINT `vvwork_software_machine_ibfk_1` FOREIGN KEY (`machine_id`) REFERENCES `tb_vvwork_connection_machine` (`machine_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_vvwork_connection_software_parameter
-- ----------------------------
DROP TABLE IF EXISTS `tb_vvwork_connection_software_parameter`;
CREATE TABLE `tb_vvwork_connection_software_parameter` (
  `software_id` int(11) NOT NULL,
  `parameter_name` varchar(128) NOT NULL,
  `parameter_value` varchar(4096) NOT NULL,
  PRIMARY KEY (`software_id`,`parameter_name`),
  CONSTRAINT `vvwork_connection_software_parameter_ibfk_1` FOREIGN KEY (`software_id`) REFERENCES `tb_vvwork_connection_software` (`software_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_vvwork_disabled_machine
-- ----------------------------
DROP TABLE IF EXISTS `tb_vvwork_disabled_machine`;
CREATE TABLE `tb_vvwork_disabled_machine` (
  `machine_id` int(11) NOT NULL AUTO_INCREMENT,
  `machine_hostname` varchar(64) NOT NULL,
  `state` int(11) NOT NULL,
  `disabled_time` datetime NOT NULL,
  PRIMARY KEY (`machine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_connection
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_connection`;
CREATE TABLE `vvwork_connection` (
  `connection_id` int(11) NOT NULL AUTO_INCREMENT,
  `connection_name` varchar(128) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `protocol` varchar(32) NOT NULL,
  `max_connections` int(11) DEFAULT NULL,
  `max_connections_per_user` int(11) DEFAULT NULL,
  `hostname` varchar(32) DEFAULT NULL,
  `hostname2` varchar(32) DEFAULT '127.0.0.1' COMMENT 'vvwork connection(application) hostname',
  PRIMARY KEY (`connection_id`),
  UNIQUE KEY `connection_name_parent` (`connection_name`,`parent_id`),
  KEY `guacamole_connection_ibfk_1` (`parent_id`),
  CONSTRAINT `vvwork_connection_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `vvwork_connection_group` (`connection_group_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_connection_group
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_connection_group`;
CREATE TABLE `vvwork_connection_group` (
  `connection_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `connection_group_name` varchar(128) NOT NULL,
  `type` enum('ORGANIZATIONAL','BALANCING') NOT NULL DEFAULT 'ORGANIZATIONAL',
  `max_connections` int(11) DEFAULT NULL,
  `max_connections_per_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`connection_group_id`),
  UNIQUE KEY `connection_group_name_parent` (`connection_group_name`,`parent_id`),
  KEY `guacamole_connection_group_ibfk_1` (`parent_id`),
  CONSTRAINT `vvwork_connection_group_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `vvwork_connection_group` (`connection_group_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_connection_group_permission
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_connection_group_permission`;
CREATE TABLE `vvwork_connection_group_permission` (
  `user_id` int(11) NOT NULL,
  `connection_group_id` int(11) NOT NULL,
  `permission` enum('READ','UPDATE','DELETE','ADMINISTER') NOT NULL,
  PRIMARY KEY (`user_id`,`connection_group_id`,`permission`),
  KEY `guacamole_connection_group_permission_ibfk_1` (`connection_group_id`),
  CONSTRAINT `vvwork_connection_group_permission_ibfk_1` FOREIGN KEY (`connection_group_id`) REFERENCES `vvwork_connection_group` (`connection_group_id`) ON DELETE CASCADE,
  CONSTRAINT `vvwork_connection_group_permission_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `vvwork_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_connection_history
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_connection_history`;
CREATE TABLE `vvwork_connection_history` (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `connection_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`history_id`,`connection_id`),
  KEY `user_id` (`user_id`),
  KEY `connection_id` (`connection_id`),
  KEY `start_date` (`start_date`),
  KEY `end_date` (`end_date`),
  KEY `search_index` (`start_date`,`connection_id`,`user_id`),
  CONSTRAINT `vvwork_connection_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `vvwork_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `vvwork_connection_history_ibfk_2` FOREIGN KEY (`connection_id`) REFERENCES `tb_vvwork_connection` (`connection_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=580 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_connection_parameter
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_connection_parameter`;
CREATE TABLE `vvwork_connection_parameter` (
  `connection_id` int(11) NOT NULL,
  `parameter_name` varchar(128) NOT NULL,
  `parameter_value` varchar(4096) NOT NULL,
  PRIMARY KEY (`connection_id`,`parameter_name`),
  CONSTRAINT `vvwork_connection_parameter_ibfk_1` FOREIGN KEY (`connection_id`) REFERENCES `vvwork_connection` (`connection_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_connection_permission
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_connection_permission`;
CREATE TABLE `vvwork_connection_permission` (
  `user_id` int(11) NOT NULL,
  `connection_id` int(11) NOT NULL,
  `permission` enum('READ','UPDATE','DELETE','ADMINISTER') NOT NULL,
  PRIMARY KEY (`user_id`,`connection_id`,`permission`),
  KEY `vvwork_connection_permission_ibfk_1` (`connection_id`),
  CONSTRAINT `vvwork_connection_permission_ibfk_1` FOREIGN KEY (`connection_id`) REFERENCES `tb_vvwork_connection` (`connection_id`) ON DELETE CASCADE,
  CONSTRAINT `vvwork_connection_permission_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `vvwork_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_connection_sso
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_connection_sso`;
CREATE TABLE `vvwork_connection_sso` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `connection_id` int(11) NOT NULL,
  `username_position_x` varchar(32) DEFAULT NULL,
  `username_position_y` varchar(32) DEFAULT NULL,
  `username_state` int(11) DEFAULT NULL,
  `password_position_x` varchar(32) DEFAULT NULL,
  `password_position_y` varchar(32) DEFAULT NULL,
  `password_state` int(11) DEFAULT NULL,
  `config_position_x` varchar(32) DEFAULT NULL,
  `config_position_y` varchar(32) DEFAULT NULL,
  `config_state` int(11) DEFAULT NULL,
  PRIMARY KEY (`pid`,`connection_id`),
  KEY `vvwork_connection_sso_ibfk_1` (`connection_id`),
  CONSTRAINT `vvwork_connection_sso_ibfk_1` FOREIGN KEY (`connection_id`) REFERENCES `tb_vvwork_connection` (`connection_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_system_logger
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_system_logger`;
CREATE TABLE `vvwork_system_logger` (
  `logger_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `logger_user` varchar(128) NOT NULL,
  `logger_delete` varchar(10) DEFAULT NULL,
  `logger_application` varchar(128) DEFAULT NULL,
  `logger_type` varchar(128) NOT NULL,
  `logger_operat` varchar(128) NOT NULL,
  `logger_message` varchar(512) NOT NULL,
  `logger_time` datetime NOT NULL,
  PRIMARY KEY (`logger_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1553 DEFAULT CHARSET=utf8 COMMENT='vvwork system logger(user login/exit, start/close application)';

-- ----------------------------
-- Table structure for vvwork_system_parameter
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_system_parameter`;
CREATE TABLE `vvwork_system_parameter` (
  `parameter_name` varchar(128) NOT NULL,
  `parameter_value` varchar(4096) NOT NULL,
  PRIMARY KEY (`parameter_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_system_permission
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_system_permission`;
CREATE TABLE `vvwork_system_permission` (
  `user_id` int(11) NOT NULL,
  `permission` enum('CREATE_CONNECTION','CREATE_CONNECTION_GROUP','CREATE_USER','ADMINISTER') NOT NULL,
  PRIMARY KEY (`user_id`,`permission`),
  CONSTRAINT `vvwork_system_permission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `vvwork_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_user
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_user`;
CREATE TABLE `vvwork_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `password_hash` binary(32) NOT NULL,
  `password_salt` binary(32) DEFAULT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `expired` tinyint(1) NOT NULL DEFAULT '0',
  `access_window_start` time DEFAULT NULL,
  `access_window_end` time DEFAULT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_until` date DEFAULT NULL,
  `timezone` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_user_connection_sso
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_user_connection_sso`;
CREATE TABLE `vvwork_user_connection_sso` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(128) NOT NULL,
  `connection_id` int(11) NOT NULL,
  `username` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`sid`,`connection_id`),
  KEY `vvwork_connection_user_sso_ibfk_1` (`connection_id`),
  CONSTRAINT `vvwork_connection_user_sso_ibfk_1` FOREIGN KEY (`connection_id`) REFERENCES `tb_vvwork_connection` (`connection_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_user_permission
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_user_permission`;
CREATE TABLE `vvwork_user_permission` (
  `user_id` int(11) NOT NULL,
  `affected_user_id` int(11) NOT NULL,
  `permission` enum('READ','UPDATE','DELETE','ADMINISTER') NOT NULL,
  PRIMARY KEY (`user_id`,`affected_user_id`,`permission`),
  KEY `vvwork_user_permission_ibfk_1` (`affected_user_id`) USING BTREE,
  CONSTRAINT `vvwork_user_permission_ibfk_1` FOREIGN KEY (`affected_user_id`) REFERENCES `vvwork_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `vvwork_user_permission_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `vvwork_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vvwork_user_remote
-- ----------------------------
DROP TABLE IF EXISTS `vvwork_user_remote`;
CREATE TABLE `vvwork_user_remote` (
  `user_id` int(11) NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `vvwork_user_remote_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `vvwork_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tb_vvwork_user_connection_permission`;
CREATE TABLE `tb_vvwork_user_connection_permission` (
  `user_id` int(11) NOT NULL,
  `parameter_name` varchar(128) NOT NULL,
  `parameter_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`parameter_name`),
  CONSTRAINT `tb_vvwork_user_connection_permission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `vvwork_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

