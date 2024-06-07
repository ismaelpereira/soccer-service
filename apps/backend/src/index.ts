import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import path from "path";
import { buildSchema } from "type-graphql";
import { logger } from "@repo/logger";
import { PlayerResolver } from "./domain/player";
import { container } from "./di/container";

async function main() {
   const schema = await buildSchema({
      resolvers: [PlayerResolver],
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
      container: container,
   });

   const server = new ApolloServer({
      schema,
   });

   const { url } = await server.listen({ port: 3000 });

   logger.info(`Server running on ${url}`);
}

main();
