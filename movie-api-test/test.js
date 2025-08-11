import Fastify from 'fastify';
const fastify = Fastify({
  logger: true
})

// You'll need your TMDB API key here
const TMDB_API_READ_ACCESS_TOKEN = process.env.TMDB_API_READ_ACCESS_TOKEN;

import 'dotenv/config';

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});

fastify.get('/search', async (request, reply) => {
  const query = request.query.q;
  if (!query) {
    return reply.status(400).send({ error: 'Query parameter "q" is required' });
  }
  try {
    const url = new URL('https://api.themoviedb.org/3/search/movie');
    url.searchParams.set('query', query);

    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`TMDB error status: ${res.status}`);
    }

    const data = await res.json();
    // Return only the movie titles
    const titles = data.results.map(movie => movie.title);

    // return { titles };
    return data;
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: 'Failed to fetch data from TMDB' });
  }
});

fastify.listen({ port: process.env.PORT || 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});