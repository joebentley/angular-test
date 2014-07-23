#!/usr/bin/env bash

apt-get update
apt-get install -y nodejs
apt-get install -y npm

npm update

cd /vagrant && npm install
