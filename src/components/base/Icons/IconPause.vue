<template>
  <span class="icon icon-pause" />
</template>

<script>
export default {
  name: 'IconPause'
}
</script>

<style lang="scss">
  @import './index';

  .icon-pause {
    width: $size;
    height: $size;
    justify-content: space-between;

    &::after,
    &::before {
      content: '';
      height: 100%;
      width: 42%;
      background: currentColor;
    }
  }
</style>
