export type IServiceCollaborator = {
  id?: string
  email: string
  role?: 'owner' | 'collaborator'
  pending?: boolean
}
