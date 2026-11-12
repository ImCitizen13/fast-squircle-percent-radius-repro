# react-native-fast-squircle: percentage `borderRadius` crashes on Android

Minimal Expo repro for a crash in `react-native-fast-squircle` **1.1.6** on Android
when a `FastSquircleView` gets a percentage string as `borderRadius` (e.g. `'40%'`).
A plain `View` accepts the same style; iOS is fine.

```tsx
<FastSquircleView style={{ backgroundColor: 'red', width: '80%', height: 40, borderRadius: '40%' }} />
```

## Repro steps

Native library, so this needs a development build (not Expo Go). Requires an Android device/emulator and the Android SDK.

```bash
npm install
npx expo run:android
```

The app (`App.tsx`) is a single screen: (1) the `FastSquircleView` above and (2) a plain `View` with the same style.

## Expected

Both boxes render with a rounded corner radius of 40% (RN supports percentage `borderRadius` on `View`).

## Actual

On Android the app fails as soon as the screen mounts (the dev client shows the error screen; a release build would crash):

```
java.lang.ClassCastException: java.lang.String cannot be cast to java.lang.Double
    at com.facebook.react.uimanager.BaseViewManagerDelegate.setProperty(BaseViewManagerDelegate.kt:56)
    at com.facebook.react.viewmanagers.FastSquircleViewManagerDelegate.setProperty(FastSquircleViewManagerDelegate.java:30)
    at com.fastsquircle.SplitDelegate.setProperty(FastSquircleViewManager.kt:78)
```

Full trace: [STACKTRACE.md](STACKTRACE.md). Screenshot: [screenshots/01-crash-percent-radius.png](screenshots/01-crash-percent-radius.png).

### Control: numeric radius works

Changing `const RADIUS` in `App.tsx` to `16` (same width `'80%'`) renders fine on the same device, with no
exception, so the percentage `borderRadius` is the trigger: [screenshots/02-numeric-radius-ok.png](screenshots/02-numeric-radius-ok.png)
(the static caption in that screenshot still describes the `'40%'` case).

## Versions

| | |
|---|---|
| react-native-fast-squircle | 1.1.6 |
| expo | ~58.0.24 |
| react-native | 0.88.1 |
| react | 19.3.0 |
| expo-dev-client | ~58.0.19 |
| Device | Samsung Galaxy S24 (Android) |

Output of `npx @react-native-community/cli info` (`react-native info`; paths anonymised):

```
System:
  OS: macOS 26.6.2
  CPU: (8) arm64 Apple M1 Pro
  Memory: 144.22 MB / 16.00 GB
  Shell:
    version: "5.9"
    path: /bin/zsh
Binaries:
  Node:
    version: 22.19.0
    path: /usr/local/bin/node
  Yarn:
    version: 4.12.0
    path: /usr/local/bin/yarn
  npm:
    version: 10.9.3
    path: /usr/local/bin/npm
  Watchman:
    version: 2024.12.02.00
    path: /opt/homebrew/bin/watchman
Managers:
  CocoaPods:
    version: 1.16.2
    path: /opt/homebrew/bin/pod
SDKs:
  iOS SDK:
    Platforms:
      - DriverKit 25.4
      - iOS 26.4
      - macOS 26.4
      - tvOS 26.4
      - visionOS 26.4
      - watchOS 26.4
  Android SDK:
    Android NDK: 27.1.12297006
IDEs:
  Android Studio: 2026.1 AI-261.26222.65.2614.16379836
  Xcode:
    version: 26.4/17E192
    path: /usr/bin/xcodebuild
Languages:
  Java:
    version: 17.0.14
    path: /usr/bin/javac
  Ruby:
    version: 3.4.1
    path: /opt/homebrew/opt/ruby/bin/ruby
npmPackages:
  "@react-native-community/cli": Not Found
  react:
    installed: 19.3.0
    wanted: 19.3.0
  react-native:
    installed: 0.88.1
    wanted: 0.88.1
  react-native-macos: Not Found
npmGlobalPackages:
  "*react-native*": Not Found
Android:
  hermesEnabled: Not found
  newArchEnabled: Not found
iOS:
  hermesEnabled: Not found
  newArchEnabled: Not found
```
