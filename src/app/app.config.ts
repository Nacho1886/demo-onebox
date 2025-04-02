import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

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
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors(provideAppInterceptors())),
    provideAppProviders(),
  ],
};
