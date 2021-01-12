import { request } from "https";
import { RequestObject } from "./createRequestObject";

export default function httpsRequestPromisified(
  requestObject: RequestObject
): Promise<Object> {
  return new Promise((resolve, reject) => {
    const httpsRequest = request(requestObject, (result: any) => {
      // Handle HTTP error codes
      if (result.statusCode !== 200) {
        reject(new Error(`Error: Status Code ${result.statusCode}`));
      }

      // Concatenate response data chunks
      let rawResponseBody = "";
      result.on("data", (chunk: Buffer) => {
        rawResponseBody += chunk.toString();
      });

      result.on("end", () => {
        // JSON parse the response body
        const body = JSON.parse(rawResponseBody);

        // Reject if no data (e.g. if there are just errors)
        if (!body.data) {
          reject(Error(rawResponseBody));
        }

        // Resolve with just that data
        resolve(body.data);
      });
    });

    // Handle other errors
    httpsRequest.on("error", (e) => {
      reject(e);
    });

    httpsRequest.end();
  });
}
