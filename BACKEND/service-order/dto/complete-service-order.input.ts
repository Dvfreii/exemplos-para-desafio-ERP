import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

@InputType()
export class CompleteServiceOrderInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'ID da ordem de serviço' })
  id: string;

  @IsNotEmpty()
  @IsDateString()
  @Field(() => String, { description: 'Data de fim do serviço' })
  serviceEndDate: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    description: 'Link da ordem de serviço impressa preenchida',
  })
  serviceOrderLink?: string;
}
