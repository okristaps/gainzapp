import DropdownComponent from "components/dropdowns";
import ModalWrapper from "components/modals/components/modalWrapper";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

import { PirmaryButton, PirmaryButtonEmpty } from "components/common/primarybutton";
import colors from "constants/colors";
import { Filters } from "types/filters";
import { FilterConfig, filtersConfig, initialFilters } from "./helpers";

interface FilterModalProps {
  visible: boolean;
  setVisible?: (visible: boolean) => void;
}

const FiltersModal: React.FC<FilterModalProps> = ({ visible, setVisible }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [focus, setFocus] = useState<number | null>(null);

  const RenderDropdowns = useCallback(() => {
    return filtersConfig.map((filter: FilterConfig, index: number) => {
      const value = filters[filter.name] ?? "";
      return (
        <View key={filter.name} className="mb-[10px]">
          <DropdownComponent
            isFocus={focus === index}
            setIsFocus={(focus) => setFocus(focus ? index : null)}
            value={filters[filter.name]}
            setValue={(value) => setFilters((prev) => ({ ...prev, [filter.name]: value }))}
            clearDisabled={filter?.clearDisabled}
            data={filter.data}
            title={filter.title}
            renderLeftIcon={() => (
              <filter.Icon
                stroke={value ? colors.success : colors.info}
                height={20}
                width={20}
                style={{ marginRight: 10 }}
              />
            )}
          />
        </View>
      );
    });
  }, [filters]);

  return (
    <ModalWrapper
      disableSwipe={focus !== null}
      visible={visible}
      setVisible={setVisible}
      title={"Filters"}
    >
      <View className="mt-[20px]">
        <RenderDropdowns />
        <Buttons />
      </View>
    </ModalWrapper>
  );
};

const Buttons = () => {
  return (
    <View className="flex-row w mt-[20px] justify-between gap-x-[30px]">
      <View className="flex-1">
        <PirmaryButtonEmpty disabled={false} loading={false} color="danger" text="Reset " />
      </View>
      <View className="flex-1">
        <PirmaryButton disabled={false} text="Save " />
      </View>
    </View>
  );
};

export default FiltersModal;
