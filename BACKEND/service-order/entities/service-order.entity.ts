import { ObjectType, Field } from '@nestjs/graphql';
import { Machine } from 'src/machine/entities/machine.entity';

@ObjectType()
export class ServiceOrder {
  @Field(() => String, { description: 'ID da ordem de serviço' })
  id: string;

  @Field(() => Machine, { description: 'Máquina relacionada' })
  machine: Machine;

  @Field(() => String, { description: 'ID da máquina' })
  machineId: string;

  @Field(() => String, { description: 'Motivo da ordem de serviço' })
  reason: string;

  @Field(() => String, { description: 'Tipo da ordem de serviço' })
  type: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Se a máquina foi parada',
  })
  machineWasStoped: boolean;

  @Field(() => String, { nullable: true, description: 'Descrição do serviço' })
  serviceDescription: string;

  @Field(() => String, { nullable: true, description: 'Serviço realizado' })
  servicePerformed?: string;

  @Field(() => Date, { nullable: true, description: 'Data de criação' })
  createdAt: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'Data de início do serviço',
  })
  serviceInitDate?: Date;

  @Field(() => Date, { nullable: true, description: 'Data de fim do serviço' })
  serviceEndDate?: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'Data de fim da ordem de serviço',
  })
  serviceOrderEndDate?: Date;

  @Field(() => String, {
    nullable: true,
    description: 'Link da ordem de serviço impressa preenchida',
  })
  serviceOrderLink?: string;
}
