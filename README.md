# 📝 Smart Readme Generator

Welcome to the **Smart Readme Generator**! This powerful CLI tool effortlessly creates beautifully structured README files by leveraging the OpenAI API. ✨ Perfect for developers and project maintainers who want to enhance their documentation with sophistication and clarity.

---

## 📢 **Versioning**

- **Current Version:** `1.0.6`
- **Deprecated Version:** `<1.0.5` (Please use version `1.0.5` or above)

---

## 🌍 Overview

The **Smart Readme Generator** provides a streamlined approach to generating professional and articulate README files. With just a few prompts, you can create a comprehensive and polished README that clearly communicates your project's purpose and usage. 🎨

---

## 🛠️ Features

- **API-Powered**: Utilizes the OpenAI API for generating high-quality README content.
- **Simplicity**: Fast and easy to use—no steep learning curve!
- **Customizable**: Tailor your README to fit the unique needs of your project.
- **Rich Output**: Generates beautifully formatted text, ready for immediate use.

---

## 📦 Installation Steps

To get started with the Smart Readme Generator, follow these steps:

1. **Install the package globally**:

   ```bash
   npm install -g smart-readme-generator
   ```

2. **Alternatively, you can clone the repository and install dependencies**:

   ```bash
   git clone https://github.com/yourusername/Smart-Readme-Generator.git
   cd smart-readme-generator
   npm install
   ```

**Note**: Ensure you have Node.js installed on your machine.

---

## 🔄 Update Instructions

To update to the latest version globally:

```bash
npm update -g smart-readme-generator
```

---

## 💡 Usage Instructions

To generate your README, follow these steps:

1. **Run the tool**:

   ```bash
   smart-readme-generator
   ```

2. **Make sure to run this command in a directory where your `package.json` is present.**

3. **Provide your OpenAI API key**:

   - You will be prompted to provide your OpenAI API key. You can choose to load it from a `.env` file, a `.env.local` file, or paste it manually.

4. **Answer the prompts**:
   - Follow the prompts to input details about your project. You will also have an option to specify any custom notes, such as preferences for the tone or style of the README (e.g., witty, funny, arrogant, formal). If you are unable to run this command in a directory where package.json is present You can include your tech stack here to get the best result.

Your README will be generated and saved as `README.md` in your current directory. ✨

---

## 🚧 Troubleshooting

If you encounter the following error:

```
file:///C:/Users/Dell/AppData/Roaming/npm/node_modules/smart-readme-generator/node_modules/openai/index.mjs:30
throw new Errors.OpenAIError("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
^
OpenAIError: The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).
```

**Solution/Approach:**

1. **If you have a `.env` file at the root of your project directory** (e.g., `a/v/myproject/.env` or `.env.local`), ensure that it contains your OpenAI API key. Run the command `smart-readme-generator` from the root directory of your project.

2. **If your project has a different structure with subdirectories (e.g., `frontend` or `backend`) and no `.env` file at the root**:
   - Place the `.env` file containing your API key in one of the subdirectories.
   - Use `cd` to change to that directory and run the `smart-readme-generator` command from there.

### Diagram

Here’s a simple diagram to illustrate the structure:

```
myproject/
│
├── .env (contains API key) or
│
├── frontend/
│   └── .env (contains API key) or
│
├── backend/
│   └── .env (contains API key)
│
└── smart-readme-generator (run command from here or subdirectory)
```

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) 📝. Feel free to modify and distribute as per the license terms.

---

## ⚙️ Dependencies

This project relies on several key dependencies:

- **dotenv**: For loading environment variables from a `.env` file. `^16.4.5`
- **inquirer**: For prompting users for input. `^10.2.2`
- **openai**: For interacting with the OpenAI API. `^4.61.0`

---

## 🛠️ Tech Stack

The **Smart Readme Generator** is built using the following technologies:

- **Node.js**: JavaScript runtime for executing the CLI tool.
- **npm**: Package manager for managing dependencies.
- **OpenAI API**: For generating README content.
- **inquirer**: For handling command-line prompts.
- **dotenv**: For managing environment variables.

---

## 📖 Additional Notes

Good documentation is crucial for successful projects. The **Smart Readme Generator** saves you time while ensuring your documentation is engaging and informative. Emphasizing clarity, structure, and beauty, your README will make a lasting impression! 🌟

---

Do you have any questions or suggestions? Feel free to reach out or contribute to the project! Together, let’s make README creation as enjoyable as the projects we build! 💌

Happy coding! 🎉
