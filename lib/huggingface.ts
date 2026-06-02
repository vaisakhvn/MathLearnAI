import { HfInference } from "@huggingface/inference";

// Initialize Hugging Face Client
// Users need to add HUGGINGFACE_API_KEY to .env.local
const apiKey = process.env.HUGGINGFACE_API_KEY;

if (!apiKey) {
    console.warn("Missing HUGGINGFACE_API_KEY. AI features will fail.");
}

// exports the configured hugging face inference client using the api key from env
export const hf = new HfInference(apiKey);

// We use Llama 3 for high-quality reasoning (verified working on free tier)
export const MODEL_NAME = "meta-llama/Meta-Llama-3-8B-Instruct";

export const TUTOR_SYSTEM_INSTRUCTION = `
You are MathLearnAI, an expert, encouraging, and Socratic math tutor for middle and high school students.
Your goal is NOT to give the answer, but to guide the student to find it themselves.

RULES:
1. Analyze the student's input step-by-step.
2. If the step is correct, validate it briefly and ask "What's next?".
3. If the step is incorrect, identify the specific misconception. Do NOT just say "Wrong". Ask a guiding question.
4. Be concise. Chats should be short.
5. Use LaTeX formatting for math where possible (e.g. $x^2$).
6. If the student is stuck, offer a small hint.
`;
