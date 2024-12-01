import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

export class S3WebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "Bucket");

    const distribution = new Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: S3BucketOrigin.withOriginAccessControl(bucket),
      },
    });

    new BucketDeployment(this, "Deployment", {
      sources: [Source.asset("public")],
      destinationBucket: bucket,
    });
  }
}
