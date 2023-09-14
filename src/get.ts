import { ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  BatchGetCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  TransactGetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import client from "./dynamoClient/client";

const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
  const command = new GetCommand({
    TableName: "coreos_agent_tenant_registry_v1",
    Key: {
      tenantId: "Handcfte",
      stackId: "abc",
    },
  });

  const name = "organizationShortName";
  const c = new QueryCommand({
    TableName: "coreos_agent_tenant_registry_v1",
    IndexName: "coreos_agent_organization_short_name_index",
    ExpressionAttributeNames: { "#key": "organizationShortName" },
    KeyConditionExpression: "#key = :f_name",
    ExpressionAttributeValues: { ":f_name": "Handcrafted" },
  });
  const scan = new ScanCommand({
    TableName: "Users",
  });

  const d = new DeleteCommand({
    TableName: "Test",
    Key: {
      FirstName: "Sunny",
    },
  });

  const f = new BatchGetCommand({
    RequestItems: {
      Users: {
        Keys: [
          {
            FirstName: "Sunny",
            LastName: "Mehta",
          },
          {
            FirstName: "Sunny",
            LastName: "Mehta",
          },
        ],
      },
    },
  });

  const t = new TransactGetCommand({
    TransactItems: [
      {
        Get: {
          TableName: "Users",
          Key: {
            FirstName: "Sunny",
            LastName: "Meht",
          },
        },
      },
      {
        Get: {
          TableName: "Users",
          Key: {
            FirstName: "Lalit",
            LastName: "Kuma",
          },
        },
      },
    ],
  });

  const u = new UpdateCommand({
    TableName: "Users",
    Key: {
      FirstName: "Lalit",
      LastName: "Ku",
    },
    UpdateExpression:
      "SET #Mobile = :Mobile, #TTL = :TTL, #FirstName = :FirstName",
    ExpressionAttributeNames: {
      "#Mobile": "Mobile",
      "#TTL": "TTL",
      "#FirstName": "FirstName",
    },
    ExpressionAttributeValues: {
      ":Mobile": 2,
      ":TTL": 2,
      ":FirstName": "Lalit",
    },
  });

  const del = new DeleteCommand({
    TableName: "Users",
    Key: {
      FirstName: "La",
      LastName: "Ku",
    },
  });

  const part = new QueryCommand({
    TableName: "Users",
    KeyConditionExpression:
      "#FirstName = :FirstName AND begins_with(#LastName, :LastName)",
    ExpressionAttributeNames: {
      "#FirstName": "FirstName",
      "#LastName": "LastName",
    },
    ExpressionAttributeValues: {
      ":FirstName": "Lalit",
      ":LastName": "K",
    },
  });
  const response = await docClient.send(command);
  console.log(response.Item);
};

(async () => {
  await main();
})();
