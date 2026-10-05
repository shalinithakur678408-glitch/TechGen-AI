const isRequired = (value) => {
  return value !== undefined &&
    value !== null &&
    String(value).trim() !== "";
};

const validateProjectRequest = ({
  technology,
  difficulty,
  projectType,
  requirements,
}) => {
  if (!isRequired(technology)) {
    return {
      valid: false,
      message: "Please select a technology.",
    };
  }

  if (!isRequired(difficulty)) {
    return {
      valid: false,
      message: "Please select difficulty level.",
    };
  }

  if (!isRequired(projectType)) {
    return {
      valid: false,
      message: "Please select project type.",
    };
  }

  if (!isRequired(requirements)) {
    return {
      valid: false,
      message: "Please enter project requirements.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};

const validateTechnologyRequest = ({
  technology,
  topic,
  level,
}) => {
  if (!isRequired(technology)) {
    return {
      valid: false,
      message: "Please select a technology.",
    };
  }

  if (!isRequired(topic)) {
    return {
      valid: false,
      message: "Please enter a topic.",
    };
  }

  if (!isRequired(level)) {
    return {
      valid: false,
      message: "Please select a learning level.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};

const validateVivaRequest = ({
  technology,
  projectTitle,
  level,
}) => {
  if (!isRequired(technology)) {
    return {
      valid: false,
      message: "Please select a technology.",
    };
  }

  if (!isRequired(projectTitle)) {
    return {
      valid: false,
      message: "Please enter project title.",
    };
  }

  if (!isRequired(level)) {
    return {
      valid: false,
      message: "Please select a viva level.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};

export {
  isRequired,
  validateProjectRequest,
  validateTechnologyRequest,
  validateVivaRequest,
};