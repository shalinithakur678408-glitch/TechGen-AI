const createProject = ({
  title,
  problemStatement,
  objective,
  description,
  features,
  technologies,
  modules,
  workflow,
  folderStructure,
  futureEnhancements,
  vivaQuestions,
}) => {
  return {
    id: Date.now().toString(),
    title,
    problemStatement,
    objective,
    description,
    features,
    technologies,
    modules,
    workflow,
    folderStructure,
    futureEnhancements,
    vivaQuestions,
    createdAt: new Date().toISOString(),
  };
};

const createProjectRequest = ({
  technology,
  difficulty,
  projectType,
  requirements,
}) => {
  return {
    technology,
    difficulty,
    projectType,
    requirements,
  };
};

export {
  createProject,
  createProjectRequest,
};