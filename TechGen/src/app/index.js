import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>TechGen AI</Text>

        <Text style={styles.subtitle}>
          Your AI-powered BCA Project Assistant
        </Text>

        <View style={styles.cardContainer}>

          <Pressable
            onPress={() => router.push("/generate-project")}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>
              🚀 Generate Project
            </Text>

            <Text style={styles.cardText}>
              Generate practical BCA project ideas using AI.
            </Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => router.push("/learn-technology")}
          >
            <Text style={styles.cardTitle}>
              📚 Learn Technology
            </Text>

            <Text style={styles.cardText}>
              Learn programming and technology concepts with AI.
            </Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => router.push("/viva")}
          >
            <Text style={styles.cardTitle}>
              🎯 Viva Preparation
            </Text>

            <Text style={styles.cardText}>
              Prepare viva questions and answers for your project.
            </Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => router.push("/saved-projects")}
          >
            <Text style={styles.cardTitle}>
              💾 My Projects
            </Text>

            <Text style={styles.cardText}>
              View your saved project ideas.
            </Text>
          </Pressable>

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

  content: {
    padding: 20,
    paddingTop: 70,
    paddingBottom: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#172554",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 35,
  },

  cardContainer: {
    gap: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#172554",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
  },
});