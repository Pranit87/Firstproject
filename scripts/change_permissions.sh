#!/bin/sh
echo "Change Permission Script"
echo "Running npm install"
cd /var/www/html/react_app/
rm -rf node_modules. package-lock.json
npm install --force | tee --append /var/log/syslog
echo "Running npm run build:production"
sudo cd /var/www/html/react_app/
npm run build:production | tee --append /var/log/syslog
echo "Finished running scripts for permissions file"