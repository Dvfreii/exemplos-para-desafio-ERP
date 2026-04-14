import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineResolver } from './machine.resolver';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MachineResolver, MachineService, JwtService, PrismaService],
})
export class MachineModule {}
