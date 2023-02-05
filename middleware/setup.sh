#!/bin/sh

# install deps
yarn

filename = "index.cjs"

# compile to commonjs
npx esbuild index.js  --bundle --outfile=$filename \
--format=cjs --platform=node

# build the package
npx pkg $filename
