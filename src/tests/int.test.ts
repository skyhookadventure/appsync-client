import AppsyncClient from "../AppsyncClient";

test("runs", async () => {
  const client = new AppsyncClient({
    apiUrl:
      "https://pkg3gwk7ijf5hoyaj23k6ixnk4.appsync-api.eu-west-1.amazonaws.com/graphql",
    // Optional - these will default to process.env values (e.g. the IAM
    // role of a Lambda)
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: "",
  });
});
