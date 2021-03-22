<template>
  <div class="swing-base" />
</template>

<script>
export default {
  name: 'SwingBase'
}
</script>

<style lang="scss">
  @import './index';

  .swing-base {
    width: 0;
    margin: 0 auto;
    border-bottom: $base-height solid $swing-color;
    border-right: $base-width solid transparent;
    border-left: $base-width solid transparent;
  }
</style>
