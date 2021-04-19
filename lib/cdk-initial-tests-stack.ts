import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { BlockPublicAccess } from '@aws-cdk/aws-s3';
import { createBucket } from '../lib/s3-utils';
import { createUser } from '../lib/iam-utils';
import { User } from '@aws-cdk/aws-iam';

export class CdkInitialTestsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create s3 buckets (don't use the utils function)
    // create a default bucket
    new s3.Bucket(this, 'simpledefaultbucket', {
      bucketName: 'pw-simple-default-bucket',
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    // create a private bucket
    new s3.Bucket(this, 'simpleprivatebucket', {
      bucketName: 'pw-simple-private-bucket',
      versioned: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    // create a general / persistent usage bucket
    const bucket = new s3.Bucket(this, 'generalbucket', {
      bucketName: 'pw-simple-general-bucket',
      versioned: true,
      enforceSSL: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // need
    });

    // create s3 buckets (using utils function)
    // create a bucket with default function config
    createBucket(this, 
      'pw-function-all-default', //shows as enabled
    ) // buckets and objects not public

    // create a bucket that overrides versioned config to false
    createBucket(this, 
      'pw-function-versioned-false',
      { 
        versioned: false, // shows as disabled
      } // buckets and objects not public
    )

    // create a new iam user (don't use the utils function)
    // create a simple user
    const user = new User(this, 'simpleuser', {
      userName: 'pw-simple-user',
    });

    // create a simple user (using utils function)
    createUser(this, 'pw-function-user1')
    // create a simple user (using utils function)
    createUser(this, 'pw-function-user2')  
  }
}
