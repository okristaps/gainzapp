import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import Add from "assets/images/add.svg";
import { EmptyComponent, RenderItem } from "components/flatlist/components";
import Loader from "components/loader/loader";
import FiltersModal from "components/modals/filtersModal";
import { initialFilters } from "components/modals/filtersModal/helpers";
import { confirmPasswordReset } from "firebase/auth";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { View } from "react-native-animatable";
import { Filters } from "types/filters";
import { ExerciseIdentifier } from "types/index";
import useExerciseQuery from "./useExercisesHook";
import { exerciseId } from "components/loginform/types";
import ExercisesHorizontal from "components/flatlist/exerciseHorizontal";
import { Divider } from "components/loginform/components";

interface ListProps {
  debouncedSearchText: string | null;
  selectedExercises: ExerciseIdentifier[];
  onItemPress: (item: ExerciseIdentifier) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenderExerciseList: React.FC<ListProps> = ({
  debouncedSearchText,
  selectedExercises,
  onItemPress,
  visible,
  setVisible,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const [tempSelectedExercises, setTempSelectedExercises] = useState<ExerciseIdentifier[]>(
    selectedExercises ?? []
  );

  const handleExercises = useCallback(
    (exercise: exerciseId) => {
      setTempSelectedExercises((curr) => {
        if (curr.some((ex) => ex._id === exercise._id)) {
          return curr.filter((ex) => ex._id !== exercise._id);
        } else {
          return [{ name: exercise.name, _id: exercise._id }, ...curr];
        }
      });
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
          onPress={() => onItemPress(item)}
          handleInfoPress={() => tempSelectedExercises?.length < 11 && handleExercises(item)}
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
