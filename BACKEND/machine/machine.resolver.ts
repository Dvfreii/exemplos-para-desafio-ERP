import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MachineService } from './machine.service';
import { Machine } from './entities/machine.entity';
import { CreateMachineInput } from './dto/create-machine.input';
import { UpdateMachineInput } from './dto/update-machine.input';
import { FindAllMachinesInput } from './dto/find-all-machines.input';

@Resolver(() => Machine)
export class MachineResolver {
  constructor(private readonly machineService: MachineService) {}

  @Mutation(() => Machine)
  createMachine(
    @Args('createMachineInput') createMachineInput: CreateMachineInput,
  ) {
    return this.machineService.create(createMachineInput);
  }

  @Query(() => [Machine], { name: 'machines' })
  findAll(@Args('filter', { nullable: true }) filter?: FindAllMachinesInput) {
    return this.machineService.findAll(filter);
  }

  @Query(() => Machine, { name: 'machine' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.machineService.findOne(id);
  }

  @Mutation(() => Machine)
  updateMachine(
    @Args('updateMachineInput') updateMachineInput: UpdateMachineInput,
  ) {
    return this.machineService.update(
      updateMachineInput.id,
      updateMachineInput,
    );
  }

  @Mutation(() => Machine)
  removeMachine(@Args('id', { type: () => String }) id: string) {
    return this.machineService.remove(id);
  }
}
