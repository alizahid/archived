import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import { gql } from 'apollo-server'
import { ApolloServerTestClient, createTestClient } from 'apollo-server-testing'
import ava, { TestInterface } from 'ava'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

import { resolvers } from '../src/resolvers'

const test = ava as TestInterface<{
  client: ApolloServerTestClient
}>

test.before(async (t) => {
  const schema = await buildSchema({
    container: Container,
    dateScalarMode: 'isoDate',
    resolvers
  })

  const server = new ApolloServer({
    schema
  })

  const client = createTestClient(server)

  t.context.client = client
})

const IS_LINE_DELAYED = gql`
  query isLineDelayed($lineId: Int!) {
    isLineDelayed(lineId: $lineId)
  }
`

test('isLineDelayed: M4 should be delayed', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: IS_LINE_DELAYED,
    variables: {
      lineId: 0
    }
  })

  t.true(data?.isLineDelayed)
})

test('isLineDelayed: 200 should be delayed', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: IS_LINE_DELAYED,
    variables: {
      lineId: 1
    }
  })

  t.true(data?.isLineDelayed)
})

test('isLineDelayed: S75 should be delayed', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: IS_LINE_DELAYED,
    variables: {
      lineId: 2
    }
  })

  t.true(data?.isLineDelayed)
})

const NEXT_ARRIVING = gql`
  query nextArriving($stopId: Int!) {
    nextArriving(stopId: $stopId) {
      id
      name
    }
  }
`

test('nextArriving: M4 should be arriving next at stop 2', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: NEXT_ARRIVING,
    variables: {
      stopId: 2
    }
  })

  t.is(data?.nextArriving.name, 'M4')
})

test('nextArriving: 200 should be arriving next at stop 5', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: NEXT_ARRIVING,
    variables: {
      stopId: 5
    }
  })

  t.is(data?.nextArriving.name, '200')
})

test('nextArriving: S75 should be arriving next at stop 10', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: NEXT_ARRIVING,
    variables: {
      stopId: 10
    }
  })

  t.is(data?.nextArriving.name, 'S75')
})

const FIND_VEHICLE = gql`
  query findVehicle($timestamp: String!, $x: Float!, $y: Float!) {
    findVehicle(timestamp: $timestamp, x: $x, y: $y) {
      id
      name
    }
  }
`

test('findVehicle: M4 should be at 1,1 at 10:00:00', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: FIND_VEHICLE,
    variables: {
      timestamp: '10:00:00',
      x: 1,
      y: 1
    }
  })

  t.is(data?.findVehicle.name, 'M4')
})

test('findVehicle: 200 should be at 3,1 at 10:01:00', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: FIND_VEHICLE,
    variables: {
      timestamp: '10:01:00',
      x: 3,
      y: 1
    }
  })

  t.is(data?.findVehicle.name, '200')
})

test('findVehicle: S75 should be at 2,12 at 10:09:00', async (t) => {
  const { query } = t.context.client

  const { data } = await query({
    query: FIND_VEHICLE,
    variables: {
      timestamp: '10:09:00',
      x: 2,
      y: 12
    }
  })

  t.is(data?.findVehicle.name, 'S75')
})

test('findVehicle: vehicle not found', async (t) => {
  const { query } = t.context.client

  const { errors } = await query({
    query: FIND_VEHICLE,
    variables: {
      timestamp: '11:00:00',
      x: 10,
      y: 10
    }
  })

  t.is(errors?.[0]?.extensions?.code, '404')
})
