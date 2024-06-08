import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Match {
   @Field((_type) => ID)
   id?: string;

   @Field()
   created_at!: Date;
}
