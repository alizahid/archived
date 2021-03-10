import { capitalize, cloneDeep, flatten, get, set, uniq } from 'lodash'
import moment from 'moment'

import { getColor } from '.'
import { formatDecimal } from './utils'

export const group = data => {
  const dates = data.map(({ date }) => date)

  const min = moment.min(dates)
  const max = moment.max(dates)

  const difference = max.diff(min, 'days')

  let keyFormat
  let labelFormat

  if (difference > 120) {
    keyFormat = 'MMMM'
    labelFormat = 'MMMM'

    if (max.diff(min, 'years') > 0) {
      keyFormat = labelFormat = 'MMM YY'
    } else if (max.diff(min, 'months') > 4) {
      keyFormat = labelFormat = 'MMM'
    }
  } else if (difference > 30) {
    keyFormat = 'w'
    labelFormat = 'MMM D'
  } else {
    keyFormat = 'D'
    labelFormat = 'MMM D'
  }

  const groups = data.reduce(
    (groups, { date, category, debit, credit, balance }) => {
      const key = date.format(keyFormat)

      set(groups, `${key}.label`, date.format(labelFormat))
      set(groups, `${key}.balance`, balance)

      if (debit) {
        const previous = get(groups, `${key}.debit.${category}`, 0)
        const previousTotal = get(groups, `${key}.debit.total`, 0)

        set(groups, `${key}.debit.total`, previousTotal - debit)
        set(groups, `${key}.debit.${category}`, previous - debit)
      }

      if (credit) {
        const previous = get(groups, `${key}.credit.${category}`, 0)
        const previousTotal = get(groups, `${key}.credit.total`, 0)

        set(groups, `${key}.credit.total`, previousTotal + credit)
        set(groups, `${key}.credit.${category}`, previous + credit)
      }

      return groups
    },
    {}
  )

  return Object.values(groups)
}

export default (data, chart) => {
  const groups = group(cloneDeep(data).reverse())

  const labels = groups.map(({ label }) => label)

  switch (chart) {
    case 'balance':
      return {
        datasets: [
          {
            backgroundColor: getColor('balance'),
            borderColor: getColor('balance', true),
            data: groups.map(({ balance }) => formatDecimal(balance)),
            fill: false,
            label: 'Balance'
          }
        ],
        labels: groups.map(({ label }) => label),
        options: {
          legend: {
            display: false
          }
        }
      }

    case 'spending':
      const datasets = uniq(
        flatten(groups.map(({ debit }) => Object.keys(debit).slice(1)))
      )
        .sort()
        .map(category => ({
          backgroundColor: getColor(category),
          borderColor: getColor(category, true),
          data: groups.map(({ debit }) =>
            formatDecimal(get(debit, category, 0))
          ),
          fill: false,
          label: capitalize(category)
        }))

      return {
        datasets,
        labels,
        options: {
          legend: {
            display: true
          }
        }
      }

    default:
  }
}
