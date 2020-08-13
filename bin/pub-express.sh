#!/bin/bash
cd ${0%/*}

# Publish covid19 express app to epvisual.com

source=../express

cd $source
npm version patch

host=epdev@epvisual.com
rpath=/home/epdev/covid19/express

delete=--delete

# test=--dry-run

verbose=v

excludes="--exclude-from ../bin/express-excluded.txt"

ssh $host mkdir -p $rpath

rdest=$host:${rpath}

echo "Start $(date)" 

# -razvO 
echo "from     $source" 
echo "to       $rdest" 
echo $verbose $delete $test
rsync -raz$verbose $delete $test $excludes $source/ $rdest/

echo
ssh $host ls -l $rpath

echo "Done $(date)" 
