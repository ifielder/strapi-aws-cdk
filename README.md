# strapi-aws-cdk

## Goal:

This repo uses the AWS CDK to deploy a base strapi project.

1. [RDS postgresql instance](https://aws.amazon.com/rds/postgresql/)
2. [Fargate Task](https://aws.amazon.com/fargate/)
3. [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)
4. [Iam Roles](https://aws.amazon.com/iam/)

### Required environmental variables

```jsx
proccess.env[variable];
```

- REGION: region of the aws account target
- SECRET_ARN: For an added level of security, you must create a secret value in [AWS secrets manager](https://aws.amazon.com/secrets-manager/) for the [strapi database creds](https://hub.docker.com/r/strapi/strapi)
- CDK_DEFAULT_REGION: region that the cli of the cdk is set too
- CDK_DEFAULT_Account=target aws account number

**Useful commands**

- _`npm run build`_ compile typescript to js

- _`npm run watch`_ watch for changes and compile

- _`npm run test`_ perform the jest unit tests

- _`cdk deploy`_ deploy this stack to your default AWS account/region

- _`cdk diff`_ compare deployed stack with current state

- _`cdk synth`_ emits the synthesized CloudFormation template
