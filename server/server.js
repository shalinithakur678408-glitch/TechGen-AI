const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");
const db = require("./firebase");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ==============================
// GEMINI AI
// ==============================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL_NAME =
  process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

// ==============================
// HOME ROUTE
// ==============================

app.get("/", (req, res) => {
  res.json({
    message: "TechGen AI Server is running",
  });
});

// ==============================
// TEST FIREBASE
// ==============================

app.get("/test-firebase", async (req, res) => {
  try {
    await db.collection("test").add({
      message: "Firebase is working!",
      createdAt: new Date(),
    });

    res.json({
      success: true,
      message: "Firebase connected and data saved successfully!",
    });
  } catch (error) {
    console.log("Firebase Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==============================
// SAVE PROJECT TO FIRESTORE
// ==============================

app.post("/save-project", async (req, res) => {
  try {
    const project = req.body;

    // Create Firestore document first
    const docRef = db.collection("savedProjects").doc();

    // Save project using Firestore document ID
    await docRef.set({
      ...project,
      id: docRef.id,
      createdAt: new Date(),
    });

    res.json({
      success: true,
      projectId: docRef.id,
      message: "Project saved successfully!",
    });

  } catch (error) {
    console.log("Save Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save project",
      error: error.message,
    });
  }
});

// ==============================
// GET SAVED PROJECTS
// ==============================

app.get("/saved-projects", async (req, res) => {
  try {
    const snapshot = await db
      .collection("savedProjects")
      .orderBy("createdAt", "desc")
      .get();

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      projects,
    });

  } catch (error) {
    console.log("Get Saved Projects Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get saved projects",
      error: error.message,
    });
  }
});

// ==============================
// DELETE SAVED PROJECT
// ==============================


app.delete("/saved-project/:id", async (req, res) => {
  try {
    const projectId = req.params.id;

    console.log("Delete requested ID:", projectId);

    // First: try Firestore document ID
    const docRef = db
      .collection("savedProjects")
      .doc(projectId);

    const docSnapshot = await docRef.get();

    let documentToDelete = null;

    // New projects
    if (docSnapshot.exists) {
      documentToDelete = docRef;

      console.log("Found project by Firestore document ID");
    }
    // Old projects
    else {
      console.log(
        "Not found by document ID. Searching old project ID..."
      );

      const snapshot = await db
        .collection("savedProjects")
        .where("id", "==", projectId)
        .get();

      if (!snapshot.empty) {
        documentToDelete = snapshot.docs[0].ref;

        console.log(
          "Found old project by stored project ID"
        );
      }
    }

    // Project not found anywhere
    if (!documentToDelete) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Delete project
    await documentToDelete.delete();

    console.log("Project deleted successfully");

    // Get remaining projects
    const remainingSnapshot = await db
      .collection("savedProjects")
      .orderBy("createdAt", "desc")
      .get();

    const projects = remainingSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      message: "Project deleted successfully!",
      projects,
    });

  } catch (error) {
    console.log("Delete Project Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
});

// ==============================
// GENERATE PROJECT
// ==============================

app.post("/generate-project", async (req, res) => {
  try {
    const {
      technology,
      difficulty,
      projectType,
      requirements,
    } = req.body;

    const prompt = `
You are an AI assistant for BCA students.

Generate a practical BCA project based on the following requirements.

Technology: ${technology}
Difficulty: ${difficulty}
Project Type: ${projectType}
Requirements: ${requirements}

Give the response in exactly this structure:

Project Title:
Problem Statement:
Objective:
Project Description:
Features:
Technologies:
Modules:
Project Workflow:
Folder Structure:
Future Enhancements:
Viva Questions:

For Viva Questions, give 5 useful viva questions with short answers.

Keep the project practical, beginner-friendly, and suitable for a BCA student.
`;

    const response = await ai.interactions.create({
      model: MODEL_NAME,
      input: prompt,
    });

    res.json({
      success: true,
      result: response.output_text,
    });

  } catch (error) {
    console.log("Gemini Project Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "Daily AI limit reached. Please try again later.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to generate project",
    });
  }
});

// ==============================
// LEARN TECHNOLOGY
// ==============================

app.post("/learn-technology", async (req, res) => {
  try {
    const {
      technology,
      topic,
      level,
    } = req.body;

    const prompt = `
You are an AI technology teacher for BCA students.

Teach the following technology topic in simple and beginner-friendly language.

Technology: ${technology}
Topic: ${topic}
Level: ${level}

Give the response in exactly this structure:

Topic:
Introduction:
What is it?
Why is it used?
How does it work?
Important Concepts:
Simple Example:
Practical Example:
Advantages:
Common Mistakes:
Interview Questions:
Summary:

Use simple English and explain concepts clearly.
Include practical examples where useful.
`;

    const response = await ai.interactions.create({
      model: MODEL_NAME,
      input: prompt,
    });

    res.json({
      success: true,
      result: response.output_text,
    });

  } catch (error) {
    console.log("Gemini Technology Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "Daily AI limit reached. Please try again later.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate technology lesson",
    });
  }
});

// ==============================
// GENERATE VIVA
// ==============================

app.post("/generate-viva", async (req, res) => {
  try {
    const {
      technology,
      projectTitle,
      level,
    } = req.body;

    const prompt = `
You are an AI viva preparation assistant for BCA students.

Generate useful viva questions and short, easy-to-understand answers for the following project.

Technology: ${technology}
Project Title: ${projectTitle}
Student Level: ${level}

Give the response in exactly this structure:

Project:
Technology:
Introduction:

Basic Questions:
1. Question
Answer:

2. Question
Answer:

3. Question
Answer:

Technical Questions:
1. Question
Answer:

2. Question
Answer:

3. Question
Answer:

Project Questions:
1. Question
Answer:

2. Question
Answer:

3. Question
Answer:

Important Viva Tips:
- Give short and clear tips for answering viva questions.

Generate practical questions that a BCA student may actually face during project viva.

Keep the answers simple and easy to remember.
`;

    const response = await ai.interactions.create({
      model: MODEL_NAME,
      input: prompt,
    });

    res.json({
      success: true,
      result: response.output_text,
    });

  } catch (error) {
    console.log("Gemini Viva Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "Daily AI limit reached. Please try again later.",
      });
    }

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate viva questions",
    });
  }
});

// ==============================
// SERVER
// ==============================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});