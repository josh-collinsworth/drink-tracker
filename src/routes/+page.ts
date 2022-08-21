import { HISTORY_KEY } from '$lib/js/constants'
import { is_client } from 'svelte/internal'

export const load = () => {
  if (is_client) {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY))
    
    return {
      history
    }
  }
}