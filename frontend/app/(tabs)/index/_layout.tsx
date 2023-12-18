import InfoBoxes from "components/dashboard/dashboardScreen";
import Header from "components/header";
import ProfilePicture from "components/header/profile";
import WeekNavigation from "components/header/weekSwitch";
import WeekButtons from "components/weekButtons/weekButtons";
import { ScrollView, View } from "react-native";

export default function Layout() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 pr-[20px] pl-[20px]">
      <Header
        justify="between"
        customChildren={
          <>
            <ProfilePicture />
            <WeekNavigation />
            <View className="w-[37px]" />
          </>
        }
      />
      <WeekButtons />
      <InfoBoxes />
    </ScrollView>
  );
}
