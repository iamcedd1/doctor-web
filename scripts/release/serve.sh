#!/bin/bash
cp /tmp/js/env/env.js /usr/src/app/build/js/env/env.js
serve -s build -l 3000
