import {
  createProjectRequest,
} from "../models/projectModel";

import {
  generateProjectWithAI,
} from "../services/aiService";

const generateProject = async ({
  technology,
  difficulty,
  projectType,
  requirements,
}) => {
  // Create project request
  const projectRequest = createProjectRequest({
    technology,
    difficulty,
    projectType,
    requirements,
  });

  // Call AI service
  const aiResponse = await generateProjectWithAI(projectRequest);

  console.log("AI Response:", aiResponse);

  // Return AI response
  return aiResponse;
};

export {
  generateProject,
};