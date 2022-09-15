#!/bin/bash
REPOSITORY=/home/ubuntu/QBChaining-BE

cd $REPOSITORY

sudo npm ci

sudo pm2 kill

sudo pm2 start ./src/app.js