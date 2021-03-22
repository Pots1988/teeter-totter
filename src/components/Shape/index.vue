<template>
  <div
    class="shape-outer"
    :data-weight="shape.weight"
    :style="positionStyle"
  >
    <div
      class="shape"
      :class="classType"
      :style="shape.style"
      :key="shape.id"
    />
  </div>
</template>

<script>
export default {
  name: 'Shape',

  props: {
    shape: {
      type: Object,
      required: true,
      validator: (shape) => ['type', 'weight', 'style'].every((key) => key in shape)
    }
  },

  computed: {
    classType () {
      return `shape--${this.shape.type}`
    },
    positionStyle () {
      const style = {}
      const { top, left } = this.shape

      if (top) {
        style.top = `${top}px`
      }

      if (left) {
        style.left = `${left}px`
      }

      return style
    }
  }
}
</script>

<style lang="scss">
  .shape-outer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    &::before {
      content: attr(data-weight);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      font-size: 10px;
      line-height: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .shape {
    filter: drop-shadow(var(--dark-shadow));

    &--circle {
      border-radius: 50%;
    }
  }
</style>
