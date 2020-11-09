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
        const body = JSON.parse(rawResponse.toString());
        if (body.data) {
          resolve(body.data);
        } else {
          reject(new Error(body));
        }
      });
    });

    httpsRequest.write(requestObject.body);
    httpsRequest.end();
  });
}
