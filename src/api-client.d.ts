/**
 * Client API pour effectuer des requêtes HTTP
 */
declare class APIClient {
  private baseUrl: string
  private headers: Headers

  /**
   * Crée une nouvelle instance d'APIClient
   * @param baseUrl URL de base pour les requêtes API
   */
  constructor(baseUrl: string)

  /**
   * Configure l'authentification Basic
   * @param username Nom d'utilisateur
   * @param password Mot de passe
   */
  setBasicAuth(username: string, password: string): void

  /**
   * Effectue une requête GET
   * @return Promesse qui se résout avec les données JSON de la réponse
   */
  get<T = any>(): Promise<T>
}

export default APIClient
