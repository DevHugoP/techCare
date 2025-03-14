<!-- src/components/layout/VitalSigns.vue -->
<template>
  <div class="vital-signs">
    <div class="vital-sign-card">
      <img src="@/assets/icons/respiratory.svg" alt="Respiratory Rate" class="vital-icon" />
      <div class="vital-data">
        <h3 class="vital-title">Respiratory Rate</h3>
        <span class="vital-value">{{ respiratoryValue }} bpm</span>
        <span class="vital-status">{{ respiratoryStatus }}</span>
      </div>
    </div>

    <div class="vital-sign-card">
      <img src="@/assets/icons/temperature.svg" alt="Temperature" class="vital-icon" />
      <div class="vital-data">
        <h3 class="vital-title">Temperature</h3>
        <span class="vital-value">{{ temperatureValue }}°F</span>
        <span class="vital-status">{{ temperatureStatus }}</span>
      </div>
    </div>

    <div class="vital-sign-card">
      <img src="@/assets/icons/heartBPM.svg" alt="Heart Rate" class="vital-icon" />
      <div class="vital-data">
        <h3 class="vital-title">Heart Rate</h3>
        <span class="vital-value">{{ heartRateValue }} bpm</span>
        <span class="vital-status" :class="{ lower: heartRateStatus === 'Lower than Average' }">
          <img
            v-if="heartRateStatus === 'Lower than Average'"
            src="@/assets/icons/ArrowDown.svg"
            alt="Down Arrow"
          />
          {{ heartRateStatus }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'VitalSigns',
  props: {
    latestData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    respiratoryValue() {
      return this.latestData?.respiratory_rate?.value || 'N/A'
    },
    respiratoryStatus() {
      return this.latestData?.respiratory_rate?.levels || 'Normal'
    },
    temperatureValue() {
      return this.latestData?.temperature?.value || 'N/A'
    },
    temperatureStatus() {
      return this.latestData?.temperature?.levels || 'Normal'
    },
    heartRateValue() {
      return this.latestData?.heart_rate?.value || 'N/A'
    },
    heartRateStatus() {
      return this.latestData?.heart_rate?.levels || 'Normal'
    },
  },
}
</script>

<style scoped>
.vital-signs {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.vital-sign-card {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.vital-icon {
  width: 96px;
  height: 96px;
  margin-right: 1.5rem;
}

.vital-data {
  display: flex;
  flex-direction: column;
}

.vital-title {
  font-size: 0.9rem;
  color: var(--text-secondary-color);
  margin-bottom: 0.5rem;
}

.vital-value {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.vital-status {
  font-size: 0.85rem;
}

.vital-status.lower {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-blue);
}

.vital-status img {
  width: 10px;
  height: 5px;
}
</style>
