#!/usr/bin/env bash

set -e -u -o pipefail


# Setup environment
readonly thisDir=$(cd $(dirname $0); pwd)
source ${thisDir}/_travis-fold.sh

# create logs dir
mkdir -p ${LOGS_DIR}


# Install all npm dependencies according to yarn.lock
travisFoldStart "yarn-install"
  (node tools/npm/check-node-modules --purge && yarn postinstall) || yarn install --frozen-lockfile --non-interactive
travisFoldEnd "yarn-install"


# Print return arrows as a log separator
travisFoldReturnArrows
