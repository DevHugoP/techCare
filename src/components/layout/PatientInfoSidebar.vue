<template>
  <div class="patient-sidebar">
    <div class="patient-header">
      <h2>{{ patient.name }}</h2>
      <div class="patient-basic-info">
        <div class="info-pill">{{ patient.age }} ans</div>
        <div class="info-pill">{{ patient.gender }}</div>
      </div>
    </div>

    <div class="patient-details">
      <div class="info-section">
        <h3>Informations personnelles</h3>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span>{{ patient.email || 'Non disponible' }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Téléphone:</span>
          <span>{{ patient.phone || 'Non disponible' }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Adresse:</span>
          <span>{{ patient.address || 'Non disponible' }}</span>
        </div>
      </div>

      <div class="info-section">
        <h3>Informations médicales</h3>
        <div class="info-row">
          <span class="info-label">Pression artérielle:</span>
          <span>{{ patient.bloodPressure || 'Non disponible' }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Rythme cardiaque:</span>
          <span>{{ patient.heartRate || 'Non disponible' }} bpm</span>
        </div>
        <div class="info-row">
          <span class="info-label">Température:</span>
          <span>{{ patient.temperature || 'Non disponible' }} °C</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PatientInfoSidebar',
  props: {
    patient: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.patient-sidebar {
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.patient-header {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--bg-main-color);
  padding-bottom: 1rem;
}

.patient-header h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.patient-basic-info {
  display: flex;
  gap: 0.75rem;
}

.info-pill {
  background-color: var(--button-secondary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}

.info-section {
  margin-bottom: 1.5rem;
}

.info-section h3 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary-color);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--bg-main-color);
}

.info-label {
  font-weight: 500;
}
</style>
