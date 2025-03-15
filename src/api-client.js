class APIClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = new Headers({
      'Content-Type': 'application/json',
    })
  }

  setBasicAuth(username, password) {
    const credentials = btoa(`${username}:${password}`)
    this.headers.set('Authorization', `Basic ${credentials}`)
  }

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
