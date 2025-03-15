<template>
  <div class="app-container">
    <TechCareHeader />
    <div class="main-content">
      <div v-if="isLoading" class="loading-container">
        <p>Loading Data</p>
      </div>
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <button @click="fetchData">Try again</button>
      </div>
      <div v-else class="dashboard-layout">
        <!-- Sidebar avec liste des patients -->
        <PatientsSidebar
          :patients="allPatients"
          :activePatient="selectedPatient ? selectedPatient.name : ''"
        />

        <!-- Section centrale avec historique et diagnostics -->
        <div class="center-content">
          <DiagnosticHistory :patient="selectedPatient || {}" />
          <DiagnosticList :diagnostics="selectedPatient.diagnostics || []" />
        </div>

        <!-- Section droite avec info patient et résultats de laboratoire -->
        <div class="right-content">
          <PatientInfoSidebar :patient="selectedPatient" />
          <LabResult :labResults="selectedPatient.labResults || []" />
        </div>
      </div>
    </div>
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
        allPatients.value = data.filter((patient) => patient) || []

        if (allPatients.value.length > 0) {
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
/* Layout principal de l'application - hauteur réduite */
.app-container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-main-color);
  overflow: hidden;
}

/* Container principal sous le header - padding réduit */
.main-content {
  flex: 1;
  padding: 0rem 0.8rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

/* Layout du dashboard en grille - gap réduit */
.dashboard-layout {
  display: flex;
  gap: 1rem;
  height: 100%;
  min-height: min-content;
  width: 100%;
  margin-bottom: 2rem;
  overflow: visible;
  max-height: calc(100vh - 100px); /* Hauteur maximale réduite */
}

/* Section centrale avec diagnostic et historique - gap réduit */
.center-content {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 0;
  height: 100%;
  max-height: 100%;
}

/* Section droite avec info patient et résultats - gap réduit */
.right-content {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 0;
  height: 100%;
  max-height: 100%;
}

/* Styles pour les états de chargement et d'erreur */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px; /* Réduit */
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 1.5rem; /* Réduit */
  text-align: center;
  margin: auto;
  width: 80%;
  max-width: 600px;
}

.error-container button {
  margin-top: 0.7rem; /* Réduit */
  padding: 0.4rem 0.8rem; /* Réduit */
  background-color: var(--button-main-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

/* Responsive design */
@media (max-width: 1200px) {
  .dashboard-layout {
    flex-direction: column;
    max-height: none;
  }

  .center-content,
  .right-content {
    width: 100%;
    flex: none;
  }
}
</style>
