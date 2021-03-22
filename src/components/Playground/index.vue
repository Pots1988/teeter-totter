<template>
  <article class="playground">
    <Header />

    <div class="playground__wrap">
      <PlaygroundForce
        :aiForce="getAiForce"
        :userForce="getUserForce"
      />
      <Dropbox ref="dropbox" />
      <Swing ref="swing" />
    </div>

    <Modal v-if="getGameEnded">
      <div class="playground__modal-lost">
        You've lost the game!
        <Button
          variant="success"
          class="playground__modal-try"
          @click="resetGame"
        >
          Try again
        </Button>
      </div>
    </Modal>
  </article>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Header from '@/components/Header'
import Dropbox from '@/components/Dropbox'
import Swing from '@/components/Swing'
import PlaygroundForce from './PlaygroundForce'
import Modal from '@base/Modal'
import Button from '@base/Button'

export default {
  name: 'Playground',

  components: {
    Header,
    Dropbox,
    Swing,
    PlaygroundForce,
    Modal,
    Button
  },

  mounted () {
    this.init()
  },

  computed: {
    ...mapState(['userShapes']),
    ...mapGetters([
      'getUserForce',
      'getAiForce',
      'getGameEnded'
    ])
  },

  watch: {
    userShapes (shapes) {
      if (shapes.length) {
        this.createAiShape()
      }
    }
  },

  methods: {
    ...mapActions(['createAiShape', 'resetGame']),
    ...mapMutations(['setBoardEl']),

    init () {
      const board = this.$refs.swing.$refs.board.$el

      this.setBoardEl(board)
    }
  }
}
</script>

<style lang="scss">
  .playground {
    height: 100vh;
    display: flex;
    flex-direction: column;
    width: 720px;
    padding: 0 10px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1);
      z-index: -1;
      width: calc((100vw - 100%) / 2);
      opacity: 0;
      transition: opacity 0.2s;
    }

    &::before {
      right: 100%;
    }

    &::after {
      left: 100%;
    }

    &--left {
      &::before {
        opacity: 1;
      }
    }

    &--right {
      &::after {
        opacity: 1;
      }
    }
  }

  .playground__wrap {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }

  .playground__modal-lost {
    font-size: 30px;
    text-align: center;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .playground__modal-try {
    margin-top: 10px;
    padding: 10px 30px;
  }
</style>
