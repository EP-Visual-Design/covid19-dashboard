#!/bin/bash
cd ${0%/*}

./parse.sh

./build.sh

./pub-html.sh