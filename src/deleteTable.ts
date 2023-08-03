import { DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import client from "./dynamoClient/client";

export const main = async () => {
	const command = new DeleteTableCommand({
		TableName: "Users",
	});

	const response = await client.send(command);
	console.log(response);
};

(async () => {
	await main();
})();
