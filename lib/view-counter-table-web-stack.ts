import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { Construct } from '@aws-cdk/core';
import { TableViewer } from 'cdk-dynamo-table-viewer';

export interface  ViewCounterTableWebStackProps extends cdk.StackProps {
  counterTable: dynamodb.Table
}

export class ViewCounterTableWebStack extends cdk.Stack {

  constructor(scope: Construct, name: string, props: ViewCounterTableWebStackProps) {
    super(scope, name, props);

    new TableViewer(this, 'ViewHitHandler', {
      title: 'Hello Hits',
      table: props.counterTable,
      sortBy: '-hits'
    });


  }
}
