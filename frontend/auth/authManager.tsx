import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { getBe, putBe } from "../api/index";
import app from "../firebaseConfig";

import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { MongoUser, MongoUserBody } from "../types";

interface AuthManagerProps {
  children: React.ReactNode;
}

interface AuthContext {
  user: User | null;
  userData: MongoUser | null;
  googleSignIn: () => Promise<void>;
  signInWithFB: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  auth: Auth;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  signInWithFB: async () => {},
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  googleSignIn: async () => {},
  auth: getAuth(app),
  userData: null,
});

const AuthManager: React.FC<AuthManagerProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<MongoUser | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        saveUserSession(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const saveUserSession = async (userData: User) => {
    try {
      const regUser = await getBe({ path: `/users/${userData.uid}` }).then((res) => res.user);

      if (!regUser?.uid) {
        const body: MongoUserBody = {
          uid: userData.uid,
          email: userData.email,
          displayName: userData?.displayName,
          photoURL: userData?.photoURL,
        };

        await putBe({ path: `/users`, body }).then((res: MongoUser) => setUserData(res));
      } else {
        setUserData(regUser);
      }

      setUser(userData);
    } catch (error) {
      console.error("Error saving user session:", error);
    }
  };

  const signUp = async (email: string, password: string): Promise<UserCredential> =>
    await createUserWithEmailAndPassword(auth, email, password);

  async function googleSignIn() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  }

  const signInWithFB = async () => {
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);
    if (result?.isCancelled) {
      throw new Error("User cancelled the login process");
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error("Something went wrong obtaining access token");
    }

    const facebookAuthProvider = FacebookAuthProvider.credential(data.accessToken);

    signInWithCredential(auth, facebookAuthProvider)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { user } = userCredential;
          saveUserSession(user);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Sign out failed:", error);
    }
  };

  useEffect(() => {
    const initialUser = auth.currentUser;
    if (initialUser && !user) {
      setUser(initialUser);
    }
  }, [user]);

  const values: AuthContext = useMemo(() => {
    return {
      user,
      signUp,
      signIn,
      logOut,
      googleSignIn,
      signInWithFB,
      auth,
      userData,
    };
  }, [user, signUp, signIn, logOut, auth, userData]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthManager;
