/* eslint-disable import/no-extraneous-dependencies */
import { parse } from "url";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import createRequestObject from "./createRequestObject";
import signRequestObject from "./signRequestObject";
import httpsRequestPromisified from "./httpsRequestPromisified";

const gql = require("fake-tag");

export type AppsyncClientParams = {
  /**
   * API url of the form https://xxxxxxxxxxxxxxxxxxxxxxxxxx.appsync-api.xx-xxxx-x.amazonaws.com/graphql
   */
  apiUrl: string;

  /**
   * AWS Access Key ID
   */
  accessKeyId?: string;

  /**
   * AWS Secret Access Key ID
   */
  secretAccessKey?: string;

  /**
   * AWS Session Token
   */
  sessionToken?: string;
};

export type AppsyncClientQuery = {
  query: string;
  variables: Object;
};

/**
 * Appsync Client
 */
export default class AppsyncClient {
  private host: string;

  private path: string;

  private accessKeyId: string;

  private secretAccessKey: string;

  private sessionToken: string;

  /**
   * Create an Appsync Client
   *
   * @example
   * // Create a client
   * const client = new AppsyncClient({
   *     // Required
   *     apiUrl: "https://xxx.appsync-api.xx-xxxx-x.amazonaws.com/graphql",
   *     // Optional - these will default to process.env values (e.g. the IAM
   *     // role of a Lambda)
   *     accessKeyId: "",
   *     secretAccessKey: "",
   *     sessionToken: ""
   * });
   *
   */
  constructor({
    apiUrl,
    accessKeyId = process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string,
    sessionToken = process.env.AWS_SESSION_TOKEN as string,
  }: AppsyncClientParams) {
    if (!apiUrl || apiUrl === "") {
      throw Error("The AppSync graphql API URL can not be undefined or empty!");
    }
    const apiUrlParsed = parse(apiUrl);
    this.host = apiUrlParsed.host as string;
    this.path = apiUrlParsed.path as string;
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;
  }

  /**
   * Request
   *
   * Send a query or mutation to Appsync.
   *
   * @example
   * const res = await client.request({
   *     // The typed document node query
   *     query: TypedDocumentNodeQuery,
   *     // Variables to replace (here we are replacing $id with "todoId")
   *     variables: {
   *         id: "todoId"
   *     }
   * );
   *
   */
  public request<TData = any, TVariables = Record<string, any>>({
    query,
    variables,
  }: {
    query: TypedDocumentNode<TData, TVariables>;
    variables?: TVariables;
  }): Promise<TData> {
    const requestObject = createRequestObject({
      host: this.host,
      path: this.path,
      query,
      variables,
    });

    const signedRequestObject = signRequestObject({
      requestObject,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      sessionToken: this.sessionToken,
    });

    return httpsRequestPromisified(signedRequestObject) as Promise<TData>;
  }
}

export { gql };
