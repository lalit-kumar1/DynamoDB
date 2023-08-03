import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import client from "./dynamoClient/client";

const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
	const command = new ScanCommand({
		ProjectionExpression: "Mobile",
		FilterExpression: "FirstName = :f_name",
		ExpressionAttributeValues: { ":f_name": "Arun" },
		TableName: "Users",
	});

	const response = await docClient.send(command);
	console.log(response);
};

(async () => {
	await main();
})();
