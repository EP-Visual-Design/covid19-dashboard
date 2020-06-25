#!/bin/bash
cd ${0%/*}

# Build next version

cd ../client
npm version patch
yarn build
