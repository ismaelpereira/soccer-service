import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class StatusEntity {
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
