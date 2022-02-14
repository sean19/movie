#!/bin/bash

pug_one=book_online_search.pug
dir=$(pwd)
out_dir=${dir}/public/cms
pug_file=${dir}/public/cms/pug/${pug_one}

pug $pug_file --out $out_dir    