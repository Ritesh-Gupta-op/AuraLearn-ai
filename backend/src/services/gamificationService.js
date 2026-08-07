/**
 * Gamification Service - Streaks, Badges, and XP calculation
 */

export const updateStreakAndXP = async (prisma, studentId, isCorrect, contentType = 'quiz') => {
  const student = await prisma.student.findUnique({ where: { id: studentId } });
  if (!student) throw new Error('Student not found');

  const now = new Date();
  const last = new Date(student.lastActiveAt);
  const diffHours = (now - last) / (1000 * 60 * 60);

  let newStreak = student.streakDays;
  if (diffHours < 24) {
    // Same day activity, maintain streak
  } else if (diffHours < 48) {
    newStreak += 1; // Consecutive day increment
  } else {
    newStreak = 1; // Reset streak if missed a day
  }

  // XP Calculation: 10 XP per correct quiz, 5 per wrong, 2 per video watch
  let xpAwarded = 0;
  if (contentType === 'video') {
    xpAwarded = 2;
  } else if (isCorrect) {
    xpAwarded = 10;
  } else {
    xpAwarded = 5;
  }

  const updatedTotalXP = student.totalXP + xpAwarded;

  const updatedStudent = await prisma.student.update({
    where: { id: studentId },
    data: {
      streakDays: newStreak,
      totalXP: updatedTotalXP,
      lastActiveAt: now
    }
  });

  // Check Badge Eligibility
  const awardedBadges = [];
  if (newStreak >= 7) {
    const existing = await prisma.badge.findFirst({
      where: { studentId, badgeType: 'streak_7' }
    });
    if (!existing) {
      const badge = await prisma.badge.create({
        data: { studentId, badgeType: 'streak_7' }
      });
      awardedBadges.push(badge);
    }
  }

  if (updatedTotalXP >= 500) {
    const existing = await prisma.badge.findFirst({
      where: { studentId, badgeType: 'badge_xp_500' }
    });
    if (!existing) {
      const badge = await prisma.badge.create({
        data: { studentId, badgeType: 'badge_xp_500' }
      });
      awardedBadges.push(badge);
    }
  }

  return { student: updatedStudent, xpAwarded, awardedBadges };
};
