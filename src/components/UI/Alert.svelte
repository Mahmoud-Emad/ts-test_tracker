<script lang="ts">
  export let className: string;
  export let title: string | null = null;
  export let message: string;
  export let isOpen: boolean;
  export let error: object = {};
  export let close = true;

  let timeOut = 0;

  function handleAlert() {
    if ( close && className != 'danger' ) {
      timeOut = 3000;
      setTimeout( () => {
        isOpen = false;
        timeOut = 0;
      }, timeOut );
    }
  }

  $: isOpen, handleAlert();
</script>

{#if isOpen}
  <div class="alert alert-{className}">
    {#if title}
      <h6 class="alert-heading text-capitalize">{title}</h6>
    {/if}
    {message}
    {#if error}
      <ul>
        {#each Object.entries( error ) as [field, message]}
          <li>
            <strong>{field}</strong> <span>{message}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
