import nock from "nock";
import AppsyncClient, { gql } from "../AppsyncClient";
import { GetTodoDocument } from "./mockQueries";

const testDomain = "https://example.appsync.com";
const testPath = "/graphql";

const testParams = {
  apiUrl: testDomain + testPath,
  accessKeyId: "dummy",
  secretAccessKey: "dummy",
  sessionToken: "dummy",
};

const mockResponse = {
  data: {
    id: "testId",
    detail: "testDetail",
  },
};

test("Creates client", () => {
  new AppsyncClient(testParams);
});

test("Response returns body", async () => {
  nock(testDomain).post(testPath).reply(200, mockResponse);
  const res = await new AppsyncClient(testParams).request({
    query: GetTodoDocument,
    variables: {
      id: "id",
    },
  });
  expect(res).toEqual(mockResponse.data);
});

test("Works with process.env credentials", async () => {
  process.env = {
    ...process.env,
    AWS_ACCESS_KEY_ID: "dummy",
    AWS_SECRET_ACCESS_KEY: "dummy",
    AWS_SESSION_TOKEN: "dummy",
  };
  nock(testDomain).post(testPath).reply(200, mockResponse);
  const res = await new AppsyncClient({ apiUrl: testParams.apiUrl }).request({
    query: GetTodoDocument,
    variables: {
      id: "id",
    },
  });
  expect(res).toEqual(mockResponse.data);
});

test("Graphql fake-tag works", () => {
  const res = gql`hi`;
  expect(res).toBe("hi");
});
