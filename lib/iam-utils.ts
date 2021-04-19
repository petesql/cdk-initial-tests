import { Construct } from '@aws-cdk/core';
import { User, UserProps } from '@aws-cdk/aws-iam';

/**
 * Create a new IAM User. 
 * @param scope 
 * @param fullUserName
 * @param userConfig?
 * @returns
 */
 function createUser(
    scope: Construct,
    fullUserName: string,
    userConfig?: UserProps,
  ): User {
    const userProps = {
      UserName: fullUserName,
    };
    const user = new User (
      scope,
      fullUserName,
      { ...userConfig, ...userProps }
    )
    return user;
  }

export { createUser };