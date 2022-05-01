1. APK Build for Android.

# Follow these steps

1. npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
2. cd android
3. ./gradlew assembleDebug

# for downloading file

1. adb pull {file path}
