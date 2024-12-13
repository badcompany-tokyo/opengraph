import { Hono } from 'hono';
import { ImageResponse } from 'hono-og';
import type { ErrorResponse } from '../../types';

export const simple = new Hono();

simple.get('/', (c) => {
  const title = c.req.query('title');
  const description = c.req.query('description');
  const dark = c.req.query('dark');

  if (!title) {
    return c.json({ message: 'URL is not set!' } satisfies ErrorResponse, 400);
  }

  let bgColor = '#ffffff';
  let fontColor = '#000000';

  if (dark !== undefined) {
    [bgColor, fontColor] = [fontColor, bgColor];
  }

  return new ImageResponse(
    <div
      style={{
        backgroundColor: bgColor,
        color: fontColor,
        height: '100%',
        width: '100%',
        fontWeight: 600,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
      }}
    >
      <div
        style={{
          fontSize: 70,
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: '4rem',
          marginRight: '4rem',
        }}
      >
        {title}
      </div>
      {description ? (
        <div
          style={{
            fontSize: 30,
            marginBottom: '4rem',
            marginLeft: '4rem',
            marginRight: '4rem',
          }}
        >
          {description}
        </div>
      ) : null}
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
});
