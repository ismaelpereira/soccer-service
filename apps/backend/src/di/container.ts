import { Container } from "inversify";
import { PrismaClient } from "@repo/db";
import { PlayerRepository } from "../domain/player/player.repository";
import { PlayerResolver } from "../domain/player";
import { MatchRepository } from "../domain/match/match.repository";
import { MatchResolver } from "../domain/match/match.resolver";

const container = new Container();

container
   .bind<PrismaClient>("PrismaClient")
   .toConstantValue(new PrismaClient());

container.bind<PlayerRepository>("PlayerRepository").to(PlayerRepository);
container.bind<PlayerResolver>(PlayerResolver).toSelf().inSingletonScope();
container.bind<MatchRepository>("MatchRepository").to(MatchRepository);
container.bind<MatchResolver>(MatchResolver).toSelf().inSingletonScope();

export { container };
