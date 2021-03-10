#!/bin/bash

cordova build android --release -- --keystore=./signing/crew-untold.jks --storePassword=crewuntold --alias=crew-untold --password=crewuntold
cp ./platforms/android/build/outputs/apk/android-release.apk ~/Desktop/crew-untold.apk

cordova build ios
open ./platforms/ios/Crew\ Untold.xcodeproj
