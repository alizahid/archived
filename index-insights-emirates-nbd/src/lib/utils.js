export const formatCurrency = amount => {
  if (amount < 0) {
    amount = 0 - amount
  }

  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2
  })
}

export const formatDecimal = amount => {
  if (amount < 0) {
    amount = 0 - amount
  }

  return amount.toFixed(2)
}
