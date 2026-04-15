import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const KEY = import.meta.env.LAST_FM_KEY;
  const USER = import.meta.env.LAST_FM_USER;

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${KEY}&format=json&limit=10`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch from Last.fm');
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Caches at the edge for 5 mins (300s)
        // Serves stale data for up to 1 min while revalidating in the background
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
};