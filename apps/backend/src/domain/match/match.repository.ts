import { PrismaClient } from "@repo/db";
import { inject, injectable } from "inversify";
import { MatchPlayers } from "./entity/matchStatus.entity";
import { Match } from "./entity/match.entity";
import { IStats } from "../../utils/types/stats.types";
import { logger } from "@repo/logger";
import {
   calculateGoalkeeperOverall,
   calculatePlayerOverall,
   calculateEffectivy,
} from "../../utils/helpers/calculateOverall";
import { calculatePresencePercentage } from "../../utils/helpers/calculatePresence";

@injectable()
export class MatchRepository {
   constructor(@inject("PrismaClient") private readonly prisma: PrismaClient) {}

   public async getMatch(date: Date): Promise<Partial<MatchPlayers[]>> {
      const players = await this.prisma.match_players.findMany({
         include: {
            match: true,
            player: true,
         },
         where: {
            match: {
               created_at: date,
            },
         },
      });

      if (!players) {
         logger.error(`Match on ${date.toISOString()} not found`);
         throw new Error("match not found");
      }

      const matchPlayers: MatchPlayers[] = [];

      for (let i = 0; i < players.length; i++) {
         const player = players[i];

         const matchesAppeared = await this.prisma.match_players.count({
            where: {
               player_id: player.id,
            },
         });

         const totalMatch = await this.prisma.match.count({
            where: {
               created_at: date,
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
            where: {
               match: {
                  created_at: date,
               },
            },
         });

         const victories = await this.prisma.team_results.findMany({
            where: {
               weekly_team: {
                  player_id: player.id,
                  match: {
                     created_at: date,
                  },
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
                  match: {
                     created_at: date,
                  },
               },
            },
         });

         matchPlayers.push({
            matchId: player.match_id,
            createdAt: player.created_at,
            playerId: player.player.id,
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
      return matchPlayers;
   }

   public async getMatchPlayerStatus(
      date: Date,
      playerId: number
   ): Promise<Partial<MatchPlayers>> {
      const player = await this.prisma.match_players.findFirst({
         include: {
            match: true,
            player: true,
         },
         where: {
            match: {
               created_at: date,
            },
            player_id: playerId,
         },
      });

      if (!player) {
         logger.error(
            `Player ${playerId} not found on game on ${date.toISOString()}`
         );
         throw new Error("player not found");
      }
      const matchesAppeared = await this.prisma.match_players.count({
         where: {
            player_id: player.id,
         },
      });

      const totalMatch = await this.prisma.match.count({
         where: {
            created_at: date,
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
         where: {
            match: {
               created_at: date,
            },
         },
      });

      const victories = await this.prisma.team_results.findMany({
         where: {
            weekly_team: {
               player_id: player.id,
               match: {
                  created_at: date,
               },
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
               match: {
                  created_at: date,
               },
            },
         },
      });

      logger.info(`Match player found`);

      return {
         matchId: player.match_id,
         createdAt: player.created_at,
         playerId: player.player.id,
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

   public async createMatch(): Promise<Match> {
      logger.info("Match Created");
      return await this.prisma.match.create({});
   }

   public async addMatchPlayer(matchId: number, playerId: number) {
      logger.info("Player added");
      return await this.prisma.match_players.create({
         data: {
            player_id: playerId,
            match_id: matchId,
            assists: 0,
            created_plays: 0,
            defenses: 0,
            games_without_suffered_goals: 0,
            goals: 0,
            goals_suffered: 0,
            own_goal: 0,
            participations: 0,
            tackles: 0,
         },
      });
   }

   public async addMatchStatus(
      matchId: number,
      playerId: number,
      stats: IStats
   ) {
      logger.info("Status Created");
      await this.prisma.match_players.updateMany({
         data: {
            assists: {
               increment: stats.assists ?? 0,
            },
            defenses: {
               increment: stats.defenses ?? 0,
            },
            games_without_suffered_goals: {
               increment: stats.gamesWithoutSufferedGoals ?? 0,
            },
            created_plays: {
               increment: stats.createdPlays ?? 0,
            },
            goals: {
               increment: stats.goals ?? 0,
            },
            goals_suffered: {
               increment: stats.goalsSuffered ?? 0,
            },
            own_goal: {
               increment: stats.ownGoal ?? 0,
            },
            participations: {
               increment: stats.participations ?? 0,
            },
            tackles: {
               increment: stats.tackles ?? 0,
            },
         },
         where: {
            player_id: playerId,
            match_id: matchId,
         },
      });

      await this.prisma.player_stats.updateMany({
         data: {
            assists: {
               increment: stats.assists ?? 0,
            },
            defenses: {
               increment: stats.defenses ?? 0,
            },
            games_without_suffered_goals: {
               increment: stats.gamesWithoutSufferedGoals ?? 0,
            },
            created_plays: {
               increment: stats.createdPlays ?? 0,
            },
            goals: {
               increment: stats.goals ?? 0,
            },
            goals_suffered: {
               increment: stats.goalsSuffered ?? 0,
            },
            own_goal: {
               increment: stats.ownGoal ?? 0,
            },
            participations: {
               increment: stats.participations ?? 0,
            },
            tackles: {
               increment: stats.tackles ?? 0,
            },
         },
         where: {
            player_id: playerId,
         },
      });
   }
}
