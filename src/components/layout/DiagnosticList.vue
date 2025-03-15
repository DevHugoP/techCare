-
<template>
  <div class="diagnostic-list card">
    <h3 class="section-title">Diagnostic List</h3>

    <!-- Table header -->
    <div class="table-header">
      <div class="header-cell diagnosis-cell">Problem/Diagnosis</div>
      <div class="header-cell description-cell">Description</div>
      <div class="header-cell status-cell">Status</div>
    </div>

    <!-- Table body with scroll -->
    <div class="table-body">
      <div v-for="(diag, index) in diagnostics" :key="index" class="table-row">
        <div class="table-cell diagnosis-cell">{{ diag.name }}</div>
        <div class="table-cell description-cell">{{ diag.description }}</div>
        <div class="table-cell status-cell">{{ diag.status }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DiagnosticTable',
  props: {
    diagnostics: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
}
</script>

<style scoped>
.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary-color);
}

.diagnostic-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 1.5rem;
}

.table-header {
  display: flex;
  background-color: #f5f6fa;
  border-radius: 20px;
  margin-bottom: 8px;
}

.table-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-height: calc(100% - 50px); /* Hauteur moins l'en-tête */
}

/* Styles de scrollbar personnalisés pour WebKit (Chrome, Safari, Edge) */
.table-body::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-body::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 8px;
}

.table-body::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 8px;
  border: 2px solid #f0f0f0;
}

.table-body::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a0;
}

.table-row {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.table-row:last-child {
  border-bottom: none;
}

.header-cell,
.table-cell {
  padding: 12px 16px;
  text-align: left;
}

.header-cell {
  font-weight: 600;
  color: var(--text-primary-color);
  font-size: 14px;
}

.table-cell {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-main-color);
  padding: 16px 16px;
}

.diagnosis-cell {
  flex: 3;
}

.description-cell {
  flex: 5;
}

.status-cell {
  flex: 2;
}
</style>
