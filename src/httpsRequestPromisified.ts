import { request } from "https";
import { RequestObject } from "./createRequestObject";

export default function httpsRequestPromisified(
  requestObject: RequestObject
): Promise<Object> {
  return new Promise((resolve, reject) => {
    const httpsRequest = request(requestObject, (result: any) => {
      if (result.statusCode !== 200) {
        reject(new Error(`Error: Status Code ${result.statusCode}`));
      }

      result.on("data", (rawResponse: Buffer) => {
        const responseString = rawResponse.toString();
        const body = JSON.parse(responseString);
        if (body.data) {
          resolve(body.data);
        } else {
          reject(new Error(responseString));
        }
      });
    });

    httpsRequest.write(requestObject.body);
    httpsRequest.end();
  });
}
