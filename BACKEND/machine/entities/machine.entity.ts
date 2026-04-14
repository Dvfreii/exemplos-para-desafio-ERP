import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from 'src/department/entities/department.entity';
import { Stoplog } from 'src/stoplog/entities/stoplog.entity';
import { MaterialToMachine } from 'src/warehouse/entities/material-to-machine.entity';

@ObjectType()
export class Machine {
  @Field(() => String, { description: 'Id da máquina gerado no mongoDB' })
  id: string;

  @Field(() => String, { description: 'Nome da máquina' })
  name: string;

  @Field(() => String, { description: 'Descrição da máquina', nullable: true })
  description: string;

  @Field(() => String, {
    description: 'Identificador da máquina (Placa ou número de série)',
    nullable: true,
  })
  identifier?: string;

  @Field(() => String, { description: 'Função da máquina', nullable: true })
  functionality?: string;

  @Field(() => String, { description: 'código da máquina', nullable: true })
  code?: string;

  @Field(() => String, {
    description: 'URL da imagem da máquina',
    nullable: true,
  })
  imageUrl?: string;

  @Field(() => Department, {
    description: 'Departamento ao qual a máquina pertence',
    nullable: true,
  })
  department?: Department;

  @Field(() => [Stoplog], {
    description: 'Lista de paradas relacionadas à máquina',
    nullable: true,
  })
  stopLogs?: Stoplog[];

  @Field(() => [MaterialToMachine], {
    description: 'Materiais vinculados à máquina',
    nullable: true,
  })
  materialToMachine?: MaterialToMachine[];
}
