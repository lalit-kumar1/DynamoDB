import {
	BatchWriteCommand,
	DynamoDBDocumentClient,
	TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import client from "./dynamoClient/client";

const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
	const command = new BatchWriteCommand({
		RequestItems: {
			["Users"]: [
				{
					PutRequest: {
						Item: {
							FirstName: "Ashish",
							LastName: "Mechoo",
							Mobile: 1234567890,
						},
					},
				},
				{
					PutRequest: {
						Item: {
							FirstName: "Deepraj",
							LastName: "Singh",
							Mobile: 1234567890,
						},
					},
				},
				{},
			],
		},
	});

	const c = new TransactWriteCommand({
		TransactItems: [
			{
				Update: {
					TableName: "coreos_agent_tenant_registry_v1",
					Key: { tenantId: "delhivery", stackId: "test_stack" },
					UpdateExpression: "set organizationShortName = :x",
					ExpressionAttributeValues: {
						":x": "org",
					},
				},
			},
		],
	});

	const result = await docClient.send(c);
	console.log(result);
};

(async () => {
	await main();
})();
