export default picks => {
  const frequency = picks.reduce((frequency, pick) => {
    frequency[pick.hero] = 0

    return frequency
  }, {})

  const unique = picks.filter(pick => ++frequency[pick.hero] === 1)

  return unique
    .sort((a, b) => frequency[b.hero] - frequency[a.hero])
    .map(pick => ({
      ...pick,
      frequency: frequency[pick.hero]
    }))
}
