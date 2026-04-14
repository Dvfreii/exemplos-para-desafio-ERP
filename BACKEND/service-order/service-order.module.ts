import { Module } from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderResolver } from './service-order.resolver';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    ServiceOrderResolver,
    ServiceOrderService,
    JwtService,
    PrismaService,
  ],
})
export class ServiceOrderModule {}
