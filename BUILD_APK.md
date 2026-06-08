# Build the Country Guess APK

This project uses **TanStack Start** with server functions, so the APK is a thin
Capacitor wrapper that loads the published Lovable web app. This is the easiest
path to a real installable APK without rewriting the backend.

## One-time setup

You need on your computer:
- **Node.js 20+** and **bun** (or npm)
- **Android Studio** (includes Android SDK + JDK 17)
- **Java 17** in your PATH

## Steps

1. **Export this project to GitHub** (button in the top right of Lovable),
   then `git clone` it locally.

2. **Publish the Lovable app** (Publish button in Lovable). This gives
   server functions a real URL. The default `capacitor.config.ts` already
   points at your project's stable URL:
   `https://project--0bc773bb-ac22-4fa1-90e8-b585b20e434d.lovable.app`

3. Install deps:
   ```bash
   bun install
   ```

4. Add the Android platform (only the first time):
   ```bash
   bunx cap add android
   ```

5. Sync web assets + config into the native project:
   ```bash
   bunx cap sync android
   ```

6. Open in Android Studio:
   ```bash
   bunx cap open android
   ```
   Then **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
   The APK appears in `android/app/build/outputs/apk/debug/app-debug.apk`.

   Or from the command line:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

7. Transfer `app-debug.apk` to your Android phone and install it
   (allow "Install from unknown sources").

## Signed release APK (for sharing/Play Store)

```bash
cd android
./gradlew assembleRelease
```
You'll need to configure a signing key in `android/app/build.gradle`. See:
https://capacitorjs.com/docs/android/deploying-to-google-play

## Updating the app

Any change you make in Lovable → just **republish**. The installed APK loads
the latest version automatically (no reinstall needed) because it points at
the live URL.
