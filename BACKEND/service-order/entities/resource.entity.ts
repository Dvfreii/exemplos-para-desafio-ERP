import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Resource {
  @Field(() => String, { description: 'ID do recurso gerado no MongoDB' })
  id: string;

  @Field(() => String, { description: 'Nome do recurso' })
  name: string;

  @Field(() => String, { description: 'Descrição do recurso', nullable: true })
  description?: string;
}
