export type Themes = 'light' | 'dark' | 'custom'

export type Location = {
  latitude: number
  longitude: number
}

export type CalendarItem = {
  date: Date
  format: string
}

export type ReverseGeocodeResponse = {
  data: {
    country: string
  }[]
}

export type IpGeocodeResponse = {
  country: string
}

export type CountrySummaryResponse = {
  ID: string
  Country: string
  CountryCode: string
  Slug: string
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
  Date: string
}

export type CountrySummary = {
  id: string
  name: string
  code: string
  cases: {
    new: number
    total: number
  }
  deaths: {
    new: number
    total: number
  }
  recovered: {
    new: number
    total: number
  }
  updated: Date
}

export type CountryDetailsResponse = {
  ID: string
  Confirmed: number
  Deaths: number
  Recovered: number
  Active: number
  Date: string
}

export type CountryDetails = {
  id: string
  confirmed: number
  deaths: number
  recovered: number
  active: number
  date: Date
}
