<script lang="ts">
import { loadDrinks } from '$lib/js/helpers'
import { HISTORY_KEY } from '$lib/js/constants'
import { goto } from '$app/navigation'

export let data
const { drink } = data

const deleteDrink = () => {
  const confirmation = confirm(`Delete the drink ${drink.tag} from ${drink.date}?`)

  if (!confirmation) return

  const allDrinks = loadDrinks()
  localStorage.setItem(
    HISTORY_KEY, 
    JSON.stringify(allDrinks.filter(i => i.id !== drink.id))
  )
  goto('/')
}
</script>

<section>
  {#if drink}
    <h1>
      {drink.tag}
    </h1>
    <p>
      {drink.date}
    </p>
    <button on:click={deleteDrink}>
      Delete this drink
    </button>
  {:else}
    <h1>Loading…</h1>
  {/if}
  <a href="/">Back</a>
</section>

<style lang="scss">
  a {
    display: block;
    margin: 1rem 0;
  }
</style>