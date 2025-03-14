<template>
  <div class="app-wrapper">
    <TechCareHeader />
    <main>
      <PatientInfoSidebar />
    </main>

    <footer></footer>
  </div>
</template>

<script lang="ts">
import TechCareHeader from './components/layout/Header.vue'
import { fetchPatientData } from './request.js' // Assurez-vous que le chemin est correct

export default {
  name: 'App',
  setup() {
    const patientStore = usePatientStore()

    fetchPatientData()
      .then((data) => {
        const jessica = data.find((patient) => patient.name === 'Jessica Taylor')
        if (jessica) {
          patientStore.setPatientData(jessica)
        }
      })
      .catch((error) => {
        console.error('Erreur API', error)
      })

    return {
      patientStore,
    }
  },
}
</script>

<style scoped>
.app-wrapper {
  padding: 1rem;
  background-color: var(--bg-main-color);
  height: 100vh;
}
</style>
