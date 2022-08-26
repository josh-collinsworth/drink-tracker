<script lang="ts">
import { getRollingDates, loadDrinks } from '$lib/js/helpers'
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

const saveDrink = () => {
  // if (!drink.date.match())
  const confirmation = confirm(`Update ${drink.tag}?`)
  if (!confirmation) return

  const allDrinks = loadDrinks()
  const drinksToSave = allDrinks.map(d => {
    if (d.id !== drink.id) return d
    return {
      id: drink.id,
      tag: drink.tag,
      date: drink.date
    }
  })
  localStorage.setItem(
    HISTORY_KEY, 
    JSON.stringify([...drinksToSave])
  )
  goto('/')
}
</script>

<section>
  {#if drink}
    <h1>
      <input bind:value="{drink.tag}" />
    </h1>

    <select bind:value={drink.date}>
      {#each getRollingDates() as date}
        <option value={date}>
          {date}
        </option>
      {/each}
    </select>
    <button on:click={deleteDrink}>
      <span aria-hidden="true">❌</span>
      Delete this drink
    </button>
    <button on:click={saveDrink}>
      <span aria-hidden="true">✅</span>
      Save changes
    </button>
  {:else}
    <h1>Loading…</h1>
  {/if}
  <a href="/">Back</a>
</section>

<style lang="scss">
  a,
  button {
    display: block;
    margin: 1rem 0;
    line-height: 1;
  }

  select {
    margin-bottom: 1rem;
  }

  h1 {
    margin-bottom: 0.5rem;

    input {
      all: inherit;
    }
  }
</style>