import { ArgsType, Field } from "type-graphql";
import { StatusEntity } from "../entity/status.entity";

@ArgsType()
export class StatusDTO implements Partial<StatusEntity> {
   @Field()
   goals?: number;

   @Field()
   assists?: number;

   @Field()
   createdPlays?: number;

   @Field()
   defenses?: number;

   @Field()
   gamesWithoutSufferedGoals?: number;

   @Field()
   goalsSuffered?: number;

   @Field()
   ownGoal?: number;

   @Field()
   participations?: number;

   @Field()
   tackles?: number;
}
