import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

export interface UserStats {
    xp: number;
    streak: number;
    questionsSolved: number;
    lastActiveDate: string | null;
}

// fetches the user's statistics from firestore or initializes them if they don't exist
// tracking xp streak and questions solved is handled here
export async function getUserStats(userId: string): Promise<UserStats> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as UserStats;
    } else {
        // Initialize new user stats if not exists
        const initialStats: UserStats = {
            xp: 0,
            streak: 0,
            questionsSolved: 0,
            lastActiveDate: null
        };
        await setDoc(userRef, initialStats);
        return initialStats;
    }
}

// updates the user's progress after a problem attempt including streak calculation
// incrementing xp and updating activity timestamps are managed by this function
export async function updateUserProgress(userId: string, isCorrect: boolean) {
    if (!userId || !isCorrect) return;

    const userRef = doc(db, 'users', userId);
    const today = new Date().toISOString().split('T')[0];

    // Get current stats to calculate streak
    const userSnap = await getDoc(userRef);
    let currentStreak = 0;
    let lastActive = null;

    if (userSnap.exists()) {
        const data = userSnap.data();
        currentStreak = data.streak || 0;
        lastActive = data.lastActiveDate;
    }

    let newStreak = currentStreak;

    // Streak Logic
    if (lastActive !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActive === yesterdayStr) {
            newStreak += 1;
        } else {
            newStreak = 1; // Reset or Start new streak
        }
    }

    // Prepare update data
    const updates: any = {
        questionsSolved: increment(1),
        xp: increment(10), // +10 XP per correct answer
        streak: newStreak,
        lastActiveDate: today,
        lastUpdated: serverTimestamp()
    };

    await setDoc(userRef, updates, { merge: true });
}
