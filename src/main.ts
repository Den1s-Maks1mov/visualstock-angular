import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { baseUrlInterceptor } from './app/core/interceptors/base-url-interceptor';
import { authTokenInterceptor } from './app/core/interceptors/auth-token-interceptor';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor,
        authTokenInterceptor
      ])
    ),
  ]
}).catch(err => console.error(err));
