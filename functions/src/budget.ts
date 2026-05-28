import { getFirestore } from 'firebase-admin/firestore';

// Daily ceiling on total requests across all IPs. At gpt-4o-mini pricing,
// 750 requests ~= $0.15 worst case. Resets at UTC midnight.
const DAILY_CEILING = 750;

function todayUtcKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

export type BudgetResult =
  | { allowed: true; remaining: number }
  | { allowed: false; remaining: 0 };

/**
 * Increment today's request count atomically and check against the ceiling.
 * If the increment would exceed the ceiling, returns allowed:false.
 */
export async function checkAndIncrementBudget(): Promise<BudgetResult> {
  const key = todayUtcKey();
  // Named Native-mode database ((default) is Datastore mode, unusable here).
  const db = getFirestore('mbs-cv');
  const ref = db.collection('chat_budget').doc(key);

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const current = (snap.data()?.count as number | undefined) ?? 0;

    if (current >= DAILY_CEILING) {
      return { allowed: false as const, remaining: 0 as const };
    }

    tx.set(ref, { count: current + 1, updatedAt: Date.now() }, { merge: true });
    return { allowed: true as const, remaining: DAILY_CEILING - (current + 1) };
  });
}
