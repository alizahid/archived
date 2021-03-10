import { gql } from 'apollo-boost'

export const signUp = gql`
  mutation {
    signUp(platform: "iOS", pushToken: "foo") {
      id
      token
    }
  }
`

export const setAuth = gql`
  mutation($token: String!) {
    setAuth(token: $token) @client
  }
`

export const createComment = gql`
  mutation($body: String!, $post: ID!) {
    createComment(body: $body, post: $post) {
      id
      body
      created
      user {
        id
      }
    }
  }
`

export const ratePost = gql`
  mutation($direction: Int!, $post: ID!) {
    ratePost(direction: $direction, post: $post) {
      direction
      post {
        id
      }
      user {
        id
      }
    }
  }
`
