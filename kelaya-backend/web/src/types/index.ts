export type Author = {
  username: string
}

export type Post = {
  id: string
  title: string
  body: string
  author: Author
  createdAt: string
}
