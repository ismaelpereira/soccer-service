import { PrismaClient } from "@repo/db";
import { CreatePlayerDTO } from "./dto/createPlayer.dto";
import { inject, injectable } from "inversify";
import { logger } from "@repo/logger";
import { calculatePresencePercentage } from "../../utils/helpers/calculatePresence";
import {
   calculateGoalkeeperOverall,
   calculatePlayerOverall,
   calculateEffectivy,
} from "../../utils/helpers/calculateOverall";
import { Player } from "./entity/fullPlayerData.entity";

@injectable()
export class PlayerRepository {
   constructor(@inject("PrismaClient") private readonly prisma: PrismaClient) {}

   public async createPlayer(
      player: CreatePlayerDTO
   ): Promise<CreatePlayerDTO> {
      logger.info("Player created");
      return await this.prisma.player.create({
         data: {
            name: player.name,
            position: player.position,
            team: player.team ?? null,
         },
      });
   }

   public async getPlayers(): Promise<Player[]> {
      const players = await this.prisma.player_stats.findMany({
         include: {
            player: true,
         },
      });
      const totalMatch = await this.prisma.match.count();

      const averages = await this.prisma.match_players.aggregate({
         _avg: {
            assists: true,
            created_plays: true,
            defenses: true,
            games_without_suffered_goals: true,
            goals: true,
            goals_suffered: true,
            own_goal: true,
            participations: true,
            tackles: true,
         },
      });

      const allPlayers: Player[] = [];

      for (let i = 0; i < players.length; i++) {
         const player = players[i];

         const matchesAppeared = await this.prisma.match_players.count({
            where: {
               player_id: player.id,
            },
         });

         if (!player) {
            logger.error(`Error finding player ${player}`);
            throw new Error("Players not found");
         }

         const victories = await this.prisma.team_results.findMany({
            where: {
               weekly_team: {
                  player_id: player.id,
               },
               goalsMade: {
                  gt: this.prisma.team_results.fields.goalsSuffered,
               },
            },
         });

         const teamGoals = await this.prisma.team_results.aggregate({
            _sum: {
               goalsMade: true,
            },
            where: {
               weekly_team: {
                  player_id: player.id,
               },
            },
         });

         allPlayers.push({
            assists: player.assists,
            createdPlays: player.created_plays,
            defenses: player.defenses,
            gamesWithoutSufferedGoals: player.games_without_suffered_goals,
            goals: player.goals,
            goalsSuffered: player.goals_suffered,
            name: player.player.name,
            ownGoal: player.own_goal,
            participations: player.participations,
            position: player.player.position,
            tackles: player.tackles,
            team: player.player.team ?? null,
            id: player.player.id,
            presence: calculatePresencePercentage(matchesAppeared, totalMatch),
            effectivity: calculateEffectivy(
               player.goals,
               player.assists,
               teamGoals._sum.goalsMade ?? 1
            ),
            overall:
               player.player.position === "GK"
                  ? calculateGoalkeeperOverall({
                       defenses: player.defenses,
                       gamesWithoutSufferedGoals:
                          player.games_without_suffered_goals,
                       sufferedGoals: player.goals_suffered,
                       victories: victories.length,
                    })
                  : calculatePlayerOverall({
                       assists: player.assists,
                       averageAssists: averages._avg.assists ?? 1,
                       averageCreatedPlays: averages._avg.created_plays ?? 1,
                       averageGoals: averages._avg.created_plays ?? 1,
                       averageTackles: averages._avg.tackles ?? 1,
                       createdPlays: player.created_plays,
                       gamesWithoutSufferedGoals:
                          player.games_without_suffered_goals,
                       goals: player.goals,
                       ownGoal: player.own_goal,
                       tackles: player.tackles,
                       victories: victories.length,
                       teamGoals: teamGoals._sum.goalsMade ?? 1,
                    }),
         });
      }

      return allPlayers;
   }

   public async getPlayer(id: number): Promise<Player> {
      const player = await this.prisma.player_stats.findUnique({
         include: {
            player: true,
         },
         where: {
            id: id,
         },
      });

      const totalMatch = await this.prisma.match.count();

      const matchesAppeared = await this.prisma.match_players.count({
         where: {
            player_id: id,
         },
      });

      const averages = await this.prisma.match_players.aggregate({
         _avg: {
            assists: true,
            created_plays: true,
            defenses: true,
            games_without_suffered_goals: true,
            goals: true,
            goals_suffered: true,
            own_goal: true,
            participations: true,
            tackles: true,
         },
      });

      if (!player) {
         logger.error(`Error finding all stats from player ${id}`);
         throw new Error("Player not found");
      }

      const victories = await this.prisma.team_results.findMany({
         where: {
            weekly_team: {
               player_id: player.id,
            },
            goalsMade: {
               gt: this.prisma.team_results.fields.goalsSuffered,
            },
         },
      });

      const teamGoals = await this.prisma.team_results.aggregate({
         _sum: {
            goalsMade: true,
         },
         where: {
            weekly_team: {
               player_id: player.id,
            },
         },
      });

      return {
         assists: player.assists,
         createdPlays: player.created_plays,
         defenses: player.defenses,
         gamesWithoutSufferedGoals: player.games_without_suffered_goals,
         goals: player.goals,
         goalsSuffered: player.goals_suffered,
         name: player.player.name,
         ownGoal: player.own_goal,
         participations: player.participations,
         position: player.player.position,
         tackles: player.tackles,
         team: player.player.team ?? null,
         id: player.player.id,
         presence: calculatePresencePercentage(matchesAppeared, totalMatch),
         effectivity: calculateEffectivy(
            player.goals,
            player.assists,
            teamGoals._sum.goalsMade ?? 1
         ),
         overall:
            player.player.position === "GK"
               ? calculateGoalkeeperOverall({
                    defenses: player.defenses,
                    gamesWithoutSufferedGoals:
                       player.games_without_suffered_goals,
                    sufferedGoals: player.goals_suffered,
                    victories: victories.length,
                 })
               : calculatePlayerOverall({
                    assists: player.assists,
                    averageAssists: averages._avg.assists ?? 1,
                    averageCreatedPlays: averages._avg.created_plays ?? 1,
                    averageGoals: averages._avg.created_plays ?? 1,
                    averageTackles: averages._avg.tackles ?? 1,
                    createdPlays: player.created_plays,
                    gamesWithoutSufferedGoals:
                       player.games_without_suffered_goals,
                    goals: player.goals,
                    ownGoal: player.own_goal,
                    tackles: player.tackles,
                    victories: victories.length,
                    teamGoals: teamGoals._sum.goalsMade ?? 1,
                 }),
      };
   }
}
