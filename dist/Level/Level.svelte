<script>
  export let classLevel = "";
</script>

<!-- Main container -->
<nav class="level {classLevel}">
  <!-- Left side -->
  <div class="level-left">
    {#if $$slots.left01}
      <div class="level-item">
        <slot name="left01" />
      </div>
    {/if}
    {#if $$slots.left02}
      <div class="level-item">
        <slot name="left02" />
      </div>
    {/if}
    {#if $$slots.left03}
      <div class="level-item">
        <slot name="left03" />
      </div>
    {/if}
    {#if $$slots.left04}
      <div class="level-item">
        <slot name="left04" />
      </div>
    {/if}
    {#if $$slots.left05}
      <div class="level-item">
        <slot name="left05" />
      </div>
    {/if}
    {#if $$slots.left06}
      <div class="level-item">
        <slot name="left06" />
      </div>
    {/if}
    {#if $$slots.left07}
      <div class="level-item">
        <slot name="left07" />
      </div>
    {/if}
    {#if $$slots.left08}
      <div class="level-item">
        <slot name="left08" />
      </div>
    {/if}
    {#if $$slots.left09}
      <div class="level-item">
        <slot name="left09" />
      </div>
    {/if}
    {#if $$slots.left10}
      <div class="level-item">
        <slot name="left10" />
      </div>
    {/if}
  </div>

  {#if $$slots.item01}
    <div class="level-item has-text-centered">
      <slot name="item01" />
    </div>
  {/if}
  {#if $$slots.item02}
    <div class="level-item has-text-centered">
      <slot name="item02" />
    </div>
  {/if}
  {#if $$slots.item03}
    <div class="level-item has-text-centered">
      <slot name="item03" />
    </div>
  {/if}
  {#if $$slots.item04}
    <div class="level-item has-text-centered">
      <slot name="item04" />
    </div>
  {/if}
  {#if $$slots.item05}
    <div class="level-item has-text-centered">
      <slot name="item05" />
    </div>
  {/if}
  {#if $$slots.item06}
    <div class="level-item has-text-centered">
      <slot name="item06" />
    </div>
  {/if}
  {#if $$slots.item07}
    <div class="level-item has-text-centered">
      <slot name="item07" />
    </div>
  {/if}
  {#if $$slots.item08}
    <div class="level-item has-text-centered">
      <slot name="item08" />
    </div>
  {/if}
  {#if $$slots.item09}
    <div class="level-item has-text-centered">
      <slot name="item09" />
    </div>
  {/if}
  {#if $$slots.item10}
    <div class="level-item has-text-centered">
      <slot name="item10" />
    </div>
  {/if}
  {#if $$slots.item11}
    <div class="level-item has-text-centered">
      <slot name="item11" />
    </div>
  {/if}
  {#if $$slots.item12}
    <div class="level-item has-text-centered">
      <slot name="item12" />
    </div>
  {/if}
  {#if $$slots.item13}
    <div class="level-item has-text-centered">
      <slot name="item13" />
    </div>
  {/if}
  {#if $$slots.item14}
    <div class="level-item has-text-centered">
      <slot name="item14" />
    </div>
  {/if}
  {#if $$slots.item15}
    <div class="level-item has-text-centered">
      <slot name="item15" />
    </div>
  {/if}

  <!-- Right side -->
  <div class="level-right">
    {#if $$slots.right01}
      <div class="level-item">
        <slot name="right01" />
      </div>
    {/if}
    {#if $$slots.right02}
      <div class="level-item">
        <slot name="right02" />
      </div>
    {/if}
    {#if $$slots.right03}
      <div class="level-item">
        <slot name="right03" />
      </div>
    {/if}
    {#if $$slots.right04}
      <div class="level-item">
        <slot name="right04" />
      </div>
    {/if}
    {#if $$slots.right05}
      <div class="level-item">
        <slot name="right05" />
      </div>
    {/if}
    {#if $$slots.right06}
      <div class="level-item">
        <slot name="right06" />
      </div>
    {/if}
    {#if $$slots.right07}
      <div class="level-item">
        <slot name="right07" />
      </div>
    {/if}
    {#if $$slots.right08}
      <div class="level-item">
        <slot name="right08" />
      </div>
    {/if}
    {#if $$slots.right09}
      <div class="level-item">
        <slot name="right09" />
      </div>
    {/if}
    {#if $$slots.right10}
      <div class="level-item">
        <slot name="right10" />
      </div>
    {/if}
  </div>
</nav>
