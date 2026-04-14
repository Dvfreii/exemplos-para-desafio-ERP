import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateServiceOrderInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'ID da máquina' })
  machineId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Motivo da ordem de serviço' })
  reason: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Tipo da ordem de serviço' })
  type: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean, { description: 'Se a máquina foi parada' })
  machineWasStoped: boolean;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Descrição do serviço' })
  serviceDescription: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Descrição do Serviço realizado',
  })
  servicePerformed?: string;

  @IsOptional()
  @Field(() => Date, {
    nullable: true,
    description: 'Data de início do serviço',
  })
  serviceInitDate?: Date;

  @IsOptional()
  @Field(() => Date, { nullable: true, description: 'Data de fim do serviço' })
  serviceEndDate?: Date;

  @IsOptional()
  @Field(() => Date, {
    nullable: true,
    description: 'Data de fim da ordem de serviço',
  })
  serviceOrderEndDate?: Date;
}
