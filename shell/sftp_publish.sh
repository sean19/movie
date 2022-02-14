#!/bin/bash

export TERM=xterm-256color

u1=$1
u2=$2
u3=$3
u4=$4
#u3=1
#此脚本运行在本地PC电脑上，将本地版本发布到正式服上
echo ""

#IP
IP=120.77.43.7

#端口
PORT=22

#用户名

USER=awby

echo -e "\033[41;36m必须先将本地开发机SSH钥匙证书上传服务器\033[0m"
#ssh-keygen -t rsa　　#默认会在~/.ssh生成两个文件
#ssh-copy-id -p ${PORT} -i ~/.ssh/id_rsa.pub ${USER}@${IP}
echo ""

echo "版本发布-->正式服"
echo ""

if [[ $# -eq 0 ]];then
    clear
    echo -e "—————————————————————————————"
    echo -e "\033[41;36m(1/4)请输入你的选择：\033[0m"
    echo 0 不同步更新 bin/com 文件夹
    echo 1 同步更新 bin/com 文件夹
    echo -e "—————————————————————————————"
    read u1

    clear
    echo ""
    echo -e "—————————————————————————————"
    echo -e "\033[41;36m(2/4)请输入你的选择：\033[0m"
    echo 0 不同步更新 public 文件夹
    echo 1 同步更新 public 文件夹
    echo -e "—————————————————————————————"
    read u2

    clear
    echo ""
    echo -e "—————————————————————————————"
    echo -e "\033[41;36m(3/4)请输入你的选择：\033[0m"
    echo 0 不同步更新 views 文件夹
    echo 1 同步更新 views 文件夹

    echo -e "—————————————————————————————"
    read u3

    clear
    echo ""
    echo -e "—————————————————————————————"
    echo -e "\033[41;36m(4/4)请输入你的选择：\033[0m"
    echo 0 不同步更新 protoFiles 文件夹
    echo 1 同步更新 protoFiles 文件夹
    echo -e "—————————————————————————————"
    read u4
fi

ArrUpdate=([0]=$u1 [1]=$u2 [2]=$u3 [3]=$u4)

#目录配置
cd $(pwd)/../
#本地文件目录
arrLocalDir=("bin/com" "public" "views" "protoFiles")

#备份
backup_dir=/home/${USER}/backup/$(date +%Y%m%d%H%M)
need_update=0
if [ ${ArrUpdate[0]} -eq 1 ] || [ ${ArrUpdate[1]} -eq 1 ] || [ ${ArrUpdate[2]} -eq 1 ] || [ ${ArrUpdate[3]} -eq 1 ];then
    need_update=1;
fi

ssh -p ${PORT} ${USER}@${IP} "test -d $backup_dir"

if [ $? -ne 0 ] && [ ${need_update} -eq 1 ]; then
  sftp -P ${PORT} ${USER}@${IP} <<EOF
  mkdir $backup_dir
  quit
EOF
fi

if [ ${ArrUpdate[0]} -eq 1 ]; then
  sftp -P ${PORT} ${USER}@${IP} <<EOF
  mkdir $backup_dir/bin
  quit
EOF
fi

sleep 2

###########################################################################上传文件
for(( i=0;i<${#arrLocalDir[@]};i++))
do
    NEED=${ArrUpdate[i]};
    if [[ $NEED -eq 1 ]];then
        echo "开始上传 ${arrLocalDir[i]} 文件夹，第${i}个文件"

sftp -P ${PORT} ${USER}@${IP} <<EOF
rename /home/${USER}/www/${arrLocalDi1r[i]} ${backup_dir}/${arrLocalDir[i]}
mkdir www/${arrLocalDir[i]}
put -r ${arrLocalDir[i]}/. www/${arrLocalDir[i]}
quit
EOF

        echo 同步 ${arrLocalDir[i]} 完成
    fi
done;
if [ ${need_update} -eq 1 ]; then

clear
echo ""
echo -e "—————————————————————————————"
echo -e "\033[41;36m重启项目，请输入你的选择：\033[0m"
echo 0 不重启
echo 1 重启
echo -e "—————————————————————————————"
read u4

if [ ${u4} -eq 1 ]; then
/usr/bin/expect << EOF
set timeout 1
spawn ssh -p ${PORT} ${USER}@${IP}
send "cd /home/${USER}/www\r"
sleep 1
send "ls\r"
sleep 1
send "forever stop bin/www\r"
sleep 2
send "forever start bin/www\r"
EOF
fi

fi

exit