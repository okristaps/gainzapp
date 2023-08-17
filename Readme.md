# Gainzapp

## Local dev

### ENV FILE SETUP 

##### /backend 
`MONGO_PORT=27017`
`MONGO_DATABASE=mydatabase`
`NODE_PORT=3000`
`FIREBASE_ADMIN_PRIVATE_KEY=adminprivatekey`
`FIREBASE_ADMIN_PRIVATE_KEY_ID=keyid`

##### /frontend 
`HOST_IP=my.ip.address`
`FIREBASE_API_KEY=firebaseapikey`
`ADMIN_USERNAME=okristaps1@gmail.com`
`ADMIN_PASSWORD=test1239`


### Run this in a sequence from root:
`cd backend && npm install && cd ../frontend/src && npm install` 
`cd backend &&  docker compose up -d && cd ../frontend && docker compose up -d`


##### To open project in the local browser: `[http://localhost:19000]`
##### To open project in the local expo go app: `[exp://your.ip.address:19000]`
  

