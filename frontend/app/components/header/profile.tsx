import { AuthContext } from "auth/authManager";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ProfilePicture: React.FC = () => {
  const { userData } = useContext(AuthContext);
  const name = userData?.display_name ?? userData?.email ?? "";
  const initials = name.substring(0, 1).toUpperCase();

  return (
    <TouchableOpacity>
      <View className="w-[34px] h-[34px] rounded-full bg-success justify-center items-center ">
        {userData?.photoURL ? (
          <Image
            source={{ uri: userData?.photoURL }}
            style={{ height: "100%", width: "100%", borderRadius: 33 / 2 }}
          />
        ) : (
          <Text className="text-white text-base">{initials}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfilePicture;
