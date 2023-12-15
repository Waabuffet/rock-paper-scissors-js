#!/bin/bash

current_dir=$(pwd)

docker run -d --name p5-game -p 3000:3000 -v $current_dir:/app -w /app node:latest sh -c "npm install -g p5-server && p5 serve"