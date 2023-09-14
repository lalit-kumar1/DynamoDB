import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import client from "./dynamoClient/client";

const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
	const command = new ScanCommand({
		FilterExpression: "FirstName = :f_name OR FirstName = :l_name",
		ExpressionAttributeValues: { ":f_name": "Sunny", ":l_name": "Lalit" },
		TableName: "Users",
	});

	const response = await docClient.send(command);
	console.log(response);
};

(async () => {
	await main();
})();
