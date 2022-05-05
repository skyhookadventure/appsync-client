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
        try {
          // JSON parse the response body
          const body = JSON.parse(rawResponseBody);

          // Reject if no data
          if (!body.data) {
            reject(Error(rawResponseBody));
          }

          // Resolve with just that data
          resolve(body.data);
        } catch (e) {
          // Throw the full body if it isn't JSON (usually this is where a GraphQL server is responding with e.g. an
          // error page instead of a properly formatted GraphQL error.)
          reject(Error(rawResponseBody));
        }
      });
    });

    // Handle other errors
    httpsRequest.on("error", (e) => {
      reject(e);
    });

    httpsRequest.write(requestObject.body);

    httpsRequest.end();
  });
}
