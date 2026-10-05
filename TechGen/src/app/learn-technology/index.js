import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

import {
  learnTechnology,
} from "../../controllers/technologyController";

const technologies = [
  "React Native",
  "React",
  "Python",
  "Node.js",
  "Java",
  "AI / ML",
];

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export default function LearnTechnologyScreen() {
  const router = useRouter();

  const [technology, setTechnology] =
    useState("");

  const [level, setLevel] =
    useState("Beginner");

  const [topic, setTopic] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLearn = async () => {
    // ------------------------------------------
    // Validate input
    // ------------------------------------------

    if (!technology) {
      if (Platform.OS === "web") {
        window.alert(
          "Please select a technology."
        );
      } else {
        Alert.alert(
          "Technology Required",
          "Please select a technology."
        );
      }

      return;
    }

    if (!topic.trim()) {
      if (Platform.OS === "web") {
        window.alert(
          "Please enter a topic to learn."
        );
      } else {
        Alert.alert(
          "Topic Required",
          "Please enter a topic to learn."
        );
      }

      return;
    }

    try {
      setLoading(true);

      const lesson = await learnTechnology({
        technology,
        topic,
        level,
      });

      router.push({
        pathname: "/learn-technology/result",
        params: {
          result: lesson.result,
          technology,
          topic,
          level,
        },
      });

    } catch (error) {
      console.log(
        "Learn Technology Error:",
        error
      );

      if (Platform.OS === "web") {
        window.alert(
          "Unable to generate lesson right now. Please try again."
        );
      } else {
        Alert.alert(
          "Learning Failed",
          "Unable to generate lesson right now. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };
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

          <View>
            <Text style={styles.title}>
              Learn Technology
            </Text>

            <Text style={styles.subtitle}>
              Learn BCA technologies with AI
            </Text>
          </View>
        </View>


        {/* Technology */}

        <View style={styles.card}>
          <Text style={styles.label}>
            Select Technology
          </Text>

          <View style={styles.optionsContainer}>
            {technologies.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.option,
                  technology === item &&
                  styles.selectedOption,
                ]}
                onPress={() =>
                  setTechnology(item)
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    technology === item &&
                    styles.selectedOptionText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>


        {/* Topic */}

        <View style={styles.card}>
          <Text style={styles.label}>
            Enter Topic
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Example: React Navigation"
            placeholderTextColor="#94A3B8"
            value={topic}
            onChangeText={setTopic}
            multiline
          />
        </View>


        {/* Level */}

        <View style={styles.card}>
          <Text style={styles.label}>
            Select Learning Level
          </Text>

          <View style={styles.optionsContainer}>
            {levels.map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.option,
                  level === item &&
                  styles.selectedOption,
                ]}
                onPress={() =>
                  setLevel(item)
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    level === item &&
                    styles.selectedOptionText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>


        {/* Learn Button */}

        <Pressable
          style={({ pressed }) => [
            styles.learnButton,
            pressed &&
            styles.buttonPressed,
            loading &&
            styles.disabledButton,
          ]}
          onPress={handleLearn}
          disabled={loading}
        >
          <Text style={styles.learnButtonText}>
            {loading
              ? "Learning..."
              : "Learn with AI"}
          </Text>
        </Pressable>


        {/* Info */}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            💡 How it works
          </Text>

          <Text style={styles.infoText}>
            Select a technology, enter a topic,
            choose your level, and TechGen AI
            will explain it with simple examples.
          </Text>
        </View>
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

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#172554",
  },

  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  label: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 13,
  },

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  option: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },

  selectedOption: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  optionText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "600",
  },

  selectedOptionText: {
    color: "#FFFFFF",
  },

  input: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#1E293B",
    textAlignVertical: "top",
    backgroundColor: "#F8FAFC",
  },

  learnButton: {
    backgroundColor: "#2563EB",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  disabledButton: {
    opacity: 0.6,
  },

  learnButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  infoBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 15,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  infoTitle: {
    color: "#1E40AF",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
  },

  infoText: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 20,
  },
});