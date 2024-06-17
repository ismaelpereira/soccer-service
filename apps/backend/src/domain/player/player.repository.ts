import { PrismaClient } from "@repo/db";
import { CreatePlayerDTO } from "./dto/createPlayer.dto";
import { Player } from "./entity/player.entity";
import { inject, injectable } from "inversify";
import { logger } from "@repo/logger";
import { FullPlayerStats } from "./entity/fullPlayerData.entity";
import { calculatePresencePercentage } from "../../utils/helpers/calculatePresence";
import { calculateOverall } from "../../utils/helpers/calculateOverall";

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
      const players = await this.prisma.player.findMany({
         select: {
            id: true,
            name: true,
            position: true,
            team: true,
         },
      });
      if (!players) {
         return [];
      }

      return players;
   }

   public async findOnePlayer(id: string): Promise<Player> {
      const player = await this.prisma.player.findUnique({
         where: {
            id: id,
         },
      });
      if (!player) {
         logger.error(`Player ${id} not found`);
         throw new Error("Player not found");
      }

      logger.info("Player found");
      return player;
   }

   public async getPlayerFullStats(id: string): Promise<FullPlayerStats> {
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

      if (!player) {
         logger.error(`Error finding all stats from player ${id}`);
         throw new Error("Player not found");
      }

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
         overall: calculateOverall(), // TODO: make this function calculate
      };
   }
}
