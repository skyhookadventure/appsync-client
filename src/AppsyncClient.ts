import { parse } from "url";
import createRequestObject from "./createRequestObject";
import signRequestObject from "./signRequestObject";
import httpsRequestPromisified from "./httpsRequestPromisified";

const gql = require("fake-tag");

export type AppsyncClientParams = {
  // API url of the form https://xxxxxxxxxxxxxxxxxxxxxxxxxx.appsync-api.xx-xxxx-x.amazonaws.com/graphql
  apiUrl: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
};

export type AppsyncClientQuery = {
  query: string;
  variables: Object;
};

export default class AppsyncClient {
  private host: string;

  private path: string;

  private accessKeyId: string;

  private secretAccessKey: string;

  private sessionToken: string;

  constructor({
    apiUrl,
    accessKeyId = process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string,
    sessionToken = process.env.AWS_SESSION_TOKEN as string,
  }: AppsyncClientParams) {
    const apiUrlParsed = parse(apiUrl);
    this.host = apiUrlParsed.host as string;
    this.path = apiUrlParsed.path as string;
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;
  }

  /**
   * Request
   */
  public request({ query, variables }: AppsyncClientQuery): Promise<Object> {
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

    return httpsRequestPromisified(signedRequestObject);
  }
}

export { gql };
