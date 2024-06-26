import { Field, ID, ObjectType } from "type-graphql";

import { positions } from "../../../utils/types/position.type";

@ObjectType()
export class Player {
   @Field((_type) => ID)
   id?: number;

   @Field()
   name!: string;

   @Field()
   position!: positions;

   @Field(() => String, { nullable: true })
   team?: string | null;

   @Field()
   goals!: number;

   @Field()
   assists!: number;

   @Field()
   createdPlays!: number;

   @Field()
   defenses!: number;

   @Field()
   gamesWithoutSufferedGoals!: number;

   @Field()
   goalsSuffered!: number;

   @Field()
   ownGoal!: number;

   @Field()
   participations!: number;

   @Field()
   tackles!: number;

   @Field()
   presence!: number;

   @Field()
   overall!: number;

   @Field()
   effectivity!: number;
}
