import { Navigator } from '../../index'

const initialState = Navigator.router.getStateForAction(
  Navigator.router.getActionForPathAndParams('landing')
)

export default (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state)

  return nextState || state
}
