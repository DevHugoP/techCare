// api-client.js

/**
 * Classe APIClient pour gérer les requêtes API avec authentification
 */
class APIClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = new Headers({
      'Content-Type': 'application/json',
    })
  }

  /**
   * Définit les informations d'authentification Basic
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   */
  setBasicAuth(username, password) {
    const credentials = btoa(`${username}:${password}`)
    this.headers.set('Authorization', `Basic ${credentials}`)
  }

  /**
   * Effectue une requête GET
   * @param {string} endpoint - Point de terminaison à appeler (relatif à baseUrl)
   * @returns {Promise<any>} - Promesse résolvant avec les données de la réponse
   */
  async get(endpoint = '') {
    const url = this.baseUrl + endpoint

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      })

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }
}

export default APIClient
