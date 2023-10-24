import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

async function googleSignIn(auth: Auth) {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, googleCredential);
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
}

const signInWithFB = async (auth: Auth) => {
  const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
  if (result?.isCancelled) {
    throw new Error("User cancelled the login process");
  }
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw new Error("Something went wrong obtaining access token");
  }
  const facebookAuthProvider = FacebookAuthProvider.credential(data.accessToken);
  signInWithCredential(auth, facebookAuthProvider);
};

const signUp = async (auth: Auth, email: string, password: string): Promise<UserCredential> =>
  await createUserWithEmailAndPassword(auth, email, password);

const signIn = (auth: Auth, email: string, password: string) => {
  return new Promise<void>((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      reject(error);
    });
  });
};

const logOut = async (auth: Auth) => await signOut(auth);

export { googleSignIn, logOut, signIn, signInWithFB, signUp };
