import fetch from 'jest-fetch-mock'

global.fetch = fetch

jest.mock('react-navigation', () => {
  const Navigation = {
    SafeAreaView: 'SafeAreaView'
  }

  return Navigation
})
