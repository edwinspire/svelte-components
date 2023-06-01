<script>
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
  
    export let label = "";
    let inputValue = "";
    export let options = [
      { name: "Apple", value: 0 },
      { name: "Banana", value: 1 },
      { name: "Cherry", value: 2 },
      { name: "Grape", value: 3 },
      { name: "Orange", value: 4 },
      { name: "Orange1", value: 5 },
      { name: "Orange2", value: 6 },
      { name: "Orange3", value: 7 },
      { name: "Orange4", value: 8 },
      { name: "Orange5", value: 9 },
      { name: "Orange6", value: 10 },
    ];
    let filteredOptions = [];
    let isOpen = false;
    let selectedIndex = -1;
  
    const dispatch = createEventDispatcher();
  
    function handleInput(event) {
      inputValue = event.target.value;
      filterOptions();
    }
  
    function filterOptions() {
      filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      selectedIndex = -1;
    }
  
    function handleDropdownToggle() {
      isOpen = !isOpen;
    }
  
    function handleOptionSelect(option) {
      inputValue = option.name;
      isOpen = false;
      dispatch("select", option);
    }
  
    function handleKeyDown(event) {
      if (isOpen) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          selectedIndex = Math.max(selectedIndex - 1, 0);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          selectedIndex = Math.min(selectedIndex + 1, filteredOptions.length - 1);
        } else if (event.key === "Enter" && selectedIndex !== -1) {
          event.preventDefault();
          handleOptionSelect(filteredOptions[selectedIndex]);
        }
      }
    }
  
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest(".dropdown")) {
        isOpen = false;
      }
    }
  
    onMount(() => {
      window.addEventListener("click", handleClickOutside);
    });
    onDestroy(() => {
  //    window.removeEventListener("click", handleClickOutside);
    });
  </script>
  
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">{label}</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="dropdown">
            <span class="control has-icons-right">
              <input
                class="input is-small"
                type="text"
                value={inputValue}
                on:input={handleInput}
                on:click={handleDropdownToggle}
                on:keydown={handleKeyDown}
              />
              <span class="icon is-small is-right">
                <i class="fa-solid fa-chevron-down" />
              </span>
            </span>
  
            {#if isOpen && filteredOptions.length > 0}
              <ul class="dropdown-list menu label is-small">
                {#each filteredOptions as option, i}
                  <li
                    class="dropdown-list-item menu-item {i === selectedIndex
                      ? 'is-active'
                      : ''}"
                    on:click={() => handleOptionSelect(option)}
                  >
                    {option.name}
                  </li>
                {/each}
              </ul>
            {/if}
          </label>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .dropdown {
      position: relative;
    }
  
    .dropdown-list {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      max-height: 200px;
      overflow-y: auto;
      background-color: #fff;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 4px;
      z-index: 999;
    }
  
    .dropdown-list-item {
      padding: 8px;
      cursor: pointer;
    }
  
    .dropdown-list-item.is-active {
      background-color: #f5f5f5;
    }
  </style>
  