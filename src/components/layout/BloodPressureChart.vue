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
        <div class="bp-status">
          <img src="/src/assets/icons/ArrowUp.svg" alt="low icon" />
          Higher than Average
        </div>
      </div>

      <div class="bp-indicator">
        <div class="dot-label-wrapper">
          <div class="indicator-dot diastolic"></div>
          <span>Diastolic</span>
        </div>
        <div class="bp-value">{{ chartData.current.diastolic }}</div>
        <div class="bp-status">
          <img src="/src/assets/icons/ArrowDown.svg" alt="low icon" />
          Lower than Average
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Chart from 'chart.js/auto'

interface BloodPressureHistory {
  month: string
  systolic: number
  diastolic: number
}

interface BloodPressureData {
  current: {
    systolic: number
    diastolic: number
  }
  history: BloodPressureHistory[]
}

export default {
  name: 'BloodPressureChart',
  props: {
    chartData: {
      type: Object as () => BloodPressureData,
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

      const sortedHistory = [...this.chartData.history].sort(
        (a: BloodPressureHistory, b: BloodPressureHistory) => {
          const monthOrder: Record<string, number> = {
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
        },
      )

      const labels = sortedHistory.map((item) => {
        // Format: "Oct. 2023"
        const [month, year] = item.month.split('. ')
        const shortMonth = month.slice(0, 3)
        return `${shortMonth}. ${year}`
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
              borderColor: '#E66FD2',
              backgroundColor: 'transparent',
              tension: 0.4,
              pointBackgroundColor: '#E66FD2',
              fill: false,
            },
            {
              label: 'Diastolic',
              data: diastolicData,
              borderColor: '#7E6CAB',
              backgroundColor: 'transparent',
              tension: 0.4,
              pointBackgroundColor: '#8C6FE6',
              fill: false,
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
                color: 'rgba(200, 200, 200, 0.7)',
                drawBorder: false,
                drawTicks: false, // Supprime les petits traits
              },
              ticks: {
                font: {
                  size: 11,
                },
                padding: 10,
                stepSize: 10,
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#555',
                font: {
                  size: 10,
                },
                padding: 10,
                maxRotation: 0,
                minRotation: 0,
              },
              border: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          elements: {
            point: {
              radius: 5,
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
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-chart-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-right: var(--spacing-md);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.chart-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary-color);
}

.time-filter {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary-color);
  cursor: pointer;
}

.chart-container {
  flex-grow: 1;
  position: relative;
  width: 100%;
  height: 250px;
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
  padding-left: 1.5rem;
}

.bp-indicator {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.bp-indicator:not(:last-child) {
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dot-label-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.indicator-dot.systolic {
  background-color: var(--systolic-color);
}

.indicator-dot.diastolic {
  background-color: var(--diastolic-color);
}

.bp-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary-color);
}

.bp-status {
  font-size: 14px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
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
    margin-top: var(--spacing-md);
    align-items: center;
  }

  .bp-indicator {
    text-align: center;
    border-bottom: none;
    padding-bottom: 0;
  }
}
</style>
