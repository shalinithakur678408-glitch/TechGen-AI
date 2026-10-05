import {
  createVivaRequest,
  createVivaResult,
} from "../models/vivaModel";

import {
  generateVivaWithAI,
} from "../services/aiService";

const prepareViva = async ({
  technology,
  projectTitle,
  level,
}) => {
  const vivaRequest = createVivaRequest({
    technology,
    projectTitle,
    level,
  });

  const aiResponse = await generateVivaWithAI(
    vivaRequest
  );

  const vivaResult = createVivaResult({
    technology,
    projectTitle,
    level,
    result: aiResponse.result,
  });

  return vivaResult;
};

export {
  prepareViva,
};