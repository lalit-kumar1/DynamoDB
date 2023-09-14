import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import client from "./dynamoClient/client";
import { v4 } from "uuid";

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

export const main = async () => {
  const command = new PutCommand({
    TableName: "Users",
    Item: {
      FirstName: "Lalit",
      LastName: "K",
      Mobile: 1234,
      Gender: "S",
    },
    ConditionExpression: "",
  });

  try {
    const response = await docClient.send(command);
    console.log(response.$metadata.httpStatusCode);
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof ConditionalCheckFailedException) console.log(err);
  }
};

(async () => {
  await main();
})();
