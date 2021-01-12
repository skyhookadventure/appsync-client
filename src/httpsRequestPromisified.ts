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

      // Handle response data
      result.on("data", (rawResponse: Buffer) => {
        const stringResponse = rawResponse.toString();

        // Try to parse it
        try {
          const body = JSON.parse(stringResponse);

          // Throw if no data (e.g. if there are just errors)
          if (!body.data) throw Error();

          resolve(body.data);
        } catch (_e) {
          reject(Error(stringResponse));
        }
      });
    });

    httpsRequest.on("error", (e) => {
      throw e;
    });

    httpsRequest.write(requestObject.body);
    httpsRequest.end();
  });
}
