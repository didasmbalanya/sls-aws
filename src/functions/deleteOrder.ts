import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const remove: APIGatewayProxyHandler = async ({ pathParameters }) => {
  const orderId = pathParameters?.orderId;

  if (!orderId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Order ID is required" }),
    };
  }

  const params = {
    TableName: process.env.ORDERS_TABLE!,
    Key: {
      orderId,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Order deleted successfully" }),
    };
  } catch (error) {
    console.error("Error deleting order:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to delete order" }),
    };
  }
};
