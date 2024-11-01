import { AuthContext } from "auth/authManager";
import React, { useContext } from "react";
import { Image, Text, View } from "react-native";

const ProfilePicture: React.FC = ({ width, height }: { width?: number; height?: number }) => {
  const { userData } = useContext(AuthContext);
  const name = userData?.display_name ?? userData?.email ?? "";
  const initials = name.substring(0, 1).toUpperCase();

  return (
    <View>
      <View className="w-[34px] h-[34px] rounded-full bg-success justify-center items-center ">
        {userData?.photoURL ? (
          <Image
            source={{ uri: userData?.photoURL }}
            style={{
              height: height ?? "100%",
              width: width ?? "100%",
              borderRadius: width ? width / 2 : 33 / 2,
            }}
          />
        ) : (
          <Text className="text-white text-base">{initials}</Text>
        )}
      </View>
    </View>
  );
};

export default ProfilePicture;
