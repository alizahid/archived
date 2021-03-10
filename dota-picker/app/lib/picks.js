export default (picks, type, alreadyPicked) =>
  picks
    .filter(pick => !!pick.id)
    .map(pick => pick[type])
    .reduce((picks, pick) => {
      console.log(picks, pick)
      picks = [...picks, ...pick]

      return picks
    }, [])
    .filter(pick => !alreadyPicked.includes(pick.id))
