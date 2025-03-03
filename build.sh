#!/bin/bash

BASEDIR="$(cd "$(dirname "$0")" && pwd)"

rm -f "$BASEDIR/GGU.zip"
if [ -d "$BASEDIR/build" ]; then
    rm -rf "$BASEDIR/build"
fi

mkdir "$BASEDIR/build"

cp -R "$BASEDIR/images" "$BASEDIR/build/"
cp "$BASEDIR/manifest.json" "$BASEDIR/build/"
cp "$BASEDIR/page.js" "$BASEDIR/build/"
cp "$BASEDIR/popup.js" "$BASEDIR/build/"
cp "$BASEDIR/popup.html" "$BASEDIR/build/"
cp "$BASEDIR/popup.css" "$BASEDIR/build/"

cd "$BASEDIR/build"
zip -r "GGU.zip" "."