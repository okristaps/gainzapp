import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import SecondaryTitle from "components/common/secondaryTitle";
import { DefaultFlatlist } from "components/flatlist";
import { RenderItem } from "components/flatlist/components";
import useDebounce from "components/flatlist/helpers/searchDebounce";

import Info from "assets/images/info.svg";
import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { router } from "expo-router";
import React, { useState } from "react";

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
        extraClass={"mt-[25px]"}
        type="search"
      />

      <DefaultFlatlist
        title="Workouts list"
        emptyText={"No exercises found"}
        isLoading={isLoading}
        data={data?.exercises}
        showsVerticalScrollIndicator={true}
        renderItem={renderItem}
      />
    </Wrapper>
  );
}
