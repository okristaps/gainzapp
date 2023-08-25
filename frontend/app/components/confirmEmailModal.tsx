import { User, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { AuthContext } from "../../auth/authManager";

interface ModalProps {
  user: User | null;
}

const ConfirmEmailModal: React.FC<ModalProps> = ({ user }) => {
  const { auth } = useContext(AuthContext);
  const [visible, setVisible] = useState(!user?.emailVerified);
  const [verificationSent, setVerificationSent] = useState(false);

  const sendVerificationEmail = async () => {
    if (user && !user?.emailVerified) {
      try {
        await sendEmailVerification(user);
        setVerificationSent(true);
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    }
  };

  const listenForEmailVerification = async () => {
    if (user) {
      user?.reload();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user?.emailVerified) {
          setVisible(false);
          unsubscribe();
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
            <Text>
              {verificationSent
                ? "Verification email has been sent. Please check your inbox."
                : "Your email is not verified. Click below to send a verification email."}
            </Text>
            <TouchableOpacity onPress={listenForEmailVerification} style={{ marginTop: 20 }}>
              <Text style={{ color: "blue" }}>Check Email Verification</Text>
            </TouchableOpacity>
          </>
        )}
        {user?.emailVerified && <Text>Your email has been verified.</Text>}
      </View>
    </Modal>
  );
};

export default ConfirmEmailModal;
