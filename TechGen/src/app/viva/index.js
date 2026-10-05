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
  prepareViva,
} from "../../controllers/vivaController";

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

export default function VivaPreparationScreen() {
  const router = useRouter();

  const [technology, setTechnology] =useState("");

  const [projectTitle, setProjectTitle] =useState("");

  const [level, setLevel] = useState("Beginner");

  const [loading, setLoading] =useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleGenerateViva = async () => {
    // ------------------------------------------
    // Validate technology
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

    // ------------------------------------------
    // Validate project title
    // ------------------------------------------

    if (!projectTitle.trim()) {
      if (Platform.OS === "web") {
        window.alert(
          "Please enter your project title."
        );
      } else {
        Alert.alert(
          "Project Title Required",
          "Please enter your project title."
        );
      }

      return;
    }

    try {
      setLoading(true);

      const viva = await prepareViva({
        technology,
        projectTitle,
        level,
      });

      router.push({
        pathname: "/viva/result",
        params: {
          result: viva.result,
          technology,
          projectTitle,
          level,
        },
      });

    } catch (error) {
      console.log(
        "Generate Viva Error:",
        error
      );

      if (Platform.OS === "web") {
        window.alert(
          "Unable to generate viva questions right now. Please try again."
        );
      } else {
        Alert.alert(
          "Generation Failed",
          "Unable to generate viva questions right now. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
          >
            <Text style={styles.backButton}>
              ‹
            </Text>
          </Pressable>

          <View>
            <Text style={styles.title}>
              Viva Preparation
            </Text>

            <Text style={styles.subtitle}>
              Prepare for your project viva
            </Text>
          </View>
        </View>


        {/* Technology */}

        <View style={styles.card}>
          <Text style={styles.label}>
            Select Technology
          </Text>

          <View
            style={styles.optionsContainer}
          >
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


        {/* Project Title */}

        <View style={styles.card}>
          <Text style={styles.label}>
            Project Title
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Example: Weather Forecast App"
            placeholderTextColor="#94A3B8"
            value={projectTitle}
            onChangeText={setProjectTitle}
          />
        </View>


        {/* Level */}

        <View style={styles.card}>
          <Text style={styles.label}>
            Select Viva Level
          </Text>

          <View
            style={styles.optionsContainer}
          >
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


        {/* Generate Button */}

        <Pressable
          style={[
            styles.generateButton,
            loading &&
            styles.disabledButton,
          ]}
          onPress={handleGenerateViva}
          disabled={loading}
        >
          <Text
            style={styles.generateButtonText}
          >
            {loading
              ? "Generating..."
              : "Generate Viva Questions"}
          </Text>
        </Pressable>


        {/* Information */}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            💡 Viva Preparation
          </Text>

          <Text style={styles.infoText}>
            Enter your project details and
            TechGen AI will generate basic,
            technical, and project-related
            viva questions with simple answers.
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
    height: 52,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#1E293B",
    backgroundColor: "#F8FAFC",
  },

  generateButton: {
    backgroundColor: "#2563EB",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },

  disabledButton: {
    opacity: 0.6,
  },

  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
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