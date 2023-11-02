import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import Add from "assets/images/add.svg";
import { EmptyComponent, RenderItem } from "components/flatlist/components";
import FiltersModal from "components/modals/filtersModal";
import { initialFilters } from "components/modals/filtersModal/helpers";
import React, { memo, useState } from "react";
import { View } from "react-native-animatable";
import { Filters } from "types/filters";
import { ExerciseIdentifier } from "types/index";

interface ListProps {
  debouncedSearchText: string | null;
  selectedExercises: ExerciseIdentifier[];
  onItemPress: (item: ExerciseIdentifier) => void;
  handleExercises: (item: ExerciseIdentifier) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderExerciseList: React.FC<ListProps> = ({
  debouncedSearchText,
  selectedExercises,
  onItemPress,
  handleExercises,
  visible,
  setVisible,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const renderItem = React.useMemo(() => {
    const renderFunction = ({
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
          iconDisabled={selectedExercises.length === 15}
          customIconRight={<Add />}
        />
      );
    };
    return renderFunction;
  }, [selectedExercises]);

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

    return (
      <View className="mt-[10px] flex flex-1">
        <FlashList
          extraData={selectedExercises}
          keyExtractor={(item: ExerciseIdentifier) => item?._id}
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

export default memo(RenderExerciseList);
