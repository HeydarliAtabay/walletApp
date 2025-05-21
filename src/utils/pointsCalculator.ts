/**
 * Calculate daily points based on the current day of the season
 * Points rule:
 * - On the first day of the season (Sep 1 or Dec 1), user gets 2 points
 * - On the second day of the season, user gets 3 points
 * - On subsequent days, user gets 100% of points from day before previous one plus 60% of points from previous day
 * - Points are rounded to the nearest integer
 * - If points exceed 1000, display in "K" format (e.g., 28745 becomes 29K)
 */

function getCurrentSeason(): string {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

function getDayOfSeason(date: Date): number {
  const month = date.getMonth();
  const day = date.getDate();
  
  // First day of seasons (approximate)
  if ((month === 8 && day === 1) || (month === 11 && day === 1) || 
      (month === 2 && day === 1) || (month === 5 && day === 1)) {
    return 1;
  }
  
  // Calculate days since start of season
  let seasonStartMonth: number;
  if (month >= 2 && month <= 4) seasonStartMonth = 2; // Spring (March)
  else if (month >= 5 && month <= 7) seasonStartMonth = 5; // Summer (June)
  else if (month >= 8 && month <= 10) seasonStartMonth = 8; // Autumn (September)
  else seasonStartMonth = 11; // Winter (December)
  
  // Use 0-indexed months for calculation
  const seasonStart = new Date(date.getFullYear(), seasonStartMonth, 1);
  const diffTime = date.getTime() - seasonStart.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  return diffDays;
}

export function calculateDailyPoints(): number {
  const today = new Date();
  const dayOfSeason = getDayOfSeason(today);
  
  if (dayOfSeason === 1) {
    return 2; // First day of season: 2 points
  } else if (dayOfSeason === 2) {
    return 3; // Second day of season: 3 points
  } else {
    // For subsequent days: 100% of points from day before the previous day
    // plus 60% of points from the previous day
    
    // Simulate points history (for demo purposes)
    let pointsHistory: number[] = [2, 3]; // Start with days 1 and 2
    
    for (let day = 3; day <= dayOfSeason; day++) {
      const pointsFromDayBeforePrevious = pointsHistory[day - 3];
      const pointsFromPreviousDay = pointsHistory[day - 2];
      
      const newPoints = pointsFromDayBeforePrevious + (0.6 * pointsFromPreviousDay);
      pointsHistory.push(Math.round(newPoints));
    }
    
    return pointsHistory[pointsHistory.length - 1];
  }
}

export function formatPoints(points: number): string {
  if (points >= 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return points.toString();
} 