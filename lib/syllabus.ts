export type Board = 'CBSE' | 'ICSE' | 'IB';
export type Grade = '6' | '7' | '8' | '9' | '10' | '11' | '12';

export interface Chapter {
    id: string;
    title: string;
    description: string;
    topics: string[];
}

export interface SyllabusConfig {
    [board: string]: {
        [grade: string]: Chapter[];
    };
}

// this constant holds the complete syllabus structure for different boards and grades
// it maps topics to specific chapters to help organize the learning path
export const SYLLABUS_DATA: SyllabusConfig = {
    CBSE: {
        '6': [
            { id: 'pattern-mathematics', title: 'Pattern in Mathematics', description: 'Patterns in numbers, sequences, and shapes.', topics: ['Sequences', 'Visualising'] },
            { id: 'lines-angles-6', title: 'Lines and Angles', description: 'Points, line segments, rays, angle types.', topics: ['Measurement', 'Drawing'] },
            { id: 'number-play', title: 'Number Play', description: 'Palindromes, mental math, estimation, Collatz Conjecture.', topics: ['Estimation', 'Games'] },
            { id: 'data-handling', title: 'Data Handling and Presentation', description: 'Auditing data, pictographs, bar graphs.', topics: ['Collection', 'Presentation'] },
            { id: 'prime-time', title: 'Prime Time', description: 'Factors, multiples, primes, co-primes.', topics: ['Factorization', 'Divisibility'] },
            { id: 'perimeter-area', title: 'Perimeter and Area', description: 'Perimeter and area of rectangles, squares, triangles.', topics: ['Mensuration', 'Formulas'] },
            { id: 'fractions-6', title: 'Fractions', description: 'Fractional units, equivalents, comparisons.', topics: ['Mixed Fractions', 'Operations'] },
            { id: 'play-construction', title: 'Play with Construction', description: 'Constructing squares, rectangles, diagonals.', topics: ['Geometry', 'Tools'] },
            { id: 'symmetry', title: 'Symmetry', description: 'Line and rotational symmetry.', topics: ['Reflections', 'Rotation'] },
            { id: 'other-side-zero', title: 'The Other Side of Zero', description: 'Integers, negative numbers, number line.', topics: ['Integers', 'Number Line'] },
        ],
        '7': [
            { id: 'large-numbers', title: 'Large Numbers Around Us', description: 'Place value, lakhs vs crores, patterns in products.', topics: ['Estimation', 'Place Value'] },
            { id: 'arithmetic-expressions', title: 'Arithmetic Expressions', description: 'Forming expressions, brackets, simplification.', topics: ['BODMAS', 'Terms'] },
            { id: 'peek-beyond-point', title: 'A Peek Beyond the Point', description: 'Decimals, place value, operations, measurements.', topics: ['Decimals', 'Operations'] },
            { id: 'expressions-letter-numbers', title: 'Expressions Using Letter Numbers', description: 'Algebraic expressions, formulas, matchstick patterns.', topics: ['Algebra', 'Formulas'] },
            { id: 'parallel-intersecting', title: 'Parallel and Intersecting Lines', description: 'Perpendicular/parallel lines, transversals, angles.', topics: ['Transversals', 'Angles'] },
            { id: 'number-play-7', title: 'Number Play', description: 'Parity, magic squares, Fibonacci, divisibility.', topics: ['Patterns', 'Divisibility'] },
            { id: 'tale-three-lines', title: 'A Tale of Three Intersecting Lines', description: 'Triangles, angle sum property, altitudes.', topics: ['Triangles', 'Properties'] },
            { id: 'working-fractions', title: 'Working with Fractions', description: 'Multiplication, division, word problems.', topics: ['Multiplication', 'Division'] },
        ],
        '8': [
            { id: 'square-cube', title: 'A Square and A Cube', description: 'Perfect squares, cubes, roots, estimation.', topics: ['Roots', 'Patterns'] },
            { id: 'power-play', title: 'Power Play', description: 'Exponents, laws of exponents, negative bases.', topics: ['Exponents', 'Laws'] },
            { id: 'story-numbers', title: 'A Story of Numbers', description: 'Natural, whole, integers, rationals, number lines.', topics: ['Number System', 'Patterns'] },
            { id: 'quadrilaterals-8', title: 'Quadrilaterals', description: 'Types, angle sum property, diagonals.', topics: ['Properties', 'Angles'] },
            { id: 'number-play-8', title: 'Number Play', description: 'Divisibility, primes, HCF/LCM, puzzles.', topics: ['Factorization', 'Puzzles'] },
            { id: 'distribute-multiply', title: 'We Distribute, Yet Things Multiply', description: 'Distribution properties, multiplication with rationals.', topics: ['Distribution', 'Multiplication'] },
            { id: 'proportional-reasoning', title: 'Proportional Reasoning-1', description: 'Ratios, direct proportions, real-world applications.', topics: ['Ratios', 'Proportions'] },
        ],
        '9': [
            { id: 'number-systems', title: 'Number Systems', description: 'Irrational numbers, real numbers, rationalisation.', topics: ['Rationalisation', 'Exponents'] },
            { id: 'polynomials', title: 'Polynomials', description: 'Remainder theorem, factor theorem, algebraic identities.', topics: ['Zeroes', 'Identities'] },
            { id: 'coordinate-geometry', title: 'Coordinate Geometry', description: 'Cartesian plane, plotting points, quadrants.', topics: ['Quadrants', 'Axes'] },
            { id: 'linear-equations-2', title: 'Linear Equations in Two Variables', description: 'Graphing lines, solutions on number line and plane.', topics: ['Graphing', 'Solutions'] },
            { id: 'euclids-geometry', title: 'Introduction to Euclid’s Geometry', description: 'Axioms, postulates, and definitions.', topics: ['Axioms', 'Postulates'] },
            { id: 'lines-angles-9', title: 'Lines and Angles', description: 'Parallel lines, transversal, angle sum property.', topics: ['Corresponding Angles', 'Alternate Angles'] },
            { id: 'triangles-9', title: 'Triangles', description: 'Congruence criteria (SAS, ASA, SSS), inequalities.', topics: ['Inequalities', 'RHS'] },
            { id: 'quadrilaterals-9', title: 'Quadrilaterals', description: 'Properties of parallelograms, mid-point theorem.', topics: ['Parallelograms', 'Mid-point Theorem'] },
            { id: 'areas-parallelograms', title: 'Areas of Parallelograms and Triangles', description: 'Figures on the same base and between same parallels.', topics: ['Area Theorems', 'Same Base'] },
            { id: 'circles-9', title: 'Circles', description: 'Chords, arcs, subtended angles, cyclic quadrilaterals.', topics: ['Chords', 'Cyclic Quads'] },
            { id: 'constructions-9', title: 'Constructions', description: 'Bisectors, line segments, triangles with given parameters.', topics: ['Bisectors', 'Angles'] },
            { id: 'herons-formula', title: 'Heron’s Formula', description: 'Area of a triangle using Heron’s formula.', topics: ['Area of Triangle', 'Application'] },
            { id: 'surface-areas-volumes-9', title: 'Surface Areas and Volumes', description: 'Surface areas and volumes of cubes, cuboids, spheres.', topics: ['Cube', 'Sphere', 'Cone'] },
            { id: 'statistics-9', title: 'Statistics', description: 'Collection of data, bar graphs, histograms, frequency polygons.', topics: ['Bar Graphs', 'Histograms'] },
            { id: 'probability-9', title: 'Probability', description: 'Experimental approach to probability.', topics: ['Trials', 'Events'] },
        ],
        '10': [
            { id: 'real-numbers-10', title: 'Real Numbers', description: 'Fundamental Theorem of Arithmetic, irrational numbers.', topics: ['Irrational Numbers', 'LCM/HCF'] },
            { id: 'polynomials-10', title: 'Polynomials', description: 'Zeroes, relationship with coefficients.', topics: ['Graphing', 'Quadratic'] },
            { id: 'linear-equations-pair', title: 'Pair of Linear Equations in Two Variables', description: 'Substitution, elimination, consistency.', topics: ['Consistency', 'Word Problems'] },
            { id: 'quadratic-equations', title: 'Quadratic Equations', description: 'Standard form, quadratic formula, nature of roots.', topics: ['Roots', 'Discriminant'] },
            { id: 'arithmetic-progressions', title: 'Arithmetic Progressions', description: 'nth term, sum of n terms.', topics: ['Formulas', 'Applications'] },
            { id: 'coordinate-geometry-10', title: 'Coordinate Geometry', description: 'Distance formula, Section formula.', topics: ['Midpoint', 'Distance'] },
            { id: 'triangles-10', title: 'Triangles', description: 'Similarity, BPT, Pythagoras theorem.', topics: ['Criteria', 'Theorems'] },
            { id: 'circles-10', title: 'Circles', description: 'Tangents to a circle, properties.', topics: ['Radius', 'Tangents'] },
            { id: 'intro-trigonometry', title: 'Introduction to Trigonometry', description: 'Trigonometric ratios, values specific angles.', topics: ['Ratios', 'Tables'] },
            { id: 'trig-identities', title: 'Trigonometric Identities', description: 'Standard identities and their applications.', topics: ['Identities', 'Proofs'] },
            { id: 'heights-distances', title: 'Heights and Distances', description: 'Applications of trigonometry.', topics: ['Elevation', 'Depression'] },
            { id: 'areas-circles', title: 'Areas Related to Circles', description: 'Area of sectors and segments.', topics: ['Sector', 'Segment'] },
            { id: 'surface-areas-volumes-10', title: 'Surface Areas and Volumes', description: 'Combinations of solids, conversion of solids.', topics: ['Combination', 'Frustum'] },
            { id: 'statistics-10', title: 'Statistics', description: 'Mean, median, mode of grouped data.', topics: ['Mean', 'Ogive'] },
            { id: 'probability-10', title: 'Probability', description: 'Theoretical probability.', topics: ['Events', 'Outcomes'] },
        ],
        '11': [
            { id: 'sets-11', title: 'Sets', description: 'Roster/Builder form, types, Venn diagrams, operations.', topics: ['Union', 'Intersection'] },
            { id: 'relations-functions-11', title: 'Relations and Functions', description: 'Ordered pairs, domain, codomain, range.', topics: ['Cartesian Product', 'Types'] },
            { id: 'trigonometric-functions', title: 'Trigonometric Functions', description: 'Radians, signs, graphs, identities.', topics: ['Identities', 'Equations'] },
            { id: 'complex-numbers', title: 'Complex Numbers and Quadratic Equations', description: 'Argand plane, polar representation, roots.', topics: ['Modulus', 'Conjugate'] },
            { id: 'linear-inequalities', title: 'Linear Inequalities', description: 'Graphical solution in two variables.', topics: ['Systems', 'Regions'] },
            { id: 'permutations-combinations', title: 'Permutations and Combinations', description: 'Factorial, nPr, nCr, applications.', topics: ['Arrangements', 'Selections'] },
            { id: 'binomial-theorem', title: 'Binomial Theorem', description: 'Expansion, general term, middle term.', topics: ['Expansion', 'Coefficients'] },
            { id: 'sequence-series', title: 'Sequence and Series', description: 'AP, GP, AM, GM, special series.', topics: ['AP', 'GP'] },
            { id: 'straight-lines', title: 'Straight Lines', description: 'Slope, forms of equations, distance of point.', topics: ['Slope', 'Intercepts'] },
            { id: 'conic-sections', title: 'Conic Sections', description: 'Circles, parabolas, ellipses, hyperbolas.', topics: ['Parabola', 'Ellipse'] },
            { id: '3d-geometry-11', title: 'Introduction to Three-Dimensional Geometry', description: 'Coordinate axes, octants, distance formula.', topics: ['Octants', 'Distance'] },
            { id: 'limits-derivatives', title: 'Limits and Derivatives', description: 'Limits of functions, first principle of derivative.', topics: ['Limits', 'Derivatives'] },
            { id: 'statistics-11', title: 'Statistics', description: 'Measures of dispersion: range, mean deviation, variance.', topics: ['Mean Deviation', 'Variance'] },
            { id: 'probability-11', title: 'Probability', description: 'Random experiments, events, axiomatic approach.', topics: ['Events', 'Axioms'] },
        ],
        '12': [
            { id: 'relations-functions-12', title: 'Relations and Functions', description: 'Reflexive, symmetric, transitive, equivalence relations.', topics: ['Invertible', 'Composition'] },
            { id: 'inverse-trig', title: 'Inverse Trigonometric Functions', description: 'Principal value branch, graphs, properties.', topics: ['Properties', 'Graphs'] },
            { id: 'matrices', title: 'Matrices', description: 'Operations, transpose, symmetric, skew-symmetric.', topics: ['Inverse', 'Multiplication'] },
            { id: 'determinants', title: 'Determinants', description: 'Properties, cofactor, adjoint, system of equations.', topics: ['System of Equations', 'Area'] },
            { id: 'continuity-differentiability', title: 'Continuity and Differentiability', description: 'Chain rule, derivatives, Mean Value Theorem.', topics: ['Continuity', 'Derivatives'] },
            { id: 'application-derivatives', title: 'Application of Derivatives', description: 'Rate of change, increasing/decreasing, maxima/minima.', topics: ['Tangents', 'Maxima/Minima'] },
            { id: 'integrals', title: 'Integrals', description: 'Indefinite and definite integrals, methods of integration.', topics: ['Substitution', 'By Parts'] },
            { id: 'application-integrals', title: 'Application of Integrals', description: 'Area under simple curves, area between two curves.', topics: ['Area under Curve', 'Bounded Area'] },
            { id: 'differential-equations', title: 'Differential Equations', description: 'Order, degree, general and particular solutions.', topics: ['Separable', 'Linear'] },
            { id: 'vector-algebra', title: 'Vector Algebra', description: 'Vectors, scalar and vector products.', topics: ['Dot Product', 'Cross Product'] },
            { id: '3d-geometry-12', title: 'Three Dimensional Geometry', description: 'Direction cosines, lines, planes in space.', topics: ['Lines', 'Planes'] },
            { id: 'linear-programming', title: 'Linear Programming', description: 'Optimization problems, graphical method.', topics: ['Constraints', 'Optimization'] },
            { id: 'probability-12', title: 'Probability', description: 'Conditional probability, Bayes theorem, probability distribution.', topics: ['Bayes Theorem', 'Random Variables'] },
        ]
    },
    ICSE: {
        '10': [
            { id: 'gst', title: 'GST', description: 'Goods and Services Tax computation.', topics: ['Input Tax', 'Output Tax'] },
            { id: 'banking', title: 'Banking', description: 'Recurring Deposit Accounts.', topics: ['Maturity Value', 'Interest'] },
            { id: 'linear-inequations', title: 'Linear Inequations', description: 'Number line representation.', topics: ['Solving', 'Solution Set'] }
        ]
    }
};
