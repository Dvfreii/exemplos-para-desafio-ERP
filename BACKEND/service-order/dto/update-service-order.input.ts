import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateServiceOrderInput } from './create-service-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceOrderInput extends PartialType(
  CreateServiceOrderInput,
) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    description: 'Link da ordem de serviço impressa preenchida',
  })
  serviceOrderLink?: string;
}
