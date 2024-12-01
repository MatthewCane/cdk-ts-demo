#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FargateStack } from "../lib/fargate-stack";
import { S3WebsiteStack } from "../lib/s3-website-stack";
const app = new cdk.App();

// A stack containing a Fargate ECS cluster using the default VPC
new FargateStack(app, "FargateStack", {});

new S3WebsiteStack(app, "S3WebsiteStack", {});

// Tags to add to all resources in the app
const tags = {
  source: "https://github.com/MatthewCane/cdk-ts-demo",
  environment: "demo",
};

for (const [key, value] of Object.entries(tags)) {
  cdk.Tags.of(app).add(key, value);
}
