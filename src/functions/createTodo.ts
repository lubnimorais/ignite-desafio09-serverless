import { document } from '../utils/dynamodbClient';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuid } from 'uuid';

interface ICreateTodo {
  title: string;
  deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  await document.put({
    TableName: 'todos',
    Item: {
      id: uuid(),
      userid,
      title,
      done: false,
      deadline: new Date(deadline),
    }
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created!',
    }),
    headers: {
      'Content-type': 'application/json'
    }
  }
}