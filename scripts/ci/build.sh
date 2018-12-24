#!/usr/bin/env bash

set -e -u -o pipefail


# Setup environment
readonly thisDir=$(cd $(dirname $0); pwd)
source ${thisDir}/_travis-fold.sh


# run build script
travisFoldStart "npm-build-prod"
  npm run build_prod
travisFoldEnd "npm-build-prod"


# Print return arrows as a log separator
travisFoldReturnArrows