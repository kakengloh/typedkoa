import supertest from 'supertest';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import TypedKoa from '.';
import { test } from 'mocha';
import { expect } from 'chai';

describe('TypedKoa', () => {
  test('should return correct params, body and query', async () => {
    const app = new Koa();
    const router = new Router();

    interface PathParams {
      data: string;
    }

    interface ReqBody {
      data: string;
    }

    interface QueryParams {
      data: string;
    }

    interface ResBody {
      params: PathParams;
      body: ReqBody;
      query: QueryParams;
    }

    const handler: TypedKoa.Middleware<ResBody> = async (ctx, next) => {
      const { params, body, query } = TypedKoa.request<
        PathParams,
        ReqBody,
        QueryParams
      >(ctx);

      ctx.body = {
        params,
        body,
        query,
      };

      next();
    };

    router.post('/:data', handler);

    app.use(bodyParser());
    app.use(router.routes()).use(router.allowedMethods());

    const { body } = await supertest(app.callback())
      .post('/path-data')
      .query({ data: 'query-data' })
      .send({ data: 'body-data' })
      .expect(200);

    expect(body.params).to.deep.eq({ data: 'path-data' });
    expect(body.query).to.deep.eq({ data: 'query-data' });
    expect(body.body).to.deep.eq({ data: 'body-data' });
  });
});
