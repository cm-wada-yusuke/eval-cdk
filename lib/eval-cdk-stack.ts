import cdk = require('@aws-cdk/core');
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { HitCounter } from './construct/hitcounter';
import {TableViewer} from 'cdk-dynamo-table-viewer';

export class EvalCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('src/lambda'),
      handler: 'hello.handler'
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downStream: hello
    });

    new apigw.LambdaRestApi(this, 'Endpoint',
      {
        handler: helloWithCounter.handler,
      }
    );

    new TableViewer(this, 'ViewHitHandler', {
      title: 'Hello Hits',
      table: helloWithCounter.table,
      sortBy: 'hits'
    });

  }
}
