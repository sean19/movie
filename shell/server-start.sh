#!/bin/bash


echo 开始操作
/usr/bin/expect << EOF
set timeout 1
spawn ssh -p 22 awby@120.77.43.7
expect "*$"
sleep 2
send "cd /home/awby/www\r"
sleep 2
send "forever start bin/www\r"
sleep 2

EOF


exit