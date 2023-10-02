import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import FormItems from "./formItems";
import { FormType } from "./types";

import { PirmaryButtonEmpty } from "components/common/primarybutton";

import ModalWrapper from "components/modals/components/modalWrapper";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../../firebaseConfig";

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
  }, [state]);

  return (
    <ModalWrapper visible={visible} setVisible={setVisible} onModalHide={() => setState(initial)}>
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
    </ModalWrapper>
  );
};

export default ResetPasswordModal;
