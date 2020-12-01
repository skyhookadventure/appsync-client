/* eslint-disable import/no-extraneous-dependencies */
import { RequestOptions } from "https";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql/language/printer";

export type RequestObjectParams = {
  host: string;
  path: string;
  query: TypedDocumentNode;
  variables: any;
};

export type RequestObject = RequestOptions & {
  service: string;
  body: string;
};

/**
 * Create a HTTP request object from the query
 */
export default function createRequestObject({
  host,
  path,
  query,
  variables,
}: RequestObjectParams): RequestObject {
  // Covert the DocumentNode to a raw string query
  const rawQuery = print(query);

  return {
    host,
    method: "POST",
    path,
    service: "appsync",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: rawQuery,
      variables,
    }),
  };
}
