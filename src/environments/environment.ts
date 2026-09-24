export interface Environment {
  production: boolean;
  apiUrl: string;
  appName: string;
  enableMockFallback: boolean;
}

export const environment: Environment = {
  production: true,
  apiUrl: 'https://api.perfumpoj.example.com/v1',
  appName: 'PerfumPoj Storefront',
  enableMockFallback: false
};
