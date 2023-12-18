import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { getBe, putBe } from "../api/index";
import app from "../firebaseConfig";
import { MongoUser, MongoUserBody } from "../types";
import { googleSignIn, logOut, signIn, signInWithFB, signUp } from "./helpers";

interface AuthManagerProps {
  children: React.ReactNode;
}

interface AuthContext {
  userData: MongoUser | null;
  googleSignIn: () => void;
  signInWithFB: () => void;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContext>({
  signInWithFB: async () => {},
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  googleSignIn: async () => {},
  loading: false,
  userData: null,
});

const AuthManager: React.FC<AuthManagerProps> = ({ children }) => {
  const [userData, setUserData] = useState<MongoUser | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          await saveUserSession(user);
        } else {
          setUserData(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const saveUserSession = async (userData: User) => {
    try {
      const regUser = await getBe({ path: `/users/${userData.uid}` }).then((res) => res.user);
      if (!regUser?.uid) {
        const body: MongoUserBody = {
          uid: userData.uid,
          email: userData.email,
          display_name: userData?.displayName,
          photoURL: userData?.photoURL,
        };

        await putBe({ path: `/users`, body }).then((res: MongoUser) => setUserData(res));
      } else {
        setUserData(regUser);
      }
    } catch (error) {
      console.error("Error saving user session:", error);
    }
  };

  const values: AuthContext = useMemo(() => {
    return {
      userData,
      loading,
      signUp: (email, password) => signUp(auth, email, password),
      signIn: (email, password) => signIn(auth, email, password),
      logOut: () => logOut(auth),
      googleSignIn: () => googleSignIn(auth),
      signInWithFB: () => signInWithFB(auth),
    };
  }, [signUp, signIn, logOut, userData, loading]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthManager;
