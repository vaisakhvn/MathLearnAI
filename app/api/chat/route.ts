import { NextRequest, NextResponse } from 'next/server';
import { hf, MODEL_NAME, TUTOR_SYSTEM_INSTRUCTION } from '@/lib/huggingface';

// this api route handles the main chat interaction with the hugging face model
// it manages different hint policies based on the user's needs
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages, problemContext, hintLevel = 'meta' } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
        }

        // --- HINT POLICY ENGINE ---
        const POLICY_INSTRUCTIONS = {
            'meta': `CURRENT HINT POLICY: META-COGNITIVE ONLY.
            - Do NOT give math hints yet.
            - Ask reflection questions: "What is your goal?", "What concept applies here?", "Check your last step."
            - If they ask for the answer, REFUSE and ask them to define the problem first.`,

            'directional': `CURRENT HINT POLICY: DIRECTIONAL.
            - Point them to the right concept or formula.
            - Example: "Try using the quadratic formula," or "Think about how slope relates to the derivative."
            - Do NOT solve the step for them.`,

            'structural': `CURRENT HINT POLICY: STRUCTURAL.
            - You can set up the equation structure for them.
            - Example: "The equation should look like $ax^2 + bx + c = 0$. What is $a$ here?"
            - Still do NOT give the final answer.`,

            'solution': `CURRENT HINT POLICY: SOLUTION (Last Resort).
            - You may guide them through the final solution step-by-step.
            - Explain the "Why" behind the solution.`
        };

        const activePolicy = POLICY_INSTRUCTIONS[hintLevel as keyof typeof POLICY_INSTRUCTIONS] || POLICY_INSTRUCTIONS['meta'];

        // Construct messages for chatCompletion with role mapping
        const mappedMessages = messages.map((m: any) => ({
            role: m.role === 'ai' || m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content
        }));

        const chatMessages = [
            {
                role: "system", content: `${TUTOR_SYSTEM_INSTRUCTION}
            
            \n\nCONTEXT: ${problemContext || "General Math Help"}
            
            \n\n*** ADAPTIVE HINT MODE ACTIVE ***
            ${activePolicy}
            
            \n\nIMPORTANT IDENTITY RULE: You are "MathLearnAI", an intelligent math tutor created by Vaisakh V Namboothiri. IF ASKED "Who are you?" or "What model are you?", YOU MUST SAY "I am MathLearnAI." NEVER mention Llama, Meta, Hugging Face, or being an AI language model.` },
            ...mappedMessages
        ];

        console.log("Sending chat to Hugging Face (Chat)... Level:", hintLevel);
        const response = await hf.chatCompletion({
            model: MODEL_NAME,
            messages: chatMessages,
            max_tokens: 500,
            temperature: 0.7
        });

        return NextResponse.json({
            role: 'ai',
            content: response.choices[0].message.content?.trim()
        });

    } catch (error: any) {
        console.error('HF Chat API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request', details: error.message },
            { status: 500 }
        );
    }
}
