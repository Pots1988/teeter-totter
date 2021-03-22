<template>
  <header class="header">
    <span class="header__title">Controls:</span>
      <Button
        @click="changeGameState"
        class="header__btn"
      >
        <component
          :is="playPause.icon"
          class="header__icon"
        />
        {{ playPause.text }}
      </Button>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Button from '@base/Button'
import IconPlay from '@base/Icons/IconPlay'
import IconPause from '@base/Icons/IconPause'

export default {
  name: 'Header',

  components: {
    Button
  },

  computed: {
    ...mapGetters(['getGamePlay']),

    playPause () {
      return {
        text: this.getGamePlay ? 'Pause' : 'Play',
        icon: this.getGamePlay ? IconPause : IconPlay
      }
    }
  },

  methods: {
    ...mapActions(['changeGamePlay']),

    changeGameState () {
      this.changeGamePlay(!this.getGamePlay)
    }
  }
}
</script>

<style>
  .header {
    background: var(--bg-menu);
    padding: 5px 10px;
    margin: 5px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-radius: 5px;
    border: var(--main-border);
  }

  .header__title {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 10px 0 0;
  }

  .header__btn {
    display: inline-flex;
    align-items: center;
  }

  .header__icon {
    margin-right: 4px;
  }
</style>
