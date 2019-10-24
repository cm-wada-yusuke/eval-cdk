import cdk = require('@aws-cdk/core');
import * as lambda from '@aws-cdk/aws-lambda';


import { Construct } from '@aws-cdk/core';
import { ILayerVersion } from '@aws-cdk/aws-lambda';

export class LayerStack extends cdk.Stack {

  public readonly nodeModulesLayer: ILayerVersion;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nodeModulesLayer = new lambda.LayerVersion(this, 'NodeModulesLayer',
      {
        code: lambda.Code.fromAsset('node_modules', {}),
        compatibleRuntimes: [lambda.Runtime.NODEJS_10_X]
      }
    );

    this.nodeModulesLayer = nodeModulesLayer;

  }
}
