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
    if (!data || typeof data !== 'object') {
      console.error('Format de données inattendu:', data)
      throw new Error('Format de données inattendu: les données ne sont pas un objet')
    }

    // Vérifier si les données sont un tableau ou un objet
    const patientsArray = Array.isArray(data) ? data : [data]

    // Retourner les données formatées pour tous les patients
    return patientsArray.map((patient) => formatPatientData(patient))
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error)
    throw error
  }
}

// Fonction pour formater les données du patient selon la structure attendue par l'application
function formatPatientData(patientData) {
  if (!patientData || !patientData.name) {
    console.error('Données de patient invalides:', patientData)
    return null
  }

  return {
    name: patientData.name,
    age: patientData.age,
    gender: patientData.gender,
    dateOfBirth: patientData.date_of_birth,
    phone: patientData.phone_number,
    emergencyContact: patientData.emergency_contact,
    insurance: patientData.insurance_type,

    // Données du dernier diagnostic (Mars 2024)
    bloodPressure:
      patientData.diagnosis_history && patientData.diagnosis_history.length > 0
        ? {
            current: {
              systolic: patientData.diagnosis_history[0].blood_pressure.systolic.value,
              diastolic: patientData.diagnosis_history[0].blood_pressure.diastolic.value,
            },
            history: processBloodPressureHistory(patientData.diagnosis_history),
          }
        : null,

    // Signes vitaux actuels
    respiratoryRate:
      patientData.diagnosis_history && patientData.diagnosis_history.length > 0
        ? patientData.diagnosis_history[0].respiratory_rate.value
        : null,
    temperature:
      patientData.diagnosis_history && patientData.diagnosis_history.length > 0
        ? patientData.diagnosis_history[0].temperature.value
        : null,
    heartRate:
      patientData.diagnosis_history && patientData.diagnosis_history.length > 0
        ? patientData.diagnosis_history[0].heart_rate.value
        : null,

    // Liste des diagnostics
    diagnostics: patientData.diagnostic_list
      ? patientData.diagnostic_list.map((diag) => ({
          name: diag.name,
          description: diag.description,
          status: diag.status,
        }))
      : [],

    // Résultats de laboratoire
    labResults: patientData.lab_results
      ? patientData.lab_results.map((lab) => ({
          name: lab,
          downloadable: true,
        }))
      : [],
  }
}

// Fonction pour traiter l'historique de pression artérielle pour le graphique
function processBloodPressureHistory(diagnosisHistory) {
  if (!diagnosisHistory || !Array.isArray(diagnosisHistory) || diagnosisHistory.length === 0) {
    return []
  }

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
