'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
    content: string;
    className?: string;
    inline?: boolean;
}

// this component renders mathematical equations using katex
// it supports both inline and block math formatting
export function MathRenderer({ content, className = '', inline = false }: MathRendererProps) {
    if (!content) return null;

    // Helper to separate text and LaTeX parts
    // Looks for patterns like $...$ or $$...$$
    const renderContent = () => {
        // Regex to split by LaTeX delimiters
        // Matches $$...$$ (block) or $...$ (inline)
        // Note: Logic handles mixed content
        const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

        return parts.map((part, index) => {
            if (part.startsWith('$$') && part.endsWith('$$')) {
                // Block math
                const math = part.slice(2, -2);
                return <BlockMath key={index}>{math}</BlockMath>;
            } else if (part.startsWith('$') && part.endsWith('$')) {
                // Inline math
                const math = part.slice(1, -1);
                return <InlineMath key={index}>{math}</InlineMath>;
            } else {
                // Regular text
                return <span key={index}>{part}</span>;
            }
        });
    };

    return (
        <div className={className}>
            {renderContent()}
        </div>
    );
}
