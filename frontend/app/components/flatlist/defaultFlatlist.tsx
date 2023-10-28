import React, { memo } from "react";
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
  onStartReached?: () => void;
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
  onStartReached,
}) => {
  const keyExtractor = (item: any) => item?._id;

  const getItemLayout = (data: any, index: number) => {
    return {
      length: 40,
      offset: 40 * index,
      index,
    };
  };

  return (
    <View className="flex flex-1">
      <Divider text={title} textSize={28} extraClassName="mt-[25px]" />
      <FlatList
        onStartReached={onStartReached}
        alwaysBounceVertical={true}
        ListFooterComponent={ListFooterComponent}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={() => <View className="h-[10px]" />}
        ListEmptyComponent={<EmptyComponent isLoading={isLoading} text={emptyText} />}
        className=" mt-[25px]"
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        removeClippedSubviews={true}
        windowSize={50}
        initialNumToRender={40}
        maxToRenderPerBatch={100}
      />
    </View>
  );
};

export default memo(DefaultFlatlist);
