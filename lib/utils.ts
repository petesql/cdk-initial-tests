import { Construct, RemovalPolicy } from '@aws-cdk/core';
import { Bucket, BlockPublicAccess, BucketProps } from '@aws-cdk/aws-s3';

/**
 * Create a S3 Bucket based on input params.
 * 
 * @param scope
 * @param fullBucketName name of new S3 bucket 
 * @param bucketConfig bucket configuration
 * @returns bucket name
 */
function createBucket(
  scope: Construct,
  fullBucketName: string,
  bucketConfig?: BucketProps,
): Bucket {
  const bucketProps = {
    bucketName: fullBucketName,
    publicReadAccess: false,
    versioned: true,
    enforceSSL: true,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    removalPolicy: RemovalPolicy.DESTROY, // Change to retain if in PR
        /** RemovalPolicy
     * When a bucket is removed from a stack (or the stack is deleted), 
     * the S3 bucket will be removed according to its removal policy 
     * (which by default will simply orphan the bucket and leave it in your AWS account). 
     * If the removal policy is set to RemovalPolicy.DESTROY, 
     * the bucket will be deleted as long as it does not contain any objects.
     */
    autoDeleteObjects: true,
    /** autoDeleteObjects
     * When a bucket is removed from a stack (or the stack is deleted), 
     * the s3 bucket will be removed according to it's removal policy
     * If the bucket contains objects we need to delete them first.
     */
  };
  const bucket = new Bucket(
    scope,
    fullBucketName,
    { ...bucketConfig, ...bucketProps, },
  )
  return bucket;
}

export { createBucket };