import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import React from "react";

export default function TabWorkoutsScreen() {
  return (
    <Wrapper>
      <Header
        iconRight={{
          text: "Filter",
          items: "end",
        }}
      />
    </Wrapper>
  );
}
