<template>
  <div class="diagnostic-list card">
    <h3 class="section-title">Diagnostic List</h3>

    <table class="diagnostic-table">
      <thead>
        <tr class="table-header">
          <th>Problem/Diagnosis</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(diag, index) in diagnostics" :key="index">
          <td>{{ diag.name }}</td>
          <td>{{ diag.description }}</td>
          <td>
            <span class="status-badge">
              {{ diag.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
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
.diagnostic-list {
  margin-bottom: 2rem;
}
.diagnostic-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse; /* Ajouté pour supprimer l'espace entre les bordures */
  overflow: hidden; /* Permet de masquer les coins qui ne suivent pas le border-radius */
  border-radius: 2rem; /* Ajoute un border-radius au tableau */
}

.table-header {
  background-color: var(--bg-main-color);
}

.diagnostic-table th,
.diagnostic-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--bg-main-color);
}

.diagnostic-table th {
  font-weight: 500;
  color: var(--text-secondary-color);
  font-size: 0.9rem;
  /* Ajoute un border-radius spécifique aux coins du header */
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
}

.diagnostic-table td {
  font-size: 0.95rem;
}
</style>
