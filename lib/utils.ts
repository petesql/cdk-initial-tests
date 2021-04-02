import { Construct, RemovalPolicy } from '@aws-cdk/core';
import { Bucket, BlockPublicAccess } from '@aws-cdk/aws-s3';

let s3bucketname = 'hihi';

function createBucket(
  scope: Construct,
  fullBucketName: string,

): Bucket {
  const bucketProps = {
    bucketName: fullBucketName,
    publicReadAccess: false,
    versioned: true,
    enforceSSL: true,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    removalPolicy: RemovalPolicy.DESTROY, // need retain in pr
  };
  const bucket = new Bucket(
    scope,
    fullBucketName,
    bucketProps,
  )
  return bucket;
}
export { createBucket };