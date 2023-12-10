import { FlashList } from "@shopify/flash-list";
import { EmptyComponent, RenderItem } from "components/flatlist/components";
import ExercisesHorizontal from "components/flatlist/exerciseHorizontal";
import Loader from "components/loader/loader";
import { Divider } from "components/loginform/components";
import { exerciseId } from "components/loginform/types";
import ExerciseModal from "components/modals/exerciseModal/exerciseModal";
import FiltersModal from "components/modals/filtersModal";
import { initialFilters } from "components/modals/filtersModal/helpers";
import React, { memo, useCallback, useState } from "react";
import { Dimensions } from "react-native";
import { View } from "react-native-animatable";
import { Filters } from "types/filters";
import { Exercise, ExerciseIdentifier } from "types/index";
import useExerciseQuery from "./useExercisesHook";

interface ListProps {
  debouncedSearchText: string | null;
  tempSelectedExercises: ExerciseIdentifier[];
  setTempSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseIdentifier[]>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderExerciseList: React.FC<ListProps> = ({
  debouncedSearchText,
  tempSelectedExercises,
  setTempSelectedExercises,
  visible,
  setVisible,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [exercise, setExercise] = useState<Exercise | null>(null);

  const handleExercises = useCallback(
    (exercise: exerciseId) => {
      setTempSelectedExercises((curr) => {
        if (curr.some((ex) => ex._id === exercise._id)) {
          return curr.filter((ex) => ex._id !== exercise._id);
        } else {
          return [{ name: exercise.name, _id: exercise._id }, ...curr];
        }
      });
      setExercise(null);
    },
    [tempSelectedExercises]
  );

  const renderItem = React.useMemo(() => {
    const renderFunction = ({
      item,
    }: {
      item: {
        _id: string;
        name: string;
      };
    }) => {
      return (
        <RenderItem
          extraClassname="mt-[10px]"
          onPress={() => setExercise(item)}
          item={item}
          customIconRight={<View />}
        />
      );
    };
    return renderFunction;
  }, []);

  return (
    <>
      {visible && (
        <FiltersModal
          visible={visible}
          setVisible={setVisible}
          onSave={(newFilters) => {
            setFilters(newFilters);
            setVisible(false);
          }}
        />
      )}
      {Boolean(tempSelectedExercises?.length) && (
        <ExercisesHorizontal
          data={tempSelectedExercises}
          onItemPress={(item) => handleExercises(item)}
        />
      )}

      <View className="mt-[15px] mb-[10px]">
        <Divider text={"Exercises"} />
      </View>
      <RenderList
        debouncedSearchText={debouncedSearchText}
        filters={filters}
        renderItem={renderItem}
        selectedExercises={tempSelectedExercises}
      />

      {exercise !== null && (
        <ExerciseModal
          visible={Boolean(exercise)}
          setVisible={() => setExercise(null)}
          exercise={exercise}
          onAdd={!tempSelectedExercises.some((e) => e._id === exercise._id) && handleExercises}
          buttonDisabled={tempSelectedExercises?.length >= 10}
        />
      )}
    </>
  );
};

const RenderList = memo(
  ({
    debouncedSearchText,
    filters,
    renderItem,
  }: {
    debouncedSearchText: string | null;
    filters: any;
    renderItem: any;
    selectedExercises: ExerciseIdentifier[];
  }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchingPreviousPage } =
      useExerciseQuery(debouncedSearchText, filters);

    if (!data) {
      return <Loader />;
    }

    const flatData = data.pages.map((page) => page.exercises).flat();

    return (
      <View className="mt-[10px] flex flex-1">
        <FlashList
          estimatedListSize={{
            height: Dimensions.get("window").height - 200,
            width: Dimensions.get("window").width - 40,
          }}
          onEndReached={hasNextPage ? fetchNextPage : undefined}
          numColumns={1}
          estimatedItemSize={40}
          keyExtractor={(item: ExerciseIdentifier) => item?._id}
          data={flatData}
          renderItem={renderItem}
          ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
          ListHeaderComponent={isFetchingPreviousPage ? <Loader /> : null}
          ListEmptyComponent={
            flatData.length === 0 ? (
              <EmptyComponent
                isLoading={isFetchingNextPage || isFetchingPreviousPage}
                text={"No exercises found"}
              />
            ) : null
          }
        />
      </View>
    );
  }
);

export default memo(RenderExerciseList);
