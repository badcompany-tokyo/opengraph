import { Hono } from 'hono';
import { image } from './image';
import { info } from './info';

const app = new Hono();

app.route('/image', image);
app.route('/info', info);

export default app;
