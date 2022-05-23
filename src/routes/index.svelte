<script lang="ts">
  import { onMount } from 'svelte'

  interface Drink {
    date: string;
    tag?: string;
  }

  const HISTORY_KEY = 'drinkTrackerHistory'
  const MAX_DAILY_DRINKS = 2
  const MAX_WEEKLY_DRINKS = 7
  let history: Drink[] = []
  let tag = ''

  const retrieveHistory= (): Drink[] => JSON.parse(localStorage.getItem(HISTORY_KEY))

  const save = () => {
    const confirmation = confirm(`Save new drink ${tag} for today, ${new Date().toLocaleDateString('en-US')}?`)
    if (!confirmation) return
    const items = retrieveHistory() || []
    localStorage.setItem(
      HISTORY_KEY, 
      JSON.stringify(
        [{
          date: new Date().toLocaleDateString('en-US'),
          tag: tag || null
        },
        ...items] 
    ))

    history = retrieveHistory()
  }

  const getRollingDates = (): string[] => {
    const dates = [...Array(7)].map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return d.toLocaleDateString()
    })
    return dates
  }

  const addDrink = (): void => {
    save()
    tag = ''
  }

  $: drinksToday = history.filter(item => item.date === new Date().toLocaleDateString()).length
  $: drinksThisWeek = history.filter(item => getRollingDates().includes(item.date)).length

  onMount(() => {
    history = retrieveHistory() || []
  })
</script>


<section class="controls">
  <div class="controls__wrapper">
    <form on:submit|preventDefault={addDrink}>
      <input type="text" class="tag-input" bind:value={tag} placeholder="Tag this drink (optional)"/>
      <button class="add-btn">Add drink</button>
    </form>
    <p><strong>Today:</strong> {drinksToday}/{MAX_DAILY_DRINKS}</p>
    <p><strong>Week:</strong> {drinksThisWeek}/{MAX_WEEKLY_DRINKS}</p>
    <hr>
    {#if history.length}
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
            <tr>
              <td>
                {new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
              </td>
              <td>
                {history.filter(item => item.date === date).length}
              </td>
              <td>
                {history.filter(item => item.date === date).map(item => item.tag || 'unlisted')}
              </td>

            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</section>


<style lang="scss">
  .controls {
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    background: #e6e7f8;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  input, button {
    border: 2px solid currentColor;
    border-radius: 0.2rem;
  }

  .controls__wrapper {
    width: 100%;
    max-width: 22rem;
    text-align: center;
    padding: 1rem;
  }

  .tag-input {
    padding: 0.5rem 1rem;
    font: inherit;
    width: 100%;
  }

  .add-btn {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    margin: 1rem 0 2rem;
    font-weight: bold;
  }

  table {
    text-align: left;
    border-collapse: collapse;
    cellpadding: 0;
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
    text-align: center;
    margin: 0;
  }

  hr {
    margin: 2rem;
    border: 0;
    border-top: 1px solid currentColor;
  }
</style>  