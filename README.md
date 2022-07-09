<!---Need to follow certain steps to run the app-->

## Important steps to follow

# npm

**Do npm install**

# iOS

**Go to the Pod directory in iOS and do pod install sample command: cd ios && pod install && cd.. **

**Never try to run this app from the command react-native run-ios as it is causing some issues on run time use Xcode instead by opening workspace project**

**_IMPORTANT: Always run the app from Xcode, as it is well tested in Xcode 13.3. This app will run on iOS Simulator and it is also capable of running on Real Device (iPhone 13 or 12), But to run the app we must have development/Distribution certificate signed on Xcode. _**

**After Signing the above said certificates, try running the app on simultor or Real Device(Try twice => may be some certificate issue you would face), while launching the app start metro bundler by npm start**
