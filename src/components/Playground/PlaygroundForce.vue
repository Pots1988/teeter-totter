<template>
  <div class="playground-force">
    <div class="playground-force__item">{{ userForce }}H</div>
    <div class="playground-force__item">{{ aiForce }}H</div>
  </div>
</template>

<script>
export default {
  name: 'PlaygroundForce',

  props: {
    aiForce: {
      type: Number,
      default: 0
    },
    userForce: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
  .playground-force {
    position: relative;
    z-index: 10;
    display: flex;
    flex-grow: 1;
    font-size: 50px;
    line-height: 1;
    opacity: 0.2;
    pointer-events: none;
  }

  .playground-force__item {
    flex-grow: 1;
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
