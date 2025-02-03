#!/bin/bash

RELEASE_VERSION=$1

if [ -z "$RELEASE_VERSION" ]; then
  echo "Usage: build.sh {version}"
  exit 1
fi

npm ci
npm version $RELEASE_VERSION
npm run build

# Push to container registries
#...

exit 0
