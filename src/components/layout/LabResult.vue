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
interface LabResult {
  name: string
}

export default {
  name: 'LabResult',
  props: {
    labResults: {
      type: Array as () => LabResult[],
      default: () => [],
    },
  },
}
</script>

<style scoped>
.lab-results {
  background-color: var(--bg-secondary-color);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  color: var(--text-primary-color);
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
