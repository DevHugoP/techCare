import APIClient from './api-client'

const apiClient = new APIClient('https://fedskillstest.coalitiontechnologies.workers.dev')
apiClient.setBasicAuth('coalition', 'skills-test')

export async function fetchPatientData() {
  try {
    const data = await apiClient.get()

    if (!data || typeof data !== 'object') {
      throw new Error('Unexpected data format: data is not an object')
    }

    const patientsArray = Array.isArray(data) ? data : [data]
    return patientsArray.map((patient) => formatPatientData(patient)).filter(Boolean)
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

function formatPatientData(patientData) {
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
      : null,

    respiratoryRate: latestDiagnosis ? latestDiagnosis.respiratory_rate.value : null,
    temperature: latestDiagnosis ? latestDiagnosis.temperature.value : null,
    heartRate: latestDiagnosis ? latestDiagnosis.heart_rate.value : null,

    diagnostics: (patientData.diagnostic_list || []).map((diag) => ({
      name: diag.name,
      description: diag.description,
      status: diag.status,
    })),

    labResults: (patientData.lab_results || []).map((lab) => ({
      name: lab,
      downloadable: true,
    })),
  }
}

function processBloodPressureHistory(diagnosisHistory) {
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
