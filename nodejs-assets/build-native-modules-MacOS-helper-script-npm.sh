#!/bin/bash
      # Helper script for Gradle to call npm on macOS in case it is not found
      export PATH=$PATH:/Users/wentingyu/Documents/GitHub/SW27MiniProject/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/wentingyu/Documents/GitHub/SW27MiniProject/node_modules/node_modules/.bin:/Users/wentingyu/Documents/GitHub/SW27MiniProject/node_modules/.bin:/Users/wentingyu/Documents/GitHub/node_modules/.bin:/Users/wentingyu/Documents/node_modules/.bin:/Users/wentingyu/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/usr/local/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/wentingyu/Library/Android/sdk/platform-tools:/Library/Frameworks/Python.framework/Versions/3.9/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/Users/wentingyu/Library/Android/sdk/platform-tools/
      npm $@
    