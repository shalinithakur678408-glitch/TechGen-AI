import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import {
  useRouter,
  useLocalSearchParams,
} from "expo-router";

export default function VivaResultScreen() {
  const router = useRouter();

  const {
    result,
    technology,
    projectTitle,
    level,
  } = useLocalSearchParams();

  const aiResult = Array.isArray(result)
    ? result[0]
    : result;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
          >
            <Text style={styles.backButton}>
              ‹
            </Text>
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Viva Result
            </Text>

            <Text style={styles.subtitle}>
              AI-generated viva preparation
            </Text>
          </View>
        </View>

        {/* Project Card */}

        <View style={styles.projectCard}>
          <Text style={styles.smallLabel}>
            VIVA PREPARATION
          </Text>

          <Text style={styles.projectTitle}>
            {projectTitle || "Your Project"}
          </Text>

          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {technology || "Technology"}
              </Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {level || "Beginner"}
              </Text>
            </View>
          </View>
        </View>

        {/* AI Result */}

        <View style={styles.resultCard}>
          <Text style={styles.sectionTitle}>
            Questions & Answers
          </Text>

          {aiResult ? (
            <Text style={styles.resultText}>
              {aiResult}
            </Text>
          ) : (
            <Text style={styles.emptyText}>
              No viva result available.
            </Text>
          )}
        </View>

        {/* Generate Again */}

        <Pressable
          style={styles.generateButton}
          onPress={() =>
            router.push("/viva")
          }
        >
          <Text style={styles.generateButtonText}>
            Generate Again
          </Text>
        </Pressable>

        {/* Home */}

        <Pressable
          style={styles.homeButton}
          onPress={() =>
            router.push("/")
          }
        >
          <Text style={styles.homeButtonText}>
            ← Back to Home
          </Text>
        </Pressable>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  scrollContent: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  backButton: {
    fontSize: 40,
    color: "#172554",
    marginRight: 15,
    lineHeight: 40,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#172554",
  },

  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  projectCard: {
    backgroundColor: "#172554",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  smallLabel: {
    color: "#93C5FD",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },

  projectTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 15,
  },

  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  badge: {
    backgroundColor: "#1D4ED8",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 15,
  },

  resultText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 23,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
  },

  generateButton: {
    backgroundColor: "#2563EB",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  homeButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
  },

  homeButtonText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 20,
  },
});