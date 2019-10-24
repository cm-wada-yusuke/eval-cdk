import cdk = require('@aws-cdk/core');
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { HitCounter } from './construct/hitcounter';
import { Construct } from '@aws-cdk/core';
import { ILayerVersion } from '@aws-cdk/aws-lambda';

// export interface HitCounterApiStackProps extends cdk.StackProps {
//   nodeModulesLayer: ILayerVersion
// }

export class HitCounterApiStack extends cdk.Stack {
  public readonly counterTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('src/lambda'),
      handler: 'hello.handler',
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downStream: hello
    });

    this.counterTable = helloWithCounter.table;

    new apigw.LambdaRestApi(this, 'Endpoint',
      {
        handler: helloWithCounter.handler,
      }
    );

  }
}
