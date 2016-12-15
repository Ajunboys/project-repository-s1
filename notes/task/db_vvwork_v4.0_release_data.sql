SET FOREIGN_KEY_CHECKS=0;

INSERT INTO `vvwork_user` VALUES ('1', 'admin', 0x33EA637727350B690E540DE19B6DF05D528433C6779D850CCB9700E2877D16A3, 0x397760FFBBA793097D09CE6D730E3ADB8AA6FF7B33E63FAC40A62FC0BA264B44, '0', '0', null, null, null, null, null);

INSERT INTO `vvwork_user_remote` VALUES ('1', 'ds_admin', 'V*p_W2d5');

INSERT INTO `vvwork_user_permission` VALUES ('1', '1', 'READ');
INSERT INTO `vvwork_user_permission` VALUES ('1', '1', 'UPDATE');
INSERT INTO `vvwork_user_permission` VALUES ('1', '1', 'ADMINISTER');

INSERT INTO `vvwork_system_permission` VALUES ('1', 'CREATE_CONNECTION');
INSERT INTO `vvwork_system_permission` VALUES ('1', 'CREATE_CONNECTION_GROUP');
INSERT INTO `vvwork_system_permission` VALUES ('1', 'CREATE_USER');
INSERT INTO `vvwork_system_permission` VALUES ('1', 'ADMINISTER');

INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'file-delete', 'false'  FROM  `vvwork_user` WHERE username != 'admin');
INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'file-download', 'false'  FROM  `vvwork_user` WHERE username != 'admin');
INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'file-upload', 'false'  FROM  `vvwork_user` WHERE username != 'admin');
INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'txt-input', 'false'  FROM  `vvwork_user` WHERE username != 'admin');
INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'txt-output', 'false'  FROM  `vvwork_user` WHERE username != 'admin');

INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'file-delete', 'true'  FROM  `vvwork_user` WHERE username = 'admin');
INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'file-download', 'true'  FROM  `vvwork_user` WHERE username = 'admin');
INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'file-upload', 'true'  FROM  `vvwork_user` WHERE username = 'admin');
INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'txt-input', 'true'  FROM  `vvwork_user` WHERE username = 'admin');
INSERT INTO  `tb_vvwork_user_connection_permission` (`user_id`, `parameter_name`, `parameter_value`) 
(SELECT   `user_id`, 'txt-output', 'true'  FROM  `vvwork_user` WHERE username = 'admin');

