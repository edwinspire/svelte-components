<script>
    let { left, right } = $props();
</script>

<nav class="nav_margin">
    <div class="responsive-columns">
        <div class="responsive-column-left">
            <div class="container_left">
                {#if Array.isArray(left)}
                    {#each left as left_item}
                        <span class="slot_padding">{@render left_item?.()}</span>
                    {/each}
                {/if}
            </div>
        </div>

        <div class="responsive-column-right">
            <div class="container_right">
                {#if Array.isArray(right)}
                    {#each right as right_item}
                        <span class="slot_padding">{@render right_item?.()}</span>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</nav>

<style>
    .nav_margin {
        margin: 0.25rem;
        width: 100%;
    }

    .slot_padding {
        margin: 0.1rem;
    }

    .container_left {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.2rem;
    }

    .container_right {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
        gap: 0.2rem;
    }

    .responsive-columns {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .responsive-column-left,
    .responsive-column-right {
        flex: 1 1 auto;
        min-width: 0;
    }

 
</style>