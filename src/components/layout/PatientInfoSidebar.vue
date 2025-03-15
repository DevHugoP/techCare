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
interface Patient {
  name: string
  dateOfBirth: string | number | Date
  gender: string
  phone: string
  emergencyContact: string
  insurance: string
}

export default {
  name: 'PatientView',
  props: {
    patient: {
      type: Object as () => Patient,
      required: true,
    },
  },
  methods: {
    formatDate(dateString: string | number | Date): string {
      if (!dateString) return 'N/A'

      let date: Date
      if (typeof dateString === 'string' && dateString.includes('/')) {
        const parts = dateString.split('/')
        date = new Date(Number(parts[2]), Number(parts[0]) - 1, Number(parts[1]))
      } else {
        date = new Date(dateString)
      }

      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    },
  },
}
</script>

<style scoped>
.patient-view {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary-color);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
  height: 68%;
}

.profile-section {
  text-align: center;
  padding: var(--spacing-md);
}

.patient-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto var(--spacing-md);
}

.patient-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.patient-name {
  font-size: 24px;
  margin-bottom: var(--spacing-lg);
}

.patient-info-list {
  text-align: left;
  margin-bottom: var(--spacing-lg);
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.icon-container {
  width: 35px;
  height: 35px;
  margin-right: var(--spacing-md);
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
  border-radius: var(--border-radius-lg);
  padding: 0.6rem 2.2rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
}
</style>
