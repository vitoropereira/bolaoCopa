import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { poolRouts } from "./routes/pool";
import { userRouts } from "./routes/users";
import { guessRouts } from "./routes/guess";
import { gameRouts } from "./routes/game";
import { authRouts } from "./routes/auth";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: "bolaocopa",
  });

  await fastify.register(authRouts);
  await fastify.register(poolRouts);
  await fastify.register(userRouts);
  await fastify.register(guessRouts);
  await fastify.register(gameRouts);

  await fastify.listen({ port: 3333, host: "0.0.0.0" }); /**/
}

bootstrap();
