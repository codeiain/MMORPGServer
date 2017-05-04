#!/bin/sh

echo "creating docs"
eval "npm -g install yuidocjs"
eval "npm install"
eval "yuidoc ."