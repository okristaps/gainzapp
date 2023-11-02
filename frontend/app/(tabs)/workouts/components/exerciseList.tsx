import React, { memo, useCallback, useState } from "react";
import { View } from "react-native-animatable";
import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import FiltersModal from "components/modals/filtersModal";
import { initialFilters } from "components/modals/filtersModal/helpers";
import { Filters } from "types/filters";
import { ExerciseIdentifier } from "types/index";
import { FlashList } from "@shopify/flash-list";
import Add from "assets/images/add.svg";
import { EmptyComponent, RenderItem } from "components/flatlist/components";

interface ListProps {
  debouncedSearchText: string | null;
  selectedExercises: ExerciseIdentifier[];
  onItemPress: (item: ExerciseIdentifier) => void;
  handleExercises: (item: ExerciseIdentifier) => void;
}

const RenderExerciseList: React.FC<ListProps> = ({
  debouncedSearchText,
  selectedExercises,
  onItemPress,
  handleExercises,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [visible, setVisible] = useState(false);

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
          onPress={() => onItemPress(item)}
          disabled={disabled}
          handleInfoPress={() =>
            selectedExercises.length < 11 && !disabled && handleExercises(item)
          }
          item={item}
          customIconRight={<Add />}
        />
      );
    },
    [selectedExercises]
  );

  return (
    <>
      <FiltersModal
        visible={visible}
        setVisible={setVisible}
        onSave={(newFilters) => {
          setFilters(newFilters);
          setVisible(false);
        }}
      />

      <RenderList
        debouncedSearchText={debouncedSearchText}
        filters={filters}
        renderItem={renderItem}
        selectedExercises={selectedExercises}
      />
    </>
  );
};

const RenderList = memo(
  ({
    debouncedSearchText,
    filters,
    renderItem,
    selectedExercises,
  }: {
    debouncedSearchText: string | null;
    filters: any;
    renderItem: any;
    selectedExercises: ExerciseIdentifier[];
  }) => {
    console.log("debouncedSearchText", debouncedSearchText);
    const { isLoading, data } = useQuery({
      retry: false,
      queryKey: ["exercises", debouncedSearchText, filters],
      queryFn: async () =>
        await getBe({
          path: `/exercises`,
          params: {
            perPage: 999,
            name: debouncedSearchText?.toLowerCase() ?? "",
            force: filters.force?.toLowerCase() ?? "",
            level: filters.level?.toLowerCase() ?? "",
            muscles: filters.primaryMuscle?.toLowerCase() ?? "",
            category: `${filters.category.toLowerCase()}`,
            identifiersOnly: true,
          },
        }),
    });

    console.log("listrender");

    return (
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
    );
  }
);

export default React.memo(RenderExerciseList);
