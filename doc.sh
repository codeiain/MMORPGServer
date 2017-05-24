#!/bin/sh

echo "creating docs"
eval "npm -g install yuidocjs"
eval "npm i yuidoc-bootstrap-theme --save-dev"
eval "npm install"
eval "yuidoc ."