declare class APIClient {
  private baseUrl: string
  private headers: Headers

  constructor(baseUrl: string)

  setBasicAuth(username: string, password: string): void

  get<T = any>(): Promise<T>
}

export default APIClient
