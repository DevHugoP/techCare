<template>
  <div class="lab-results card">
    <h3 class="section-title">Lab Results</h3>

    <div class="lab-results-list">
      <div v-for="(result, index) in labResults" :key="index" class="lab-result-item">
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  max-height: 100%;
  overflow-y: auto;
}

.lab-results-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lab-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: var(--bg-main-color);
}

.lab-name {
  font-weight: 500;
}

.download-button {
  background: none;
  border: none;
  cursor: pointer;
}

.download-button img {
  width: 20px;
  height: 20px;
}
</style>
