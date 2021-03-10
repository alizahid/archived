import { Delay, Line, Stop, Time } from '../types'
import dataDelays from './delays.json'
import dataLines from './lines.json'
import dataStops from './stops.json'
import dataTimes from './times.json'

export const lines = dataLines.map((data) => {
  const line = new Line()

  line.id = data.id
  line.name = data.name

  return line
})

export const stops = dataStops.map((data) => {
  const stop = new Stop()

  stop.id = data.id
  stop.x = data.x
  stop.y = data.y

  return stop
})

export const times = dataTimes.map((data) => {
  const time = new Time()

  const line = lines.find(({ id }) => id === data.lineId)

  /* istanbul ignore if */
  if (!line) {
    throw new Error("This shouldn't happen")
  }

  time.line = line

  const stop = stops.find(({ id }) => id === data.stopId)

  /* istanbul ignore if */
  if (!stop) {
    throw new Error("This shouldn't happen")
  }

  time.stop = stop

  time.time = data.time

  return time
})

export const delays = dataDelays.map((data) => {
  const delay = new Delay()

  delay.duration = data.duration

  const line = lines.find(({ id }) => id === data.lineId)

  /* istanbul ignore if */
  if (!line) {
    throw new Error("This shouldn't happen")
  }

  delay.line = line

  return delay
})
