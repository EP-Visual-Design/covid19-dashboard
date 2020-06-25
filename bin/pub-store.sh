#!/bin/bash
cd ${0%/*}

# Publish covid19 html app to secure.medcampus.net

delete=--delete
test=
# test=--dry-run
verbose=
# verbose=v

host=epdev@secure.medcampus.net
rpath=/home/epdev/covid19/store

rdest=$host:${rpath}

ssh $host mkdir -p $rpath

source=../store
echo $verbose $delete $test
echo "rsync from $source"
echo "        to $rdest"
rsync -razO$verbose --exclude .DS_Store --exclude .git $delete $test "$source/" "$rdest/"

echo
ssh $host ls -l $rpath/stats/summary.json