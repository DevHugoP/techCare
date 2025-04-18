<template>
  <div class="diagnostic-history card">
    <h3 class="section-title">Diagnosis History</h3>
    <BloodPressureChart :chartData="patient.bloodPressure" />
    <div class="vital-wrapper">
      <div class="vital-card respiratory">
        <div class="icon-container">
          <img src="/src/assets/icons/respiratory.svg" alt="lungs icon" />
        </div>
        <span class="vital-title">Respiratory Rate</span>
        <div class="vital-value">{{ patient.respiratoryRate }} bpm</div>
        <div class="vital-status normal">Normal</div>
      </div>

      <div class="vital-card temperature">
        <div class="icon-container">
          <img src="/src/assets/icons/temperature.svg" alt="thermometer icon" />
        </div>
        <span class="vital-title">Temperature</span>
        <div class="vital-value">{{ patient.temperature }}°F</div>
        <div class="vital-status">Normal</div>
      </div>

      <div class="vital-card heart-rate">
        <div class="icon-container">
          <img src="/src/assets/icons/heartBPM.svg" alt="heart-rate icon" />
        </div>
        <span class="vital-title">Heart Rate</span>
        <div class="vital-value">{{ patient.heartRate }} bpm</div>
        <div class="vital-status">
          <img src="/src/assets/icons/ArrowDown.svg" alt="low icon" />
          Lower than Average
        </div>
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
      required: true,
    },
  },
}
</script>

<style scoped>
.diagnostic-history {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary-color);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  overflow: visible;
}

.vital-wrapper {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.vital-card {
  flex: 1;
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.respiratory {
  background-color: var(--respiratory-bg);
}

.temperature {
  background-color: var(--temperature-bg);
}

.heart-rate {
  background-color: var(--heart-rate-bg);
}

.icon-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-container img {
  width: 80px;
  height: 80px;
}

.vital-title {
  font-size: 14px;
  margin-top: 1.5rem;
}

.vital-value {
  font-size: 25px;
  font-weight: 700;
}

.vital-status {
  color: var(--text-secondary-color);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

@media (max-width: 768px) {
  .vital-wrapper {
    flex-direction: column;
  }

  .vital-card {
    margin-bottom: var(--spacing-md);
  }
}
</style>
