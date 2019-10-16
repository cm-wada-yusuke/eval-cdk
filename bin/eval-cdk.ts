#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { HitCounterApiStack } from '../lib/hit-counter-api-stack';
import { ViewCounterTableWebStack } from '../lib/view-counter-table-web-stack';

const app = new cdk.App();
const hitCounter = new HitCounterApiStack(app, 'HelloApiStack');
new ViewCounterTableWebStack(app, 'HitCounterViewerStack', {counterTable: hitCounter.counterTable});



