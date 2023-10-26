import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import CustomSwitch from "components/common/switch";
import { DefaultFlatlist } from "components/flatlist";
import { RenderItem } from "components/flatlist/components";
import useDebounce from "components/flatlist/helpers/searchDebounce";

import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { Divider } from "components/loginform/components";
import { router } from "expo-router";
import React, { useState } from "react";

export default function TabWorkoutsScreen() {
  const [searchText, setSearchText] = useState("");
  const [isCustom, setIsCustom] = useState(true);
  const debouncedSearchText = useDebounce(searchText, 300);

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["workouts", debouncedSearchText, isCustom],
    queryFn: async () =>
      await getBe({
        path: `/workouts/all${!isCustom ? "/custom" : ""}`,
        params: { perPage: 12, name: debouncedSearchText },
      }),
  });

  return (
    <Wrapper>
      <Header
        iconLeft={{
          text: !isCustom ? "Create" : null,
          onPress: () => router.push({ pathname: "workouts/workoutCreate" }),
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
            onPress={() =>
              router.push({
                pathname: "workouts/workoutInfo",
                params: { id: item.item._id },
              })
            }
          />
        )}
      />
    </Wrapper>
  );
}