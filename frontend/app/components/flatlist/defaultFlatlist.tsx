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
  ListFooterComponent?: React.ReactElement;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  showsVerticalScrollIndicator?: boolean;
}

const DefaultFlatlist: React.FC<Props> = ({
  data,
  isLoading,
  emptyText,
  renderItem,
  title = "Title",
  ListFooterComponent,
  onEndReached,
  onEndReachedThreshold,
  showsVerticalScrollIndicator = false,
}) => {
  return (
    <>
      <Divider text={title} textSize={28} extraClassName="mt-[25px]" />
      <FlatList
        alwaysBounceVertical={true}
        ListFooterComponent={ListFooterComponent}
        getItemLayout={(data, index) => ({ length: 40, offset: 40 * index, index })}
        ItemSeparatorComponent={() => <View className="h-[10px]" />}
        ListEmptyComponent={<EmptyComponent isLoading={isLoading} text={emptyText} />}
        className="flex flex-1 mt-[25px]"
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        contentOffset={{ x: 0, y: 40 }}
        maxToRenderPerBatch={80}
      />
    </>
  );
};

export default DefaultFlatlist;
