import { DeleteTableCommand } from "@aws-sdk/client-dynamodb";
import client from "./dynamoClient/client";

export const main = async () => {
  const tables = [
    "pricing_components_metadata_v1",
    "product_tiers_v1",
    "product_tiers_v1_audit",
    "subscription_tiers_v1",
    "subscription_tiers_v1_audit",
    "promotions_v1",
    "promotions_v1_audit",
  ];
  tables.forEach(async (table) => {
    const command = new DeleteTableCommand({
      TableName: "TestUnit",
    });

    try {
      const response = await client.send(command);
    } catch (err: any) {
      console.log(err.message);
    }
  });
};

(async () => {
  await main();
})();
