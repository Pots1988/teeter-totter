<template>
  <div class="modal">
    <div class="modal__inner">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100000;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .modal__inner {
    background: var(--bg-main);
    color: var(--color-secondary);
    padding: 10px;
    width: 100%;
    max-width: 500px;
  }
</style>
