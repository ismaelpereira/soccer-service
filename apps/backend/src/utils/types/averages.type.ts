export interface ICalculateOverallPlayer {
   goals: number;
   assists: number;
   tackles: number;
   gamesWithoutSufferedGoals: number;
   createdPlays: number;
   ownGoal: number;
   averageGoals: number;
   averageAssists: number;
   averageTackles: number;
   averageCreatedPlays: number;
   victories: number;
   teamGoals: number;
}

export interface ICalculateOverallGoalkeeper {
   defenses: number;
   sufferedGoals: number;
   gamesWithoutSufferedGoals: number;
   victories: number;
}
