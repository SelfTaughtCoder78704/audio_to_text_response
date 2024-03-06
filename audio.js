import 'dotenv/config'
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';



async function processAudioAndRespond() {
  // Load and transcribe audio file
  const filePath = 'question.mp3'; // Update the file path
  const loader = new OpenAIWhisperAudio(filePath);
  const docs = await loader.load();
  console.log('Transcribed Text:', docs);

  // Assuming `docs` is an array of Document objects, extract the text from the first Document
  const transcribedText = docs[0].pageContent;
  console.log('Extracted Text:', transcribedText);

  // Initialize ChatOpenAI with your API key
  const model = new ChatOpenAI({
    temperature: 0.5,
    openAIApiKey: process.env.OPENAI_API_KEY, // Ensure OPENAI_API_KEY is set in your .env
  });

  // Use the extracted text as input for the AI model
  const response = await model.invoke([new HumanMessage(transcribedText)]);
  console.log('AI Response:', response.lc_kwargs.content);
}

// Call the function to start processing
processAudioAndRespond().catch(console.error);

