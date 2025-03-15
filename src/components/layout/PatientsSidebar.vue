<template>
  <div class="patients-sidebar">
    <div class="search-container">
      <h2 class="section-title">Patients</h2>
      <div class="search-icon-wrapper">
        <img src="/src/assets/icons/search.svg" alt="search icon" class="search-icon" />
      </div>
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
  border-radius: var(--border-radius-md);
  width: 280px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 65rem;
}

@media (max-width: 1200px) {
  .patients-sidebar {
    display: none;
  }
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
}

.search-icon-wrapper {
  cursor: pointer;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.patients-list {
  flex: 1;
  overflow-y: auto;
}

.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  position: relative;
}

.patient-item:hover {
  background-color: #f9f9f9;
}

.patient-item.active {
  background-color: #e6f7f5;
}

.patient-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
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
  margin-bottom: 4px;
  color: var(--text-primary-color);
}

.patient-details {
  font-size: 12px;
  color: var(--text-secondary-color);
}

.more-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.more-button img {
  width: 16px;
  height: 16px;
}
</style>
