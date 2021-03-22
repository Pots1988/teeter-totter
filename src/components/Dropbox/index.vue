<template>
  <div class="dropbox">
    <Shape
      v-if="getNewUserShape"
      :shape="getNewUserShape"
      ref="shape"
    />
  </div>
</template>

<script>
import {
  LEFT_ARROW,
  RIGHT_ARROW,
  TIMEOUT_INTERVAL,
  ELEMENT_SPEED
} from '@/constants'
import {
  getTanDeg
} from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import Shape from '@/components/Shape'

export default {
  name: 'Dropbox',

  components: {
    Shape
  },

  data: () => ({
    timerId: null,
    shapeSpeedPerInterval: ELEMENT_SPEED / (1000 / TIMEOUT_INTERVAL)
  }),

  mounted () {
    const keydownHelper = (e) => {
      const { keyCode } = e
      const toLeft = keyCode === LEFT_ARROW
      const toRight = keyCode === RIGHT_ARROW

      if (!(this.getGamePlay && !this.getGameEnded && (toLeft || toRight))) return false

      const { left: shapeLeft, width: shapeWidth } = this.getNewUserShape
      let left = shapeLeft

      if (toLeft) {
        const { shapeLeft } = this.getShapeSetting()
        const { boardLeft } = this.getBoardSettings()
        const newShapeLeft = shapeLeft - boardLeft - this.shapeSpeedPerInterval

        if (newShapeLeft > 0) {
          left = newShapeLeft
        }
      } else {
        const newShapeLeft = shapeLeft + this.shapeSpeedPerInterval
        const rightSide = this.getBoardWidth / 2 - shapeWidth

        left = Math.min(newShapeLeft, rightSide)
      }

      this.updateNewShape({ left })
    }

    window.addEventListener('keydown', keydownHelper)

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keydown', keydownHelper)
    })
  },

  computed: {
    ...mapGetters([
      'getNewUserShape',
      'getSwingAngle',
      'getGamePlay',
      'getBoardEl',
      'getGameEnded',
      'getBoardWidth'
    ])
  },

  methods: {
    ...mapActions(['createShape', 'updateNewShape', 'addUserShape']),

    getShapeSetting () {
      const {
        bottom: shapeBottom,
        left,
        width
      } = this.$refs.shape?.$el?.getBoundingClientRect()

      return {
        shapeBottom,
        shapeLeft: left,
        shapeCenterPosition: left + width / 2
      }
    },

    getBoardSettings () {
      const { shapeCenterPosition } = this.getShapeSetting()
      const {
        top,
        bottom,
        left
      } = this.getBoardEl.getBoundingClientRect()
      const boardHeight = this.getBoardEl.clientHeight

      const a = shapeCenterPosition - left
      const b = a * getTanDeg(this.getSwingAngle)
      const resultBoardPosition = this.getSwingAngle > 0 ? top : bottom - boardHeight
      const boardTop = resultBoardPosition + b

      return {
        boardTop,
        boardLeft: left
      }
    },

    startTimer () {
      const tick = () => {
        const { shapeBottom } = this.getShapeSetting()
        const { boardTop } = this.getBoardSettings()
        const { top } = this.getNewUserShape

        if (shapeBottom + this.shapeSpeedPerInterval < boardTop) {
          this.updateNewShape({ top: top + this.shapeSpeedPerInterval })
          this.timerId = setTimeout(() => tick(), TIMEOUT_INTERVAL)
        } else {
          clearTimeout(this.timerId)
          this.addUserShape()
        }
      }

      this.timerId = setTimeout(() => tick(), TIMEOUT_INTERVAL)
    },

    addShapeAndStart () {
      this.createShape()
      this.startTimer()
    }
  },

  watch: {
    getGamePlay (started) {
      started ? this.startTimer() : clearTimeout(this.timerId)
    },
    getNewUserShape (shape) {
      if (!shape && this.getGamePlay && !this.getGameEnded) {
        this.addShapeAndStart()
      }
    },
    getGameEnded (gameEnded) {
      if (gameEnded) {
        clearTimeout(this.timerId)
      }
    }
  },

  beforeDestroy () {
    clearTimeout(this.timerId)
  }
}
</script>

<style lang="scss">
  .dropbox {
    background: var(--bg-menu);
    border-radius: 5px;
    border: var(--main-border);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
</style>
