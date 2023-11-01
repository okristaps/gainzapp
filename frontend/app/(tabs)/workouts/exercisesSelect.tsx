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
import React, { useContext, useState } from "react";

import { FlashList } from "@shopify/flash-list";

import { WorkoutsContext } from "./context/workoutsContext";
import ExercisesHorizontal from "components/flatlist/exerciseHorizontal";
import { View } from "react-native";
import { Divider } from "components/loginform/components";
import FiltersModal from "components/modals/filtersModal";
import { Filters } from "types/filters";
import { initialFilters } from "components/modals/filtersModal/helpers";

export default function TabExercisesSelect() {
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const { handleExercises, selectedExercises } = useContext(WorkoutsContext);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["exercises", debouncedSearchText, filters],
    queryFn: async () =>
      await getBe({
        path: `/exercises/${filters.category.toLowerCase()}`,
        params: {
          perPage: 999,
          name: debouncedSearchText?.toLowerCase() ?? "",
          force: filters.force?.toLowerCase() ?? "",
          level: filters.level?.toLowerCase() ?? "",
          muscles: filters.primaryMuscle?.toLowerCase() ?? "",
        },
      }),
  });

  const renderItem = React.useCallback(
    ({
      item,
    }: {
      item: {
        _id: string;
        name: string;
      };
    }) => {
      const disabled = selectedExercises.some((ex) => ex._id === item._id);
      return (
        <RenderItem
          disabled={disabled}
          onPress={() => selectedExercises.length < 11 && !disabled && handleExercises(item)}
          item={item}
          customIconRight={<Info />}
        />
      );
    },
    [selectedExercises]
  );

  return (
    <Wrapper>
      <FiltersModal
        visible={visible}
        setVisible={setVisible}
        onSave={(filters) => {
          setFilters(filters);
          setVisible(false);
        }}
      />
      <Header
        extraClassname="h-[50px]"
        title="Add Exercises"
        iconLeft={{
          text: "Back",
          hideText: true,
          onPress: () => router.back(),
        }}
        iconRight={{
          text: "Filter",
          onPress: () => setVisible(true),
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
      {Boolean(selectedExercises.length) && (
        <ExercisesHorizontal
          data={selectedExercises}
          onItemPress={(item) => handleExercises(item)}
        />
      )}
      <View className="mt-[15px] mb-[10px]">
        <Divider text={"Exercises"} />
      </View>

      <View className="mt-[10px] flex flex-1">
        <FlashList
          extraData={selectedExercises}
          ListEmptyComponent={<EmptyComponent isLoading={isLoading} text={"No exercises found"} />}
          data={data?.exercises}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View className="h-[10px]" />}
          estimatedItemSize={40}
        />
      </View>
    </Wrapper>
  );
}
