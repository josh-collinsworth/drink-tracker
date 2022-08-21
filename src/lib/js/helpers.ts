import type { Drink } from './types'
import { HISTORY_KEY } from './constants'

export const loadDrinks = (): Drink[] => {
  return (JSON.parse(localStorage.getItem(HISTORY_KEY)) || [])
}