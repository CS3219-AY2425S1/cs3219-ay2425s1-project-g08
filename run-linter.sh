#!/bin/bash

# Get the current directory
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the Super-Linter
docker run \
  -e LOG_LEVEL=ERROR \
  -e RUN_LOCAL=true \
  -e VALIDATE_JAVASCRIPT_ES=true \
  -e VALIDATE_TYPESCRIPT_ES=true \
  -e VALIDATE_JSX=true \
  -e VALIDATE_TSX=true \
  -e VALIDATE_JAVA=true \
  -e CREATE_LOG_FILE=true \
  -v "${CURRENT_DIR}":/tmp/lint \
  --rm \
  ghcr.io/super-linter/super-linter:slim-v5.7.2