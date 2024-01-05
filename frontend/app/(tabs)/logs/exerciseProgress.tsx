import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import { AuthContext } from "auth/authManager";
import { RenderItem } from "components/flatlist/components";
import Header from "components/header";
import { Input } from "components/inputs/input";
import Loader from "components/loader/loader";

import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { View } from "react-native";

export default function PastWorkoutsScreen() {
  const { userData } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");

  const { isLoading, data } = useQuery({
    retry: false,
    queryKey: ["workouts", searchText],
    queryFn: async () =>
      await getBe({
        path: `/progress/list/${userData?.uid}`,
        params: { search: searchText, uid: userData?.uid, page: 1 },
      }),
  });

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
        <View>
          <RenderItem extraClassname="mt-[10px]" item={item} />
        </View>
      );
    };
    return renderFunction;
  }, []);
  return (
    <View className="flex flex-1">
      <Header
        extraClassname="h-[50px]"
        title="Exercise Progress"
        iconLeft={{
          text: "Back",
          hideText: true,
          onPress: () => router.back(),
        }}
      />
      <Input
        debounceEnabled
        placeholder="Search..."
        onValueChange={setSearchText}
        extraClass={"mt-[25px] mb-[10px]"}
        type="search"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <FlashList renderItem={renderItem} estimatedItemSize={40} data={data?.exercises} />
      )}
    </View>
  );
}
