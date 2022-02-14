#!/usr/bin/env bash
ttys="请输入你的选择："
clear
echo ----------------------------------
echo -e "\033[41;36m (1/3)请输入你的选择： \033[0m"
echo 1 重启
echo 2 启动
echo 0 关闭
echo -e "—————————————————"
read u1

cd ~/www
if [ ${u1} -eq 0 ];then
{
    forever stop bin/www
}
elif [ ${u1} == 1 ];then
{
    forever stop bin/www
    echo -e "\033[41;36m 正在重新启动 \033[0m"
    sleep 3
    forever start bin/www
}
elif [ ${u1} == 2 ];then
{
    forever start bin/www
}
fi