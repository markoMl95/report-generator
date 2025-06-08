# Report Generator App

This project provides a basic React-based report generation interface, featuring a mock AI summarization workflow using OpenAI's API structure.
API key for openAi that was provided didn't work, and if im not mistaken, openAI removed free API keys from usage, so i used the mockup
and tried to improvise json regex matching for it more or less, since i didn't have the real response.
It was done inside openaiService.ts and mutations for openAi calls.
I couldn't add env file, as github prevents pushes with it even tho its not in gitignore, so my openAPI key you already sent on mail,
where tinyMCE api key called VITE_TINYMCE_API_KEY should be equal to "mjej4et2rpkhi69d62s7n3b1vhzt95gq2s68gdrrg2pyptlw", so please create .env file before running.
Initial report list is hardcoded to have only 2 elements, so it could be changed or intialized to empty array if needed.

## 🚀 Getting Started

To start the development server:

```bash
npm install
npm run dev
