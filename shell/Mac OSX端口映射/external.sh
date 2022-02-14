#!/usr/bin/env bash
echo "服务器IP：绑定到外网ip"

#删除删除包涵'wx.vfangtuan.com'的一行文本
sed '/wx.vfangtuan.com/'d /etc/hosts > /etc/hosts.out
mv /etc/hosts.out /etc/hosts
