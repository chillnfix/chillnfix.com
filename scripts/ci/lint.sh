#!/usr/bin/env bash

set -e -u -o pipefail


# Setup environment
readonly thisDir=$(cd $(dirname $0); pwd)
source ${thisDir}/_travis-fold.sh


# run linting
travisFoldStart "linting"
  npm run tslint
  npm run stylelint
travisFoldEnd "linting"


# Print return arrows as a log separator
travisFoldReturnArrows
