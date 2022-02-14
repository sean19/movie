#!/bin/bash

u1=$1

echo ""

echo "查找端口占用进程"
echo ""

if [[ $# -eq 0 ]];then
    clear
    echo -e "—————————————————————————————"
    echo -e "\033[41;36m请输入端口号：\033[0m"
    echo -e "—————————————————————————————"
    read u1
fi

sys_info=$(uname -a)
result=$(echo $sys_info | grep "linux")
result1=$(echo $sys_info | grep "Linux")
if [ "$result" == "" ] && [ "$result1" == "" ];then
  echo "Mac系统"
  netstat -vanp tcp | grep $u1
else
  echo "Linux系统"
  netstat -anp | grep $u1
fi

echo ""
echo -e "—————————————————————————————"
echo -e "\033[41;36m请输入端口号：\033[0m"
echo 0 不杀死进程
echo 1 杀死进程
echo -e "—————————————————————————————"
read u2

if [[ $u2 -eq 1 ]];then
    clear
    echo -e "—————————————————————————————"
    echo -e "\033[41;36m请输入进程ID：\033[0m"
    echo -e "—————————————————————————————"
    read u3

    kill $u3
fi