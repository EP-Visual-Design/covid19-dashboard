#!/bin/bash
cd ${0%/*}

cd ../client
npm version patch
yarn run build
../bin/pub-html.sh
../bin/pub-store.sh
