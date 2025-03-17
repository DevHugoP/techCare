import APIClient from './api-client'
import type { Patient } from './App.vue'

const apiClient = new APIClient('https://fedskillstest.coalitiontechnologies.workers.dev')
apiClient.setBasicAuth('coalition', 'skills-test')

export async function fetchPatientData(): Promise<Patient[]> {
  try {
    const data = await apiClient.get()

    if (!data || typeof data !== 'object') {
      throw new Error('Unexpected data format: data is not an object')
    }

    const patientsArray = Array.isArray(data) ? data : [data]
    return patientsArray.map((patient) => formatPatientData(patient)).filter(Boolean) as Patient[]
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

function formatPatientData(patientData: any): Patient | null {
  if (!patientData || !patientData.name) {
    return null
  }

  const diagnosisHistory = patientData.diagnosis_history || []
  const latestDiagnosis = diagnosisHistory.length > 0 ? diagnosisHistory[0] : null

  return {
    name: patientData.name,
    age: patientData.age,
    gender: patientData.gender,
    dateOfBirth: patientData.date_of_birth,
    phone: patientData.phone_number,
    emergencyContact: patientData.emergency_contact,
    insurance: patientData.insurance_type,

    bloodPressure: latestDiagnosis
      ? {
          current: {
            systolic: latestDiagnosis.blood_pressure.systolic.value,
            diastolic: latestDiagnosis.blood_pressure.diastolic.value,
          },
          history: processBloodPressureHistory(diagnosisHistory),
        }
      : {
          current: { systolic: 0, diastolic: 0 },
          history: [],
        },

    respiratoryRate: latestDiagnosis ? latestDiagnosis.respiratory_rate.value : 0,
    temperature: latestDiagnosis ? latestDiagnosis.temperature.value : 0,
    heartRate: latestDiagnosis ? latestDiagnosis.heart_rate.value : 0,

    diagnostics: (patientData.diagnostic_list || []).map((diag: any) => ({
      name: diag.name,
      description: diag.description,
      status: diag.status,
    })),

    labResults: (patientData.lab_results || []).map((lab: string) => ({
      name: lab,
      downloadable: true,
    })),
  }
}

function processBloodPressureHistory(
  diagnosisHistory: any[],
): { month: string; systolic: number; diastolic: number }[] {
  if (!Array.isArray(diagnosisHistory) || diagnosisHistory.length === 0) {
    return []
  }

  return diagnosisHistory
    .slice(0, 6)
    .map((diagnosis) => ({
      month: `${diagnosis.month}. ${diagnosis.year}`,
      systolic: diagnosis.blood_pressure.systolic.value,
      diastolic: diagnosis.blood_pressure.diastolic.value,
    }))
    .reverse()
}
