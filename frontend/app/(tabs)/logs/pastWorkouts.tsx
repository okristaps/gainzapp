import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import { RenderItem } from "components/flatlist/components";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import SecondaryTitle from "components/common/secondaryTitle";

interface WorkoutSet {
  weight: string;
  reps: string;
  index: number;
  _id: string;
}

interface WorkoutExercise {
  sets: WorkoutSet[];
  _id: string;
}

interface WorkoutProgress {
  [key: string]: WorkoutExercise | { distance: string; time: string; _id: string; sets: [] };
}

interface Workout {
  workoutId: string;
  timestamp: string;
  uid: string;
  progress: WorkoutProgress;
  name: string;
  _id: string;
}

interface WorkoutSection {
  title: string;

  data: Workout[];
}

export default function PastWorkoutsScreen() {
  const { userData } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["workouts"],
    queryFn: async () =>
      await getBe({
        path: `/completed/${userData?.uid}`,
      }),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const sections: WorkoutSection[] = Object.entries(data?.workouts || {}).map(
    ([title, workouts]) => ({ title, data: workouts })
  );

  return (
    <Wrapper>
      <Header
        extraClassname="h-[50px]"
        title="Past Workouts"
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
      <SecondaryTitle text={"01.12.23 - 15.12.23"} />
      <View className="mt-[10px] flex flex-1">
        <FlashList
          data={sections}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={{ fontSize: 12, color: "white" }}>{item.title}</Text>
                {item.data.map((workout) => {
                  const parsedWorkout = {
                    _id: workout.workoutId,
                    name: workout?.name,
                  };
                  return (
                    <RenderItem
                      key={workout._id}
                      item={parsedWorkout}
                      extraClassname="mt-[10px]"
                      onPress={() =>
                        router.push({
                          pathname: "logs/viewPastWorkout",

                          params: { workoutId: workout._id },
                        })
                      }
                    />
                  );
                })}
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.title}
          getItemType={() => "sectionHeader"}
          estimatedItemSize={100}
        />
      </View>
    </Wrapper>
  );
}
