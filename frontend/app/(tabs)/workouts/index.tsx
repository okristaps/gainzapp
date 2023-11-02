import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";
import CustomSwitch from "components/common/switch";
import { RenderItem } from "components/flatlist/components";
import useDebounce from "components/flatlist/helpers/searchDebounce";

import { AnimatedFlashList, FlashList } from "@shopify/flash-list";
import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { Divider } from "components/loginform/components";
import { router } from "expo-router";
import React, { useContext, useRef, useState } from "react";
import { LayoutAnimation, View } from "react-native";
import { WorkoutsContext } from "./context/workoutsContext";
import Loader from "components/loader/loader";

export default function TabWorkoutsScreen() {
  const { userData } = useContext(AuthContext);
  const { setSelectedWorkout, resetData } = useContext(WorkoutsContext);
  const [searchText, setSearchText] = useState("");
  const [isCustom, setIsCustom] = useState(true);
  const debouncedSearchText = useDebounce(searchText, 300);
  const list = useRef<FlashList<number> | null>(null);

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["workouts", debouncedSearchText, isCustom],
    queryFn: async () =>
      await getBe({
        path: `/workouts/all`,
        params: { name: debouncedSearchText, uid: !isCustom ? userData?.uid : "" },
      }),
  });

  const Item = React.useCallback((item: any) => {
    list.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    return (
      <RenderItem
        item={item.item}
        onPress={() => {
          setSelectedWorkout(item.item);
          router.push({
            pathname: "workouts/workoutInfo",
          });
        }}
      />
    );
  }, []);

  return (
    <Wrapper>
      <Header
        iconLeft={{
          disabled: isCustom,
          text: !isCustom ? "Create" : null,
          onPress: () => {
            resetData();
            router.push({ pathname: "workouts/workoutCreate" });
          },
        }}
      />
      <CustomSwitch value={isCustom} setValue={setIsCustom} />
      <Input
        placeholder="Search..."
        value={searchText}
        setValue={setSearchText}
        extraClass={"mt-[25px]"}
        type="search"
      />
      <Divider text={"Workouts"} textSize={28} extraClassName="mt-[25px] mb-[15px]" />
      <View className="mt-[10px] flex flex-1">
        {isLoading && <Loader />}
        <AnimatedFlashList
          estimatedItemSize={40}
          ItemSeparatorComponent={() => <View className="h-[10px]" />}
          // title="Workouts list"

          data={data?.workouts}
          renderItem={Item}
        />
      </View>
    </Wrapper>
  );
}
