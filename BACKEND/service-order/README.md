# Service Order API - README

Este README contém exemplos de uso para todas as rotas disponíveis no módulo Service Order.

## Autenticação

Todas as rotas requerem autenticação. Primeiro, faça login para obter um token:

```graphql
mutation {
  signin(signInInput: {
    email: "seu-email@exemplo.com"
    password: "sua-senha"
  }) {
    accessToken
    refreshToken
    user {
      id
      name
      email
    }
  }
}
```

Depois, configure o cabeçalho de autorização no GraphQL Playground:

```json
{
  "Authorization": "Bearer SEU_ACCESS_TOKEN_AQUI"
}
```

## Rotas Disponíveis

### 1. Criar Service Order

**Mutation:** `createServiceOrder`

```graphql
mutation {
  createServiceOrder(createServiceOrderInput: {
    machineId: "507f1f77bcf86cd799439011"
    reason: "Manutenção preventiva"
    type: "PREVENTIVA"
    machineWasStoped: true
    serviceDescription: "Troca de óleo e filtros do motor principal"
    servicePerformed: "Substituição completa do óleo lubrificante"
    serviceInitDate: "2024-01-15T08:00:00Z"
    serviceEndDate: "2024-01-15T12:00:00Z"
    serviceOrderEndDate: "2024-01-15T14:00:00Z"
  }) {
    id
    reason
    type
    machineWasStoped
    serviceDescription
    servicePerformed
    createdAt
    serviceInitDate
    serviceEndDate
    serviceOrderEndDate
    machine {
      id
      name
      code
    }
  }
}
```

**Exemplo mínimo (apenas campos obrigatórios):**

```graphql
mutation {
  createServiceOrder(createServiceOrderInput: {
    machineId: "507f1f77bcf86cd799439011"
    reason: "Manutenção corretiva"
    type: "CORRETIVA"
    machineWasStoped: false
    serviceDescription: "Reparo no sistema hidráulico"
  }) {
    id
    reason
    type
    serviceDescription
    createdAt
  }
}
```

### 2. Listar Todas as Service Orders

**Query:** `serviceOrders`

```graphql
query {
  serviceOrders {
    id
    reason
    type
    machineWasStoped
    serviceDescription
    servicePerformed
    createdAt
    serviceInitDate
    serviceEndDate
    serviceOrderEndDate
    machine {
      id
      name
      code
      department {
        id
        name
      }
    }
  }
}
```

**Com filtros (se disponível):**

```graphql
query {
  serviceOrders(filter: {
    # Adicione filtros conforme definido no FindAllServiceOrdersInput
  }) {
    id
    reason
    type
    serviceDescription
    createdAt
  }
}
```

### 3. Buscar Service Order por ID

**Query:** `serviceOrder`

```graphql
query {
  serviceOrder(id: "507f1f77bcf86cd799439012") {
    id
    reason
    type
    machineWasStoped
    serviceDescription
    servicePerformed
    createdAt
    serviceInitDate
    serviceEndDate
    serviceOrderEndDate
    machine {
      id
      name
      code
      identifier
      functionality
      department {
        id
        name
        description
      }
    }
  }
}
```

### 4. Atualizar Service Order

**Mutation:** `updateServiceOrder`

```graphql
mutation {
  updateServiceOrder(updateServiceOrderInput: {
    id: "507f1f77bcf86cd799439012"
    reason: "Manutenção preventiva atualizada"
    servicePerformed: "Serviço concluído com sucesso"
    serviceEndDate: "2024-01-15T16:00:00Z"
    serviceOrderEndDate: "2024-01-15T17:00:00Z"
  }) {
    id
    reason
    type
    serviceDescription
    servicePerformed
    serviceEndDate
    serviceOrderEndDate
    machine {
      id
      name
    }
  }
}
```

### 5. Remover Service Order

**Mutation:** `removeServiceOrder`

```graphql
mutation {
  removeServiceOrder(id: "507f1f77bcf86cd799439012") {
    id
    reason
    serviceDescription
  }
}
```

## Tipos de Service Order

Os tipos disponíveis para o campo `type` são:
- `PREVENTIVA` - Manutenção preventiva
- `CORRETIVA` - Manutenção corretiva
- `PREDITIVA` - Manutenção preditiva

## Campos Obrigatórios vs Opcionais

### Obrigatórios:
- `machineId` - ID da máquina (String)
- `reason` - Motivo da ordem de serviço (String)
- `type` - Tipo da manutenção (String)
- `machineWasStoped` - Se a máquina foi parada (Boolean)
- `serviceDescription` - Descrição do serviço (String)

### Opcionais:
- `servicePerformed` - Serviço realizado (String)
- `serviceInitDate` - Data de início do serviço (DateTime)
- `serviceEndDate` - Data de fim do serviço (DateTime)
- `serviceOrderEndDate` - Data de encerramento da ordem (DateTime)

## Dicas de Uso

1. **IDs válidos**: Use ObjectIDs válidos do MongoDB (24 caracteres hexadecimais)
2. **Datas**: Use formato ISO 8601 (ex: "2024-01-15T08:00:00Z")
3. **Relacionamentos**: A máquina deve existir no banco de dados antes de criar uma service order
4. **Autenticação**: Sempre inclua o token Bearer no cabeçalho Authorization

## Códigos de Erro Comuns

- `UNAUTHENTICATED`: Token de acesso inválido ou expirado
- `NOT_FOUND`: Service Order ou Machine não encontrada
- `BAD_USER_INPUT`: Dados de entrada inválidos
- `INTERNAL_SERVER_ERROR`: Erro interno do servidor

## Estrutura do Projeto