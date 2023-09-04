import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import FormItems from "./formItems";
import { FormType } from "./types";

import { PirmaryButtonEmpty } from "components/common/primarybutton";
import ModalHeader from "components/modals/components/modalHeader";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../../firebaseConfig";

interface Data {
  email: string;
}

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
const initial = { isLoading: false, error: null, success: false };
const ResetPasswordModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const auth = getAuth(app);

  const type = FormType.RESET;
  const textInputRef = useRef(null);
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [state, setState] = useState({
    isLoading: false,
    error: null,
    success: false,
  });

  const handlePasswordReset = useCallback(
    async (data: any) => {
      setState({ ...initial, isLoading: true });
      try {
        await sendPasswordResetEmail(auth, data?.email);
        setState({ ...initial, success: true });
      } catch (error: any) {
        setState({ ...initial, error: error.message });
        throw error;
      }
    },

    [getValues, type, isValid, errors]
  );

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current?.focus();
        }
      }, 200);
    }
    reset();
  }, [visible]);

  const Message = memo(() => {
    return state.success ? (
      <Text className="text-center text-white mt-[20px]">
        Password reset email sent. Check your inbox.
      </Text>
    ) : (
      <Text className="text-center text-white mt-[20px]">
        Please, enter your email address. You will receive link to create a new password via email.
      </Text>
    );
  }, [state?.success]);

  return (
    <Modal
      isVisible={visible}
      hasBackdrop={true}
      backdropOpacity={0.94}
      style={{ margin: 0 }}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="down"
      swipeThreshold={100}
      onModalHide={() => setState(initial)}
      avoidKeyboard={true}
    >
      <View className="flex-1 justify-end">
        <View
          className={`pl-[23px] pr-[23px] pt-[23px] pb-[40px] rounded-tl-[20px] rounded-tr-[20px] bg-default`}
        >
          <ModalHeader
            onClosePress={() => {
              setVisible(false);
            }}
          />
          <Message />

          {!state.success && (
            <View className="mt-[10px]">
              <FormItems
                emailRef={textInputRef}
                hideEmail={state.success}
                hidePwd={true}
                error={state.error}
                control={control}
                type={type}
                errors={errors}
              />
            </View>
          )}
          {state.error && (
            <View>
              <Text className="text-danger text-center mb-[10px]">{state.error?.message}</Text>
            </View>
          )}
          {!state.success && (
            <PirmaryButtonEmpty
              loading={state.isLoading}
              text="Reset password"
              onPress={handleSubmit(handlePasswordReset)}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ResetPasswordModal;
