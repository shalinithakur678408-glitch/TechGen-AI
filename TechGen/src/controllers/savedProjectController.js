import { createSavedProject } from "../models/savedProjectModel";
const API_URL = "https://techgen-ai.onrender.com";


// ==============================
// SAVE PROJECT
// ==============================

const saveProject = async (project) => {
  try {
    const savedProject = createSavedProject(project);

    const response = await fetch(`${API_URL}/save-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedProject),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save project");
    }

    return {
      ...savedProject,
      id: data.projectId,
    };

  } catch (error) {
    console.log("Save Project Error:", error);
    throw error;
  }
};


// ==============================
// GET SAVED PROJECTS
// ==============================

const getSavedProjects = async () => {
  try {
    const response = await fetch(
      `${API_URL}/saved-projects`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to get saved projects"
      );
    }

    return data.projects || [];

  } catch (error) {
    console.log("Get Saved Projects Error:", error);
    throw error;
  }
};


// ==============================
// DELETE PROJECT
// ==============================

const deleteSavedProject = async (id) => {
  try {
    console.log("Deleting project ID:", id);

    const response = await fetch(
      `${API_URL}/saved-project/${id}`,
      {
        method: "DELETE",
      }
    );

    console.log("Delete response status:", response.status);

    const data = await response.json();

    console.log("Delete response data:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete project"
      );
    }

    return data.projects || [];

  } catch (error) {
    console.log("Delete Project Error:", error);
    throw error;
  }
};

export {
  saveProject,
  getSavedProjects,
  deleteSavedProject,
};