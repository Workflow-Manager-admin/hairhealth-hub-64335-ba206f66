#!/bin/bash
cd /home/kavia/workspace/code-generation/hairhealth-hub-64335-ba206f66/hairhealth_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

