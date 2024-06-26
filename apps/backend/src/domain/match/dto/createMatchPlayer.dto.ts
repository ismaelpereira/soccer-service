import { ArgsType, Field } from "type-graphql";
import { MatchPlayers } from "../entity/matchStatus.entity";

@ArgsType()
export class AddMatchPlayerDTO implements Partial<MatchPlayers> {
   @Field()
   matchId!: number;

   @Field()
   playerId!: number;
}
