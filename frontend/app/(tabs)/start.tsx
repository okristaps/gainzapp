import Header from "components/header";
import Wrapper from "components/layout/wrapper";
import React from "react";

export default function TabStartScreen() {
  return (
    <Wrapper>
      <Header
        title="Select workout"
        iconRight={{
          text: "Filter",
          items: "end",
        }}
      />
    </Wrapper>
  );
}
