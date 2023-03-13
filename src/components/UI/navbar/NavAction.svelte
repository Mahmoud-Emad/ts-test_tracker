<script lang="ts">
  export let tooltip: string; // prevent blank tooltips
  export let onClick: CallableFunction;
</script>

<div class="nav-action">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    data-tooltip={tooltip}
    class="user_photo_nav c-pinter"
    on:click|preventDefault={async () => {
      await onClick();
    }}
  >
    <i class="fa fa-plus" aria-hidden="true" />
  </span>
</div>
