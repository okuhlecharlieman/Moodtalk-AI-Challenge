#!/bin/bash

RELEASE_VERSION=$1

if [ -z "$RELEASE_VERSION" ]; then
  echo "Usage: build.sh {version}"
  exit 1
fi

mvn --batch-mode versions:set -DnewVersion=$RELEASE_VERSION
PROJECT_VERSION=$(mvn -q -Dexec.executable=echo -Dexec.args='${project.version}' --non-recursive exec:exec)
mvn -B verify --file pom.xml

# Build and push
# ...