import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import SecondaryTitle from "components/common/secondaryTitle";
import { EmptyComponent, RenderItem } from "components/flatlist/components";
import useDebounce from "components/flatlist/helpers/searchDebounce";

import Info from "assets/images/info.svg";
import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { router } from "expo-router";
import React, { useState } from "react";

import { FlashList } from "@shopify/flash-list";
import { View } from "react-native-animatable";

export default function TabExercisesSelect() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["exercises", debouncedSearchText],
    queryFn: async () =>
      await getBe({
        path: `/exercises/strength`,
        params: { perPage: 999, name: debouncedSearchText },
      }),
  });

  const renderItem = React.useCallback(({ item }) => {
    return <RenderItem item={item} customIconRight={<Info />} />;
  }, []);

  return (
    <Wrapper>
      <Header
        iconLeft={{
          text: "Back",
          hideText: true,
          onPress: () => router.push({ pathname: "workouts/workoutCreate" }),
        }}
      />
      <SecondaryTitle text={"Custom workout 1"} />
      <Input
        placeholder="Search..."
        value={searchText}
        setValue={setSearchText}
        extraClass={"mt-[15px] mb-[15px]"}
        type="search"
      />

      <FlashList
        ListEmptyComponent={<EmptyComponent isLoading={isLoading} text={"No exercises found"} />}
        data={data?.exercises}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className="h-[10px]" />}
        estimatedItemSize={40}
      />
    </Wrapper>
  );
}
