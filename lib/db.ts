import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';
import { Secret } from '@aws-cdk/aws-secretsmanager';
import * as iam from '@aws-cdk/aws-iam';
export interface DBStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}
export class DB extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: DBStackProps) {
    super(scope, id, props);

    // create new role for stack
    const role = new iam.Role(this, 'Role', { assumedBy: new iam.AccountRootPrincipal() });

    // grab secrets
    const secret = Secret.fromSecretAttributes(this, 'Secret', {
      secretArn: process.env.SECRET_ARN || 'null',
    });
    // grand read access to secret for stack
    secret.grantRead(role);

    // create rds instance
    new rds.DatabaseInstance(this, 'db', {
      engine: rds.DatabaseInstanceEngine.POSTGRES,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      vpc: props.vpc,
      allocatedStorage: 20,
      deletionProtection: true,
      maxAllocatedStorage: 100,
      databaseName: secret.secretValueFromJson('dbName').toString(),
      masterUsername: secret.secretValueFromJson('dbMaster').toString(),
      masterUserPassword: secret.secretValueFromJson('dbPassword'),
    });
  }
}
