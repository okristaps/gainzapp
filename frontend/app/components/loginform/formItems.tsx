import { Input } from "components/inputs/formInput";
import React from "react";
import { Text, View } from "react-native";
import { FormType } from "./types";
import * as Animatable from "react-native-animatable";
import { getAnimationType } from "./helpers";

interface Props {
  control: any;
  type: string;
  errors: any;
  password: string;
  error: string;
  hidePwd?: boolean;
  hideEmail?: boolean;
  emailRef?: React.MutableRefObject<null>;
}

const FormItems: React.FC<Props> = ({
  control,
  type,
  errors,
  password,
  error,
  hidePwd,
  hideEmail,
  emailRef,
}) => {
  return (
    <>
      {!hideEmail && (
        <Animatable.View
          className="mt-[10px] mb-[10px]"
          duration={700}
          animation={getAnimationType(type)}
        >
          <Input
            ref={emailRef}
            type="emailAddress"
            showTitle={true}
            name={"email"}
            control={control}
            errors={errors}
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            }}
            placeholder={"Email"}
          />
        </Animatable.View>
      )}

      {!hidePwd && (
        <>
          <Animatable.View duration={700} animation={getAnimationType(type)}>
            <Input
              showTitle={true}
              name={"password"}
              type={"password"}
              control={control}
              errors={errors}
              rules={{ required: "Password is required" }}
              placeholder={"Password"}
            />
          </Animatable.View>
          {type !== FormType.LOGIN && (
            <Animatable.View
              className="mt-[10px] mb-[30px]"
              duration={700}
              animation={getAnimationType(type)}
            >
              <Input
                showTitle={true}
                name={"confirmPassword"}
                type={"password"}
                control={control}
                errors={errors}
                rules={{
                  required: "Confirm password is required",
                  validate: (value: string) => value === password || "Passwords do not match",
                }}
                placeholder={"Confirm password"}
              />
            </Animatable.View>
          )}
        </>
      )}
      {Boolean(error) && <Text className="text-primary  text-danger mt-[10px]">{error}</Text>}
    </>
  );
};

export default FormItems;
