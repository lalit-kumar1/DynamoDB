import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import client from "./dynamoClient/client";

const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
	const command = new GetCommand({
		TableName: "Users",
		Key: {
			FirstName: "Arun"
		},
	});

	const response = await docClient.send(command);
	console.log(response);
};

(async () => {
	await main();
})();
