import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const KEY = import.meta.env.LAST_FM_KEY;
  const USER = import.meta.env.LAST_FM_USER;
  const LIMIT = 15;

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${USER}&api_key=${KEY}&format=json&limit=${LIMIT}&period=7day`;

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
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
};
