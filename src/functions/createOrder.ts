import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { v4 as uuid } from "uuid";

const dynamoDb = new DynamoDB.DocumentClient();

export const create: APIGatewayProxyHandler = async ({ body }) => {
  const data = JSON.parse(body || "{}");
  const orderId = uuid();

  const params = {
    TableName: "OrdersTable",
    Item: {
      orderId,
      customerName: data.customerName,
      items: data.items,
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Could not create order", error }),
    };
  }
};
