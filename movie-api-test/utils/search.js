export async function searchHandler(request, reply) {
  const query = request.query.q;
  if (!query) {
    return reply.status(400).send({ error: 'Query parameter "q" is required' });
  }
  try {
    const url = new URL(process.env.MOVIE_API_URL + 'search/movie');
    url.searchParams.set('query', query);

    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`TMDB error status: ${res.status}`);
    }

    const data = await res.json();

    // Return only the movie titles example
    // const titles = data.results.map(movie => movie.title);

    return data;
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to fetch data from TMDB' });
  }
}