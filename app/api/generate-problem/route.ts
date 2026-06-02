import { NextRequest, NextResponse } from 'next/server';
import { hf, MODEL_NAME } from '@/lib/huggingface';

// this route generates new practice problems using the hugging face api
// it enforces constraints to keep problems within the specified syllabus and difficulty
export async function POST(req: NextRequest) {
    try {
        console.log("Generative Problem API called (HF)");
        const body = await req.json();
        const { board, grade, chapter, difficulty } = body;

        if (!board || !grade || !chapter) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const difficultyLevel = difficulty || "medium-to-hard";

        const systemPrompt = `You are a strict curriculum expert for the ${board} board, Class ${grade}.
        Generate a ${difficultyLevel} difficulty practice problem strictly for the chapter "${chapter}".
        
        CRITICAL RULES:
        1. SYLLABUS CHECK: Ensure the concept is ACTUALLY in the ${board} Class ${grade} syllabus for "${chapter}". 
        2. NO OUT-OF-BOUNDS: Do NOT ask questions from higher grades. Do NOT include deleted topics.
        3. TEXTBOOK STYLE: Create a question that resembles standard textbook problems (like NCERT, RD Sharma, or RS Aggarwal).
        4. "SEARCH" SIMULATION: Simulate searching for an authentic, exam-style question for this specific class/chapter.
        5. COMPLEXITY MATCH: Ensure the difficulty is appropriate. "Hard" means challenging for a ${grade}th grader, not university level.

        Constraints:
        1. Return strictly valid JSON. NO markdown, NO text outside JSON.
        2. Schema:
        {
            "title": "Short title",
            "text": "Problem text with LaTeX math (e.g. $x^2$)",
            "hint": "Small hint",
            "solution": "Final answer",
            "steps": ["Step 1", "Step 2"]
        }`;

        console.log("Sending prompt to Hugging Face (Chat)...");
        const response = await hf.chatCompletion({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Generate the problem now in JSON format." }
            ],
            max_tokens: 1000,
            temperature: 0.7
        });

        console.log("Received response from HF");
        let text = response.choices[0].message.content || "";

        // Clean markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Find the first '{' and last '}' to extract JSON
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');

        if (jsonStart !== -1 && jsonEnd !== -1) {
            text = text.substring(jsonStart, jsonEnd + 1);
        }

        const problemData = JSON.parse(text);
        return NextResponse.json(problemData);

    } catch (error: any) {
        console.error('Problem Generation API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate problem', details: error.message },
            { status: 500 }
        );
    }
}
