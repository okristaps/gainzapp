import { CommonActions } from "@react-navigation/native";
import { router } from "expo-router";
import { Alert } from "react-native";

export const initialLoading = {
  post: false,
  delete: false,
};

export const handleSave = async ({
  setLoading,
  createWorkout,
  name,
  _id,
  navigation,
}: {
  setLoading: React.Dispatch<React.SetStateAction<any>>;
  createWorkout: (name: string, id: string) => Promise<void>;
  navigation: any;
  name: string;
  _id?: string;
}) => {
  setLoading({ ...initialLoading, post: true });
  createWorkout(name, _id ?? "")
    .then(() => {
      navigation?.dispatch(
        CommonActions.reset({
          routes: [{ key: "(tabs)", name: "start" }],
        })
      );
      router.replace({ pathname: "workouts" });
    })

    .catch(() => {
      showAlert("Error", "An error occurred while saving your workout.");
    })
    .finally(() => {
      setLoading(initialLoading);
    });
};

const showAlert = (title: string, message: string) => {
  Alert.alert(title, message, [{ text: "OK", onPress: () => {} }]);
};

export const handleDelete = ({
  setLoading,
  deleteWorkout,
}: {
  setLoading: React.Dispatch<React.SetStateAction<any>>;
  deleteWorkout: () => Promise<void>;
}) => {
  Alert.alert("Do you want to delete this workout?", "All changes will be lost", [
    {
      text: "Cancel",
    },
    {
      text: "OK",
      onPress: () => {
        setLoading({ ...initialLoading, delete: true });
        deleteWorkout()
          .then(() => router.replace({ pathname: "workouts" }))
          .catch(() => {
            showAlert("Error", "An error occurred while deleting the workout.");
          })
          .finally(() => {
            setLoading(initialLoading);
          });
      },
    },
  ]);
};
