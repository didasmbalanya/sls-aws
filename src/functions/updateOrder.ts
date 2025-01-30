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
    TableName: process.env.ORDERS_TABLE!,
    Key: {
      orderId,
    },
    UpdateExpression: 'SET #customerName = :customerName, #items = :items, #status = :status',
    ExpressionAttributeNames: {
      '#customerName': 'customerName',
      '#items': 'items',
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':customerName': data.customerName,
      ':items': data.items,
      ':status': data.status,
    },
    ConditionExpression: 'attribute_exists(orderId)', // Ensure the item exists
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.log(error);
    if (error.code === 'ValidationException') {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
      };
    }
    if (error.code === 'ConditionalCheckFailedException') {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Order not found' }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not update order' }),
    };
  }
};
