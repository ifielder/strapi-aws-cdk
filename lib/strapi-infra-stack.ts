import * as cdk from '@aws-cdk/core';
import { Vpc } from '@aws-cdk/aws-ec2';
import { DB } from './db';
import { Container } from './container';
export class StrapiInfraStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // use the default vpc for this account
    const vpc = Vpc.fromLookup(this, 'VPC', { isDefault: true });

    new Container(scope, 'Container', { vpc });
    new DB(scope, 'DB', {
      vpc,
    });
  }
}
