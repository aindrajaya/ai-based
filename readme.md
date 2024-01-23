# AI For Developers

Welcome to my AI For Developers! This project documents my journey as I explore and test AI for the first time.

## Overview

This repository serves as a beginner's guide to working with AI, showcasing my initial steps, experiments, and findings. Whether you're a fellow beginner or someone curious about the AI testing process, this project aims to provide insights into the world of artificial intelligence.

## Key Points

- **Installation**: Find instructions on setting up the necessary tools and dependencies for AI experimentation in JavaScritp environment.

- **Usage**: Explore simple examples and code snippets that demonstrate basic AI functionalities.

- **File Structure**: Understand the organization of files and directories within the project.

- **Features**: Discover the initial features or experiments I've implemented as part of my AI testing journey.

- **Dependencies**: Learn about the external libraries and frameworks used in this project.

- **Contributing**: If you're also a beginner or have tips to share, feel free to contribute by following the guidelines outlined in the project.

- **License**: Review the license under which this project is distributed.

## Let's Get Started!

Follow along with my experiences and experiments as I delve into the exciting realm of AI testing. Happy coding!

## Installation

This section will explain how to install the necessary dependencies or tools to run this AI project.
```bash
$ npm init -y
$ npm install
```

## File Structure

This section will explain on file structure that I used for this project.
```lua
project-root/
|-- node_modules
|-- .env.example / .env
|-- .prettier
|-- chat.js
|-- index.js
|-- openai.js
|-- package-lock.json
|-- package.json
|-- readme.md
|-- search.js
|-- ...
```

## Features
This section will explain about the function of each file:
1. `index.js`: This file is the first example to use OpenAI library
2. `openai.js`: This file only has the configuration to input OpenAI API Key
3. `chat.js`: This file basically has the function ChatGPT look like but it only has Terminal UX, you also can do prompt engineer to make specific response about the topics that you need to command your AI (ex. You can command your AI to focus on a specific topics such as Education, Agriculture, etc)
4. `search.js`: This file has more advanced feature, in this file you can find the basic semantic search that sometimes used by AI. It also has the `langchain` library that has feature to make integration with LLMs in JavaScript (Usually the Python version is more ahead feature than JavaScript, you can consider Python as the first reference in the world of AI).

## Dependencies
List all external libraries, frameworks, or tools this project depends on, with version numbers.
- [Langchain](https://www.npmjs.com/package/langchain)
- [Langchain/openai](https://www.npmjs.com/package/@langchain/openai)
- [Openai](https://www.npmjs.com/package/openai)
- [dotenv](https://www.npmjs.com/package/dotenv)
