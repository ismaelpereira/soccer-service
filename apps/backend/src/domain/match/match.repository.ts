import { PrismaClient } from "@repo/db";
import { inject, injectable } from "inversify";
import { MatchPlayers } from "./entity/matchStatus.entity";
import { Match } from "./entity/match.entity";

@injectable()
export class MatchRepository {
   constructor(@inject("PrismaClient") private readonly prisma: PrismaClient) {}

   public async getMatch(date: Date): Promise<Partial<MatchPlayers[]>> {
      const match = await this.prisma.match_players.findMany({
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

      if (!match) {
         throw new Error("match not found");
      }

      return match.map((player) => ({
         assists: player.assists,
         createdPlays: player.created_plays,
         defenses: player.defenses,
         gamesWithoutSufferedGoals: player.games_without_suffered_goals,
         goals: player.goals,
         ownGoal: player.own_goal,
         goalsSuffered: player.goals_suffered,
         participations: player.participations,
         tackles: player.tackles,
         createdAt: player.match.created_at,
         playerId: player.player_id,
         matchId: player.match_id,
      }));
   }

   public async getMatchPlayerStatus(date: Date, playerId: string) {
      const match = await this.prisma.match_players.findMany({
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

      if (!match) {
         throw new Error("match not found");
      }

      return match.map((player) => ({
         assists: player.assists,
         created_plays: player.created_plays,
         defenses: player.defenses,
         games_without_suffered_goals: player.games_without_suffered_goals,
         goals: player.goals,
         own_goal: player.own_goal,
         goals_suffered: player.goals_suffered,
         participations: player.participations,
         tackles: player.tackles,
         created_at: player.match.created_at,
         player_id: player.player_id,
         match_id: player.match_id,
      }));
   }

   public async createMatch(): Promise<Match> {
      return await this.prisma.match.create({});
   }

   public async addMatchPlayer(matchId: string, playerId: string) {
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
}
