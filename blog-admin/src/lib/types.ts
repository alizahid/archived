export interface Post {
  _id: {
    $oid: string
  }
  content: string
  excerpt: string
  published: {
    $date: {
      $numberLong: string
    }
  }
  slug: string
  tags: string[]
  title: string
}

export interface Project {
  _id: {
    $oid: string
  }
  description: string
  links: {
    label: string
    link: string
  }[]
  name: string
  order: {
    $numberDouble: string
  }
}
