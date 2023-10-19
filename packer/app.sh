#!/bin/bash
 
 "apt-get update -y"
 "apt-get install -y nodejs npm unzip"  # Install Node.js, npm, and unzip
 "npm install -g pm2"  # Install PM2 for process management
 "apt-get install -y mysql-server mariadb-server postgresql"  # Install MySQL/MariaDB/PostgreSQL
 "systemctl enable mysql mariadb postgresql"  # Enable the database services
 "systemctl start mysql mariadb postgresql"

