import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export interface HitCounterProps {
  downStream: lambda.IFunction;
}

export class HitCounter extends cdk.Construct {

  public readonly handler: lambda.Function;
  public readonly table: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
    super(scope, id);

    const table = new dynamodb.Table(this, 'Hits', {
      partitionKey: {name: 'path', type: dynamodb.AttributeType.STRING}
    });
    this.table = table;

    this.handler = new lambda.Function(this, 'HitCounterHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'hitcounter.handler',
      code: lambda.Code.fromAsset('src/lambda'),
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downStream.functionName,
        HITS_TABLE_NAME: table.tableName
      }
    });

    table.grantReadWriteData(this.handler);

    props.downStream.grantInvoke(this.handler);
  }


}
