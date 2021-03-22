<template>
  <div class="swing">
    <SwingBoard ref="board" />
    <SwingBase ref="base" />
  </div>
</template>

<script>
import SwingBoard from './SwingBoard'
import SwingBase from './SwingBase'

export default {
  name: 'Swing',

  components: {
    SwingBoard,
    SwingBase
  }
}
</script>

<style lang="scss">
  .swing {
    margin-top: auto;
    position: relative;
    z-index: 10;
    line-height: 0;
    font-size: 0;
  }
</style>
