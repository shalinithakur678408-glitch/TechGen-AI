const createVivaRequest = ({
  technology,
  projectTitle,
  level,
}) => {
  return {
    technology,
    projectTitle,
    level,
  };
};

const createVivaResult = ({
  technology,
  projectTitle,
  level,
  result,
}) => {
  return {
    id: Date.now().toString(),
    technology,
    projectTitle,
    level,
    result,
    createdAt: new Date().toISOString(),
  };
};

export {
  createVivaRequest,
  createVivaResult,
};