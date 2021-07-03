import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from '../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  console.log(userid)

  const response = await document.query({
    TableName: 'todos',
    KeyConditionExpression: 'userid = :userid',
    ExpressionAttributeValues: {
      ":userid": userid
    }
  }).promise();

  const todos = response.Items;

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos,
    })
  }
}