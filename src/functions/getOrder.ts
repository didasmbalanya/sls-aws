import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const get: APIGatewayProxyHandler = async ({ pathParameters }) => {
  const orderId = pathParameters?.orderId;

  if (!orderId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Order ID is required" }),
    };
  }
  const params = {
    TableName: "OrdersTable",
    Key: {
      orderId,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Order not found" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error("Error retrieving order:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to retrieve order" }),
    };
  }
};


