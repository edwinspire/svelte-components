<script>
</script>

<!-- svelte-ignore a11y_no_redundant_roles -->
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <!-- svelte-ignore a11y_invalid_attribute -->
    <a class="navbar-item" href="#">
      <strong><slot name="title" /></strong>
    </a>

    <!-- svelte-ignore a11y_missing_attribute -->
    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <span aria-hidden="true" />
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <span aria-hidden="true" />
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <span aria-hidden="true" />
    </a>
  </div>

  <div class="navbar-menu">
    <div class="navbar-start">
      {#if $$slots.start1}
        <div class="navbar-item">
          <slot name="start1" />
        </div>
      {/if}

      {#if $$slots.start2}
        <div class="navbar-item">
          <slot name="start2" />
        </div>
      {/if}

      {#if $$slots.start3}
        <div class="navbar-item">
          <slot name="start3" />
        </div>
      {/if}

      {#if $$slots.start4}
        <div class="navbar-item">
          <slot name="start4" />
        </div>
      {/if}

      {#if $$slots.start5}
        <div class="navbar-item">
          <slot name="start5" />
        </div>
      {/if}
    </div>

    <div class="navbar-end">
      {#if $$slots.end1}
        <div class="navbar-item">
          <slot name="end1" />
        </div>
      {/if}

      {#if $$slots.end2}
        <div class="navbar-item">
          <slot name="end2" />
        </div>
      {/if}

      {#if $$slots.end3}
        <div class="navbar-item">
          <slot name="end3" />
        </div>
      {/if}

      {#if $$slots.end4}
        <div class="navbar-item">
          <slot name="end4" />
        </div>
      {/if}

      {#if $$slots.end5}
        <div class="navbar-item">
          <slot name="end5" />
        </div>
      {/if}
    </div>
  </div>
</nav>
