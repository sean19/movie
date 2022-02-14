一、全局安装sequelize-auto

　　npm install -g sequelize-auto

二、全局安装对应数据库的驱动，此处使用的是mysql

　　npm install -g mysql

三、在对应的文件夹下执行以下命令

　　sequelize-auto -h 数据库的IP地址 -d 数据库名 -u 用户名 -x 密码 -p 端口 -t 表名


sudo sequelize-auto -o "./mysqltest2" -d sean -h localhost -u root -p 3306 -x weichuman2012 -t t_config_book -e mysql