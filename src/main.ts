import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
declare global {
  interface Window {
    _env: {
      BACKEND_API_URI: string;
      PERSISTENCE_API_URI: string;
      SOCKETIO_API_URI: string;
      BACKENDLOGIN_API_URI: string;
    };
  }
}
const { BACKEND_API_URI, PERSISTENCE_API_URI, SOCKETIO_API_URI } = window._env;

console.log('Valor de BACKEND_API_URI:', BACKEND_API_URI);
console.log('Valor de PERSISTENCE_API_URI:', PERSISTENCE_API_URI);
console.log('Valor de SOCKETIO_API_URI:', SOCKETIO_API_URI);


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
  