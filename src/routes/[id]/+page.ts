import type { Drink } from '$lib/js/types'
import { loadDrinks } from '$lib/js/helpers'
import { is_client } from 'svelte/internal'
import type { LoadEvent } from '@sveltejs/kit'

export const load = ({ params }: LoadEvent) => {
  if (is_client) {
    const allDrinks = loadDrinks()
    const thisDrink = allDrinks.filter((drink: Drink) => drink.id === params.id)[0]

    return {
      drink: thisDrink
    }
  }
}