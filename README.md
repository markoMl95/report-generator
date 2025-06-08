# Report Generator App

This project provides a basic React-based report generation interface, featuring a mock AI summarization workflow using OpenAI's API structure.
API key for openAi that was provided didn't work, and if im not mistaken, openAI removed free API keys from usage, so i used the mockup
and tried to improvise json regex matching for it more or less, since i didn't have the real response.
It was done inside openaiService.ts and mutations for openAi calls.
Env file wasn't added to gitignore, so you can also have my api key for tinyMCE.
Initial report list is hardcoded to have only 2 elements, so it could be changed or intialized to empty array if needed.

## 🚀 Getting Started

To start the development server:

```bash
npm install
npm run dev
