import { Field, ID, ObjectType } from "type-graphql";
import type { positions } from "../../../utils/types/position.type";

@ObjectType()
export class Player {
   @Field((_type) => ID)
   id?: string;

   @Field()
   name!: string;

   @Field(() => String, { nullable: true })
   team?: string | null;

   @Field(() => String,{})
   position!: positions;
}
