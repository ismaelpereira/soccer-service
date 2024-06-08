import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class MatchPlayers {
   @Field((_type) => ID)
   id?: string;

   @Field()
   matchId!: string;

   @Field()
   playerId!: string;

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
}
