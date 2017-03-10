#!/bin/sh

cd /Users/timo/MyCloud/Development/HealthcareSeminarApp_V2/healthcareApp/platforms/android/build/outputs/apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../../../../../my-release-key.keystore android-release-unsigned.apk alias_name

cd ~/Library/Android/sdk/build-tools/25.0.2

./zipalign -v 4 /Users/timo/MyCloud/Development/HealthcareSeminarApp_V2/healthcareApp/platforms/android/build/outputs/apk/android-release-unsigned.apk /Users/timo/MyCloud/Development/HealthcareSeminarApp_V2/healthcareApp/platforms/android/build/outputs/apk/android-release-signed.apk

