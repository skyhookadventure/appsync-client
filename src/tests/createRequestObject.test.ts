import createRequestObject from "../createRequestObject";
import { GetTodoDocument } from "./mockQueries";

const testParams = {
  host: "example.com",
  path: "/graphql",
  query: GetTodoDocument,
  variables: {
    id: "todoId",
  },
};

test("Creates a request object", () => {
  createRequestObject(testParams);
});

describe("Parameters", () => {
  const testResult = createRequestObject(testParams);

  test("Host set correctly", () => {
    expect(testResult.host).toBe(testParams.host);
  });

  test("Path set correctly", () => {
    expect(testResult.path).toBe(testParams.path);
  });

  test("Query is correctly set in JSON stringified body", () => {
    const body = JSON.parse(testResult.body);
    expect(body.query).toMatchInlineSnapshot(`
      "query getTodo($id: ID!) {
        todo(id: $id) {
          id
          detail
        }
      }
      "
    `);
  });

  test("Variables are correctly set in JSON stringified body", () => {
    const body = JSON.parse(testResult.body);
    expect(body.variables).toEqual(testParams.variables);
  });
});
