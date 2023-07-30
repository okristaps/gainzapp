import * as SecureStore from "expo-secure-store";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useEffect, useMemo, useState } from "react";
import app from "../firebaseConfig";
interface AuthManagerProps {
  children: React.ReactNode;
}

interface User {
  uid: string;
  email: string | null;
}
interface AuthContext {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
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
          setUser({ uid: userData.uid, email: userData.email });
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
        const { uid, email } = user;
        setUser({ uid, email });
        saveUserSession(user);
      } else {
        setUser(null);
        clearUserSession();
      }
    });

    return () => unsubscribe();
  }, []);

  const saveUserSession = async (userData) => {
    try {
      const { uid, email, stsTokenManager } = userData;
      const userSessionData = {
        uid,
        email,
        accessToken: stsTokenManager?.accessToken ?? "",
      };
      await SecureStore.setItemAsync("userSession", JSON.stringify(userSessionData));
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

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const { user } = userCredential;
        // Save the user's UID, email, and session token
        saveUserSession(user);
      });
    } catch (error) {
      console.log("Sign up failed:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const { user } = userCredential;
        // Save the user's UID, email, and session token
        saveUserSession(user);
      });
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  const logOut = async () => {
    try {
      clearUserSession();
    } catch (error) {
      console.log("Sign out failed:", error);
    }
  };

  useEffect(() => {
    const initialUser = auth.currentUser;
    if (initialUser && !user) {
      const { uid, email } = initialUser;
      const userData = { uid, email };
      setUser(userData);
    }
  }, [user]);

  const values: AuthContext = useMemo(() => {
    return {
      user,
      signUp,
      signIn,
      logOut,
    };
  }, [user, signUp, signIn, logOut]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthManager;
