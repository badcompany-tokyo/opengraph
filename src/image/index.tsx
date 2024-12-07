import { Hono } from 'hono';
import { simple } from './simple';

export const image = new Hono();

image.route('/simple', simple);
