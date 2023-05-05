#!/bin/bash

shopt -s globstar

for file in **/*.md; do
  newfile=$(echo "$file" | sed 's/\./-/g')
  mv "$file" "$newfile"
done