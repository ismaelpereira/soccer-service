import { Player } from "../../domain/player/entity/fullPlayerData.entity";
import {
   ICalculateOverallPlayer,
   ICalculateOverallGoalkeeper,
} from "../types/averages.type";

export function calculatePlayerOverall(data: ICalculateOverallPlayer): number {
   return (
      data.goals / data.averageGoals +
      data.assists / data.averageAssists +
      1.5 * (data.tackles / data.averageTackles) +
      data.gamesWithoutSufferedGoals / 9 +
      data.victories / 9 +
      data.createdPlays / data.averageCreatedPlays +
      calculateEffectivy(data.goals, data.assists, data.teamGoals) -
      data.ownGoal / 2
   );
}

export function calculateGoalkeeperOverall(
   data: ICalculateOverallGoalkeeper
): number {
   return (
      data.defenses / data.sufferedGoals +
      data.gamesWithoutSufferedGoals / 9 +
      data.victories / 9
   );
}

export function calculateEffectivy(
   goals: number,
   assists: number,
   teamGoals: number
): number {
   return (goals + assists) / teamGoals;
}
