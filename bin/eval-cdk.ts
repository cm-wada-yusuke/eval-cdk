#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { EvalCdkStack } from '../lib/eval-cdk-stack';

const app = new cdk.App();
new EvalCdkStack(app, 'EvalCdkStack');