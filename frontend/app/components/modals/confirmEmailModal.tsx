import { Auth, User, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface ModalProps {
  user: User | null;
  auth: Auth;
}

const ConfirmEmailModal: React.FC<ModalProps> = ({ user, auth }) => {
  const [visible, setVisible] = useState(!user?.emailVerified);
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const sendVerificationEmail = async () => {
    if (user && !user?.emailVerified) {
      try {
        await sendEmailVerification(user);
        setVerificationSent(true);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const listenForEmailVerification = async () => {
    if (user) {
      user?.reload();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user?.emailVerified) {
          unsubscribe();
          setVisible(false);
        }
      });
    }
  };

  useEffect(() => {
    if (!user?.emailVerified) sendVerificationEmail();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      listenForEmailVerification();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Modal isVisible={visible}>
      <View style={{ backgroundColor: "white", padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Email Verification
        </Text>
        {user && !user.emailVerified && (
          <>
            {!verificationSent && !error && (
              <View>
                <Text>Sending verification email ... </Text>
                <View style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                  <ActivityIndicator />
                </View>
              </View>
            )}

            {verificationSent && !error && (
              <View>
                <Text>
                  Verification email has been sent to {user?.email} Please check your inbox.
                </Text>

                <TouchableOpacity onPress={listenForEmailVerification} style={{ marginTop: 20 }}>
                  <Text style={{ color: "blue" }}>Check Email Verification</Text>
                </TouchableOpacity>
              </View>
            )}
            {error && (
              <View>
                <Text style={{ color: "red" }}>
                  {error}
                  {user?.email}
                </Text>
                <TouchableOpacity onPress={sendVerificationEmail} style={{ marginTop: 20 }}>
                  <Text style={{ color: "blue" }}>Send verification email again</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
        {user?.emailVerified && <Text>Your email has been verified.</Text>}
      </View>
    </Modal>
  );
};

export default ConfirmEmailModal;
