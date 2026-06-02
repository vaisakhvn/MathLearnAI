export type HintType = 'meta' | 'directional' | 'structural' | 'solution';

export interface SessionState {
    startTime: number;
    attempts: number;
    hintHistory: HintType[];
    errors: string[]; // Descriptions of errors made
    currentStepIndex: number;
    isStuck: boolean;
}

export const INITIAL_STATE: SessionState = {
    startTime: Date.now(),
    attempts: 0,
    hintHistory: [],
    errors: [],
    currentStepIndex: 0,
    isStuck: false
};

// Helper to determine the next allowed hint level based on policy
// helper function that determines which hint level should be shown next based on the session history
// it enforces a progressive hint policy from meta hints to specific solutions
export function getNextAllowedHintType(state: SessionState): HintType {
    // Policy Rule 1: No hints before at least 1 attempt (unless explicit confusion)
    if (state.attempts === 0 && state.hintHistory.length === 0) return 'meta';

    // Policy Rule 2: Meta-hints first
    const hasUsedMeta = state.hintHistory.includes('meta');
    if (!hasUsedMeta) return 'meta';

    // Policy Rule 3: Directional after Meta
    const hasUsedDirectional = state.hintHistory.includes('directional');
    if (!hasUsedDirectional) return 'directional';

    // Policy Rule 4: Structural only if stuck
    return 'structural';
}

export function updateSessionState(
    currentState: SessionState,
    action: { type: 'attempt' | 'hint' | 'error', payload?: any }
): SessionState {
    const newState = { ...currentState };

    switch (action.type) {
        case 'attempt':
            newState.attempts++;
            break;
        case 'hint':
            if (action.payload) {
                newState.hintHistory.push(action.payload as HintType);
            }
            break;
        case 'error':
            if (action.payload) {
                newState.errors.push(action.payload);
            }
            break;
    }

    return newState;
}
