import { Resolver, Query, Mutation } from "@nestjs/graphql";
import { ServiceOrderService } from "./service-order.service";
import { ServiceOrder } from "./entities/service-order.entity";
import { CreateServiceOrderInput } from "./dto/create-service-order.input";
import { FindAllServiceOrdersInput } from "./dto/find-all-service-orders-input";

@Resolver(() => ServiceOrder)
export class ServiceOrderResolver {
  constructor(private readonly serviceOrderService: ServiceOrderService) {}

  @Mutation(() => ServiceOrder)
  createServiceOrder(
    @Args("createServiceOrderInput")
    createServiceOrderInput: CreateServiceOrderInput,
  ) {
    return this.serviceOrderService.create(createServiceOrderInput);
  }

  @Query(() => [ServiceOrder], { name: "serviceOrders" })
  findAll(
    @Args("filter", { nullable: true }) filter?: FindAllServiceOrdersInput,
  ) {
    return this.serviceOrderService.findAll(filter);
  }
}
