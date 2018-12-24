#!/usr/bin/env bash

# because this script is being source-ed via .travis.yaml,
# we need to restore the original options so that that we don't interfere with
# travis' internals
readonly ORIGINAL_SHELL_OPTIONS=$(set +o)

set -u -e -o pipefail


# sets and optionally prints environmental variable
# usage: setEnvVar variableName variableValue
function  setEnvVar() {
  local name=$1
  local value=$2

  if [[ ${print} == "print" ]]; then
    echo ${name}=${value}
  fi
  export ${name}="${value}"
}


# use BASH_SOURCE so that we get the right path when this script is called AND source-d
readonly thisDir=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
readonly print=${1:-}

# print bash version just so that we know what is running all the scripts
if [[ ${print} == "print" ]]; then
  bash --version
fi


# set envs
setEnvVar LOGS_DIR /tmp/chillnfix-build/logs


eval "${ORIGINAL_SHELL_OPTIONS}"
