const generateProjectWithAI = async ({
  technology,
  difficulty,
  projectType,
  requirements,
}) => {
  try {
    const response = await fetch(
      "http://localhost:5000/generate-project",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technology,
          difficulty,
          projectType,
          requirements,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to generate project"
      );
    }

    return data;
  } catch (error) {
    console.log("AI Service Error:", error);
    throw error;
  }
};


const generateTechnologyWithAI = async ({
  technology,
  topic,
  level,
}) => {
  try {
    const response = await fetch(
      "http://localhost:5000/learn-technology",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technology,
          topic,
          level,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to learn technology"
      );
    }

    return data;
  } catch (error) {
    console.log(
      "Technology AI Service Error:",
      error
    );

    throw error;
  }
};


const generateVivaWithAI = async ({
  technology,
  projectTitle,
  level,
}) => {
  try {
    const response = await fetch(
      "http://localhost:5000/generate-viva",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technology,
          projectTitle,
          level,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to generate viva"
      );
    }

    return data;
  } catch (error) {
    console.log(
      "Viva AI Service Error:",
      error
    );

    throw error;
  }
};


export {
  generateProjectWithAI,
  generateTechnologyWithAI,
  generateVivaWithAI,
};