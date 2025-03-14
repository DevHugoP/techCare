<!-- src/components/layout/LabResult.vue -->
<template>
  <div class="lab-results">
    <h3 class="section-title">Résultats de laboratoire</h3>

    <div v-if="labResults && labResults.length" class="results-list">
      <div v-for="(result, index) in labResults" :key="index" class="result-card">
        <div class="result-header">
          <h4>{{ result.testName }}</h4>
          <span class="result-date">{{ formatDate(result.date) }}</span>
        </div>

        <div class="result-values">
          <div class="result-value">
            <span class="value">{{ result.value }}</span>
            <span class="unit">{{ result.unit }}</span>
          </div>

          <div class="reference-range">
            <span>Plage normale: {{ result.referenceRange }}</span>
            <span class="status" :class="getStatusClass(result)">
              {{ getStatus(result) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="no-data">Aucun résultat de laboratoire disponible</p>
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
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Date inconnue'

      const date = new Date(dateString)
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date)
    },
    getStatus(result) {
      if (!result.referenceRange || !result.value) return 'Non évalué'

      const value = parseFloat(result.value)
      const range = result.referenceRange.split('-')

      if (range.length !== 2) return 'Non évalué'

      const min = parseFloat(range[0])
      const max = parseFloat(range[1])

      if (isNaN(value) || isNaN(min) || isNaN(max)) return 'Non évalué'

      if (value < min) return 'Bas'
      if (value > max) return 'Élevé'
      return 'Normal'
    },
    getStatusClass(result) {
      const status = this.getStatus(result)
      if (status === 'Bas') return 'status-low'
      if (status === 'Élevé') return 'status-high'
      if (status === 'Normal') return 'status-normal'
      return ''
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
}

.section-title {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.result-card {
  border: 1px solid var(--bg-main-color);
  border-radius: 0.75rem;
  padding: 1rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.result-header h4 {
  font-size: 1rem;
}

.result-date {
  font-size: 0.8rem;
  color: var(--text-secondary-color);
}

.result-values {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.value {
  font-size: 1.2rem;
  font-weight: 600;
}

.unit {
  font-size: 0.8rem;
  color: var(--text-secondary-color);
}

.reference-range {
  font-size: 0.8rem;
  color: var(--text-secondary-color);
}

.status {
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
}

.status-normal {
  background-color: #e3f8e6;
  color: #2e7d32;
}

.status-high {
  background-color: #ffebee;
  color: #c62828;
}

.status-low {
  background-color: #e3f2fd;
  color: #1565c0;
}

.no-data {
  color: var(--text-secondary-color);
  font-style: italic;
}
</style>
