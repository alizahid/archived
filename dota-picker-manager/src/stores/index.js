import Auth from './auth'
import Heroes from './heroes'
import Users from './users'
// import UsersAdd from './users-add'
// import UsersRemove from './users-remove'
// import UsersUpdate from './users-update'

const auth = new Auth()
const heroes = new Heroes()
const users = new Users()
// const usersAdd = new UsersAdd()
// const usersRemove = new UsersRemove()
// const usersUpdate = new UsersUpdate()

export {
  auth,
  heroes,
  users
  // usersAdd, usersRemove, usersUpdate
}
