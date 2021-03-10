export const SET_DATA = 'SET_DATA'
export const REMOVE_DATA = 'REMOVE_DATA'

export const setData = data => ({
  data,
  type: SET_DATA
})

export const removeData = () => ({
  type: REMOVE_DATA
})
