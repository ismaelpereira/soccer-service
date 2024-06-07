import { Container } from "inversify";
import { PrismaClient } from "@repo/db";
import { PlayerRepository } from "../domain/player/entity/player.repository";
import { PlayerResolver } from "../domain/player";

const container = new Container();

container
   .bind<PrismaClient>("PrismaClient")
   .toConstantValue(new PrismaClient());

container.bind<PlayerRepository>("PlayerRepository").to(PlayerRepository);
container.bind<PlayerResolver>(PlayerResolver).toSelf().inSingletonScope();

export { container };
