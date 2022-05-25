<div align="center">
# TypedKoa

Transform untyped Koa context into **typed request** for better Typescript support

[Installation](#installation) •
[Usage](#usage)

</div>

## Installation

```sh
npm i typedkoa    # npm
yarn add typedkoa # yarn
pnpm i typedkoa   # pnpm
```

## Usage

```typescript
import TypedKoa from "typedkoa";

interface Student {
  classroomId: string;
  name: string;
  age: number;
}

interface PathParams {
  classroomId: string;
}

interface ReqBody {
  name: string;
  age: number;
}

interface QueryParams {}

interface ResBody {
  name: string;
  age: number;
}

// Koa request handler / middleware
const createStudent = (ctx, next): TypedKoa.Middleware<ResBody> => {
  // request params, body and query are type inferred
  const { params, body, query } = TypedKoa.request<
    PathParams,
    ReqBody,
    QueryParams
  >(ctx);

  const student = new Student({
    ...body,
    classroomId: params.classroomId,
  });

  // response body will have type validation
  ctx.body = student;

  next();
};
```
