import { gql } from 'apollo-boost'

export const getAuth = gql`
  query {
    token @client
  }
`

export const latest = gql`
  query {
    posts {
      latest {
        id
        body
        created
        comments {
          id
        }
        location
        rated
        rating
      }
    }
  }
`

export const nearby = gql`
  query($location: String) {
    posts(location: $location) {
      nearby {
        id
        body
        created
        comments {
          id
        }
        location
        rated
        rating
      }
    }
  }
`

export const popular = gql`
  query {
    posts {
      popular {
        id
        body
        created
        comments {
          id
        }
        location
        rated
        rating
      }
    }
  }
`

export const search = gql`
  query($query: String) {
    search(query: $query) {
      id
      body
      created
      comments {
        id
      }
      location
      rated
      rating
    }
  }
`

export const post = gql`
  query($id: ID) {
    post(where: { id: $id }) {
      id
      body
      created
      comments {
        id
      }
      location
      rated
      rating
    }
  }
`

export const comments = gql`
  query($id: ID) {
    post(where: { id: $id }) {
      comments {
        id
        body
        created
        user {
          id
        }
      }
    }
  }
`
