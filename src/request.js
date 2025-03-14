// request.js
import APIClient from './api-client'

// Création d'une instance de client API
const apiClient = new APIClient('https://fedskillstest.coalitiontechnologies.workers.dev')

// Configuration de l'authentification
apiClient.setBasicAuth('coalition', 'skills-test')

export async function fetchPatientData() {
  try {
    // Récupération des données des patients
    const data = await apiClient.get()
    console.log('Données reçues:', data)

    // Vérifier le format des données
    if (!Array.isArray(data)) {
      console.error('Format de données inattendu:', data)
      throw new Error('Format de données inattendu: les données ne sont pas un tableau')
    }

    // Rechercher Jessica Taylor
    const jessicaTaylor = data.find((patient) => patient.name === 'Jessica Taylor')

    if (!jessicaTaylor) {
      throw new Error('Données de Jessica Taylor non trouvées')
    }

    // Traiter et retourner les données formatées
    return formatPatientData(jessicaTaylor)
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error)
    throw error
  }
}

// Fonction pour formater les données du patient selon la structure attendue par l'application
function formatPatientData(patientData) {
  return {
    name: patientData.name,
    age: patientData.age,
    gender: patientData.gender,
    dateOfBirth: patientData.date_of_birth,
    phone: patientData.phone_number,
    emergencyContact: patientData.emergency_contact,
    insurance: patientData.insurance_type,

    // Données du dernier diagnostic (Mars 2024)
    bloodPressure: {
      current: {
        systolic: patientData.diagnosis_history[0].blood_pressure.systolic.value,
        diastolic: patientData.diagnosis_history[0].blood_pressure.diastolic.value,
      },
      history: processBloodPressureHistory(patientData.diagnosis_history),
    },

    // Signes vitaux actuels
    respiratoryRate: patientData.diagnosis_history[0].respiratory_rate.value,
    temperature: patientData.diagnosis_history[0].temperature.value,
    heartRate: patientData.diagnosis_history[0].heart_rate.value,

    // Liste des diagnostics
    diagnostics: patientData.diagnostic_list.map((diag) => ({
      name: diag.name,
      description: diag.description,
      status: diag.status,
    })),

    // Résultats de laboratoire
    labResults: patientData.lab_results.map((lab) => ({
      name: lab,
      downloadable: true,
    })),
  }
}

// Fonction pour traiter l'historique de pression artérielle pour le graphique
function processBloodPressureHistory(diagnosisHistory) {
  // Nous prenons les 6 derniers mois
  return diagnosisHistory
    .slice(0, 6)
    .map((diagnosis) => {
      // Format: "Month Year" => "Month. Year"
      const monthYear = `${diagnosis.month}. ${diagnosis.year}`

      return {
        month: monthYear,
        systolic: diagnosis.blood_pressure.systolic.value,
        diastolic: diagnosis.blood_pressure.diastolic.value,
      }
    })
    .reverse() // Pour les avoir dans l'ordre chronologique
}
