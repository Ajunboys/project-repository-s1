将从官网下载的apache-tomcat-xxx解压后拷贝到或移动到/usr/local/apache-tomcat-xxx目录下，
并给予权限：chmod 755 /usr/local/apache-tomcat-xxx/bin/*.sh

可以通过 ./startup.sh 来启动tomcat（前提是做了系统环境变量设置）
，

如果没有的话，可以通过快捷启动来完成。 tomcat start，但是需要在/usr/local/bin/下建立文件（tomcat、tomcat8、tomcat9）


在/usr/local/bin 下建立tomcat、tomcat8、tomcat9 文件
```shell
vi  /usr/local/bin/tomcat
```

内容如以下：（注：别忘啦给它们添加权限：chmod 755 /usr/local/bin/tomcat等）

## apache-tomcat-8.5.4
```shell
#!/bin/bash
case $1 in
start)
sudo sh /usr/local/apache-tomcat-8.5.4/bin/startup.sh
;;
stop)
sudo sh /usr/local/apache-tomcat-8.5.4/bin/shutdown.sh
;;
restart)
sudo sh /usr/local/apache-tomcat-8.5.4/bin/shutdown.sh
sudo sh /usr/local/apache-tomcat-8.5.4/bin/startup.sh
;;
*)
echo “Usage: start|stop|restart”
;;
esac
exit 0
```

## apache-tomcat-8.0.36
```shell
#!/bin/bash
case $1 in
start)
sudo sh /usr/local/tomcat/apache-tomcat-8.0.36/bin/startup.sh
;;
stop)
sudo sh /usr/local/tomcat/apache-tomcat-8.0.36/bin/shutdown.sh
;;
restart)
sudo sh /usr/local/tomcat/apache-tomcat-8.0.36/bin/shutdown.sh
sudo sh /usr/local/tomcat/apache-tomcat-8.0.36/bin/startup.sh
;;
*)
echo “Usage: start|stop|restart”
;;
esac
exit 0
```

## apache-tomcat-9.0.0.M9
```shell
#!/bin/bash
case $1 in
start)
sudo sh /usr/local/tomcat/apache-tomcat-9.0.0.M9/bin/startup.sh
;;
stop)
sudo sh /usr/local/tomcat/apache-tomcat-9.0.0.M9/bin/shutdown.sh
;;
restart)
sudo sh /usr/local/tomcat/apache-tomcat-9.0.0.M9/bin/shutdown.sh
sudo sh /usr/local/tomcat/apache-tomcat-9.0.0.M9/bin/startup.sh
;;
*)
echo “Usage: start|stop|restart”
;;
esac
exit 0
```