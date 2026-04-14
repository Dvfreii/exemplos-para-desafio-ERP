import { Injectable } from "@nestjs/common";
import { CreateServiceOrderInput } from "./dto/create-service-order.input";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { Resolver } from "@nestjs/graphql";
import { ServiceOrder } from "./entities/service-order.entity";

@Injectable()
@Resolver(() => ServiceOrder)
export class ServiceOrderService {
  constructor(private prisma: PrismaService) {}

  create(createServiceOrderInput: CreateServiceOrderInput) {
    return this.prisma.serviceOrder.create({
      data: {
        reason: createServiceOrderInput.reason,
        type: createServiceOrderInput.type,
        machineWasStoped: createServiceOrderInput.machineWasStoped,
        serviceDescription: createServiceOrderInput.serviceDescription,
        servicePerformed: createServiceOrderInput.servicePerformed,
        serviceInitDate: createServiceOrderInput.serviceInitDate,
        serviceEndDate: createServiceOrderInput.serviceEndDate,
        serviceOrderEndDate: createServiceOrderInput.serviceOrderEndDate,
        createdAt: new Date(),
        machine: {
          connect: {
            id: createServiceOrderInput.machineId,
          },
        },
      },
    });
  }

  findAll(filter?: { machineId?: string; code?: string }) {
    const where: Prisma.ServiceOrderWhereInput = {};

    if (filter?.machineId) {
      where.machineId = filter.machineId;
    }

    return this.prisma.serviceOrder.findMany({
      where,
    });
  }

  findOne(id: string) {
    return this.prisma.serviceOrder.findUnique({
      where: {
        id,
      },
    });
  }
}
