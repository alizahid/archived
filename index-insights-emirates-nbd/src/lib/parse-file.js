import moment from 'moment'
import xlsx from 'xlsx'

import { getCategory } from '.'

const parseDescription = description => {
  const country = description.substr(-2)
  const currency = description
    .split(',')
    .pop()
    .substr(0, 3)

  if (/atm transaction/i.test(description)) {
    description = 'ATM withdrawal'
  } else if (/interest/i.test(description)) {
    description = 'Interest'
  } else if (/(inward remittance|online banking transfer)/i.test(description)) {
    description = 'Online transfer'
  } else if (/salary credit/i.test(description)) {
    description = 'Salary transfer'
  } else {
    if (description.includes(',')) {
      description = description
        .split(',')
        .pop()
        .substr(4)
    } else {
      const date = description.match(/([0-9]{2}-[0-9]{2}-[0-9]{4})/)

      if (date) {
        const { index } = date

        description = description.substr(index + 11)
      }
    }

    if (description.includes(':')) {
      description = description.substr(0, description.length - 3)
    }
  }

  return {
    country,
    currency,
    description
  }
}

export default file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = e => {
      const blob = e.target.result

      const sheet = xlsx.read(blob, {
        type: 'binary'
      })

      const items = xlsx.utils.sheet_to_json(
        sheet.Sheets[sheet.SheetNames[0]],
        {
          header: 'A'
        }
      )

      if (items.length === 0) {
        const err = new Error('No data found')

        return reject(err)
      }

      const { O: currency } = items.find(
        ({ L = '' }) => L.toLowerCase() === 'currency'
      )

      const data = items
        .map(
          ({
            A: date,
            C: description = '',
            K: debit = '0',
            M: credit = '0',
            P: balance = ''
          }) => ({
            balance: parseFloat(balance.replace(/([^0-9.]+)/g, ''), 10),
            category: getCategory(description),
            credit: parseFloat(credit.replace(/([^0-9.-]+)/, ''), 10),
            date: moment(date, 'D MMM YYYY'),
            debit: parseFloat(debit.replace(/([^0-9.-]+)/, ''), 10),
            ...parseDescription(description)
          })
        )
        .filter(({ balance }) => balance)
        .map((item, index) => ({
          ...item,
          id: ++index
        }))

      resolve({
        currency,
        data
      })
    }

    reader.onerror = () => {
      const err = new Error('Unable to parse file')

      reject(err)
    }

    reader.readAsBinaryString(file)
  })
}
