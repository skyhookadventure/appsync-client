import signRequestObject from "../signRequestObject";

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

const testCredentials = {
  accessKeyId: "testAccessKeyId",
  secretAccessKey: "testSecretAccessKey",
  sessionToken: "testSessionToken",
};

test("Signed object includes original properties", () => {
  const signed = signRequestObject({
    requestObject: testRequestObject,
    ...testCredentials,
  });

  delete signed.headers;
  const expected = JSON.parse(JSON.stringify(testRequestObject));
  delete expected.headers;
  expect(signed).toEqual(expected);
});

describe("signed has authorization headers", () => {
  const signed = signRequestObject({
    requestObject: testRequestObject,
    ...testCredentials,
  });

  test("X-Amz-Security-Token", () => {
    expect(signed.headers["X-Amz-Security-Token"]).toBe(
      testCredentials.sessionToken
    );
  });

  test("X-Amz-Date", () => {
    expect(signed.headers["X-Amz-Date"]).toMatch(/^[\d]{8}T[\d]{6}Z/g);
  });

  test("Authorization", () => {
    expect(signed.headers.Authorization).toMatch(
      /^AWS4-HMAC-SHA256 Credential=[\w]*\/[\w]*\/[\w]*-[\w]*-[\w]\/[\w]*\/aws4_request, SignedHeaders=.*, Signature=.*/g
    );
  });
});
