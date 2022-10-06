#!/bin/bash
REPOSITORY=/home/ubuntu/QBChaining-BE

cd $REPOSITORY

sudo npm ci

sudo pm2 restart ./src/app.js