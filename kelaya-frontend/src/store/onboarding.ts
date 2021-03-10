import { createHook, createStore, StoreActionApi } from 'react-sweet-state'

interface State {
  date: Date
  exerciseLevel: number
  goals: string[]
}
type StoreApi = StoreActionApi<State>

const actions = {
  setDate: (date: Date) => async ({ setState }: StoreApi) => {
    setState({
      date
    })
  },
  setExerciseLevel: (exerciseLevel: number) => async ({
    setState
  }: StoreApi) => {
    setState({
      exerciseLevel
    })
  },
  setGoals: (goals: string[]) => async ({ setState }: StoreApi) => {
    setState({
      goals
    })
  }
}

type Actions = typeof actions

const initialState: State = {
  date: new Date(),
  exerciseLevel: 1,
  goals: []
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'onboarding'
})

export const useOnboarding = createHook(Store)
