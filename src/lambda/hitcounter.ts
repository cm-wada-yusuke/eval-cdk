import { DynamoDB, Lambda } from 'aws-sdk';
import * as Console from 'console';

export const handler = async (event: any) => {
  Console.log('request:', JSON.stringify(event, undefined, 2));

  const dyanmo = new DynamoDB.DocumentClient();
  const lambda = new Lambda();

  await dyanmo.update({
    TableName: process.env.HITS_TABLE_NAME!,
    Key: {path: event.path},
    UpdateExpression: 'ADD hits :incr',
    ExpressionAttributeValues: {':incr': 1}
  }).promise();

  // call downstream function and capture response
  const resp = await lambda.invoke({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME!,
    Payload: JSON.stringify(event)
  }).promise();

  Console.log('downstream response:', JSON.stringify(resp, undefined, 2));

  return JSON.parse(resp.Payload as string);
};
