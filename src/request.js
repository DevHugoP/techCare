// request.js
export async function fetchPatientData() {
  // URL de l'API
  const apiUrl = 'https://fedskillstest.coalitiontechnologies.workers.dev'

  // Créer les informations d'autorisation de base (Basic Auth)
  const username = 'Password'
  const password = 'skills-test'
  const base64Credentials = btoa(`${username}:${password}`)

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error)
    throw error
  }
}
