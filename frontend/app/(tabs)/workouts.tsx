import CustomSwitch from "components/common/switch";
import WorkoutsFlatlist from "components/flatlist/workoutsFlatlist";

import Header from "components/header";
import { Input } from "components/inputs/input";
import Wrapper from "components/layout/wrapper";
import { Divider } from "components/loginform/components";
import React, { useState } from "react";

export default function TabWorkoutsScreen() {
  const [searchText, setSearchText] = useState("");
  const [value, setValue] = useState(true);

  return (
    <Wrapper>
      <Header
        iconLeft={{
          text: !value ? "Create" : null,
        }}
        iconRight={{
          text: "Filter",
          items: "end",
        }}
      />
      <CustomSwitch value={value} setValue={setValue} />
      <Input
        placeholder="Search..."
        value={searchText}
        setValue={setSearchText}
        extraClass={"mt-[25px]"}
        type="search"
      />
      <Divider text="Workouts list" textSize={28} extraClassName="mt-[25px]" />
      <WorkoutsFlatlist />
    </Wrapper>
  );
}
