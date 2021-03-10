import { ApolloError } from 'apollo-server'
import { Service } from 'typedi'

import { delays, stops, times } from '../data'
import { Line } from '../types'

@Service()
export class MainService {
  isLineDelayed(lineId: number): boolean {
    const delay = delays.find(({ line }) => line.id === lineId)

    return !!delay
  }

  nextArriving(stopId: number): Line {
    // get times for stop
    const stopTimes = times.filter(({ stop }) => stop.id === stopId)

    // pick a random one cause we don't have enough data for the whole day
    // in a real API, we'll have more times for a stop
    // and a time input
    const time = stopTimes[Math.floor(Math.random() * stopTimes.length)]

    return time.line
  }

  findVehicle(timestamp: string, x: number, y: number): Line {
    // find times from input
    const timesForVehicle = times.filter((time) => time.time === timestamp)

    // find stops from input
    const stopsForVehicle = stops.filter((stop) => stop.x === x && stop.y === y)

    const stopIds = stopsForVehicle.map((stop) => stop.id)

    // find one that matches
    const time = timesForVehicle.find((time) => stopIds.includes(time.stop.id))

    if (!time?.line) {
      throw new ApolloError(
        `No vehicle found for timestamp: ${timestamp}, x: ${x}, y: ${y}`,
        '404'
      )
    }

    return time.line
  }
}
