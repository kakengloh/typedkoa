<div align="center">

# TypedKoa

Transform untyped Koa context into **typed request** for better Typescript support

[Installation](#installation) •
[Example](#example)

</div>

## Installation

```sh
npm i typedkoa    # npm
yarn add typedkoa # yarn
pnpm i typedkoa   # pnpm
```

## Example

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

type ResBody = Student;

// Koa request handler / middleware
const createStudent: TypedKoa.Middleware<ResBody> = (ctx, next) => {
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
