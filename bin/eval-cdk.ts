#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { HitCounterApiStack } from '../lib/hit-counter-api-stack';
import { ViewCounterTableWebStack } from '../lib/view-counter-table-web-stack';
import { LayerStack } from '../lib/layer-stack';

const envTokyo = {region: 'ap-northeast-1'};

const app = new cdk.App();

// const layerStack = new LayerStack(app, 'HelloApiFunctionLayerStack');
const hitCounter = new HitCounterApiStack(app, 'HelloApiStack', {
  env: envTokyo,
  // nodeModulesLayer: layerStack.nodeModulesLayer
});
new ViewCounterTableWebStack(app, 'HitCounterViewerStack', {env: envTokyo, counterTable: hitCounter.counterTable});


