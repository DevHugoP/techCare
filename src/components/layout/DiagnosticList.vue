<template>
  <div class="diagnostic-list card">
    <h3 class="section-title">Diagnostic List</h3>

    <div class="table-wrapper">
      <table class="diagnostic-table">
        <thead>
          <tr>
            <th>Problem/Diagnosis</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(diag, index) in diagnostics" :key="index">
            <td>{{ diag.name }}</td>
            <td>{{ diag.description }}</td>
            <td>{{ diag.status }}</td>
          </tr>
        </tbody>
      </table>
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
  margin-bottom: 3rem;
}

.table-wrapper {
  overflow: scroll;
}

.diagnostic-table {
  border-spacing: 0;
}

.diagnostic-table thead tr {
  background-color: #f5f6fa;
  border-radius: 20px;
}

.diagnostic-table thead tr th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--text-primary-color);
  font-size: 14px;
}

.diagnostic-table thead tr th:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.diagnostic-table thead tr th:last-child {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.diagnostic-table tbody tr td {
  padding: 16px 16px;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-main-color);
}

/* Colonne Status avec texte en gris */
.diagnostic-table tbody tr td:last-child {
  color: var(--text-main-color);
}
</style>
