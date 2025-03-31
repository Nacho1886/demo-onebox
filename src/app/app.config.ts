import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { routes } from '@app/app.routes';
import { provideAppInterceptors } from '@app/di/interceptors';
import { provideAppProviders } from '@app/di/providers';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors(provideAppInterceptors())),
    provideClientHydration(withEventReplay()),
    provideAppProviders(),
  ],
};
