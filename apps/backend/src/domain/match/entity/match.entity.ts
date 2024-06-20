import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Match {
   @Field((_type) => ID)
   id?: number;

   @Field()
   created_at!: Date;
}
