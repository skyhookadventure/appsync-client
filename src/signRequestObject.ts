import aws4 from "aws4";
import { RequestObject } from "./createRequestObject";

export type SignRequestObjectParams = {
  requestObject: RequestObject;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
};

export default function signRequestObject({
  requestObject,
  accessKeyId,
  secretAccessKey,
  sessionToken,
}: SignRequestObjectParams) {
  // Clone so we don't mutate the original request object
  const obj = JSON.parse(JSON.stringify(requestObject));

  aws4.sign(obj, {
    accessKeyId,
    secretAccessKey,
    sessionToken,
  });

  return obj;
}
