import { Hono } from 'hono';
import type { ErrorResponse } from '../types';
import { fetchOGInfo } from './utils';

export const info = new Hono();

info.get('/', async (c) => {
  const urls = c.req.queries('url');

  if (!urls) {
    return c.json({ message: 'URL is not set!' } satisfies ErrorResponse, 400);
  }

  try {
    if (urls.length === 1) {
      return c.json(await fetchOGInfo(urls[0]));
    }

    const ogInfoArr = await Promise.all(
      urls.map(async (url) => {
        const ogInfo = await fetchOGInfo(url);
        return {
          url,
          data: ogInfo,
        };
      }),
    );

    return c.json(ogInfoArr);
  } catch (e) {
    return c.json(
      { message: 'Data fetch failed!' } satisfies ErrorResponse,
      500,
    );
  }
});
