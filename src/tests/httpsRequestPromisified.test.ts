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

it("returns the correct response body on success", async () => {
  nock(`https://${testRequestObject.host}`)
    .post(testRequestObject.path)
    .reply(200, mockResponse);
  const res = await httpsRequestPromisified(testRequestObject);
  expect(res).toEqual(mockResponse.data);
});

it("throws with a 400 response", async () => {
  const incorrectHost = "badhost.example.com";
  nock(`https://${incorrectHost}`).post(testRequestObject.path).reply(400, {});
  await expect(
    httpsRequestPromisified({ ...testRequestObject, host: incorrectHost })
  ).rejects.toThrow();
});

it("throws with a graphql error", async () => {
  const graphErrorHost = "graphError.example.com";
  nock(`https://${graphErrorHost}`)
    .post(testRequestObject.path)
    .reply(200, {
      errors: [{ name: "error1" }],
    });
  await expect(
    httpsRequestPromisified({
      ...testRequestObject,
      host: graphErrorHost,
    })
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"{\\"errors\\":[{\\"name\\":\\"error1\\"}]}"`
  );
});
