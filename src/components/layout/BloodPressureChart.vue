<template>
  <div class="chart-section">
    <div class="header-chart-wrapper">
      <div class="chart-header">
        <h3>Blood Pressure</h3>
        <div class="time-filter">
          <span>Last 6 months</span>
          <img src="@/assets/icons/chevron-down.svg" alt="Dropdown" />
        </div>
      </div>
      <div class="chart-container">
        <canvas class="canvas" ref="bpChart"></canvas>
      </div>
    </div>

    <div class="bp-indicators indicators-wrapper">
      <div class="bp-indicator">
        <div class="dot-label-wrapper">
          <div class="indicator-dot systolic"></div>
          <span>Systolic</span>
        </div>
        <div class="bp-value">{{ chartData.current.systolic }}</div>
        <div class="bp-status high">Higher than Average</div>
      </div>

      <div class="bp-indicator">
        <div class="dot-label-wrapper">
          <div class="indicator-dot diastolic"></div>
          <span>Diastolic</span>
        </div>
        <div class="bp-value">{{ chartData.current.diastolic }}</div>
        <div class="bp-status low">Lower than Average</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js/auto'

export default {
  name: 'BloodPressureChart',
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null as Chart | null,
      resizeObserver: null as ResizeObserver | null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createChart()
      this.observeResize()
    })
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.updateChart()
        })
      },
    },
  },
  methods: {
    createChart() {
      const chartElem = this.$refs.bpChart as HTMLCanvasElement | undefined
      if (!chartElem) return

      const ctx = chartElem.getContext('2d')
      if (!ctx) return

      if (!this.chartData || !this.chartData.history || this.chartData.history.length === 0) return

      const sortedHistory = [...this.chartData.history].sort((a, b) => {
        const monthOrder = {
          January: 1,
          February: 2,
          March: 3,
          April: 4,
          May: 5,
          June: 6,
          July: 7,
          August: 8,
          September: 9,
          October: 10,
          November: 11,
          December: 12,
        }

        const [monthA, yearA] = a.month.split('. ')
        const [monthB, yearB] = b.month.split('. ')

        if (yearA !== yearB) {
          return parseInt(yearA) - parseInt(yearB)
        }

        return monthOrder[monthA] - monthOrder[monthB]
      })

      const labels = sortedHistory.map((item) => {
        const parts = item.month.split(' ')
        const shortMonth = parts[0].slice(0, 3)
        return `${shortMonth}, ${parts[1]}`
      })
      const systolicData = sortedHistory.map((item) => item.systolic)
      const diastolicData = sortedHistory.map((item) => item.diastolic)

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Systolic',
              data: systolicData,
              borderColor: '#D174E3',
              backgroundColor: 'rgba(209, 116, 227, 0.2)',
              tension: 0.4,
              pointBackgroundColor: '#D174E3',
              pointRadius: 4,
            },
            {
              label: 'Diastolic',
              data: diastolicData,
              borderColor: '#6A6DCD',
              backgroundColor: 'rgba(106, 109, 205, 0.2)',
              tension: 0.4,
              pointBackgroundColor: '#6A6DCD',
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: 60,
              suggestedMax: 180,
              grid: {
                color: '#eee',
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    },
    updateChart() {
      if (this.chart) {
        this.chart.destroy()
      }
      this.createChart()
    },
    observeResize() {
      const container = this.$refs.bpChart?.parentElement
      if (!container) return

      this.resizeObserver = new ResizeObserver(() => {
        if (this.chart) {
          this.chart.resize()
        }
      })
      this.resizeObserver.observe(container)
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  },
}
</script>

<style scoped>
.chart-section {
  background-color: #f4f0fe;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-chart-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main-color);
}

.time-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary-color);
  cursor: pointer;
}

.chart-container {
  flex-grow: 1;
  position: relative;
  width: 100%;
  height: 250px; /* Ajustable selon besoin */
}

.canvas {
  width: 100% !important;
  height: 100% !important;
}

.bp-indicators {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 220px;
  padding-left: 1rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1); /* Séparateur */
  align-self: stretch; /* Pour coller à la hauteur du graphique */
}

.bp-indicator {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bp-indicator:not(:last-child) {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dot-label-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.indicator-dot.systolic {
  background-color: #d174e3;
}

.indicator-dot.diastolic {
  background-color: #6a6dcd;
}

.bp-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main-color);
}

.bp-status {
  font-size: 0.9rem;
  color: #555;
  display: flex;
  align-items: center;
}

.bp-status.high::before {
  content: '▲';
  margin-right: 0.25rem;
}

.bp-status.low::before {
  content: '▼';
  margin-right: 0.25rem;
}

@media (max-width: 768px) {
  .chart-section {
    flex-direction: column;
    align-items: center;
  }

  .chart-container {
    height: 200px;
  }

  .bp-indicators {
    width: 100%;
    border-left: none;
    padding-left: 0;
    margin-top: 1rem;
    align-items: center;
  }

  .bp-indicator {
    text-align: center;
    border-bottom: none;
    padding-bottom: 0;
  }
}
</style>
