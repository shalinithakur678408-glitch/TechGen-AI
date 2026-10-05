const createTechnologyRequest = ({
  technology,
  topic,
  level,
}) => {
  return {
    technology,
    topic,
    level,
  };
};

const createTechnologyLesson = ({
  technology,
  topic,
  level,
  result,
}) => {
  return {
    id: Date.now().toString(),
    technology,
    topic,
    level,
    result,
    createdAt: new Date().toISOString(),
  };
};

export {
  createTechnologyRequest,
  createTechnologyLesson,
};