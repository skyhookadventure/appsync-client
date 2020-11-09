import { RequestOptions } from "https";

export type RequestObjectParams = {
  host: string;
  path: string;
  query: string;
  variables: Object;
};

export type RequestObject = RequestOptions & {
  service: string;
  body: string;
};

export default function createRequestObject({
  host,
  path,
  query,
  variables,
}: RequestObjectParams): RequestObject {
  return {
    host,
    method: "POST",
    path,
    service: "appsync",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };
}
