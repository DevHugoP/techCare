<template>
  <div class="app-wrapper">
    <TechCareHeader />
    <main>
      <div v-if="isLoading" class="loading-state">
        <p>Loading Data</p>
      </div>
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchData">Try again</button>
      </div>
      <div v-else class="content-wrapper">
        <div class="content-grid">
          <PatientsSidebar
            :patients="allPatients"
            :activePatient="selectedPatient ? selectedPatient.name : ''"
          />
          <div class="patient-details-wrapper">
            <DiagnosticHistory :patient="selectedPatient || []" />
            <DiagnosticList :diagnostics="selectedPatient.diagnostics || []" />
          </div>
          <div class="medical-data">
            <PatientInfoSidebar :patient="selectedPatient" />
            <LabResult :labResults="selectedPatient.labResults || []" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import DiagnosticHistory from './components/layout/DiagnosticHistory.vue'
import DiagnosticList from './components/layout/DiagnosticList.vue'
import TechCareHeader from './components/layout/Header.vue'
import LabResult from './components/layout/LabResult.vue'
import PatientInfoSidebar from './components/layout/PatientInfoSidebar.vue'
import PatientsSidebar from './components/layout/PatientsSidebar.vue'
import { fetchPatientData } from './request.js'

export default {
  name: 'App',
  components: {
    TechCareHeader,
    PatientInfoSidebar,
    PatientsSidebar,
    LabResult,
    DiagnosticHistory,
    DiagnosticList,
  },
  setup() {
    const allPatients = ref([])
    const selectedPatient = ref({})
    const isLoading = ref(true)
    const error = ref(null)

    const fetchData = async () => {
      isLoading.value = true
      error.value = null

      try {
        const data = await fetchPatientData()
        // Filtrer les éléments null ou undefined
        allPatients.value = data.filter((patient) => patient) || []

        if (allPatients.value.length > 0) {
          // Sélectionner le premier patient par défaut
          selectedPatient.value = allPatients.value[3]
        } else {
          error.value = 'No patient found'
        }
      } catch (err) {
        console.error('Fetch data error:', err)
        error.value = err.message || 'An error occurred'
      } finally {
        isLoading.value = false
      }
    }

    onMounted(fetchData)

    return {
      allPatients,
      selectedPatient,
      isLoading,
      error,
      fetchData,
    }
  },
}
</script>

<style scoped>
.app-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 1rem;
  background-color: var(--bg-main-color);
}

main {
  flex: 1;
  overflow: scroll;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
  display: flex;
  margin-top: 1.5rem;
  overflow: scroll;
}

.content-grid {
  display: flex;
  width: 100%;
  gap: 1.5rem;
  height: fit-content;
  overflow: scroll;
}

.patient-details-wrapper {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: scroll;
  min-width: 0;
  height: 100%;
}

.medical-data {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
  min-width: 0;
  height: 100%;
}

.loading-state,
.error-state,
.no-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  margin: auto;
}

.error-state button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--button-main-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .content-grid {
    flex-direction: column;
  }

  .patient-details-wrapper,
  .medical-data {
    width: 100%;
    flex: none;
  }
}
</style>
