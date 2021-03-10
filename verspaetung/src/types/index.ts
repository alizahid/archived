import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Line {
  @Field()
  id!: number

  @Field()
  name!: string
}

@ObjectType()
export class Stop {
  @Field()
  id!: number

  @Field()
  x!: number

  @Field()
  y!: number
}

@ObjectType()
export class Time {
  @Field()
  line!: Line

  @Field()
  stop!: Stop

  @Field()
  time!: string
}

@ObjectType()
export class Delay {
  @Field()
  line!: Line

  @Field()
  duration!: number
}
