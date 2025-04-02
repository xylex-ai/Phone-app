# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. log in to your expo account

3. Start the app

   ```bash
    npm run android/ios
   ```

4. build the abb 

```bash
    eas eas build -p ios --profile preview     // builds downloadable ios app, for android just write android isntead if ios     
   ```


The app will create a push token which once logged in will upload it to the xylex.users table after that u can send notifications trough https://expo.dev/notifications