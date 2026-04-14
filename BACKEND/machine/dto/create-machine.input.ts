import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMachineInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Nome da máquina' })
  name: string;

  @IsOptional()
  @Field(() => String, { description: 'Descrição da máquina', nullable: true })
  description?: string;

  @IsOptional()
  @Field(() => String, {
    description: 'Identificador da máquina(Placa ou número de série)',
    nullable: true,
  })
  identifier?: string;

  @IsOptional()
  @Field(() => String, { description: 'Função da máquina', nullable: true })
  functionality?: string;

  @IsOptional()
  @Field(() => String, {
    description: 'URL da imagem da máquina',
    nullable: true,
  })
  imageUrl?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Id do departamento' })
  departmentId: string;

  @IsOptional()
  @Field(() => String, { description: 'Código da máquina', nullable: true })
  code?: string;
}
