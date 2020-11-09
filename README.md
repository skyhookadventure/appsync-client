# Appsync Client

[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![version](https://badgen.net/npm/v/appsync-client)](https://www.npmjs.com/package/appsync-client)
![dependants](https://badgen.net/npm/dependents/appsync-client) ![license](https://badgen.net/npm/license/appsync-client)

A lightweight Appsync client that signs requests for you - perfect for running on Lambdas or servers. This module has
not been tested for use on the browser.

When using [tree-shaking](https://webpack.js.org/guides/tree-shaking/), the impact on your bundle size is just a few kb.

## Use

```typescript
import AppsyncClient from "appsync-client";

async function getTodo() {

    // Create a client
    const client = new AppsyncClient({
        // Required
        apiUrl: "https://xxx.appsync-api.xx-xxxx-x.amazonaws.com/graphql",
        // Optional - these will default to process.env values (e.g. the IAM
        // role of the Lambda)
        accessKeyId: "",
        secretAccessKey: "",
        sessionToken: ""
    });

    // Query for TODOS
    const res = await client.request({
        // The query string - can be manually written, or you can use amplify
        // codegen to create these
        query: `query Todo(id: $id) {
            getTodo(id: $id) {
                id
                title
                description
            }
        }`,
        // Variables to replace (here we are replacing $id with "todoId")
        variables: {
            id: "todoId"
        }
    );
}
```

### Linting queries

If you are using [eslint-plugin-graphql](https://www.npmjs.com/package/eslint-plugin-graphql), queries need to be tagged
so that they can be linted. This module exports gql as a fake tag to do this:

```typescript
import { gql } from "appsync-client";

const query = gql`query Todo(id: $id) {
        getTodo(id: $id) {
            id
            title
            description
        }
    }`;
```

## Checklist

| CD Feature | Provided                     |
| ---------- | ---------------------------- |
| ✅         | Typescript                   |
| ✅         | Linting (AirBnB + Prettier)  |
| ✅         | Unit tests (Jest)            |
| ✅         | 100% test coverage           |
| ✅         | Github Continuous Deployment |

## Built by Skyhook

This module is contributed by the team at [Skyhook](https://www.skyhookadventure.com/)
