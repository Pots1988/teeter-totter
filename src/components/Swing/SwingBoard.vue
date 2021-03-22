<template>
  <div
    class="swing-board"
    :style="swingAngle"
  >
    <Shape
      v-for="(shape, id) in totalShapesOnBoard"
      :key="id"
      :shape="shape"
      class="swing-board__shape"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Shape from '@/components/Shape'
import { TIMEOUT_INTERVAL } from '@/constants'

export default {
  name: 'SwingBoard',

  components: {
    Shape
  },

  data: () => ({
    timerId: null
  }),

  computed: {
    ...mapGetters([
      'getUserShapes',
      'getAiShapes',
      'getSwingSpeed',
      'getGamePlay',
      'getGameEnded',
      'getSwingAngle'
    ]),

    totalShapesOnBoard () {
      return [...this.getUserShapes, ...this.getAiShapes]
    },

    swingAngle () {
      return {
        transform: `rotate(${this.getSwingAngle}deg)`
      }
    }
  },

  methods: {
    ...mapMutations(['setSwingAngle']),
    startTimer () {
      const tick = () => {
        const swingSpeedPerInterval = this.getSwingSpeed / (1000 / TIMEOUT_INTERVAL)

        this.setSwingAngle(this.getSwingAngle + swingSpeedPerInterval)
        this.timerId = setTimeout(() => tick(), TIMEOUT_INTERVAL)
      }

      this.timerId = setTimeout(() => tick(), TIMEOUT_INTERVAL)
    }
  },

  watch: {
    getGamePlay (started) {
      started ? this.startTimer() : clearTimeout(this.timerId)
    },
    getGameEnded (gameEnded) {
      if (gameEnded) {
        clearTimeout(this.timerId)
      }
    }
  },

  beforeDestroy () {
    clearTimeout(this.timerId)
    this.setSwingAngle(0)
  }
}
</script>

<style lang="scss">
  @import './index';

  .swing-board {
    height: $board-height;
    background: $swing-color;
    position: relative;
    box-shadow: var(--dark-shadow);
  }

  .swing-board__shape {
    transform: translateY(-100%)
  }
</style>
