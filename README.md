# Appsync Client

[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![version](https://badgen.net/npm/v/appsync-client)](https://www.npmjs.com/package/appsync-client)
![dependants](https://badgen.net/npm/dependents/appsync-client) ![license](https://badgen.net/npm/license/appsync-client)

A lightweight Appsync client that signs requests for you (using IAM permissions) - perfect for running on Lambdas or servers.

Queries are made using
[TypedDocumentNode](https://github.com/dotansimha/graphql-typed-document-node)
which means that the variables and results will be automatically typed for you
if using Typescript.

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

    // Query for Todos
    const res = await client.request({
        // The typed document node query
        query: TypedDocumentNodeQuery,
        // Variables to replace (here we are replacing $id with "todoId")
        variables: {
            id: "todoId"
        }
    );
}
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
