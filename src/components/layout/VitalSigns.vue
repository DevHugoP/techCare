<template>
  <div class="vital-card" :class="statusClass">
    <div class="vital-icon">
      <img v-if="iconSrc" :src="iconSrc" :alt="vitalSign.name" />
    </div>
    <div class="vital-info">
      <h4>{{ vitalSign.name }}</h4>
      <div class="vital-value">{{ vitalSign.value }}</div>
      <div class="vital-status">
        <span v-if="isLowStatus">▼</span>
        {{ vitalSign.status }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const icons = import.meta.glob('@/assets/icons/*.svg', { eager: true })

export default {
  name: 'VitalSigns',
  props: {
    vitalSign: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLowStatus() {
      return this.vitalSign.status.includes('Lower')
    },
    statusClass() {
      console.log('this.vitalSign.status', this.vitalSign.name)
      if (this.vitalSign.name === 'Heart Rate') return 'color-heart'
      if (this.vitalSign.name.includes('Temperature')) return 'color-temperature'
      if (this.vitalSign.name.includes('Respiratory Rate')) return 'color-respiratory'
      return ''
    },
    iconSrc() {
      return icons[`/src/assets/icons/${this.vitalSign.icon}`]?.default || null
    },
  },
}
</script>
<style scoped>
.vital-card {
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vital-card.status-low {
  background-color: #fff0f0;
}

.vital-icon {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vital-icon img {
  width: 96px;
  height: 96px;
}

.vital-info h4 {
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
}

.vital-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.vital-status {
  font-size: 0.8rem;
  color: #666;
}

.color-heart {
  background-color: #ffe6f1;
}
.color-respiratory {
  background-color: #e0f3fa;
}
.color-temperature {
  background-color: #ffe6e9;
}
</style>
