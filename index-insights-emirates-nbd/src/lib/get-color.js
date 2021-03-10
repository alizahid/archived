import color from 'color'

const colors = {
  balance: '#ff3b30',
  cash: '#ff9500',
  entertainment: '#ffcc00',
  food: '#4cd964',
  groceries: '#5ac8fa',
  health: '#007aff',
  other: '#5856d6',
  payments: '#ff2d55',
  personal: '#ff9500',
  shopping: '#ffcc00',
  transport: '#4cd964',
  total: '#5ac8fa',
  utilities: '#007aff',
  work: '#5856d6'
}

export default (category = 'other', dark) => {
  if (dark) {
    return color(colors[category])
      .darken(0.1)
      .string()
  }

  return colors[category]
}
