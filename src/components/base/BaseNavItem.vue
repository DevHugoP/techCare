<template>
  <button class="base-button" :class="{ active }">
    <img :src="`src/assets/icons/${icon}`" :alt="altText || 'Icon'" />
    <span class="base-button-label">{{ label }}</span>
  </button>
</template>

<script lang="ts">
export default {
  name: 'BaseNavItem',
  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border: none;
  cursor: pointer;
}
</style>
