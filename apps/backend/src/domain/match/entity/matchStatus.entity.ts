import { Field, ID, ObjectType } from "type-graphql";
import { Player } from "../../player/entity/fullPlayerData.entity";

@ObjectType()
export class MatchPlayers {
   @Field((_type) => ID)
   id?: number;

   @Field()
   matchId!: number;

   @Field()
   playerId!: number;

   @Field()
   goals!: number;

   @Field()
   assists!: number;

   @Field()
   participations!: number;

   @Field()
   ownGoal!: number;

   @Field()
   tackles!: number;

   @Field()
   gamesWithoutSufferedGoals!: number;

   @Field()
   createdPlays!: number;

   @Field()
   goalsSuffered!: number;

   @Field()
   defenses!: number;

   @Field()
   createdAt!: Date;

   @Field()
   overall!: number;

   @Field()
   name!: string;

   @Field()
   team!: string | null;

   @Field()
   position!: string;

   @Field()
   presence!: number;

   @Field()
   effectivity!: number;
}
