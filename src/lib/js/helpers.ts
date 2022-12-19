import type { Drink } from './types'
import { HISTORY_KEY } from './constants'

const loadDrinks = (): Drink[] => {
  return (JSON.parse(localStorage.getItem(HISTORY_KEY)) || [])
}

const getRollingDates = (): string[] => {
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toLocaleDateString()
  })
  return dates
}

const getWeekdayNameFromDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
}

export {
  loadDrinks,
  getRollingDates,
  getWeekdayNameFromDate,
}