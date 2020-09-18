import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecr from '@aws-cdk/aws-ecr';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';

export interface DBStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class Container extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: DBStackProps) {
    super(scope, id, props);

    // create cluster inside vpc
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: props.vpc,
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'Fargate', {
      cluster: cluster,
      assignPublicIp: true, // Required
      cpu: 512, // Default is 256
      desiredCount: 1,

      // Default is 1
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('strapi/strapi'),
        containerPort: 1337,
      },
      memoryLimitMiB: 2048,
      publicLoadBalancer: true,
      listenerPort: 80,
      openListener: true,
    });
  }
}
