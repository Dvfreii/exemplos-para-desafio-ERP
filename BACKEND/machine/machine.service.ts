import { Injectable } from '@nestjs/common';
import { CreateMachineInput } from './dto/create-machine.input';
import { UpdateMachineInput } from './dto/update-machine.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Machine } from './entities/machine.entity';
import { Department } from 'src/department/entities/department.entity';
import { Stoplog } from 'src/stoplog/entities/stoplog.entity';
import { Prisma } from '@prisma/client';
import { MaterialToMachine } from 'src/warehouse/entities/material-to-machine.entity';

@Injectable()
@Resolver(() => Machine)
export class MachineService {
  constructor(private prisma: PrismaService) {}

  create(createMachineInput: CreateMachineInput) {
    return this.prisma.machine.create({
      data: {
        name: createMachineInput.name,
        description: createMachineInput.description,
        identifier: createMachineInput.identifier,
        functionality: createMachineInput.functionality,
        imageUrl: createMachineInput.imageUrl,
        code: createMachineInput.code,
        department: {
          connect: {
            id: createMachineInput.departmentId,
          },
        },
      },
    });
  }

  findAll(filter?: { departmentId?: string; code?: string }) {
    const where: Prisma.MachineWhereInput = {};

    if (filter?.departmentId) {
      where.departmentId = filter.departmentId;
    }

    if (filter?.code) {
      where.code = filter.code;
    }

    return this.prisma.machine.findMany({ where });
  }

  findOne(id: string) {
    return this.prisma.machine.findUnique({
      where: { id },
    });
  }

  update(id: string, updateMachineInput: UpdateMachineInput) {
    return this.prisma.machine.update({
      where: { id },
      data: {
        name: updateMachineInput.name,
        description: updateMachineInput.description,
        identifier: updateMachineInput.identifier,
        functionality: updateMachineInput.functionality,
        imageUrl: updateMachineInput.imageUrl,
      },
    });
  }

  remove(id: string) {
    return this.prisma.machine.delete({
      where: { id },
    });
  }

  @ResolveField(() => Department)
  async department(@Parent() machine: Machine): Promise<Department> {
    return this.prisma.machine
      .findUnique({ where: { id: machine.id } })
      .department();
  }

  @ResolveField(() => [Stoplog])
  async stopLogs(@Parent() machine: Machine): Promise<Stoplog[]> {
    const stopLogs = await this.prisma.stopLog.findMany({
      where: { machineId: machine.id },
    });
    return stopLogs.map((stopLog) => ({
      ...stopLog,
      date: stopLog.date.toISOString(),
    })) as Stoplog[];
  }

  @ResolveField(() => [MaterialToMachine])
  async materialToMachine(
    @Parent() machine: Machine,
  ): Promise<MaterialToMachine[]> {
    return this.prisma.materialToMachine.findMany({
      where: { machineId: machine.id },
      include: {
        material: {
          include: {
            stock: true,
            supplier: {
              include: { supplier: true },
            },
          },
        },
        machine: true,
      },
      orderBy: { createdAt: 'desc' },
    }) as unknown as MaterialToMachine[];
  }
}
