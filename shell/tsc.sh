#!/bin/bash

export TERM=xterm-256color
ttys="请输入你的选择："
clear

cd ..
tsc --rootDir src --outDir ./bin

#添加*.ts添加API代码提示
#npm install --save-dev typescript @types/pug
#npm install --save-dev @types/pug

#应用所需安装代码库
#npm install -g pug
#npm install -g serve-favicon
#npm install -g morgan