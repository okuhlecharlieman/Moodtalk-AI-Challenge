#!/bin/bash

RELEASE_VERSION=$1

if [ -z "$RELEASE_VERSION" ]; then
  echo "Usage: build.sh {version}"
  exit 1
fi

# Build and publish