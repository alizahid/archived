import { gql } from 'apollo-server'

const schema = gql`
  # query

  type Query {
    post(id: ID!): Post
    posts(
      type: PostTypeInput!
      location: PostLocationInput
      limit: Int
      offset: Int
    ): [Post]
    profile: User
    search(query: String!): [Post]
  }

  # mutation

  type Mutation {
    createComment(id: ID!, body: String!): Comment
    createPost(body: String!, location: PostLocationInput!): Post
    deleteComment(id: ID!): DeleteResult
    deletePost(id: ID!): DeleteResult
    ratePost(id: ID!, direction: Int!): PostRateResult
    register: AuthResult
    updateProfile(notifications: Boolean): User
  }

  # types

  type User {
    id: ID!
    notifications: Boolean!
    created: String!
    updated: String!
  }

  type Post {
    id: ID!
    body: String!
    comments: [Comment!]
    location: Location!
    rated: Boolean!
    rating: Int!
    user: PostUser!
    created: String!
  }

  type Location {
    id: ID!
    city: String!
    country: String!
  }

  type Comment {
    id: ID!
    body: String!
    user: PostUser!
    created: String!
  }

  type PostUser {
    id: ID!
  }

  # input

  input PostLocationInput {
    city: String!
    country: String!
  }

  enum PostTypeInput {
    LATEST
    NEARBY
    POPULAR
  }

  # result

  type AuthResult {
    token: String!
    user: User!
  }

  type DeleteResult {
    success: Boolean!
  }

  type PostRateResult {
    rated: Boolean!
    rating: Int!
  }
`

export default schema
