import { ArgsType, Field } from "type-graphql";
import { Player } from "../entity/player.entity";
import { positions } from "../../../utils/types/position.type";
import { Type } from "class-transformer";

@ArgsType()
export class CreatePlayerDTO implements Partial<Player> {
   @Field()
   name!: string;

   @Field(() => String)
   position!: positions;

   @Field(() => String, { nullable: true })
   team?: string | null;
}
