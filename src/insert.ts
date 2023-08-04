import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import client from "./dynamoClient/client";

const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
	const command = new PutCommand({
		TableName: "Users",
		Item: {
			FirstName: "Sunny",
			LastName: "Mehta",
            Mobile: 1234567890,
            TTL: 1691128840
        },
	});

	const response = await docClient.send(command);
	console.log(response);
};

(async () => {
	await main();
})();
