import { AuthContext } from "auth/authManager";
import { PirmaryButtonEmpty } from "components/common/primarybutton";
import { RenderItem } from "components/flatlist/components";
import ProfilePicture from "components/header/profile";
import { Divider } from "components/loginform/components";
import TermsAndConditionsModal from "components/modals/termsModal";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const menuItems = [
  { _id: "0", name: "General", category: "Divider" },
  // { _id: "1", name: "Achievements", category: "General" },
  { _id: "2", name: "Account Info", category: "General", link: "profileInfo" },
  { _id: "12", name: "Preferences", category: "Divider" },
  { _id: "3", name: "App Settings", category: "Preferences" },
  { _id: "4", name: "Give us feedback", category: "Preferences" },
  { _id: "5", name: "Reviews", category: "Preferences" },
  { _id: "033", name: "Data Management", category: "Divider" },
  { _id: "6", name: "Terms and Conditions", category: "Data Management", type: "modal" },
  { _id: "7", name: "Privacy Policy", category: "Data Management", type: "modal" },
];

export default function TabMoreScreen() {
  const [modalVisible, setModalVisible] = useState("");
  const { logOut, userData } = useContext(AuthContext);
  const logOutFunc = () => logOut();

  const handlePress = (item: any) => {
    const { name, link, type } = item;
    if (type === "modal") {
      setModalVisible(name);
    }
    if (link) router.push("/profile/" + link);
  };
  const renderMenuItems = menuItems.map((item) =>
    item.category === "Divider" ? (
      <Divider text={item.name} key={item._id} extraClassName="mt-[25px]" />
    ) : (
      <RenderItem
        onPress={() => handlePress(item)}
        key={item._id}
        item={item}
        extraClassname="bg-[#282C30] mt-[12px]"
      />
    )
  );

  return (
    <ScrollView
      bounces={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
        paddingTop: 30,
      }}
      className="pl-[20px] pr-[20px] pb-[50px]"
    >
      <View>
        <View className="flex flex-row">
          <ProfilePicture width={52} height={52} />
          <View className="flex-col ml-[20px]">
            <Text className="text-white text-19 font-bold"> {userData?.display_name} </Text>
            <Text className="text-secondary mt-[0px]"> {userData?.email} </Text>
          </View>
        </View>

        {renderMenuItems}
      </View>
      <PirmaryButtonEmpty
        extraClassName="border-secondary mt-[50px]"
        extraTextClassName="color-secondary"
        text="Log out"
        onPress={logOutFunc}
      />
      <TermsAndConditionsModal
        id={modalVisible === "Terms and Conditions" ? 1 : 0}
        visible={Boolean(modalVisible.length)}
        setVisible={() => setModalVisible("")}
      />

      <View className="flex items-center mt-[20px]">
        <Text className="text-secondary mt-[0px]"> App Version: 1.20.1 </Text>
        <Text className="text-secondary mt-[5px]"> Remote ID: 131234 </Text>
      </View>
    </ScrollView>
  );
}
