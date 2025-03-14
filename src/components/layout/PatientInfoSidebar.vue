<!-- PatientView.vue -->
<template>
  <div class="patient-view">
    <div class="profile-section">
      <div class="patient-avatar">
        <img src="@/assets/user.png" :alt="patient.name" />
      </div>
      <h1 class="patient-name">{{ patient.name }}</h1>

      <div class="patient-info-list">
        <div class="info-item">
          <div class="icon-container">
            <img src="@/assets/icons/BirthIcon.svg" alt="Date of Birth" />
          </div>
          <div class="info-content">
            <span class="info-label">Date Of Birth</span>
            <span class="info-value">{{ formatDate(patient.dateOfBirth) }}</span>
          </div>
        </div>

        <div class="info-item">
          <div class="icon-container">
            <img
              :src="
                patient.gender == 'Female'
                  ? 'src/assets/icons/female.svg'
                  : 'src/assets/icons/MaleIcon.svg'
              "
              alt="Gender"
            />
          </div>
          <div class="info-content">
            <span class="info-label">Gender</span>
            <span class="info-value">{{ patient.gender }}</span>
          </div>
        </div>

        <div class="info-item">
          <div class="icon-container">
            <img src="@/assets/icons/phone.svg" alt="Contact Info" />
          </div>
          <div class="info-content">
            <span class="info-label">Contact Info</span>
            <span class="info-value">{{ patient.phone }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="icon-container">
            <img src="@/assets/icons/phone.svg" alt="Emergency Contacts" />
          </div>
          <div class="info-content">
            <span class="info-label">Emergency Contacts</span>
            <span class="info-value">{{ patient.emergencyContact }}</span>
          </div>
        </div>

        <div class="info-item">
          <div class="icon-container">
            <img src="@/assets/icons/shield.svg" alt="Insurance Provider" />
          </div>
          <div class="info-content">
            <span class="info-label">Insurance Provider</span>
            <span class="info-value">{{ patient.insurance }}</span>
          </div>
        </div>
      </div>

      <button class="info-button">Show All Information</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PatientView',
  props: {
    patient: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'N/A'

      // Handle both formats: "YYYY-MM-DD" and "MM/DD/YYYY"
      let date
      if (dateString.includes('/')) {
        const parts = dateString.split('/')
        date = new Date(parts[2], parts[0] - 1, parts[1])
      } else {
        date = new Date(dateString)
      }

      // Format: Month DD, YYYY
      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
    getLatestDiagnosis(metric) {
      if (!this.patient.diagnosis_history || this.patient.diagnosis_history.length === 0) {
        return 'N/A'
      }

      const latest = this.patient.diagnosis_history[0]

      if (metric === 'systolic') {
        return latest.blood_pressure.systolic.value
      } else if (metric === 'diastolic') {
        return latest.blood_pressure.diastolic.value
      } else if (metric === 'heart_rate') {
        return latest.heart_rate.value
      } else if (metric === 'respiratory_rate') {
        return latest.respiratory_rate.value
      } else if (metric === 'temperature') {
        return latest.temperature.value
      }

      return 'N/A'
    },
    getStatusClass(status) {
      status = status.toLowerCase()
      if (status.includes('active') || status.includes('treated')) {
        return 'status-active'
      } else if (status.includes('observation')) {
        return 'status-observation'
      } else if (status.includes('cured')) {
        return 'status-cured'
      } else if (status.includes('inactive')) {
        return 'status-inactive'
      } else {
        return 'status-untreated'
      }
    },
  },
}
</script>

<style scoped>
.patient-view {
  display: flex;
  justify-content: center;
  background-color: var(--bg-secondary-color);
  border-radius: 1rem;
}

.profile-section {
  text-align: center;
  padding: 1rem;
}

.patient-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
}

.patient-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.patient-name {
  font-size: 24px;
  margin-bottom: 2rem;
}

.patient-info-list {
  text-align: left;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.icon-container {
  width: 35px;
  height: 35px;
  margin-right: 1rem;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 14px;
  color: var(--text-secondary-color);
  margin-bottom: 0.25rem;
}

.info-value {
  font-weight: 600;
  font-size: 14px;
}

.info-button {
  background-color: var(--button-main-color);
  border: none;
  border-radius: 2rem;
  padding: 0.6rem 2.2rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
}
</style>
