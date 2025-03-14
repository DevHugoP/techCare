<!-- src/components/layout/PatientsSidebar.vue -->
<template>
  <div class="patients-sidebar">
    <h3 class="section-title">Patients</h3>

    <div class="search-bar">
      <input type="text" placeholder="Rechercher un patient..." v-model="searchQuery" />
    </div>

    <div class="patients-list">
      <div
        v-for="patient in patients"
        :key="patient.id"
        class="patient-item"
        :class="{ active: patient.name === activePatient }"
        @click="selectPatient(patient)"
      >
        <div class="patient-name">{{ patient.name }}</div>
        <div class="patient-info">{{ patient.age }} ans, {{ patient.gender }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

export default {
  name: 'PatientsSidebar',
  props: {
    patients: {
      type: Array,
      default: () => [],
    },
    activePatient: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const searchQuery = ref('')

    const filteredPatients = computed(() => {
      if (!searchQuery.value) return props.patients

      return props.patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    })

    const selectPatient = (patient) => {
      emit('select-patient', patient)
    }

    return {
      searchQuery,
      filteredPatients,
      selectPatient,
    }
  },
}
</script>

<style scoped>
.patients-sidebar {
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.search-bar {
  margin-bottom: 1rem;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--bg-main-color);
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.patients-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.patient-item {
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.patient-item:hover {
  background-color: var(--bg-main-color);
}

.patient-item.active {
  background-color: var(--button-main-color);
}

.patient-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.patient-info {
  font-size: 0.8rem;
  color: var(--text-secondary-color);
}
</style>
