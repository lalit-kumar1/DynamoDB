import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import client from "./dynamoClient/client";

const main = async () => {
	const command = new CreateTableCommand({
		TableName: "Users",
		AttributeDefinitions: [
			{
				AttributeName: "FirstName",
				AttributeType: "S",
			},
			{
				AttributeName: "LastName",
				AttributeType: "S",
			},
		],
		KeySchema: [
			{
				AttributeName: "FirstName",
				KeyType: "HASH",
			},
			{
				AttributeName: "LastName",
				KeyType: "RANGE",
			},
		],
		ProvisionedThroughput: {
			ReadCapacityUnits: 1,
			WriteCapacityUnits: 1,
		},
	});

	const response = await client.send(command);
	console.log(response);
};

(async () => {
	await main();
})();
