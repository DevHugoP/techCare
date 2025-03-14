// URL de l'API
const apiUrl = 'https://fedskillstest.coalitiontechnologies.workers.dev'

// Créer les informations d'autorisation de base (Basic Auth)
const username = 'coalition'
const password = 'skills-test'
const base64Credentials = btoa(`${username}:${password}`)

// Effectuer la requête GET avec l'authentification Basic
fetch(apiUrl, {
  method: 'GET',
  headers: {
    Authorization: `Basic ${base64Credentials}`, // Ajouter les informations d'authentification
  },
})
  .then((response) => response.json()) // Convertir la réponse en JSON
  .then((data) => {
    // Filtrer les données pour ne récupérer que Jessica Taylor
    const jessicaData = data.find((patient) => patient.name === 'Jessica Taylor')

    if (jessicaData) {
      console.log('Données de Jessica Taylor:', jessicaData)

      // Manipuler et utiliser ces données pour peupler l'UI, comme par exemple un graphique
      // Exemple d'utilisation des données de pression sanguine ou d'autres informations pertinentes
      const bloodPressureData = jessicaData.bloodPressure // Vérifiez le nom exact de la propriété des données de pression sanguine

      // Exemple d'affichage de données pour le graphique
      console.log('Pression sanguine de Jessica Taylor:', bloodPressureData)

      // Code pour afficher le graphique ou d'autres informations de l'UI ici...
    } else {
      console.log('Patient Jessica Taylor non trouvé.')
    }
  })
  .catch((error) => {
    console.error("Erreur lors de l'appel API:", error)
  })
