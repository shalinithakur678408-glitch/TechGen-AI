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
    generateProject as generateProjectFromController,
} from "../../controllers/projectController";

export default function GenerateProjectScreen() {
    const router = useRouter();

    const [technology, setTechnology] =
        useState("React Native");

    const [difficulty, setDifficulty] =
        useState("Beginner");

    const [projectType, setProjectType] =
        useState("Mobile App");

    const [requirements, setRequirements] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const technologies = [
        "React Native",
        "React",
        "Python",
        "Node.js",
        "Java",
        "AI / ML",
    ];

    const difficulties = [
        "Beginner",
        "Intermediate",
        "Advanced",
    ];

    const projectTypes = [
        "Mobile App",
        "Web App",
        "AI / ML Project",
        "Desktop Application",
    ];

    // ==========================================
    // GENERATE PROJECT
    // ==========================================

    const handleGenerate = async () => {
        console.log("GENERATE BUTTON CLICKED");

        // ------------------------------------------
        // Validate selected options
        // ------------------------------------------

        if (!technology || !difficulty || !projectType) {
            if (Platform.OS === "web") {
                window.alert(
                    "Please select all project options."
                );
            } else {
                Alert.alert(
                    "Missing Information",
                    "Please select all project options."
                );
            }

            return;
        }

        // ------------------------------------------
        // Validate requirements
        // ------------------------------------------

        if (!requirements.trim()) {
            if (Platform.OS === "web") {
                window.alert(
                    "Please enter your project requirements."
                );
            } else {
                Alert.alert(
                    "Requirements Required",
                    "Please enter your project requirements."
                );
            }

            return;
        }

        try {
            // --------------------------------------
            // Start loading
            // --------------------------------------

            setLoading(true);

            console.log("Technology:", technology);
            console.log("Difficulty:", difficulty);
            console.log("Project Type:", projectType);
            console.log("Requirements:", requirements);

            console.log(
                "Calling project controller..."
            );

            // --------------------------------------
            // Call Controller
            // --------------------------------------

            const project =
                await generateProjectFromController({
                    technology,
                    difficulty,
                    projectType,
                    requirements,
                });

            console.log(
                "Generated Project:",
                project
            );

            // --------------------------------------
            // Validate AI response
            // --------------------------------------

            if (!project || !project.result) {
                throw new Error(
                    "AI did not return a valid project."
                );
            }

            console.log(
                "AI result received successfully."
            );

            // --------------------------------------
            // Navigate to result screen
            // --------------------------------------

            router.push({
                pathname: "/generate-project/result",
                params: {
                    result: project.result,
                },
            });

        } catch (error) {
            console.log(
                "Project generation error:",
                error
            );

            if (Platform.OS === "web") {
                window.alert(
                    "Unable to generate project right now. Please try again."
                );
            } else {
                Alert.alert(
                    "Generation Failed",
                    "Unable to generate project right now. Please try again."
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

                {/* ==================================
                    HEADER
                ================================== */}

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
                        <Text
                            style={
                                styles.backButton
                            }
                        >
                            ‹
                        </Text>
                    </Pressable>

                    <View>
                        <Text
                            style={styles.title}
                        >
                            Generate Project
                        </Text>

                        <Text
                            style={
                                styles.subtitle
                            }
                        >
                            Create a practical BCA
                            project with AI
                        </Text>
                    </View>

                </View>


                {/* ==================================
                    TECHNOLOGY
                ================================== */}

                <View style={styles.section}>

                    <Text style={styles.label}>
                        Technology
                    </Text>

                    <View
                        style={
                            styles.optionsContainer
                        }
                    >

                        {technologies.map(
                            (item) => (

                                <Pressable
                                    key={item}
                                    style={[
                                        styles.option,

                                        technology ===
                                        item &&
                                        styles.selectedOption,
                                    ]}
                                    onPress={() =>
                                        setTechnology(
                                            item
                                        )
                                    }
                                >

                                    <Text
                                        style={[
                                            styles.optionText,

                                            technology ===
                                            item &&
                                            styles.selectedOptionText,
                                        ]}
                                    >
                                        {item}
                                    </Text>

                                </Pressable>

                            )
                        )}

                    </View>

                </View>


                {/* ==================================
                    DIFFICULTY
                ================================== */}

                <View style={styles.section}>

                    <Text style={styles.label}>
                        Difficulty Level
                    </Text>

                    <View
                        style={
                            styles.optionsContainer
                        }
                    >

                        {difficulties.map(
                            (item) => (

                                <Pressable
                                    key={item}
                                    style={[
                                        styles.option,

                                        difficulty ===
                                        item &&
                                        styles.selectedOption,
                                    ]}
                                    onPress={() =>
                                        setDifficulty(
                                            item
                                        )
                                    }
                                >

                                    <Text
                                        style={[
                                            styles.optionText,

                                            difficulty ===
                                            item &&
                                            styles.selectedOptionText,
                                        ]}
                                    >
                                        {item}
                                    </Text>

                                </Pressable>

                            )
                        )}

                    </View>

                </View>


                {/* ==================================
                    PROJECT TYPE
                ================================== */}

                <View style={styles.section}>

                    <Text style={styles.label}>
                        Project Type
                    </Text>

                    <View
                        style={
                            styles.optionsContainer
                        }
                    >

                        {projectTypes.map(
                            (item) => (

                                <Pressable
                                    key={item}
                                    style={[
                                        styles.option,

                                        projectType ===
                                        item &&
                                        styles.selectedOption,
                                    ]}
                                    onPress={() =>
                                        setProjectType(
                                            item
                                        )
                                    }
                                >

                                    <Text
                                        style={[
                                            styles.optionText,

                                            projectType ===
                                            item &&
                                            styles.selectedOptionText,
                                        ]}
                                    >
                                        {item}
                                    </Text>

                                </Pressable>

                            )
                        )}

                    </View>

                </View>


                {/* ==================================
                    PROJECT REQUIREMENTS
                ================================== */}

                <View style={styles.section}>

                    <Text style={styles.label}>
                        Project Requirements
                    </Text>

                    <TextInput
                        style={
                            styles.textInput
                        }

                        placeholder="Example: Create a student attendance app with login, attendance tracking and reports..."

                        placeholderTextColor="#94A3B8"

                        value={requirements}

                        onChangeText={
                            setRequirements
                        }

                        multiline

                        textAlignVertical="top"
                    />

                </View>


                {/* ==================================
                    GENERATE BUTTON
                ================================== */}

                <Pressable
                    onPress={handleGenerate}

                    disabled={loading}

                    style={[
                        styles.generateButton,

                        loading &&
                        styles.disabledButton,
                    ]}
                >

                    <Text
                        style={
                            styles.generateButtonText
                        }
                    >
                        {loading
                            ? "GENERATING..."
                            : "GENERATE PROJECT"}
                    </Text>

                </Pressable>


                {/* ==================================
                    INFORMATION
                ================================== */}

                <Text style={styles.infoText}>
                    AI will use your selected
                    technology, difficulty, project
                    type and requirements to generate
                    a project idea.
                </Text>

            </ScrollView>
        </View>
    );
}


/* ==============================================
   STYLES
============================================== */

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
        marginBottom: 30,
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

    section: {
        marginBottom: 25,
    },

    label: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 12,
    },

    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    option: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 15,
    },

    selectedOption: {
        backgroundColor: "#172554",
        borderColor: "#172554",
    },

    optionText: {
        fontSize: 14,
        color: "#475569",
        fontWeight: "600",
    },

    selectedOptionText: {
        color: "#FFFFFF",
    },

    textInput: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 15,
        minHeight: 140,
        padding: 15,
        fontSize: 14,
        color: "#1E293B",
    },

    generateButton: {
        backgroundColor: "#2563EB",
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 5,
    },

    disabledButton: {
        opacity: 0.6,
    },

    generateButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    infoText: {
        textAlign: "center",
        color: "#64748B",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 15,
        paddingHorizontal: 15,
    },

});