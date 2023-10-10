interface IWindowEnvironment {
  HOST_3000: string;
  HOST_3001: string;
  HOST_3002: string;
  HOST_81: string;
}

declare global {
  interface Window {
    environment: IWindowEnvironment;
  }
}

export const environment = {
  HOST_3000: window.environment.HOST_3000,
  HOST_3001: window.environment.HOST_3001,
  HOST_3002: window.environment.HOST_3002,
  HOST_81: window.environment.HOST_81,
  production: false,
};
