import { Arg, Int, Query, Resolver } from 'type-graphql'

import { MainService } from '../services'
import { Line } from '../types'

@Resolver()
export class MainResolver {
  constructor(private readonly service: MainService) {}

  @Query()
  isLineDelayed(@Arg('lineId', () => Int) lineId: number): boolean {
    return this.service.isLineDelayed(lineId)
  }

  @Query(() => Line)
  nextArriving(@Arg('stopId', () => Int) stopId: number): Line {
    return this.service.nextArriving(stopId)
  }

  @Query(() => Line)
  findVehicle(
    @Arg('timestamp') timestamp: string,
    @Arg('x') x: number,
    @Arg('y') y: number
  ): Line {
    return this.service.findVehicle(timestamp, x, y)
  }
}
