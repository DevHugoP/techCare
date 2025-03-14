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
        <canvas ref="bpChart"></canvas>
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createChart()
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
      // Vérifier que l'élément canvas existe
      const chartElem = this.$refs.bpChart as HTMLCanvasElement | undefined
      if (!chartElem) {
        console.error('Canvas element not found')
        return
      }

      const ctx = chartElem.getContext('2d')
      if (!ctx) {
        console.error('Unable to get 2D context')
        return
      }

      // Vérifier que les données existent et ont un historique
      if (!this.chartData || !this.chartData.history || this.chartData.history.length === 0) {
        console.error('No chart data available')
        return
      }

      // Tri des données par date (du plus ancien au plus récent)
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

      const labels = sortedHistory.map((item) => item.month)
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
              backgroundColor: 'rgba(209, 116, 227, 0.2)', // Ajout d'un fond transparent
              tension: 0.4,
              pointBackgroundColor: '#D174E3',
              pointRadius: 4,
              fill: true, // Remplir la zone sous la courbe
            },
            {
              label: 'Diastolic',
              data: diastolicData,
              borderColor: '#6A6DCD',
              backgroundColor: 'rgba(106, 109, 205, 0.2)', // Ajout d'un fond transparent
              tension: 0.4,
              pointBackgroundColor: '#6A6DCD',
              pointRadius: 4,
              fill: true, // Remplir la zone sous la courbe
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
      // Détruire l'ancien graphique s'il existe
      if (this.chart) {
        this.chart.destroy()
      }

      // Recréer le graphique avec les nouvelles données
      this.createChart()
    },
  },
  beforeUnmount() {
    // S'assurer que le graphique est détruit avant de démonter le composant
    if (this.chart) {
      this.chart.destroy()
    }
  },
}
</script>

<style scoped>
.chart-section {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
}
.header-chart-wrapper {
  max-width: 60%;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.indicators-wrapper {
  display: flex;
  gap: 2rem;
  flex-direction: column;
}

.dot-label-wrapper {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.chart-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.time-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
}

.chart-container {
  height: 200px;
  margin-bottom: 1rem;
}

.bp-indicators {
  display: flex;
  gap: 2rem;
}

.bp-indicator {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-bottom: 0.25rem;
}

.indicator-dot.systolic {
  background-color: #d174e3;
}

.indicator-dot.diastolic {
  background-color: #6a6dcd;
}

.bp-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.bp-status {
  font-size: 0.8rem;
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

.bp-status.high {
  color: #e74c3c;
}

.bp-status.low {
  color: #3498db;
}
</style>
