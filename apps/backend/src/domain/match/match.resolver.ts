import { inject, injectable } from "inversify";
import { Match } from "./entity/match.entity";
import { Arg, Args, Mutation, Query } from "type-graphql";
import { MatchPlayers } from "./entity/matchStatus.entity";
import { MatchRepository } from "./match.repository";
import { AddMatchPlayerDTO } from "./dto/createMatchPlayer.dto";
import { StatusDTO } from "./dto/status.dto";

@injectable()
export class MatchResolver {
   constructor(
      @inject("MatchRepository") private readonly repository: MatchRepository
   ) {}

   @Query(() => [MatchPlayers])
   async match(@Arg("date") date: Date) {
      return this.repository.getMatch(date);
   }

   @Query(() => MatchPlayers)
   async playerMatchStatus(
      @Arg("date") date: Date,
      @Arg("playerId") playerId: number
   ) {
      return await this.repository.getMatchPlayerStatus(date, playerId);
   }

   @Mutation(() => Match)
   async createMatch() {
      return await this.repository.createMatch();
   }

   @Mutation(() => MatchPlayers)
   async addPlayerMatch(@Args() { matchId, playerId }: AddMatchPlayerDTO) {
      return await this.repository.addMatchPlayer(matchId, playerId);
   }

   @Mutation(() => MatchPlayers)
   async addPlayerStatistic(
      @Args() { matchId, playerId }: AddMatchPlayerDTO,
      @Args() stats: StatusDTO
   ) {
      return await this.repository.addMatchStatus(matchId, playerId, stats);
   }
}
