import * as SecureStore from "expo-secure-store";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
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

const saveUserSession = async (userData: User) => {
  try {
    await SecureStore.setItemAsync("user", JSON.stringify(userData));
  } catch (error) {
    console.log("Error saving user session:", error);
  }
};

const clearUserSession = async () => {
  try {
    await SecureStore.deleteItemAsync("user");
  } catch (error) {
    console.log("Error clearing user session:", error);
  }
};

const AuthManager: React.FC<AuthManagerProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        const userData = { uid, email };
        setUser(userData);
        saveUserSession(userData);
      } else {
        setUser(null);
        clearUserSession();
      }
    });

    const checkSavedSession = async () => {
      try {
        const savedSession = await SecureStore.getItemAsync("user");
        if (savedSession) {
          const userData: User = JSON.parse(savedSession);
          setUser(userData);
        }
      } catch (error) {
        console.log("Error retrieving saved session:", error);
      }
    };

    checkSavedSession();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const initialUser = auth.currentUser;
    if (initialUser && !user) {
      const { uid, email } = initialUser;
      const userData = { uid, email };
      setUser(userData);
    }
  }, [user]);

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          saveUserSession(userCredential.user);
        }
      );
    } catch (error) {
      console.log("Sign up failed:", error);
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {}
  };

  const logOut = async () => {
    try {
      clearUserSession();
      //   await signOut(user);
    } catch (error) {
      console.log("Sign out failed:", error);
    }
  };

  const authContext: AuthContext = {
    user,
    signUp,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthManager;
