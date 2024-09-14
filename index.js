import inquirer from "inquirer";
import fs from "fs";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
const envFilePath = fs.existsSync(path.join(process.cwd(), ".env.local"))
  ? ".env.local"
  : ".env";

// Load environment variables from the determined file
dotenv.config({ path: envFilePath });

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to ask for the API key source (environment file or manual input)
const apiKeyQuestions = [
  {
    type: "list",
    name: "envOption",
    message: "How would you like to provide the OpenAI API key?",
    choices: [
      "Use .env file (recommended)",
      "Use .env.local file",
      "Paste the API key manually (not recommended)",
    ],
  },
];

// Add the option to select the OpenAI model
const modelQuestion = [
  {
    type: "list",
    name: "model",
    message:
      "Which OpenAI model do you want to use for generating the README? (Note: Mini is cheaper, 40 is more expensive but provides better output)",
    choices: [
      { name: "gpt-4o-mini (Cheaper)", value: "gpt-4o-mini" },
      { name: "gpt-4o (Better Output)", value: "gpt-4o" },
    ],
  },
];

// Main questions for README generation
const questions = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
  },
  {
    type: "input",
    name: "description",
    message:
      "Describe your project (Tip: The more detailed your description, the better your README will be):",
  },
  {
    type: "input",
    name: "installation",
    message:
      "What are the installation steps? (Skipping this might lead to a 20% chance of inaccuracies)",
    default: "",
  },
  {
    type: "input",
    name: "usage",
    message:
      "How do you use the project? (Skipping this might lead to a 20% chance of inaccuracies)",
    default: "",
  },
  {
    type: "list",
    name: "license",
    message: "Which license does your project use?",
    choices: ["MIT", "GPLv3", "Apache License 2.0", "BSD 3-Clause", "None"],
  },
  {
    type: "confirm",
    name: "emojis",
    message: "Do you want to include emojis in your README?",
    default: true,
  },
  {
    type: "input",
    name: "customNotes",
    message:
      "Any specific preferences for the tone or style of the README? (e.g., witty, funny, arrogant, formal) [optional]",
    default: "",
  },
];

// Function to get the OpenAI response
async function getGPTResponse(prompt, model) {
  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "system", content: prompt }],
    max_tokens: 1500,
  });
  return completion.choices[0].message.content;
}

// Function to generate README content based on user input and package.json
async function generateReadme(answers, model) {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  let packageJsonContent = "";

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = fs.readFileSync(packageJsonPath, "utf-8");
    packageJsonContent = `Here is the content of package.json for reference:\n${packageJson}\n`;
  }

  const prompt = `
    Create the most beautiful, articulate, and detailed README.md you can imagine.
    Use this information to guide you:

    Project name: ${answers.projectName}
    Description: ${answers.description}
    Installation steps: ${answers.installation || "N/A"}
    Usage instructions: ${answers.usage || "N/A"}
    License: ${answers.license}
    ${answers.emojis ? "Include emojis in each section." : "No emojis needed."}
    Additional Notes: ${answers.customNotes || "None"}

    ${packageJsonContent}

    Use the package.json as a reference to enhance the quality and technical accuracy of the README.
    Make sure the README is professional, clear, and has a stunning structure, with sections for installation, usage, and any relevant notes about dependencies, project architecture, and any additional features.
  `;

  // Check how user wants to load API key (from env or manually)
  const apiKeySource = await inquirer.prompt(apiKeyQuestions);

  let apiKey;
  if (apiKeySource.envOption === "Use .env file (recommended)") {
    dotenv.config({ path: ".env" }); // Automatically load .env
    apiKey = process.env.OPENAI_API_KEY;
  } else if (apiKeySource.envOption === "Use .env.local file") {
    dotenv.config({ path: ".env.local" }); // Automatically load .env.local
    apiKey = process.env.OPENAI_API_KEY;
  } else {
    const apiKeyManual = await inquirer.prompt({
      type: "input",
      name: "apiKey",
      message: "Paste your OpenAI API key:",
    });
    apiKey = apiKeyManual.apiKey;
  }

  // Handle missing API key scenario
  if (!apiKey) {
    console.log(
      "API key not found. Please make sure it is provided correctly."
    );
    process.exit(1);
  }

  // Set the API key for OpenAI instance
  openai.apiKey = apiKey;

  const readmeContent = await getGPTResponse(prompt, model);
  return readmeContent;
}

// Function to write the generated content to README.md
function createReadme(content) {
  fs.writeFileSync("README.md", content);
  console.log("README.md has been generated successfully!");
}

// Main CLI interaction
inquirer.prompt(questions).then(async (answers) => {
  // Ask the user to select the model
  const modelAnswer = await inquirer.prompt(modelQuestion);

  // Generate the README based on the selected model and user answers
  const readmeContent = await generateReadme(answers, modelAnswer.model);
  createReadme(readmeContent);
});
