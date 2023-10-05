import React from "react";
import { FlatList, View } from "react-native";
import { EmptyComponent } from "./components";
import { Divider } from "components/loginform/components";

interface Props {
  data: any;
  isLoading: boolean;
  emptyText?: string;
  renderItem: (item: any) => React.ReactElement;
  title?: string;
}

const DefaultFlatlist: React.FC<Props> = ({
  data,
  isLoading,
  emptyText,
  renderItem,
  title = "Title",
}) => {
  return (
    <>
      <Divider text={title} textSize={28} extraClassName="mt-[25px]" />
      <FlatList
        getItemLayout={(data, index) => ({ length: 40, offset: 40 * index, index })}
        ItemSeparatorComponent={() => <View className="h-[10px]" />}
        ListEmptyComponent={<EmptyComponent isLoading={isLoading} text={emptyText} />}
        className="flex flex-1 mt-[25px]"
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </>
  );
};

export default DefaultFlatlist;
