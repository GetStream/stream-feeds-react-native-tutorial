import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { useFeedContext } from "@stream-io/feeds-react-native-sdk";

export const ActivityComposer = () => {
  const feed = useFeedContext();
  const [newText, setNewText] = useState("");

  const canPost = newText.trim().length > 0;

  const sendActivity = useCallback(async () => {
    if (!feed || !canPost) return;

    await feed.addActivity({
      text: newText,
      type: "post",
    });

    setNewText("");
  }, [feed, newText, canPost]);

  return (
    <View style={styles.card}>
      <View style={styles.inner}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="What is happening?"
          value={newText}
          onChangeText={setNewText}
          textAlignVertical="top"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9CA3AF"
        />
        <View style={styles.footerRow}>
          <Pressable
            onPress={sendActivity}
            disabled={!canPost}
            style={({ pressed }) => [
              styles.button,
              !canPost && styles.buttonDisabled,
              pressed && canPost && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Post</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  inner: {
    width: "100%",
    flexDirection: "column",
    gap: 8, // RN doesn't support gap everywhere, but Metro will inline this in newer versions; if not, just use margins
  },
  input: {
    minHeight: 80,
    maxHeight: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    fontSize: 14,
    color: "#111827",
  },
  footerRow: {
    width: "100%",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#2563EB",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: "#93C5FD",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
