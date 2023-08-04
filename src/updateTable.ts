import { CreateTableCommand, UpdateTableCommand, UpdateTimeToLiveCommand } from "@aws-sdk/client-dynamodb";
import client from "./dynamoClient/client";

const main = async () => {
	const command = new UpdateTimeToLiveCommand({
		TableName: "Users",
        TimeToLiveSpecification: {
            AttributeName: "TTL",
            Enabled: true
        }
	});

	const response = await client.send(command);
	console.log(response);
};

(async () => {
	await main();
})();
