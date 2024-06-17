export function calculatePresencePercentage(
   matchesAppeared: number,
   totalMatch: number
): number {
   return (matchesAppeared / totalMatch) * 100;
}
