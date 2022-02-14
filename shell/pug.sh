#!/bin/bash

# dir=$(dirname $(pwd))
dir=$(pwd)
pug_dir=${dir}/public/cms/pug
out_dir=${dir}/public/cms
echo ${out_dir}

pug $pug_dir --out $out_dir