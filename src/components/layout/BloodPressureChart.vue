<!-- src/components/layout/BloodPressureChart.vue -->
<template>
  <div class="blood-pressure-chart card">
    <div class="chart-header">
      <h3 class="section-title">Blood Pressure</h3>
      <div class="dropdown">
        <span>Last 6 months</span>
        <img src="@/assets/icons/chevron-down.svg" alt="Dropdown arrow" />
      </div>
    </div>

    <div class="metrics">
      <div class="metric">
        <span class="metric-label">
          <span class="dot systolic-dot"></span>
          Systolic
        </span>
        <span class="metric-value">{{ systolicValue }}</span>
        <span class="metric-status" :class="{ higher: systolicStatus === 'Higher than Average' }">
          <img
            v-if="systolicStatus === 'Higher than Average'"
            src="@/assets/icons/ArrowUp.svg"
            alt="Up Arrow"
          />
          <img v-else src="@/assets/icons/ArrowDown.svg" alt="Down Arrow" />
          {{ systolicStatus }}
        </span>
      </div>

      <div class="metric">
        <span class="metric-label">
          <span class="dot diastolic-dot"></span>
          Diastolic
        </span>
        <span class="metric-value">{{ diastolicValue }}</span>
        <span class="metric-status" :class="{ lower: diastolicStatus === 'Lower than Average' }">
          <img
            v-if="diastolicStatus === 'Higher than Average'"
            src="@/assets/icons/ArrowUp.svg"
            alt="Up Arrow"
          />
          <img v-else src="@/assets/icons/ArrowDown.svg" alt="Down Arrow" />
          {{ diastolicStatus }}
        </span>
      </div>
    </div>

    <!-- SVG Chart - Simplified static representation -->
    <div class="chart-container">
      <svg width="100%" height="200" viewBox="0 0 600 200">
        <!-- Grid lines -->
        <line x1="0" y1="0" x2="600" y2="0" stroke="#f6f7f8" stroke-width="1" />
        <line x1="0" y1="50" x2="600" y2="50" stroke="#f6f7f8" stroke-width="1" />
        <line x1="0" y1="100" x2="600" y2="100" stroke="#f6f7f8" stroke-width="1" />
        <line x1="0" y1="150" x2="600" y2="150" stroke="#f6f7f8" stroke-width="1" />

        <!-- Systolic line (example) -->
        <path
          d="M50,120 L150,80 L250,130 L350,90 L450,110 L550,50"
          fill="none"
          stroke="#f05b66"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Diastolic line (example) -->
        <path
          d="M50,150 L150,140 L250,160 L350,130 L450,150 L550,140"
          fill="none"
          stroke="#74cef5"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <!-- Systolic data points -->
        <circle cx="50" cy="120" r="5" fill="#f05b66" />
        <circle cx="150" cy="80" r="5" fill="#f05b66" />
        <circle cx="250" cy="130" r="5" fill="#f05b66" />
        <circle cx="350" cy="90" r="5" fill="#f05b66" />
        <circle cx="450" cy="110" r="5" fill="#f05b66" />
        <circle cx="550" cy="50" r="5" fill="#f05b66" />

        <!-- Diastolic data points -->
        <circle cx="50" cy="150" r="5" fill="#74cef5" />
        <circle cx="150" cy="140" r="5" fill="#74cef5" />
        <circle cx="250" cy="160" r="5" fill="#74cef5" />
        <circle cx="350" cy="130" r="5" fill="#74cef5" />
        <circle cx="450" cy="150" r="5" fill="#74cef5" />
        <circle cx="550" cy="140" r="5" fill="#74cef5" />

        <!-- X-axis labels -->
        <text x="50" y="190" text-anchor="middle" fill="#707070" font-size="12">Oct. 2023</text>
        <text x="150" y="190" text-anchor="middle" fill="#707070" font-size="12">Nov. 2023</text>
        <text x="250" y="190" text-anchor="middle" fill="#707070" font-size="12">Dec. 2023</text>
        <text x="350" y="190" text-anchor="middle" fill="#707070" font-size="12">Jan. 2024</text>
        <text x="450" y="190" text-anchor="middle" fill="#707070" font-size="12">Feb. 2024</text>
        <text x="550" y="190" text-anchor="middle" fill="#707070" font-size="12">Mar. 2024</text>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BloodPressureChart',
  props: {
    latestData: {
      type: Object,
      required: true,
    },
    historyData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    systolicValue() {
      return this.latestData?.blood_pressure?.systolic?.value || 'N/A'
    },
    diastolicValue() {
      return this.latestData?.blood_pressure?.diastolic?.value || 'N/A'
    },
    systolicStatus() {
      return this.latestData?.blood_pressure?.systolic?.levels || 'N/A'
    },
    diastolicStatus() {
      return this.latestData?.blood_pressure?.diastolic?.levels || 'N/A'
    },
  },
}
</script>

<style scoped>
.blood-pressure-chart {
  margin-bottom: 1.5rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary-color);
  cursor: pointer;
}

.dropdown img {
  width: 10px;
  height: 6px;
}

.metrics {
  display: flex;
  gap: 3rem;
  margin-bottom: 1.5rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary-color);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.systolic-dot {
  background-color: var(--accent-red);
}

.diastolic-dot {
  background-color: var(--accent-blue);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.metric-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.metric-status.higher {
  color: var(--accent-red);
}

.metric-status.lower {
  color: var(--accent-blue);
}

.metric-status img {
  width: 10px;
  height: 5px;
}

.chart-container {
  width: 100%;
  padding-top: 1rem;
}
</style>
