import Fastify from 'fastify';
import 'dotenv/config';
import { searchHandler } from './utils/search.js';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true
})

// Enable CORS for all origins (for development)
fastify.register(cors, {
  origin: (origin, cb) => {
    const hostname = new URL(origin).hostname
    if (hostname === "localhost") {
      //  Request from localhost will pass
      cb(null, true)
      return
    }
    // Generate an error on other origins, disabling access
    cb(new Error("Not allowed"), false)
  }
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});

fastify.get('/search', searchHandler);

fastify.listen({ port: process.env.PORT || 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});