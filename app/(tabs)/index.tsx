import React from "react";
import { View, StyleSheet } from "react-native";
import { StreamFeed } from "@stream-io/feeds-react-native-sdk";
import { useOwnFeedsContext } from "@/contexts/own-feeds-context";
import { ActivityList } from "@/components/activity/ActivityList";

export default () => {
  const { ownTimeline } = useOwnFeedsContext();

  if (!ownTimeline) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StreamFeed feed={ownTimeline}>
        <ActivityList />
      </StreamFeed>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
