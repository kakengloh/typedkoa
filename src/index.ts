import {
  Context as KoaContext,
  DefaultContext as KoaDefaultContext,
  DefaultState as KoaDefaultState,
  Middleware as KoaMiddleware,
} from 'koa';

namespace TypedKoa {
  export interface Request<PathParamsT, ReqBodyT, QueryParamsT> {
    params: PathParamsT;
    body: ReqBodyT;
    query: QueryParamsT;
  }

  export function request<
    PathParamsT = Record<string, unknown>,
    ReqBodyT = Record<string, unknown>,
    QueryParamsT = Record<string, unknown>
  >(ctx: KoaContext): Request<PathParamsT, ReqBodyT, QueryParamsT> {
    return {
      params: ctx.params as PathParamsT,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: ((ctx.request as any).body ?? {}) as ReqBodyT,
      query: ctx.query as unknown as QueryParamsT,
    };
  }

  export type Middleware<
    ResBodyT,
    StateT = KoaDefaultState,
    ContextT = KoaDefaultContext
  > = KoaMiddleware<StateT, ContextT, ResBodyT>;
}

export default TypedKoa;
