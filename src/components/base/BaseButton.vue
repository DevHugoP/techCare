<template>
  <button class="base-button" :class="{ active }">
    <img :src="`src/assets/icons/${icon}`" :alt="altText || 'Icon'" />
    <span class="base-button-label">{{ label }}</span>
  </button>
</template>

<script lang="ts">
export default {
  name: 'BaseButton',
  props: {
    icon: {
      type: String,
      required: false,
    },
    altText: {
      type: String,
      default: '',
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
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  border: none;
  gap: 0.5rem;
  background-color: transparent;
  color: var(--text-main-color);
}

.base-button img {
  width: 18px;
  height: 18px;
}

.base-button.active {
  background-color: var(--button-main-color);
}
</style>
