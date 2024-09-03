# Next.js + Azure OpenAI + Whisper AI Project

This project is a web application built using Next.js, Typescript with Azure OpenAI and Whisper AI integration. It features speech recognition and synthesis functionalities. The application is styled using Tailwind CSS and deployed on Vercel.

## Features

- **Speech Recognition**: Uses Whisper AI to transcribe audio.
- **Chat Interaction**: Integrates Azure OpenAI for generating responses based on transcriptions.
- **Voice Synthesis**: Allows text-to-speech with customizable voice settings.
- **Modern Styling**: Utilizes Tailwind CSS for a responsive and modern UI.
- **Deployment**: Hosted on Vercel for easy deployment and scalability.

## Getting Started

### Prerequisites

- Node.js (version 18 or later recommended)
- Azure subscription with access to OpenAI and Whisper AI services
- Vercel account for deployment

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Abhishek-Bharti1/whisper-ai-assistant.git
   cd your-repository

2. **Install dependencies**

   ```bash
   npm install

3. **Setup env**

   - Create a .env.local file in the root of your project and add the following environment variables:
     AZURE_API_KEY=your_azure_api_key
     AZURE_API_ENDPOINT=https://your_endpoint
     AZURE_DEPLOYMENT_NAME=your_deployment_name
     AZURE_DEPLOYMENT_COMPLETIONS_NAME=your_completions_deployment_name

4. **Run the Development Server**

   ```bash
   npm run dev
- Open http://localhost:3000 in your browser to view the application.

## Built With
- **Next.js** - React framework for server-side rendering and static site generation.
- **Azure OpenAI** - Provides AI capabilities.
- **Whisper AI** - For speech recognition and transcription.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Vercel** - Hosting platform for deploying Next.js applications.
