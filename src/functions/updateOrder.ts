import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const update: APIGatewayProxyHandler = async ({
  pathParameters,
  body,
}) => {
  const orderId = pathParameters?.orderId;
  const data = JSON.parse(body || "{}");

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
    UpdateExpression:
      "SET customerName = :customerName, items = :items, status = :status",
    ExpressionAttributeValues: {
      ":customerName": data.customerName,
      ":items": data.items,
      ":status": data.status,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error updating order:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to update order" }),
    };
  }
};
