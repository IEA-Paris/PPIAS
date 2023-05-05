#!/bin/bash

shopt -s globstar

for file in **/*.md; do
  extension="${file##*.}"
  filename="${file%.*}"
  new_filename="${filename//./-}"
  mv -- "$file" "${new_filename}.${extension}"
done