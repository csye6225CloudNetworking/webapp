name: Build Packer AMI

on:
  push:
    branches:
      - main

jobs:
  packer_build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
         node-version: 18

      - name: install the dependencies
        run: |
          npm install
          


      - name:  env file
        run: |
         touch .env
        
         echo "MYSQL_DATABASE=${{ secrets.MYSQL_DATABASE}}" >> .env
         echo "MYSQL_USER=${{ secrets.MYSQL_USER}}" >> .env
         echo "MYSQL_PASSWORD=${{ secrets.MYSQL_PASSWORD}}" >> .env
         echo "MYSQL_PORT=${{ secrets.MYSQL_PORT}}" >> .env
         echo "MYSQL_HOST=${{ secrets.MYSQL_HOST}}" >> .env
         echo "DB_DIALECT=${{ secrets.DB_DIALECT}}" >> .env
         cat .env
         pwd 

      - name: configuremysql
        run: |
         sudo apt-get update
         sudo apt-get install -y curl
         sudo systemctl start mysql
         sudo systemctl status mysql
         mysql -u ${{ secrets.MYSQL_USER }} -p"${{ secrets.MYSQL_PASSWORD }}"

      - name: Run Tests
        run : npm test

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
         aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
         aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
         aws-region: 'us-east-1'

      


      - name: Zip Application Artifact
        
        run: zip -r webapp.zip ./

      - name: Install Packer
        uses: hashicorp/setup-packer@main
        with:
          packer_version: '1.8.6'

      - name: Run packer init
        run: packer init packer/aws-debian.pkr.hcl

      - name: Build AMI with Packer
        id: packer_build
        run: |
         packer build packer/aws-debian.pkr.hcl 
         

      

      
          
