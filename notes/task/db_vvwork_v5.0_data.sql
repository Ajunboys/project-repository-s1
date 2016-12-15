SET FOREIGN_KEY_CHECKS=0;

INSERT INTO `tb_platform_user` VALUES (1, 'admin', '123456', '2016-8-8 18:58:58');

INSERT INTO `tb_platform_system_permission` VALUES (1, 'CREATE_CONNECTION');
INSERT INTO `tb_platform_system_permission` VALUES (1, 'CREATE_CONNECTION_GROUP');
INSERT INTO `tb_platform_system_permission` VALUES (1, 'CREATE_USER');
INSERT INTO `tb_platform_system_permission` VALUES (1, 'CREATE_USER_GROUP');
INSERT INTO `tb_platform_system_permission` VALUES (1, 'ADMINISTER');

INSERT INTO `tb_platform_user_permission` VALUES (1, 1, 'ADMINISTER');
INSERT INTO `tb_platform_user_permission` VALUES (1, 1, 'UPDATE');
INSERT INTO `tb_platform_user_permission` VALUES (1, 1, 'READ');