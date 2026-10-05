import {
  createTechnologyRequest,
  createTechnologyLesson,
} from "../models/technologyModel";

import {
  generateTechnologyWithAI,
} from "../services/aiService";

const learnTechnology = async ({
  technology,
  topic,
  level,
}) => {
  const technologyRequest =
    createTechnologyRequest({
      technology,
      topic,
      level,
    });

  const aiResponse =
    await generateTechnologyWithAI(
      technologyRequest
    );

  const lesson = createTechnologyLesson({
    technology,
    topic,
    level,
    result: aiResponse.result,
  });

  return lesson;
};

export {
  learnTechnology,
};