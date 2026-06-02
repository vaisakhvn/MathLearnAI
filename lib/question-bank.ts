export interface BankQuestion {
    id: string;
    title: string;
    text: string;
    hint: string;
    difficulty: 'easy' | 'medium' | 'hard';
    chapterId: string; // approximate matching ID
}

export const QUESTION_BANK: BankQuestion[] = [
    // Class 6: Pattern in Mathematics
    {
        id: 'bank-pattern-1',
        title: 'Number Pattern',
        text: 'Find the next number in the sequence: 2, 5, 8, 11, ...',
        hint: 'Check the difference between consecutive terms.',
        difficulty: 'easy',
        chapterId: 'pattern-mathematics'
    },
    // Class 6: Lines and Angles
    {
        id: 'bank-lines-1',
        title: 'Types of Angles',
        text: 'What type of angle is $120^\\circ$?',
        hint: 'Is it less than 90, exactly 90, or more than 90?',
        difficulty: 'easy',
        chapterId: 'lines-angles'
    },
    // Class 6: Number Play
    {
        id: 'bank-numplay-1',
        title: 'Palindrome Number',
        text: 'Which of these is a palindrome number: 121, 123, 124?',
        hint: 'A palindrome reads the same forwards and backwards.',
        difficulty: 'easy',
        chapterId: 'number-play'
    },
    // Class 6: Prime Time
    {
        id: 'bank-prime-1',
        title: 'Identify Prime',
        text: 'Which of the following numbers is prime: 9, 15, 17, 21?',
        hint: 'A prime number has only two factors: 1 and itself.',
        difficulty: 'easy',
        chapterId: 'prime-time'
    },
    // Class 6: Integers (The Other Side of Zero)
    {
        id: 'bank-int-1',
        title: 'Integer Addition',
        text: 'Calculate: $-5 + 8$',
        hint: 'Start at -5 on the number line and move 8 steps right.',
        difficulty: 'easy',
        chapterId: 'other-side-zero'
    },
    // Class 7 Fallbacks
    {
        id: 'bank-large-num-7',
        title: 'Place Value',
        text: 'Write the number name for: 2,34,56,789 (Indian System).',
        hint: 'Group digits in 3, 2, 2... from right for Indian system.',
        difficulty: 'easy',
        chapterId: 'large-numbers'
    },
    {
        id: 'bank-arith-exp-7',
        title: 'Evaluate Expression',
        text: 'Simplify: $15 - (4 + 3) \\times 2$',
        hint: 'Recall BODMAS rules.',
        difficulty: 'medium',
        chapterId: 'arithmetic-expressions'
    },
    {
        id: 'bank-peek-point-7',
        title: 'Decimal Addition',
        text: 'Add: $12.34 + 5.6$',
        hint: 'Align the decimal points.',
        difficulty: 'easy',
        chapterId: 'peek-beyond-point'
    },
    {
        id: 'bank-letter-num-7',
        title: 'Algebraic Formula',
        text: 'If $n$ is the number of triangles, write the formula for matchsticks if each triangle needs 3 sticks but they share a side (assume 2n+1 pattern).',
        hint: 'Look for the pattern.',
        difficulty: 'hard',
        chapterId: 'expressions-letter-numbers'
    },
    {
        id: 'bank-parallel-7',
        title: 'Transversal Angles',
        text: 'If two parallel lines are cut by a transversal, what is the relationship between alternate interior angles?',
        hint: 'Are they equal or supplementary?',
        difficulty: 'medium',
        chapterId: 'parallel-intersecting'
    },
    {
        id: 'bank-num-play-7',
        title: 'Magic Square',
        text: 'In a magic square, does the sum of rows, columns, and diagonals equate to the same number?',
        hint: 'Yes or No?',
        difficulty: 'easy',
        chapterId: 'number-play'
    },
    {
        id: 'bank-three-lines-7',
        title: 'Triangle Angle Sum',
        text: 'In a triangle, two angles are $60^\\circ$ and $50^\\circ$. Find the third angle.',
        hint: 'The sum of angles in a triangle is 180.',
        difficulty: 'medium',
        chapterId: 'tale-three-lines'
    },
    {
        id: 'bank-frac-7',
        title: 'Fraction Multiplication',
        text: 'Calculate: $\\frac{2}{3} \\times \\frac{4}{5}$',
        hint: 'Multiply numerators and denominators separately.',
        difficulty: 'medium',
        chapterId: 'working-fractions'
    },
    // Class 8 Fallbacks
    {
        id: 'bank-sq-cube-8',
        title: 'Square Estimation',
        text: 'Estimate the square root of 50 to the nearest integer.',
        hint: '7 squared is 49.',
        difficulty: 'easy',
        chapterId: 'square-cube'
    },
    {
        id: 'bank-power-8',
        title: 'Exponent Rules',
        text: 'Simplify: $2^3 \\times 2^{-5}$',
        hint: 'Add the powers when bases are the same.',
        difficulty: 'medium',
        chapterId: 'power-play'
    },
    {
        id: 'bank-story-num-8',
        title: 'Rational Numbers',
        text: 'Find a rational number between 1/2 and 3/4.',
        hint: 'Convert to common denominator or use mean.',
        difficulty: 'easy',
        chapterId: 'story-numbers'
    },
    {
        id: 'bank-quad-8',
        title: 'Quadrilateral Angle',
        text: 'Three angles of a quadrilateral are $50^\\circ, 110^\\circ, 80^\\circ$. Find the fourth angle.',
        hint: 'Sum of angles in a quadrilateral is 360.',
        difficulty: 'easy',
        chapterId: 'quadrilaterals'
    },
    {
        id: 'bank-num-play-8',
        title: 'HCF and LCM',
        text: 'The HCF of two numbers is 5 and their LCM is 60. If one number is 15, find the other.',
        hint: 'Product of numbers = HCF × LCM',
        difficulty: 'medium',
        chapterId: 'number-play'
    },
    {
        id: 'bank-distribute-8',
        title: 'Distributive Property',
        text: 'Solve using distributivity: $7 \\times (10 + 2)$',
        hint: 'Multiply 7 by 10 and 7 by 2 separately.',
        difficulty: 'easy',
        chapterId: 'distribute-multiply'
    },
    {
        id: 'bank-prop-8',
        title: 'Direct Proportion',
        text: 'If 5 pens cost $25, how much do 8 pens cost?',
        hint: 'Find the cost of one pen first.',
        difficulty: 'easy',
        chapterId: 'proportional-reasoning'
    },
    // Linear Equations
    {
        id: 'bank-lin-1',
        title: 'Solve for x',
        text: 'Solve the linear equation for x: $3x - 7 = 14$',
        hint: 'Isolate x by moving constants to the right side.',
        difficulty: 'medium',
        chapterId: 'linear-equations'
    },
    {
        id: 'bank-lin-2',
        title: 'Word Problem',
        text: 'The sum of two consecutive integers is 45. Find the integers.',
        hint: 'Let the integers be x and x+1.',
        difficulty: 'medium',
        chapterId: 'linear-equations'
    },
    // Quadratic Equations
    {
        id: 'bank-quad-1',
        title: 'Roots of Quadratic',
        text: 'Find the roots of the equation: $x^2 - 5x + 6 = 0$',
        hint: 'Factorize the quadratic expression.',
        difficulty: 'medium',
        chapterId: 'quadratic-equations'
    },
    {
        id: 'bank-quad-2',
        title: 'Complete the Square',
        text: 'Solve by completing the square: $x^2 + 6x + 5 = 0$',
        hint: 'Add $(6/2)^2 = 9$ to both sides after moving 5.',
        difficulty: 'hard',
        chapterId: 'quadratic-equations'
    },
    // Trigonometry
    {
        id: 'bank-trig-1',
        title: 'Basic Identity',
        text: 'Prove that $\\sin^2\\theta + \\cos^2\\theta = 1$ using a right triangle.',
        hint: 'Use Pythagoras theorem: $a^2 + b^2 = c^2$.',
        difficulty: 'medium',
        chapterId: 'trigonometry'
    },
    // Polynomials
    {
        id: 'bank-poly-1',
        title: 'Factor Theorem',
        text: 'Find the remainder when $x^3 - 2x^2 + x + 1$ is divided by $x - 1$.',
        hint: 'Substitute x = 1 into the polynomial.',
        difficulty: 'medium',
        chapterId: 'polynomials'
    }
];

// this function retrieves a fallback question from the hardcoded bank if ai generation fails
// it tries to match the chapter name or returns a generic math problem
export function getFallbackQuestion(chapterName: string): BankQuestion {
    const normalize = (s: string) => s.toLowerCase().replace(/ /g, '-');
    const targetId = normalize(chapterName);

    // Filter by chapter (loose match)
    const matches = QUESTION_BANK.filter(q => targetId.includes(q.chapterId) || q.chapterId.includes(targetId));

    if (matches.length > 0) {
        return matches[Math.floor(Math.random() * matches.length)];
    }

    // Generic fallback if no specific match
    return {
        id: 'bank-generic',
        title: 'General Math Problem',
        text: `Solve a challenge related to ${chapterName}: Calculate $15 \\times 12$ mentally.`,
        hint: 'Decompose 12 into 10 + 2.',
        difficulty: 'easy',
        chapterId: 'general'
    };
}
