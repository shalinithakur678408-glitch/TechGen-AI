const SAVED_PROJECTS_KEY = "techgen_saved_projects";

const createSavedProject = (project) => {
  return {
    // Generate a unique ID
    id:
      project.id ||
      `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,

    title: project.title || "Untitled Project",

    problemStatement:
      project.problemStatement || "",

    objective:
      project.objective || "",

    description:
      project.description || "",

    features:
      project.features || [],

    technologies:
      project.technologies || [],

    modules:
      project.modules || [],

    workflow:
      project.workflow || [],

    folderStructure:
      project.folderStructure || "",

    futureEnhancements:
      project.futureEnhancements || [],

    vivaQuestions:
      project.vivaQuestions || [],

    createdAt:
      project.createdAt ||
      new Date().toISOString(),
  };
};

export {
  SAVED_PROJECTS_KEY,
  createSavedProject,
};