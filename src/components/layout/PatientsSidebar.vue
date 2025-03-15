<!-- src/components/layout/PatientsSidebarUpdated.vue -->
<template>
  <div class="patients-sidebar">
    <div class="search-container">
      <h2 class="section-title">Patients</h2>
      <img src="/src/assets/icons/search.svg" alt="search icon" />
    </div>

    <div class="patients-list">
      <div
        v-for="patient in filteredPatients"
        :key="patient.id || patient.name"
        class="patient-item"
        :class="{ active: patient.name === activePatient }"
      >
        <div class="patient-avatar">
          <img
            :src="`/src/assets/patients/${patient.name.split(' ')[0].toLowerCase()}.png`"
            :alt="patient.name"
          />
        </div>
        <div class="patient-info">
          <div class="patient-name">{{ patient.name }}</div>
          <div class="patient-details">{{ patient.gender }}, {{ patient.age }}</div>
        </div>
        <button class="more-button">
          <img src="@/assets/icons/more-horizontal.svg" alt="More options" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'

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
  setup(props) {
    const searchQuery = ref('')

    const filteredPatients = computed(() => {
      if (!searchQuery.value) return props.patients

      return props.patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    })

    return {
      searchQuery,
      filteredPatients,
    }
  },
}
</script>

<style scoped>
.patients-sidebar {
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 1.5rem;
  height: 100%;
  overflow-y: auto;
}

.section-title {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
}

.search-container input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: none;
  background-color: var(--bg-main-color);
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.patients-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
}

.patient-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;
}

.patient-item:hover {
  background-color: var(--bg-main-color);
}

.patient-item.active {
  background-color: #d8fcf7;
}

.patient-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.75rem;
}

.patient-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.patient-info {
  flex: 1;
}

.patient-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.patient-details {
  font-size: 0.8rem;
  color: var(--text-secondary-color);
}

.more-button {
  background: none;
  border: none;
  cursor: pointer;
}

.more-button img {
  width: 16px;
  height: 16px;
}
</style>
