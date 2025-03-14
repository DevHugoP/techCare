<!-- src/components/layout/DiagnosticHistory.vue -->
<template>
  <div class="diagnostic-history">
    <h3 class="section-title">Historique des diagnostics</h3>

    <div v-if="diagnostics && diagnostics.length" class="diagnostics-list">
      <div v-for="(diag, index) in diagnostics" :key="index" class="diagnostic-card">
        <div class="diagnostic-header">
          <h4>{{ diag.name }}</h4>
          <span class="diagnostic-date">{{ formatDate(diag.date) }}</span>
        </div>
        <p class="diagnostic-description">{{ diag.description }}</p>
        <div class="diagnostic-footer">
          <span class="diagnostic-doctor">Dr. {{ diag.doctor }}</span>
        </div>
      </div>
    </div>
    <p v-else class="no-data">Aucun diagnostic enregistré</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DiagnosticHistory',
  props: {
    diagnostics: {
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
  },
}
</script>

<style scoped>
.diagnostic-history {
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.diagnostics-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.diagnostic-card {
  border: 1px solid var(--bg-main-color);
  border-radius: 0.75rem;
  padding: 1rem;
}

.diagnostic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.diagnostic-header h4 {
  font-size: 1rem;
}

.diagnostic-date {
  font-size: 0.8rem;
  color: var(--text-secondary-color);
}

.diagnostic-description {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.diagnostic-footer {
  font-size: 0.85rem;
  color: var(--text-secondary-color);
  text-align: right;
}

.no-data {
  color: var(--text-secondary-color);
  font-style: italic;
}
</style>
