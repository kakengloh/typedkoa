<div align="center">

# TypedKoa

Koa route handler with great Typescript support

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
import { Route } from "typedkoa";

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

// `Route` function accepts a handler function as an argument and returns a Koa middleware
const createStudent = Route<PathParams, ResBody, ReqBody, QueryParams>(
  async (req, res, ctx) => {
    // Request `params`, `body` and `query` are type inferred
    const { params, body, query } = req;

    const student = new Student({
      ...body,
      classroomId: params.classroomId,
    });

    // response body is type checked
    return student;
  }
);
```
