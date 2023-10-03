import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import RenderItem from "./item";

import { useQuery } from "@tanstack/react-query";
import { getBe } from "api";
import Loader from "components/loader/loader";
import useDebounce from "./searchDebounce";

interface Props {
  custom?: boolean;
  searchText: string;
}

const WorkoutsFlatlist: React.FC<Props> = ({ searchText, custom }) => {
  const debouncedSearchText = useDebounce(searchText, 300);

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["workouts", debouncedSearchText, custom],
    queryFn: async () =>
      await getBe({
        path: `/workouts/all${custom ? "/custom" : ""}`,
        params: { perPage: 12, name: debouncedSearchText },
      }),
  });

  return (
    <FlatList
      ItemSeparatorComponent={<View className="h-[10px]" />}
      pagingEnabled={true}
      className="flex flex-1 mt-[25px]"
      showsVerticalScrollIndicator={false}
      data={data?.workouts}
      ListEmptyComponent={<EmptyComponent isLoading={isLoading} />}
      renderItem={(item) => <RenderItem item={item.item} />}
      keyExtractor={(item) => item._id}
    />
  );
};

const EmptyComponent = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) return <Loader />;
  return (
    <Text className="text-secondary text-center font-medium text-15">No workouts found :(</Text>
  );
};

export default WorkoutsFlatlist;
