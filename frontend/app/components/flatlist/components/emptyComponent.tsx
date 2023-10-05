import Loader from "components/loader/loader";
import { Text } from "react-native";

const EmptyComponent = ({
  isLoading,
  text = "No workouts found :(",
}: {
  isLoading: boolean;
  text?: string;
}) => {
  if (isLoading) return <Loader />;
  return <Text className="text-secondary text-center font-medium text-15">{text}</Text>;
};

export default EmptyComponent;
