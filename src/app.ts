import "reflect-metadata";
import express from "express";
import next from "next";
import cors from "cors";
import dotenv from "dotenv";
import { parse } from "url";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { buildSchema } from "type-graphql";
import { green } from "colors";
import { createConnection } from "typeorm";

import HelloResolver from "./resolvers/HelloResolver";

const app: express.Application = express();
const nextServer = next({ dev: true });
const nextHandler = nextServer.getRequestHandler();

dotenv.config();
app.use(cors());
app.use(
  graphqlUploadExpress({
    maxFieldSize: 10000000,
    maxFileSize: 10000000,
    maxFiles: 10,
  })
);

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: false,
  });

  const apolloserver = new ApolloServer({
    schema: schema,
    uploads: false,
    playground: {
      endpoint: "/graphql",
    },
  });

  apolloserver.applyMiddleware({ app, cors: false, path: "/api" });

  await nextServer.prepare();

  app.listen(process.env.PORT, async () => {
    await createConnection();
    console.log(
      green(`> Server running on http://localhost:${process.env.PORT}`)
    );
  });

  app.get("*", (req, res) => {
    return nextHandler(req, res, parse(req.url, true));
  });
};

main();
