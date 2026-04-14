import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FindAllServiceOrdersInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  machineId?: string;
}
