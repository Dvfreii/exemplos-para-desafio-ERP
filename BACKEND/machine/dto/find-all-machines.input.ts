import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FindAllMachinesInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  departmentId?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  code?: string;
}
