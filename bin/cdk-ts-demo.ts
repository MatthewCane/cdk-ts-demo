#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { FargateStack } from "../lib/fargate-stack";

const app = new cdk.App();

// A stack containing a Fargate ECS cluster using the default VPC
new FargateStack(app, "FargateStack", {});
