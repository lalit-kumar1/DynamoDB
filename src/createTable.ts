import {
  CreateTableCommand,
  DescribeTableCommand,
  UpdateTableCommand,
} from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import client from "./dynamoClient/client";

const main = async () => {
  const command = new CreateTableCommand({
    TableName: "user_by_id_dev",
    KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" },
      { AttributeName: "domain", AttributeType: "S" },
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 25 },
    GlobalSecondaryIndexes: [
      {
        IndexName: "user_by_email",
        KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 25,
        },
      },
      {
        IndexName: "user_by_domain",
        KeySchema: [{ AttributeName: "domain", KeyType: "HASH" }],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 25,
        },
      },
    ],
  });

  const get = new DescribeTableCommand({
    TableName: "TestUnit",
  });

  // const update = new UpdateTableCommand({
  //   TableName: "TestUnit",
  //   ProvisionedThroughput: {
  //     ReadCapacityUnits: 0,
  //     WriteCapacityUnits: 0,
  //   },
  // });

  // const response = await client.send(update);
  // console.log(response.TableDescription);
  // console.log(response.TableDescription?.GlobalSecondaryIndexes);

  const gett = new DescribeTableCommand({
    TableName: "TestUnit",
  });
  const res = await client.send(command);
  console.log(res.TableDescription?.ProvisionedThroughput);
};

(async () => {
  await main();
})();
