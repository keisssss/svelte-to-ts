<script>
  export let state;
  import { beforeUpdate, onMount, afterUpdate, tick } from "svelte";
  import { writable, get } from "svelte/store";
  const onClick = (to) => {
    state.set(to);
  };
</script>

{#if $state === "state1"}
  <div id="svelte-component" class="block" data-state="state1">
    svelte-embed 1
    <button
      on:click={() => {
        onClick("state2");
      }}
    >
      to state2</button
    >
  </div>
{:else if $state === "state2"}
  <div id="svelte-component" class="block" data-state="state2">
    svelte-embed 2
    <button
      on:click={() => {
        onClick("state3");
      }}
    >
      to state3</button
    >
  </div>
{:else if $state === "state3"}
  <div id="svelte-component" class="block" data-state="state3">
    svelte-embed 3
    <button
      on:click={() => {
        onClick("state4");
      }}
    >
      to state4</button
    >
  </div>
{:else if $state === "state4"}
  <div id="svelte-component" class="modal-container" data-state="state3">
    <div class="modal">
      svelte-modal
      <button
        on:click={() => {
          onClick("state1");
        }}
      >
        to state1</button
      >
    </div>
  </div>
{:else}
  <p id="svelte-component">else</p>
{/if}

<style>
  .block {
    height: 200px;
    width: 200px;
    background-color: honeydew;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    cursor: default;
  }

  .modal-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .modal {
    position: relative;
    height: 300px;
    width: 500px;
    background-color: honeydew;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    gap: 20px;
  }

  div {
    /* height: 100%;
    width: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
