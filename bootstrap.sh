#!/usr/bin/env bash

apt-get update
apt-get install -y nodejs
apt-get install -y nodejs-legacy # For apps relying on node binary
apt-get install -y npm
apt-get install -y mongodb

# For mongo default datastore
mkdir /data/
mkdir /data/db

npm update

cd /vagrant && npm install

