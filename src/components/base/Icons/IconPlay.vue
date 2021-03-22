<template>
  <span class="icon icon-play" />
</template>

<script>
export default {
  name: 'IconPlay'
}
</script>

<style lang="scss">
  @import './index';

  $empty-size: $size / 2;

  .icon-play {
    border-left: $size solid currentColor;
    border-top: $empty-size solid transparent;
    border-bottom: $empty-size solid transparent;
  }
</style>
