<template>
  <div class="diagnostic-list card">
    <h3 class="section-title">Diagnostic List</h3>

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
          <td>
            <span class="status-badge" :class="getStatusClass(diag.status)">
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
  methods: {
    getStatusClass(status) {
      if (!status) return ''

      status = status.toLowerCase()
      if (status.includes('active') || status.includes('treated')) {
        return 'status-active'
      } else if (status.includes('observation')) {
        return 'status-observation'
      } else if (status.includes('cured')) {
        return 'status-cured'
      } else if (status.includes('inactive')) {
        return 'status-inactive'
      } else {
        return 'status-untreated'
      }
    },
  },
}
</script>

<style scoped>
.diagnostic-list {
  margin-bottom: 2rem;
}

.diagnostic-table {
  width: 100%;
  border-collapse: collapse;
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
}

.diagnostic-table td {
  font-size: 0.95rem;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
}
</style>
