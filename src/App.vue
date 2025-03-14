<template>
  <div class="app-wrapper">
    <TechCareHeader />
    <main>
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
          <div class="patient-details-wrapper">
            <DiagnosticList :diagnostics="selectedPatient.diagnostics || []" />
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
import { ref, onMounted } from 'vue'
import TechCareHeader from './components/layout/Header.vue'
import PatientInfoSidebar from './components/layout/PatientInfoSidebar.vue'
import PatientsSidebar from './components/layout/PatientsSidebar.vue'
import LabResult from './components/layout/LabResult.vue'
import DiagnosticHistory from './components/layout/DiagnosticHistory.vue'
import DiagnosticList from './components/layout/DiagnosticList.vue'
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
    const selectedPatient = ref(null)
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
          selectedPatient.value = allPatients.value[0]
        } else {
          error.value = 'Aucun patient trouvé'
        }
      } catch (err) {
        console.error('Erreur dans fetchData:', err)
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
/* Empêcher le défilement horizontal et vertical */
html,
body {
  margin: 0; /* Éviter les marges par défaut qui pourraient provoquer un défilement */
  padding: 0; /* Enlever tout padding par défaut */
  height: 100%; /* Assurer que la hauteur est toujours à 100% pour les éléments */
  width: 100%; /* Assurer que la largeur est toujours à 100% pour les éléments */
}

.app-wrapper {
  height: 100vh; /* Assurer que l'application prend toute la hauteur de la fenêtre */
  overflow: scroll; /* Désactiver également le défilement dans l'app-wrapper */
  padding: 2rem;
}

.content-wrapper {
  overflow: auto; /* Autoriser le défilement uniquement si nécessaire dans la zone de contenu */
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
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-start;
}

.patient-details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.medical-data {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* @media (max-width: 1400px) {
  .patient-details-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1100px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
} */
</style>
