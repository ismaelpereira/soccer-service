import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Player } from "./entity/player.entity";
import type { positions } from "../../utils/types/position.type";
import { CreatePlayerDTO } from "./dto/createPlayer.dto";
import { injectable, inject } from "inversify";
import { PlayerRepository } from "./entity/player.repository";

@injectable()
@Resolver((of) => Player)
export class PlayerResolver {
   constructor(
      @inject("PlayerRepository") private readonly repository: PlayerRepository
   ) {}

   @Query(() => [Player])
   async players() {
      return await this.repository.getPlayers();
   }

   @Mutation(() => Player)
   async createPlayer(@Args() { name, position, team }: CreatePlayerDTO) {
      console.log(name);
      console.log(position);
      console.log(team);

      return await this.repository.createPlayer({
         name,
         position,
         team,
      });
   }

   @Query(() => Player)
   async player(@Arg("id") id: string) {
      return await this.repository.findOnePlayer(id);
   }
}
