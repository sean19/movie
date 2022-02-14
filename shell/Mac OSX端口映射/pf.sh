#!/usr/bin/env bash
echo 端口转发

#初使化端口转发配制
#cp com.vfang /etc/pf.anchors
#echo "rdr-anchor \"vfang\"" >> /etc/pf.conf
#echo "load anchor \"vfang\" from \"/etc/pf.anchors/com.vfang\"" >> /etc/pf.conf

#加载端口转发配制
sudo pfctl -evf /etc/pf.conf

#删除端口转发
#sudo pfctl -d

#设置pf开机自动打开
#sudo pfctl -e
