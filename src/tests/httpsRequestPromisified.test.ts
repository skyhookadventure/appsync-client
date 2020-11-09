import nock from "nock";
import httpsRequestPromisified from "../httpsRequestPromisified";

const testRequestObject = {
  host: "host.example.com",
  method: "POST",
  path: "/graphql",
  service: "appsync",
  headers: {
    "TEST-HEADER": "header",
  },
  body: JSON.stringify({}),
};

const mockResponse = {
  data: {
    id: "testId",
    detailOne: "testDetailOne",
  },
};

// Correct host
nock(`https://${testRequestObject.host}`)
  .post(testRequestObject.path)
  .reply(200, mockResponse);
test("Response returns body", async () => {
  const res = await httpsRequestPromisified(testRequestObject);
  expect(res).toEqual(mockResponse.data);
});

// Incorrect host
const incorrectHost = "badhost.example.com";
nock(`https://${incorrectHost}`).post(testRequestObject.path).reply(400, {});
test("400 response throws error", async () => {
  await expect(
    httpsRequestPromisified({ ...testRequestObject, host: incorrectHost })
  ).rejects.toThrow();
});

// Graphql error
const graphErrorHost = "graphError.example.com";
nock(`https://${graphErrorHost}`)
  .post(testRequestObject.path)
  .reply(200, {
    errors: [{ name: "error1" }],
  });
test("400 response throws error", async () => {
  await expect(
    httpsRequestPromisified({
      ...testRequestObject,
      host: graphErrorHost,
    })
  ).rejects.toThrow();
});
