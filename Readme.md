# Gainzapp 

## ENV FILE SETUP 

##### /backend (if gainzappbackend submodule added)
- `MONGO_PORT=27017`
- `MONGO_DATABASE=mydatabase`
- `NODE_PORT=3000`
- `FIREBASE_ADMIN_PRIVATE_KEY=adminprivatekey`
- `FIREBASE_ADMIN_PRIVATE_KEY_ID=keyid`

##### /frontend 
- `HOST_IP=my.ip.address`
- `FIREBASE_API_KEY=firebaseapikey`
- `ADMIN_USERNAME=username`
- `ADMIN_PASSWORD=password`


## To start app - Run this in a sequence from root:
##### ! IF NO GAINZAPPBACKEND SUBMODULE ADDED
- `cd frontend/src && npm install`
- `cd frontend &&  docker compose up -d`

##### ! IF GAINZAPPBACKEND SUBMODULE IS ADDED
- `cd backend && npm install && cd ../frontend/src && npm install` 
- `cd backend &&  docker compose up -d && cd ../frontend && docker compose up -d`


##### To open project in the local browser: `[http://localhost:19000]`
##### To open project in the local expo go app: `[exp://your.ip.address:19000]`
  

