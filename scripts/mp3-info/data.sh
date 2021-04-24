#!/bin/bash

size=$(wc -c $1)
echo "Size: " $size
node duration.js $1