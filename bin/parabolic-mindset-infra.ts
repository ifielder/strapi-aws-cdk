#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ParabolicMindsetInfraStack } from '../lib/parabolic-mindset-infra-stack';

require('dotenv').config();

const app = new cdk.App();
new ParabolicMindsetInfraStack(app, 'ParabolicMindsetInfraStack', {
  env: { region: process.env.CDK_DEFAULT_REGION, account: process.env.CDK_DEFAULT_ACCOUNT },
});
