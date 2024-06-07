import { PrismaClient } from "@repo/db";
import { CreatePlayerDTO } from "../dto/createPlayer.dto";
import { Player } from "./player.entity";
import { inject, injectable } from "inversify";

@injectable()
export class PlayerRepository {
   constructor(@inject("PrismaClient") private readonly prisma: PrismaClient) {}

   public async createPlayer(
      player: CreatePlayerDTO
   ): Promise<CreatePlayerDTO> {
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

      console.log("players: ", players);
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
         throw new Error("Player not found");
      }

      return player;
   }
}
