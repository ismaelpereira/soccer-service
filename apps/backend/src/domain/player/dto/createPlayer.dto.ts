import { ArgsType, Field } from "type-graphql";
import { positions } from "../../../utils/types/position.type";
import { Player } from "../entity/fullPlayerData.entity";

@ArgsType()
export class CreatePlayerDTO implements Partial<Player> {
   @Field()
   name!: string;

   @Field(() => String)
   position!: positions;

   @Field(() => String, { nullable: true })
   team?: string | null;
}
