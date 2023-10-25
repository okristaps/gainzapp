# Gainzapp 

## ENV FILE SETUP 

##### /frontend 
- `FIREBASE_API_KEY=firebaseapikey`
- `ADMIN_USERNAME=username`
- `ADMIN_PASSWORD=password`
- `NATIVE_DEV=true`

## To start app - Run this in a sequence from  ./frontend :
- `cd frontend && npm install && expo install`
- `cd ios && pod install`
-  if  NATIVE_DEV=true - `npx expo run:ios`
-  if  NATIVE_DEV=false - `expo start`

##### To open project in the local browser: `[http://localhost:19000]`
##### To open project in the local expo go app: `[exp://your.ip.address:19000]`
  

