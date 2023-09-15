import { getAuth, onAuthStateChanged, User } from "firebase/auth"; // Import Firebase Authentication functions

const getFirebaseAccessToken = async (): Promise<string | null> => {
  const auth = getAuth();

  return new Promise<string | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        user
          .getIdToken()
          .then((accessToken) => {
            unsubscribe();
            resolve(accessToken);
          })
          .catch((error) => {
            unsubscribe();
            reject(error);
          });
      } else {
        unsubscribe();
        resolve(null);
      }
    });
  });
};

export default getFirebaseAccessToken;
