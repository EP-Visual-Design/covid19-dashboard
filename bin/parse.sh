#!/bin/bash
cd ${0%/*}

# Pull latest CROVID19 stats and convert to JSON for store
# Designed to run a cron job

cd ../COVID-19-JHU/
git pull
cd ../express/parse
node aparse.js --silent
