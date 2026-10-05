import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

import {
  getSavedProjects,
  deleteSavedProject,
} from "../../controllers/savedProjectController";

export default function SavedProjectsScreen() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const savedProjects = await getSavedProjects();

      setProjects(savedProjects);
    } catch (error) {
      console.log("Load Projects Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProjects();
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      console.log("UI deleting ID:", id);

      await deleteSavedProject(id);

      console.log("Delete API completed");

      setProjects((currentProjects) => {
        console.log("Before delete:", currentProjects.length);

        const remainingProjects = currentProjects.filter(
          (project) => String(project.id) !== String(id)
        );

        console.log(
          "After delete:",
          remainingProjects.length
        );

        return remainingProjects;
      });

    } catch (error) {
      console.log("Delete Project Error:", error);
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
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/");
              }
            }}
          >
            <Text style={styles.backButton}>‹</Text>
          </Pressable>

          <View>
            <Text style={styles.title}>
              My Projects
            </Text>

            <Text style={styles.subtitle}>
              Your saved AI projects
            </Text>
          </View>
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Loading projects...
            </Text>
          </View>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              ♡
            </Text>

            <Text style={styles.emptyTitle}>
              No Saved Projects
            </Text>

            <Text style={styles.emptyText}>
              Your saved projects will appear here.
            </Text>

            <Pressable
              style={styles.generateButton}
              onPress={() =>
                router.push("/generate-project")
              }
            >
              <Text style={styles.generateButtonText}>
                + Generate Project
              </Text>
            </Pressable>
          </View>
        )}

        {/* Saved Projects */}
        {!loading &&
          projects.map((project) => (
            <View
              style={styles.projectCard}
              key={project.id}
            >
              <View style={styles.projectTop}>
                <View style={styles.projectIcon}>
                  <Text style={styles.projectIconText}>
                    AI
                  </Text>
                </View>

                <View style={styles.projectInfo}>
                  <Text style={styles.projectTitle}>
                    {project.title}
                  </Text>

                  <Text style={styles.projectDate}>
                    Saved Project
                  </Text>
                </View>
              </View>

              {/* Technologies */}
              {project.technologies &&
                project.technologies.length > 0 && (
                  <View style={styles.technologyContainer}>
                    {project.technologies
                      .slice(0, 3)
                      .map((technology, index) => (
                        <Text
                          style={styles.badge}
                          key={index}
                        >
                          {technology}
                        </Text>
                      ))}
                  </View>
                )}

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <Pressable
                  style={styles.viewButton}
                  onPress={() =>
                    router.push({
                      pathname:
                        "/saved-projects/[id]",
                      params: {
                        id: project.id,
                      },
                    })
                  }
                >
                  <Text style={styles.viewButtonText}>
                    View Project
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() =>
                    handleDelete(project.id)
                  }
                >
                  <Text style={styles.deleteButtonText}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}

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

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  emptyIcon: {
    fontSize: 42,
    color: "#2563EB",
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 20,
  },

  generateButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },

  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  projectCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  projectTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  projectIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  projectIconText: {
    color: "#2563EB",
    fontWeight: "800",
    fontSize: 14,
  },

  projectInfo: {
    flex: 1,
  },

  projectTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1E293B",
    lineHeight: 22,
  },

  projectDate: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },

  technologyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 15,
  },

  badge: {
    backgroundColor: "#EEF2FF",
    color: "#2563EB",
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: "700",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 18,
    gap: 10,
  },

  viewButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  viewButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  deleteButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 20,
  },
});