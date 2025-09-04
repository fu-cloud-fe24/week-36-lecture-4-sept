import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { movies } from '../../data/movies.mjs';
import { sendResponse } from '../../responses/index.mjs';
import { validateKey } from '../../middlewares/validateKey.mjs';
import { errorHandler } from '../../middlewares/errorHandler.mjs';
import { movieSchema } from '../../models/movieSchema.mjs';

const eventSchema = transpileSchema({
  type : 'object',
  required : ['body'],
  properties : {
    body : movieSchema
  }
});

export const handler = middy(async (event) => {
  const movie = event.body;
  movies.push(movie);
  return sendResponse(200, { message : 'Movie successfully added', movies });
}).use(validateKey())
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema }))
  .use(errorHandler());
