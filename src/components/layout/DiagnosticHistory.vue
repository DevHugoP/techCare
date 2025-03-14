<template>
  <div class="diagnostic-list card">
    <h3 class="section-title">Diagnostic History</h3>
    <BloodPressureChart :chartData="patient.bloodPressure" />

    <VitalSigns
      v-for="vitalSign in patient.vitalSigns"
      :key="vitalSign.name"
      :vitalSign="vitalSign"
    />
  </div>
</template>

<script lang="ts">
import BloodPressureChart from './BloodPressureChart.vue'
import VitalSigns from './VitalSigns.vue'

export default {
  name: 'DiagnosticHistory',
  components: { BloodPressureChart, VitalSigns },
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

<style scoped></style>
