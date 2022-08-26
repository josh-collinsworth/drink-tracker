<script lang="ts">
  import type { Drink } from '$lib/js/types'
  import { loadDrinks, getRollingDates } from '$lib/js/helpers'
  import { HISTORY_KEY, MAX_DAILY_DRINKS, MAX_WEEKLY_DRINKS } from '$lib/js/constants'

  let tag = ''

  const save = () => {
    const confirmation = confirm(`Save new drink ${tag} for today, ${new Date().toLocaleDateString('en-US')}?`)
    if (!confirmation) return
    const items = loadDrinks() || []
    localStorage.setItem(
      HISTORY_KEY, 
      JSON.stringify(
        [{
          date: new Date().toLocaleDateString('en-US'),
          tag,
          id: crypto.randomUUID()
        },
        ...items] 
    ))

    history = loadDrinks()
  }

  const addDrink = (): void => {
    if (!tag) return
    save()
    tag = ''
  }

  $: drinksToday =  history.filter(item => item.date === new Date().toLocaleDateString()).length
  $: drinksThisWeek =  history.filter(item => getRollingDates().includes(item.date)).length

  export let data: { history: [] }
  let history: Drink[] = data.history || []
</script>


<section class="controls">
  <div class="controls__wrapper">
    <div class="scoreboard">
      <p>
        <strong>Today:</strong>
        {drinksToday}/{MAX_DAILY_DRINKS}
        {#if drinksToday >= MAX_DAILY_DRINKS}
          <span aria-hidden="true">
            🛑
          </span>
        {/if}
      </p>
      <p>
        <strong>Week:</strong>
        {drinksThisWeek}/{MAX_WEEKLY_DRINKS}
        {#if drinksThisWeek >= MAX_WEEKLY_DRINKS}
          <span aria-hidden="true">
            🛑
          </span>
        {/if}
      </p>
    </div>

    <form on:submit|preventDefault={addDrink}>
      <input type="text" class="tag-input" bind:value={tag} placeholder="Tag new drink"/>
      <button class="add-btn" disabled={!tag}>
        Add drink
      </button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Total</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {#each getRollingDates() as date}
          {@const drinksInDate = history.filter(item => item.date === date)}
          <tr>
            <td>
              {new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
            </td>
            <td>
              {drinksInDate.length}
            </td>
            <td>
              {#each drinksInDate as drink, i}
                <a href="/{drink.id}">
                  {drink.tag}
                </a>
                {#if i + 1 < drinksInDate.length}
                  {' | '}
                {/if}
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>


<style lang="scss">
  .controls {
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .scoreboard {
    font-size: 1.375rem;
    margin-bottom: 2rem;
  }

  .controls__wrapper {
    width: 100%;
    max-width: 26rem;
  }

  .tag-input {
    padding: 0.5rem 1rem;
    font: inherit;
    width: 100%;
  }

  .add-btn {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    margin: 1rem 0 0;
    font-weight: bold;
  }

  table {
    text-align: left;
    border-collapse: collapse;
    margin-top: 2rem;
    width: 100%;
    font-size: 0.8rem;

    tr {
      border-bottom: 1px solid #999;
    }

    th {
      font-size: 0.9rem;
    }

    td, th {
      padding: 0.5rem 0;
    }

    td ~ td,
    th ~ th {
      padding-left: 1rem;
    }
  }

  p {
    margin: 0;
  }
</style>  