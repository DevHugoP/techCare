<template>
  <div class="diagnostic-list card">
    <h3 class="section-title">Diagnostic History</h3>
    <BloodPressureChart :chartData="patient.bloodPressure" />
    <div class="vital-wrapper">
      <div class="respiratory vital-card">
        <img src="/src//assets//icons/respiratory.svg" alt="lungs icon" />
        <span>Respiratory Rate</span>
        <span class="text-info">{{ `${patient.respiratoryRate} bpm` }}</span>
        <span>Normal</span>
      </div>
      <div class="temperature vital-card">
        <img src="/src//assets//icons/temperature.svg" alt="thermometer icon" />
        <span>Temperature</span>
        <span class="text-info">{{ `${patient.temperature}°F` }}</span>
        <span>Normal</span>
      </div>
      <div class="heartRate vital-card">
        <img src="/src//assets//icons/heartBPM.svg" alt="heart-rate icon" />
        <span>Temperature</span>
        <span class="text-info">{{ `${patient.heartRate} bpm` }}</span>
        <span>Lower than Average</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BloodPressureChart from './BloodPressureChart.vue'

export default {
  name: 'DiagnosticHistory',
  components: { BloodPressureChart },
  props: {
    patient: {
      type: Object,
    },

    onMounted() {
      console.log('this.patient', this.patient)
    },
    computed() {
      console.log('this.patient', this.patient)
    },
  },
}
</script>

<style scoped>
.vital-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.vital-card {
  background-color: aquamarine;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}
.text-info {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
