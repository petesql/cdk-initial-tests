import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { BlockPublicAccess } from '@aws-cdk/aws-s3';

export class CdkInitialTestsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'mydefaultbucket', {
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new s3.Bucket(this, 'myprivatebucket', {
      versioned: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // create a bucket for general persistent usage
    const bucket = new s3.Bucket(this, 'pwbucket', {
      bucketName: 'bucketnameherepetehi',
      versioned: true,
      enforceSSL: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN, // need
    });

  }
}
