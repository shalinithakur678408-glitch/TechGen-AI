import React, { useEffect, useState } from "react";
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

import {
  getSavedProjects,
} from "../../controllers/savedProjectController";

export default function SavedProjectDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const projects = await getSavedProjects();

      const selectedProject = projects.find(
        (item) => item.id === id
      );

      setProject(selectedProject || null);
    } catch (error) {
      console.log(
        "Load Project Detail Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>
          Loading project...
        </Text>
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.notFoundTitle}>
          Project Not Found
        </Text>

        <Text style={styles.notFoundText}>
          This project may have been deleted.
        </Text>

        <Pressable
          style={styles.backToProjectsButton}
          onPress={() =>
            router.push("/saved-projects")
          }
        >
          <Text style={styles.backToProjectsText}>
            Back to My Projects
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backButton}>‹</Text>
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Project Details
            </Text>

            <Text style={styles.subtitle}>
              Saved BCA project
            </Text>
          </View>
        </View>

        {/* Project Title */}
        <View style={styles.titleCard}>
          <Text style={styles.smallLabel}>
            SAVED PROJECT
          </Text>

          <Text style={styles.projectTitle}>
            {project.title}
          </Text>
        </View>

        {/* Problem Statement */}
        <Section
          title="Problem Statement"
          content={project.problemStatement}
        />

        {/* Objective */}
        <Section
          title="Objective"
          content={project.objective}
        />

        {/* Description */}
        <Section
          title="Project Description"
          content={project.description}
        />

        {/* Features */}
        <ListSection
          title="Features"
          items={project.features}
        />

        {/* Technologies */}
        <ListSection
          title="Technologies"
          items={project.technologies}
          bullet="●"
        />

        {/* Modules */}
        <NumberedSection
          title="Modules"
          items={project.modules}
        />

        {/* Workflow */}
        <NumberedSection
          title="Project Workflow"
          items={project.workflow}
        />

        {/* Folder Structure */}
        {project.folderStructure ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Folder Structure
            </Text>

            <View style={styles.codeBox}>
              <Text style={styles.codeText}>
                {project.folderStructure}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Future Enhancements */}
        <ListSection
          title="Future Enhancements"
          items={project.futureEnhancements}
        />

        {/* Viva Questions */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Viva Questions
          </Text>

          {project.vivaQuestions &&
          project.vivaQuestions.length > 0 ? (
            project.vivaQuestions.map(
              (question, index) => (
                <View
                  style={styles.questionBox}
                  key={index}
                >
                  <Text
                    style={styles.questionNumber}
                  >
                    Q{index + 1}
                  </Text>

                  <Text
                    style={styles.questionText}
                  >
                    {question}
                  </Text>
                </View>
              )
            )
          ) : (
            <Text style={styles.contentText}>
              No viva questions available.
            </Text>
          )}
        </View>

        {/* Back Button */}
        <Pressable
          style={styles.backProjectsButton}
          onPress={() =>
            router.push("/saved-projects")
          }
        >
          <Text style={styles.backProjectsText}>
            ← Back to My Projects
          </Text>
        </Pressable>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

/* =========================
   SECTION
========================= */

function Section({
  title,
  content,
}) {
  if (!content) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Text style={styles.contentText}>
        {content}
      </Text>
    </View>
  );
}

/* =========================
   LIST SECTION
========================= */

function ListSection({
  title,
  items = [],
  bullet = "✓",
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {items.length > 0 ? (
        items.map((item, index) => (
          <View
            style={styles.listRow}
            key={index}
          >
            <Text style={styles.bullet}>
              {bullet}
            </Text>

            <Text style={styles.listText}>
              {item}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.contentText}>
          No information available.
        </Text>
      )}
    </View>
  );
}

/* =========================
   NUMBERED SECTION
========================= */

function NumberedSection({
  title,
  items = [],
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {items.length > 0 ? (
        items.map((item, index) => (
          <View
            style={styles.numberRow}
            key={index}
          >
            <View style={styles.numberCircle}>
              <Text style={styles.numberText}>
                {index + 1}
              </Text>
            </View>

            <Text style={styles.numberItemText}>
              {item}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.contentText}>
          No information available.
        </Text>
      )}
    </View>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  centerContainer: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  loadingText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },

  notFoundTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 8,
  },

  notFoundText: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 20,
    textAlign: "center",
  },

  backToProjectsButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  backToProjectsText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
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
    fontSize: 27,
    fontWeight: "800",
    color: "#172554",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },

  titleCard: {
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
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 12,
  },

  contentText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },

  listRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  bullet: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2563EB",
    marginRight: 10,
    width: 18,
  },

  listText: {
    flex: 1,
    fontSize: 14,
    color: "#475569",
    lineHeight: 21,
  },

  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  numberText: {
    color: "#2563EB",
    fontWeight: "800",
  },

  numberItemText: {
    flex: 1,
    fontSize: 14,
    color: "#334155",
    fontWeight: "600",
    lineHeight: 21,
  },

  codeBox: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    padding: 15,
  },

  codeText: {
    color: "#E2E8F0",
    fontSize: 12,
    lineHeight: 19,
    fontFamily: "monospace",
  },

  questionBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  questionNumber: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 4,
  },

  questionText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
  },

  backProjectsButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
  },

  backProjectsText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 20,
  },
});