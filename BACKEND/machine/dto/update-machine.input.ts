import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMachineInput } from './create-machine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMachineInput extends PartialType(CreateMachineInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  id: string;
}
