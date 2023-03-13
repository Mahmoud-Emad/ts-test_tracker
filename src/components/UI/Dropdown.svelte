<script lang="ts">
  import { Router, Link } from 'svelte-navigator';
  let ulDrop: HTMLUListElement;
</script>

<div class="d-flex align-items-center">
  <div class="dropdown">
    <Router>
      <Link
        class="dropdown-toggle d-flex align-items-center hidden-arrow"
        to="#"
        id="navbarDropdownMenuAvatar"
        role="button"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        <slot name="dropdown-toggle" />
      </Link>
    </Router>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <ul
      class="dropdown-menu custom-dropdown-menu dropdown-menu-end mt-3"
      aria-labelledby="navbarDropdownMenuAvatar"
      bind:this={ulDrop}
      on:click={() => {
        ulDrop.classList.contains( 'show' )
          ? ulDrop.classList.remove( 'show' )
          : ulDrop.classList.add( 'show' );
      }}
    >
      <slot name="dropdown-li" />
    </ul>
  </div>
</div>
