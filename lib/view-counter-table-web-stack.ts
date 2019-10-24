import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { Construct } from '@aws-cdk/core';
import { TableViewer } from 'cdk-dynamo-table-viewer';

export interface  ViewCounterTableWebStackProps extends cdk.StackProps {
  counterTable: dynamodb.Table
}

interface StageContext  {
  hitCounterSiteName: string;
}

export class ViewCounterTableWebStack extends cdk.Stack {

  constructor(scope: Construct, name: string, props: ViewCounterTableWebStackProps) {
    super(scope, name, props);

    this.node.setContext('priority', 'ViewCounterTableWebStack');

    const env: string = this.node.tryGetContext("env");
    const context: StageContext = this.node.tryGetContext(env);

    new TableViewer(this, 'ViewHitHandler', {
      title: context.hitCounterSiteName,
      table: props.counterTable,
      sortBy: '-hits'
    });


  }
}
