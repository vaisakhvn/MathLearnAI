import { NextRequest, NextResponse } from 'next/server';
import { hf, MODEL_NAME } from '@/lib/huggingface';

const VALIDATOR_SYSTEM_PROMPT = `
You are a strict Logic Check Engine for a Step-by-Step Math Tutor.
Your job is to validate ONE step of reasoning at a time.

INPUTS:
1. Problem Statement
2. Previous Valid Steps (Context)
3. New Step to Check (User Input)

RULES:
1. Determine if the "New Step" is LOGICALLY VALID given the "Previous Steps".
2. It must follow mathematically.
3. It must not be a huge leap (like jumping to the answer immediately), unless the problem is trivial.
4. If VALID: return 'VALID' and a short encouraging remark.
5. If INVALID: return 'INVALID' and explain SPECIFICALLY why (e.g., "Sign error in moving 5x" or "You cannot assume X yet").
6. Assume "Previous Steps" are already correct. Only check the connection to the New Step.

RESPONSE FORMAT (JSON ONLY):
{
    "isValid": boolean,
    "feedback": "string explaining why"
}
`;

// this route validates a single step of the user's solution
// it checks if the logic follows mathematically from the previous steps
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { problem, previousSteps, currentStep } = body;

        if (!problem || !currentStep) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const messages = [
            { role: "system", content: VALIDATOR_SYSTEM_PROMPT },
            {
                role: "user", content: `
PROBLEM: ${problem}

PREVIOUS STEPS:
${previousSteps.map((s: string, i: number) => `Step ${i + 1}: ${s}`).join('\n') || "(None)"}

NEW STEP SUBMITTED:
${currentStep}
` }
        ];

        console.log("Validating Step...", { currentStep });

        const response = await hf.chatCompletion({
            model: MODEL_NAME,
            messages: messages,
            max_tokens: 200, // Short response needed
            temperature: 0.2 // Low temperature for strict logic
        });

        const content = response.choices[0].message.content?.trim();

        // Parsing the JSON response from the LLM
        // We instruct it to return JSON, but we need to arguably parse it safely
        // Llama 3 is usually good at following JSON instructions if prompted well, 
        // but we might need to regex search for the JSON block if it creates conversational noise.

        let result;
        try {
            // refined regex to find JSON object
            const jsonMatch = content?.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("No JSON found");
            }
        } catch (e) {
            console.error("Failed to parse validator response:", content);
            // Fallback if model fails to output JSON
            result = {
                isValid: false,
                feedback: "I couldn't verify that step. Can you rephrase it?"
            };
        }

        return NextResponse.json(result);

    } catch (error: any) {
        console.error('Step Validator Error:', error);
        return NextResponse.json(
            { error: 'Validation failed', details: error.message },
            { status: 500 }
        );
    }
}
