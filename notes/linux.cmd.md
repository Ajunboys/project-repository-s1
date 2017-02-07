# 新增用户组DS_USERS
```shell
groupadd DS_USERS
# 新增用户ds_admin到DS_USERS组
```shell
useradd -G DS_USERS ds_admin
# 输入密码
```shell
passwd ds_admin
$ New password:......
$ Retype new password:......