<template>
  <div class="app-wrapper">
    <TechCareHeader />
    <main>
      {{ fetchData }}
      <div v-if="isLoading" class="loading-state">
        <p>Chargement des données...</p>
      </div>
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchData">Réessayer</button>
      </div>
      <div v-else class="content-wrapper">
        <div class="content-grid">
          <PatientsSidebar
            :patients="allPatients"
            :activePatient="selectedPatient ? selectedPatient.name : ''"
            @select-patient="selectPatient"
          />

          <div v-if="selectedPatient" class="patient-details-wrapper">
            <PatientInfoSidebar :patient="selectedPatient" />

            <div class="medical-data">
              <LabResult :labResults="selectedPatient.labResults || []" />
              <DiagnosticHistory :diagnostics="selectedPatient.diagnostics || []" />
            </div>
          </div>
          <div v-else class="no-selection">
            <p>Sélectionnez un patient pour voir ses détails</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import TechCareHeader from './components/layout/Header.vue'
import PatientInfoSidebar from './components/layout/PatientInfoSidebar.vue'
import PatientsSidebar from './components/layout/PatientsSidebar.vue'
import LabResult from './components/layout/LabResult.vue'
import DiagnosticHistory from './components/layout/DiagnosticHistory.vue'
import { fetchPatientData } from './request.js'

export default {
  name: 'App',
  components: {
    TechCareHeader,
    PatientInfoSidebar,
    PatientsSidebar,
    LabResult,
    DiagnosticHistory,
  },
  setup() {
    const allPatients = ref([])
    const selectedPatient = ref(null)
    const isLoading = ref(true)
    const error = ref(null)

    const fetchData = async () => {
      isLoading.value = true
      error.value = null

      try {
        const data = await fetchPatientData()
        allPatients.value = data || []

        // Sélectionner Jessica Taylor par défaut
        const jessica = data.find((patient) => patient.name === 'Jessica Taylor')
        if (jessica) {
          selectedPatient.value = jessica
        } else if (data.length > 0) {
          // Sélectionner le premier patient si Jessica n'est pas trouvée
          selectedPatient.value = data[0]
        } else {
          error.value = 'Aucun patient trouvé'
        }
      } catch (err) {
        error.value = err.message || 'Une erreur est survenue lors du chargement des données'
      } finally {
        isLoading.value = false
      }
    }

    const selectPatient = (patient) => {
      selectedPatient.value = patient
    }

    onMounted(fetchData)

    return {
      allPatients,
      selectedPatient,
      isLoading,
      error,
      fetchData,
      selectPatient,
    }
  },
}
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-main-color);
}

main {
  flex-grow: 1;
  padding: 2rem;
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
}

.error-state button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--button-main-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.content-wrapper {
  margin-top: 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.patient-details-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.medical-data {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 1400px) {
  .patient-details-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1100px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
