import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";
import CustomSwitch from "components/common/switch";
import { DefaultFlatlist } from "components/flatlist";
import { RenderItem } from "components/flatlist/components";
import useDebounce from "components/flatlist/helpers/searchDebounce";

import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { WorkoutsContext } from "./context/workoutsContext";

export default function TabWorkoutsScreen() {
  const { userData } = useContext(AuthContext);
  const { setSelectedWorkout, resetData } = useContext(WorkoutsContext);
  const [searchText, setSearchText] = useState("");
  const [isCustom, setIsCustom] = useState(true);
  const debouncedSearchText = useDebounce(searchText, 300);

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["workouts", debouncedSearchText, isCustom],
    queryFn: async () =>
      await getBe({
        path: `/workouts/all`,
        params: { name: debouncedSearchText, uid: !isCustom ? userData?.uid : "" },
      }),
  });
  return (
    <Wrapper>
      <Header
        iconLeft={{
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

      <DefaultFlatlist
        title="Workouts list"
        isLoading={isLoading}
        data={data?.workouts}
        renderItem={(item) => (
          <RenderItem
            item={item.item}
            onPress={() => {
              setSelectedWorkout(item.item);
              router.push({
                pathname: "workouts/workoutInfo",
              });
            }}
          />
        )}
      />
    </Wrapper>
  );
}
