<template>
  <div class="lab-results card">
    <h3 class="section-title">Lab Results</h3>

    <div class="lab-results-list">
      <div
        v-for="(result, index) in labResults"
        :key="index"
        class="lab-result-item"
        :class="{ selected: index === 1 }"
      >
        <span class="lab-name">{{ result.name }}</span>
        <button class="download-button">
          <img src="@/assets/icons/download.svg" alt="Download" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LabResult',
  props: {
    labResults: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.lab-results {
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary-color);
  margin-bottom: 1.5rem;
}

.lab-results-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow-y: auto;
  flex: 1;
}

.lab-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.6rem;
  background-color: white;
}

.lab-result-item.selected {
  background-color: #f5f6fa;
}

.lab-name {
  font-weight: 400;
  font-size: 14px;
  color: var(--text-main-color);
}

.download-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.download-button img {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}
</style>
