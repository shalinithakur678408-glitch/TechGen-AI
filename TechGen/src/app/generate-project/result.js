import React from "react";
import {
  getSavedProjects,
  deleteSavedProject,
} from "../../controllers/savedProjectController";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";

import {
  useRouter,
  useLocalSearchParams,
} from "expo-router";

import {
  saveProject,
} from "../../controllers/savedProjectController";


export default function ProjectResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const result = Array.isArray(params.result)
    ? params.result[0]
    : params.result;

  const project = parseAIResult(result);

  const handleSaveProject = async () => {
    try {
      console.log("Project being saved:", project);

      if (!project?.title) {
        Alert.alert(
          "Save Failed",
          "Project data is empty. Please generate the project again."
        );
        return;
      }

      const result = await saveProject(project);

      console.log("SAVE RESULT:", result);

      Alert.alert(
        "Success",
        "Project saved successfully!"
      );

    } catch (error) {
      console.log("SAVE ERROR:", error);

      Alert.alert(
        "Error",
        error.message || "Failed to save project."
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/");
              }
            }}
            style={styles.backButtonContainer}
          >
            <Text style={styles.backButton}>
              ‹
            </Text>
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Project Result
            </Text>

            <Text style={styles.subtitle}>
              Your generated BCA project
            </Text>
          </View>
        </View>


        {/* PROJECT TITLE */}

        <View style={styles.titleCard}>
          <Text style={styles.smallLabel}>
            PROJECT TITLE
          </Text>

          <Text style={styles.projectTitle}>
            {project.title || "AI Generated Project"}
          </Text>

          <View style={styles.badgeContainer}>
            <Badge
              text={project.technology || "Technology"}
            />

            <Badge
              text={project.difficulty || "Difficulty"}
            />

            <Badge
              text={project.projectType || "Project"}
            />
          </View>
        </View>


        {/* PROBLEM STATEMENT */}

        <Section
          title="Problem Statement"
          content={
            project.problemStatement ||
            "No problem statement generated."
          }
        />


        {/* OBJECTIVE */}

        <Section
          title="Objective"
          content={
            project.objective ||
            "No objective generated."
          }
        />


        {/* DESCRIPTION */}

        <Section
          title="Project Description"
          content={
            project.description ||
            "No project description generated."
          }
        />


        {/* FEATURES */}

        <ListSection
          title="Features"
          items={project.features}
        />


        {/* TECHNOLOGIES */}

        <ListSection
          title="Technologies"
          items={project.technologies}
          bullet="●"
        />


        {/* MODULES */}

        <NumberedSection
          title="Modules"
          items={project.modules}
        />


        {/* WORKFLOW */}

        <NumberedSection
          title="Project Workflow"
          items={project.workflow}
        />


        {/* FOLDER STRUCTURE */}

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


        {/* FUTURE ENHANCEMENTS */}

        <ListSection
          title="Future Enhancements"
          items={project.futureEnhancements}
        />


        {/* VIVA QUESTIONS */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Viva Questions
          </Text>

          {project.vivaQuestions.length > 0 ? (
            project.vivaQuestions.map(
              (question, index) => (
                <VivaQuestion
                  key={String(index)}
                  number={index + 1}
                  question={question}
                />
              )
            )
          ) : (
            <Text style={styles.contentText}>
              No viva questions generated.
            </Text>
          )}
        </View>


        {/* SAVE BUTTON */}

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={handleSaveProject}
        >
          <Text style={styles.saveButtonText}>
            ♡ Save Project
          </Text>
        </Pressable>


        {/* GENERATE AGAIN */}

        <Pressable
          style={styles.newButton}
          onPress={() =>
            router.push("/generate-project")
          }
        >
          <Text style={styles.newButtonText}>
            + Generate Another Project
          </Text>
        </Pressable>

        <View style={styles.bottomSpace} />

      </ScrollView>
    </View>
  );
}


/* =========================
   BADGE
========================= */

function Badge({ text }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {text}
      </Text>
    </View>
  );
}


/* =========================
   AI RESULT PARSER
========================= */

function parseAIResult(input) {
  const defaultProject = {
    id: Date.now().toString(),
    title: "",
    problemStatement: "",
    objective: "",
    description: "",
    features: [],
    technologies: [],
    modules: [],
    workflow: [],
    folderStructure: "",
    futureEnhancements: [],
    vivaQuestions: [],
    technology: "",
    difficulty: "",
    projectType: "",
    createdAt: new Date().toISOString(),
  };

  if (!input) {
    return defaultProject;
  }


  /*
    Sometimes AI/API may already return
    an object instead of plain text.
  */

  if (typeof input === "object") {
    return {
      ...defaultProject,
      ...input,

      id:
        input.id ||
        Date.now().toString(),

      features:
        Array.isArray(input.features)
          ? input.features
          : parseList(input.features),

      technologies:
        Array.isArray(input.technologies)
          ? input.technologies
          : parseList(input.technologies),

      modules:
        Array.isArray(input.modules)
          ? input.modules
          : parseList(input.modules),

      workflow:
        Array.isArray(input.workflow)
          ? input.workflow
          : parseList(input.workflow),

      futureEnhancements:
        Array.isArray(input.futureEnhancements)
          ? input.futureEnhancements
          : parseList(input.futureEnhancements),

      vivaQuestions:
        Array.isArray(input.vivaQuestions)
          ? input.vivaQuestions
          : parseVivaQuestions(
            input.vivaQuestions
          ),
    };
  }


  let text = String(input)
    .replace(/\r/g, "")
    .trim();


  if (!text) {
    return defaultProject;
  }


  /*
    Remove markdown code fences.
  */

  text = text
    .replace(/```markdown/gi, "")
    .replace(/```text/gi, "")
    .replace(/```/g, "")
    .trim();


  /*
    Find section content.
  */

  const getSection = (names) => {
    const allSections = [
      "Project Title",
      "Problem Statement",
      "Objective",
      "Project Description",
      "Description",
      "Features",
      "Technologies",
      "Modules",
      "Project Workflow",
      "Workflow",
      "Folder Structure",
      "Future Enhancements",
      "Viva Questions",
    ];

    const currentNames = names
      .map(escapeRegex)
      .join("|");

    const nextNames = allSections
      .map(escapeRegex)
      .join("|");

    const regex = new RegExp(
      "(?:^|\\n)\\s*(?:#{1,6}\\s*)?(?:\\*{1,2}\\s*)?(?:" +
      currentNames +
      ")" +
      "(?:\\s*\\*{1,2})?" +
      "\\s*:?\\s*\\n?" +
      "([\\s\\S]*?)" +
      "(?=\\n\\s*(?:#{1,6}\\s*)?(?:\\*{1,2}\\s*)?(?:" +
      nextNames +
      ")" +
      "(?:\\s*\\*{1,2})?\\s*:|$)",
      "i"
    );

    const match = text.match(regex);

    return match
      ? match[1].trim()
      : "";
  };


  /*
    Project title
  */

  const titleMatch = text.match(
    /(?:^|\n)\s*(?:#{1,6}\s*)?(?:\*{1,2}\s*)?Project Title(?:\s*\*{1,2})?\s*:?\s*(.+)/i
  );


  /*
    Other sections
  */

  const problemStatement =
    getSection([
      "Problem Statement",
    ]);

  const objective =
    getSection([
      "Objective",
    ]);

  const description =
    getSection([
      "Project Description",
      "Description",
    ]);

  const featuresText =
    getSection([
      "Features",
    ]);

  const technologiesText =
    getSection([
      "Technologies",
    ]);

  const modulesText =
    getSection([
      "Modules",
    ]);

  const workflowText =
    getSection([
      "Project Workflow",
      "Workflow",
    ]);

  const folderStructure =
    getSection([
      "Folder Structure",
    ]);

  const futureText =
    getSection([
      "Future Enhancements",
    ]);

  const vivaText =
    getSection([
      "Viva Questions",
    ]);


  /*
    Return final project object
  */

  return {
    ...defaultProject,

    title: titleMatch
      ? cleanValue(titleMatch[1])
      : "",

    problemStatement:
      cleanValue(problemStatement),

    objective:
      cleanValue(objective),

    description:
      cleanValue(description),

    features:
      parseList(featuresText),

    technologies:
      parseList(technologiesText),

    modules:
      parseList(modulesText),

    workflow:
      parseList(workflowText),

    folderStructure:
      folderStructure.trim(),

    futureEnhancements:
      parseList(futureText),

    vivaQuestions:
      parseVivaQuestions(vivaText),
  };
}


/* =========================
   HELPERS
========================= */

function escapeRegex(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}


function cleanValue(value) {
  if (!value) {
    return "";
  }

  return String(value)
    .replace(/^\s*[-•✓]\s*/, "")
    .replace(/^\s*\*\s*/, "")
    .replace(/\*\*/g, "")
    .trim();
}


/* =========================
   LIST PARSER
========================= */

function parseList(text) {
  if (!text) {
    return [];
  }

  /*
    If already an array
  */

  if (Array.isArray(text)) {
    return text
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  return String(text)
    .split("\n")
    .map((item) =>
      item
        .replace(
          /^\s*[-•*✓]\s*/,
          ""
        )
        .replace(
          /^\s*\d+[\.\)]\s*/,
          ""
        )
        .replace(
          /^\s*#{1,6}\s*/,
          ""
        )
        .replace(/\*\*/g, "")
        .trim()
    )
    .filter(Boolean);
}


/* =========================
   VIVA PARSER
========================= */

function parseVivaQuestions(text) {
  if (!text) {
    return [];
  }

  if (Array.isArray(text)) {
    return text
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  return String(text)
    .split("\n")
    .map((item) =>
      item
        .replace(
          /^\s*Q?\d+[\.\):\-]?\s*/i,
          ""
        )
        .replace(
          /^\s*[-•*]\s*/,
          ""
        )
        .replace(/\*\*/g, "")
        .trim()
    )
    .filter(Boolean);
}


/* =========================
   SECTION
========================= */

function Section({
  title,
  content,
}) {
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
            key={String(index)}
            style={styles.featureRow}
          >
            <Text style={styles.check}>
              {bullet}
            </Text>

            <Text style={styles.featureText}>
              {item}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.contentText}>
          No information generated.
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
            key={String(index)}
            style={styles.moduleRow}
          >
            <View style={styles.numberCircle}>
              <Text style={styles.numberText}>
                {index + 1}
              </Text>
            </View>

            <Text style={styles.moduleText}>
              {item}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.contentText}>
          No information generated.
        </Text>
      )}
    </View>
  );
}


/* =========================
   VIVA QUESTION
========================= */

function VivaQuestion({
  number,
  question,
}) {
  return (
    <View style={styles.questionBox}>
      <Text style={styles.questionNumber}>
        Q{number}
      </Text>

      <Text style={styles.questionText}>
        {question}
      </Text>
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

  backButtonContainer: {
    marginRight: 15,
  },

  backButton: {
    fontSize: 40,
    color: "#172554",
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

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },

  badge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },

  badgeText: {
    color: "#172554",
    fontSize: 11,
    fontWeight: "700",
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

  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  check: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2563EB",
    marginRight: 10,
    width: 18,
  },

  featureText: {
    flex: 1,
    fontSize: 14,
    color: "#475569",
    lineHeight: 21,
  },

  moduleRow: {
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

  moduleText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "600",
    flex: 1,
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

  saveButton: {
    backgroundColor: "#2563EB",
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  newButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
  },

  newButtonText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 20,
  },
});