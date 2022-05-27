/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, Middleware, Response } from 'koa';

export interface RouteRequest<PathParams, ReqBody, QueryParams> {
  params: PathParams;
  body: ReqBody;
  query: QueryParams;
}

export type RouteHandler<
  PathParams = any,
  ResBody = any,
  ReqBody = any,
  QueryParams = any
> = (
  req: RouteRequest<PathParams, ReqBody, QueryParams>,
  res: Response,
  ctx: Context
) => Promise<ResBody>;

export const Route = <PathParams, ResBody, ReqBody, QueryParams>(
  handler: RouteHandler<PathParams, ResBody, ReqBody, QueryParams>
): Middleware => {
  return async (ctx, next) => {
    const req = {
      params: ctx.params,
      body: ctx.request?.body ?? {},
      query: ctx.query as unknown as QueryParams,
    };

    ctx.body = await handler(req, ctx.response, ctx);

    next();
  };
};
