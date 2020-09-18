#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StrapiInfraStack } from '../lib/strapi-infra-stack';

require('dotenv').config();

const app = new cdk.App();
new StrapiInfraStack(app, 'StrapiInfraStack', {
  env: { region: process.env.CDK_DEFAULT_REGION, account: process.env.CDK_DEFAULT_ACCOUNT },
});
app.synth();
