<template>
  <header class="header">
    <img src="@/assets/logo.svg" alt="TechCare Logo" />

    <nav class="main-nav">
      <BaseButton icon="home.svg" altText="Overview" label="Overview" :active="false" />
      <BaseButton icon="group.svg" altText="Overview" label="Patients" :active="true" />
      <BaseButton icon="calendar.svg" altText="Overview" label="Schedule" :active="false" />
      <BaseButton icon="chat_bubble.svg" altText="Overview" label="Message" :active="false" />
      <BaseButton icon="credit_card.svg" altText="Overview" label="Transactions" :active="false" />
    </nav>

    <div class="user-profile">
      <div class="user-info">
        <img src="@/assets/doctor-profile.jpg" alt="Dr. Jose Simmons" />
        <div>
          <p class="doctor-name">Dr. Jose Simmons</p>
          <p class="doctor-title">General Practitioner</p>
        </div>
      </div>
      <div class="separator"></div>
      <img src="@/assets/icons/settings.svg" />
      <img src="@/assets/icons/more-vertical.svg" />
    </div>
  </header>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
export default {
  name: 'TechCareHeader',
  components: { BaseButton },
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 2rem;
  height: 60px;
  background-color: #fff;
}

.main-nav {
  display: flex;
  gap: 5px;
}

@media (max-width: 1200px) {
  .main-nav {
    display: none;
  }
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.doctor-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.doctor-title {
  font-size: 0.8rem;
  color: var(--text-secondary-color);
}

.separator {
  width: 2px;
  height: 40px;
  background-color: var(--bg-main-color);
}
</style>
