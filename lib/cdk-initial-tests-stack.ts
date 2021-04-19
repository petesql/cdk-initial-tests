import * as cdk from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { BlockPublicAccess } from '@aws-cdk/aws-s3';
import { createBucket } from '../lib/s3-utils';
import { createUser } from '../lib/iam-utils';
import { User } from '@aws-cdk/aws-iam';
import { Instance, Vpc, SecurityGroup, AmazonLinuxImage, InstanceType, 
  InstanceClass, InstanceSize, AmazonLinuxGeneration, Peer, Port }
  from '@aws-cdk/aws-ec2';

export class CdkInitialTestsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create s3 buckets (don't use the utils function)
    // create a default bucket
    new Bucket(this, 'simpledefaultbucket', {
      bucketName: 'pw-simple-default-bucket',
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    // create a private bucket
    new Bucket(this, 'simpleprivatebucket', {
      bucketName: 'pw-simple-private-bucket',
      versioned: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    // create a general / persistent usage bucket
    const bucket = new Bucket(this, 'generalbucket', {
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

    // Create new VPC
    const vpc = new Vpc(this, 'VPC');

    // Open port 22 for SSH connection from anywhere
    const mySecurityGroup = new SecurityGroup(this, 'SecurityGroup', {
      vpc,
      securityGroupName: "pw-test-cdk-sg",
      description: 'allow all outbound',
      allowAllOutbound: true 
    });
    mySecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22), 'allow public ssh')

    // We are using the latest AMAZON LINUX AMI
    const awsAMI = new AmazonLinuxImage({ generation: AmazonLinuxGeneration.AMAZON_LINUX_2 });

    // Instance details
    const ec2Instance = new Instance(this, 'Instance', {
      vpc,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
      machineImage: awsAMI,
      securityGroup: mySecurityGroup
    });
  }
}
