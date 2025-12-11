import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import type { ActivityResponse } from "@stream-io/feeds-react-native-sdk";
import { useClientConnectedUser } from "@stream-io/feeds-react-native-sdk";
import { FollowButton } from "@/components/follows/follow-button";
import { Reaction } from "@/components/activity/Reaction";

type ActivityProps = {
  activity: ActivityResponse;
};

export const Activity = ({ activity }: ActivityProps) => {
  const name = activity.user?.name || activity.user?.id || "Unknown";
  const initial = name.charAt(0).toUpperCase();

  const createdAt =
    activity.created_at instanceof Date
      ? activity.created_at
      : new Date(activity.created_at);

  const createdAtLabel = createdAt.toLocaleString();

  const connectedUser = useClientConnectedUser();

  return (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.actionsRow}>
        {activity.current_feed?.feed !== `user:${connectedUser?.id}` && (
          <FollowButton feed={activity.current_feed} />
        )}
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedView style={styles.avatarWrapper}>
          <ThemedView style={styles.avatar}>
            <ThemedText style={styles.avatarText}>{initial}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.content}>
          <ThemedView style={styles.headerRow}>
            <ThemedText style={styles.name} numberOfLines={1}>
              {name}
            </ThemedText>
            <ThemedText style={styles.timestamp} numberOfLines={1}>
              {createdAtLabel}
            </ThemedText>
          </ThemedView>

          {activity.text ? (
            <ThemedText style={styles.text}>{activity.text}</ThemedText>
          ) : null}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.bottomRow}>
        <Reaction activity={activity} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 4,
  },
  card: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarWrapper: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
    maxWidth: "50%",
  },
  timestamp: {
    fontSize: 12,
    color: "#6B7280",
    flexShrink: 1,
  },
  text: {
    fontSize: 14,
    color: "#111827",
  },
});
