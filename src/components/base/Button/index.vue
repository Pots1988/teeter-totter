<template>
  <button
    :type="type"
    class="btn"
    :class="`btn--${variant}`"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'transparent',
      validator: (variant) => ['transparent', 'success', 'primary', 'danger'].includes(variant)
    }
  }
}
</script>

<style lang="scss">
  .btn {
    border: 0;
    background: none;
    padding: 5px;
    min-width: 40px;
    cursor: pointer;
    color: inherit;
    border-radius: 5px;
    font-size: 14px;

    &--success {
      background: var(--success);
      color: var(--color-main);
    }

    &--primary {
      background: var(--primary);
      color: var(--color-main);
    }

    &--danger {
      background: var(--danger);
      color: var(--color-main);
    }
  }
</style>
