import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure API key is present
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY environment variable. AI features will not work.");
}

// Use a model capable of reasoning suitable for tutoring
// this function initializes the google generative ai client with the api key
// and returns a model instance configured for tutoring
export const getGeminiModel = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Missing GEMINI_API_KEY in getGeminiModel");
        throw new Error("API Key missing");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
        model: "gemini-2.5-flash-live",
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
        }
    });
};

export const TUTOR_SYSTEM_INSTRUCTION = `
You are MathLearnAI, an expert, encouraging, and Socratic math tutor for middle and high school students.
Your goal is NOT to give the answer, but to guide the student to find it themselves.

RULES:
1. Analyze the student's input step-by-step.
2. If the step is correct, validate it briefly and ask "What's next?".
3. If the step is incorrect, identify the specific misconception. Do NOT just say "Wrong". Ask a guiding question like "Check the sign of 5x when you moved it."
4. Be concise. Chats should be short, like a real text conversation.
5. Use LaTeX formatting for math where possible (e.g. $x^2$).
6. If the student is stuck, offer a small hint.
`;
