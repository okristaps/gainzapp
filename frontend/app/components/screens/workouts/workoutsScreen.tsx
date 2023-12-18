import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";
import CustomSwitch from "components/common/switch";
import { RenderItem } from "components/flatlist/components";

import { AnimatedFlashList, FlashList } from "@shopify/flash-list";
import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { Divider } from "components/loginform/components";
import { router } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { View } from "react-native";

import Loader from "components/loader/loader";
import { WorkoutsContext } from "../../../contexts/workoutsContext";

interface TabWorkoutsScreenProps {
  path?: string;
}

const TabWorkoutsScreen: React.FC<TabWorkoutsScreenProps> = ({ path = "workouts" }) => {
  const { userData } = useContext(AuthContext);
  const { setSelectedWorkout, resetData } = useContext(WorkoutsContext);
  const [searchText, setSearchText] = useState("");

  const list = useRef<FlashList<number> | null>(null);

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["workouts", searchText],
    queryFn: async () =>
      await getBe({
        path: `/workouts/all`,
        params: { name: searchText, uid: userData?.uid },
      }),
  });

  const Item = React.useCallback((item: any) => {
    return (
      <RenderItem
        item={item.item}
        onPress={() => {
          setSelectedWorkout(item.item);
          router.push({
            pathname: path + "/workoutInfo",
          });
        }}
      />
    );
  }, []);

  return (
    <View className="flex flex-1">
      <Header
        title={path === "workouts" ? "Workouts" : "Select workout"}
        iconLeft={
          path === "workouts"
            ? {
                text: "Create",
                onPress: () => {
                  resetData();
                  router.push({ pathname: "workouts/workoutCreate" });
                },
              }
            : undefined
        }
      />

      <Input
        debounceEnabled
        placeholder="Search..."
        onValueChange={setSearchText}
        extraClass={"mt-[25px]"}
        type="search"
      />
      <Divider text={"Workouts"} textSize={28} extraClassName="mt-[25px] mb-[15px]" />
      <View className="mt-[10px] flex flex-1">
        {isLoading && <Loader />}
        <AnimatedFlashList
          estimatedItemSize={40}
          ItemSeparatorComponent={() => <View className="h-[10px]" />}
          data={data?.workouts}
          renderItem={Item}
        />
      </View>
    </View>
  );
};
export default TabWorkoutsScreen;
