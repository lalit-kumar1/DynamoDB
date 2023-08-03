import {
	BatchWriteCommand,
	DynamoDBDocumentClient,
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
			],
		},
	});

	const result = await docClient.send(command);
	console.log(result);
};

(async () => {
	await main();
})();
