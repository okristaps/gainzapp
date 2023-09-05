import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SecureStore from "expo-secure-store";
import {
  Auth,
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
import app from "../firebaseConfig";

interface AuthManagerProps {
  children: React.ReactNode;
}

interface AuthContext {
  user: User | null;
  googleSignIn: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  auth: Auth;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  googleSignIn: async () => {},
  auth: getAuth(app),
});

const AuthManager: React.FC<AuthManagerProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const savedUserSession = await SecureStore.getItemAsync("userSession");
        if (savedUserSession) {
          const userData = JSON.parse(savedUserSession);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user session from SecureStore:", error);
      }
    };

    loadUserSession();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        saveUserSession(user);
      } else {
        setUser(null);
        clearUserSession();
      }
    });

    return () => unsubscribe();
  }, []);

  const saveUserSession = async (userData: User) => {
    try {
      await SecureStore.setItemAsync("userSession", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error saving user session to SecureStore:", error);
    }
  };

  const clearUserSession = async () => {
    try {
      await SecureStore.deleteItemAsync("userSession");
    } catch (error) {
      console.error("Error clearing user session from SecureStore:", error);
    }
  };

  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  async function googleSignIn() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential).then((res) => console.log("res", res));
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  }

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
      auth,
    };
  }, [user, signUp, signIn, logOut, auth]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthManager;
