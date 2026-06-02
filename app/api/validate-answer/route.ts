import { NextRequest, NextResponse } from 'next/server';
import { hf, MODEL_NAME } from '@/lib/huggingface';

// this endpoint validates the user's final answer against the generated solution
// it returns whether the answer is correct and provides a short explanation
export async function POST(req: NextRequest) {
    try {
        const { question, userAnswer } = await req.json();

        if (!question || !userAnswer) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

        const systemPrompt = `You are a math teacher. Check if the answer is correct.
        Problem: "${question.text}"
        Official Answer: "${question.solution || 'Not provided'}"
        Student's Answer: "${userAnswer}"
        
        Rules:
        1. If CORRECT: Return "isCorrect": true. The explanation MUST be short praise (e.g. "Great job!", "Spot on!"). DO NOT ask for further explanation. Suggest moving to the next problem.
        2. If INCORRECT: Return "isCorrect": false. The explanation should be a gentle hint or encouragement to try again. DO NOT reveal the correct answer yet.
        
        Return STRICT JSON:
        {
            "isCorrect": boolean,
            "explanation": "string"
        }`;

        const response = await hf.chatCompletion({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Validate this answer now." }
            ],
            max_tokens: 300
        });

        let text = response.choices[0].message.content || "";
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart !== -1) text = text.substring(jsonStart, jsonEnd + 1);

        return NextResponse.json(JSON.parse(text));

    } catch (error: any) {
        console.error('Validation API Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
