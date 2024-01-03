import { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Triangle from "assets/images/thing.svg";

import { LineChart } from "react-native-chart-kit";
import colors from "constants/colors";
import { FavouriteExerciseResponse } from "types/index";
import Loader from "components/loader/loader";
import moment from "moment";
import ChartProgressModal from "components/modals/chartProgressModal/chartProgressModal";

interface ChartProps {
  data: FavouriteExerciseResponse;
  loading: boolean;
}

const Chart: React.FC<ChartProps> = ({ data, loading }) => {
  const [chartData, setChartData] = useState({});
  const [selectedDot, setSelectedDot] = useState({ name: "", data: [] });
  const [selectedWorkout, setSelectedWorkout] = useState({ id: "", name: "" });

  useEffect(() => {
    if (data?.dropdownData) {
      setSelectedWorkout(data?.dropdownData[0]);
    }
  }, [data]);

  useEffect(() => {
    const temp = data?.exerciseProgress[selectedWorkout?.id];

    const mockChartData = {
      labels: temp?.leveledAverageData
        .filter((entry, index) => index % 3 === 0)
        .map((entry) => moment(entry.date).format("D.M.YY")),

      datasets: [
        {
          data: temp?.leveledAverageData.flatMap((item) => item.avg),
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red for weight
          strokeWidth: 2,
        },
      ],
    };

    if (selectedWorkout.id && data) setChartData(mockChartData);
  }, [selectedWorkout]);

  const screenWidth = Dimensions.get("window").width;
  const selectWorkout = ({ exercise }: { exercise: { id: string; name: string } }) => {
    setSelectedWorkout(exercise);
  };

  const Dropdown = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    return (
      <>
        <TouchableOpacity
          className="flex-row items-center ml-[20px]"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text className="text-15 text-primary font-bold ">{selectedWorkout?.name}</Text>
          <Triangle
            className={`ml-[5px] ${dropdownVisible ? "-rotate-90 " : "rotate-180"}`}
            fill={colors.primary}
          />
        </TouchableOpacity>

        {dropdownVisible && (
          <View
            className="absolute bg-input rounded-lg mt-5 border border-success p-2"
            style={{ zIndex: 1, left: "27%" }}
          >
            {data?.dropdownData.map((item, index) => (
              <TouchableOpacity
                key={item?.id}
                onPress={() => {
                  selectWorkout({ exercise: item });
                  setDropdownVisible(false);
                }}
                className="p-2"
              >
                <Text className="text-primary">{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </>
    );
  };

  const handlePointClick = (e: any) => {
    console.log("e", e.index);
    const exercise = data.exerciseProgress[selectedWorkout?.id];
    const date = exercise.leveledAverageData[e.index].date;
    const prog = exercise.progress;
    console.log("date", date);

    const progreessByDate = prog.filter(
      (item) => moment(item.date).format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY")
    );
    setSelectedDot({
      name: exercise.name,
      data: progreessByDate ?? [],
    });
  };

  const ChartComponent = () => {
    return (
      <LineChart
        fromZero={true}
        verticalLabelRotation={45}
        height={300}
        withVerticalLines={true}
        onDataPointClick={(e) => handlePointClick(e)}
        data={chartData}
        width={screenWidth - 50}
        segments={5}
        yAxisInterval={5}
        style={{
          marginLeft: -10,
          marginTop: 20,
          paddingBottom: -5,
        }}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#88BB46",
          },
        }}
        bezier
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (Boolean(chartData?.datasets?.length)) {
      return (
        <View>
          <Text className="text-secondary text-12 mb-3 ml-[20px]">Progress</Text>
          <Dropdown />
          <Text className="text-secondary text-12 ml-[20px]">Weight / Reps</Text>
          <ChartComponent />

          <ChartProgressModal
            visible={Boolean(selectedDot?.data?.length)}
            data={selectedDot}
            setVisible={() => setSelectedDot({})}
          />
        </View>
      );
    }

    return (
      <View className="pl-[20px] pr-[20px]">
        <Text className="text-white font-bold text-20">Progress chart</Text>
        <Text className="text-primary font-bold mb-[15px] mt-[10px]">
          Not enough data to display yet, do some workouts!
        </Text>
      </View>
    );
  };

  return <View className="my-2 pt-[20px] bg-input rounded-lg">{renderContent()}</View>;
};
export default Chart;
