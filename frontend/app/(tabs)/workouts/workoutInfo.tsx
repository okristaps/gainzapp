import { useQuery } from "@tanstack/react-query";
import { getBe } from "api/index";
import SecondaryTitle from "components/common/secondaryTitle";
import { DefaultFlatlist } from "components/flatlist";
import { RenderItem } from "components/flatlist/components";
import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";

import Info from "assets/images/info.svg";
import InfoContainer from "components/common/infoContainer";

export default function TabLogsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { isLoading, data } = useQuery({
    retry: 3,
    queryKey: ["workout", id],
    queryFn: async () =>
      await getBe({
        path: `/workouts/${id}`,
      }),
  });

  return (
    <Wrapper>
      <Header
        title="Workout info"
        iconLeft={{ text: "Back", hideText: true, onPress: () => router.back() }}
      />
      <SecondaryTitle text={data?.name} />
      <InfoContainer forces={data?.forces} equipment={data?.equipment} />
      <DefaultFlatlist
        title="Excercises"
        data={data?.exercises}
        isLoading={isLoading}
        renderItem={(item) => <RenderItem item={item.item} customIconRight={<Info />} />}
      />
    </Wrapper>
  );
}
