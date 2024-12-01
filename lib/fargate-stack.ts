import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as asg from "aws-cdk-lib/aws-autoscaling";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import cluster from "cluster";

export class FargateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create new ECS cluster
    const cluster = new ecs.Cluster(this, "DemoCluster", {
      enableFargateCapacityProviders: true,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      "FargateTaskDef",

      { cpu: 0.5, memoryLimitMiB: 1024 },
    );

    taskDefinition.addContainer("NginxContaner", {
      image: ecs.ContainerImage.fromRegistry("nginx:latest"),
    });

    new ecs.FargateService(this, "FargateService", {
      taskDefinition: taskDefinition,
      cluster: cluster,
      capacityProviderStrategies: [
        {
          capacityProvider: "FARGATE_SPOT",
        },
      ],
    });
  }
}
