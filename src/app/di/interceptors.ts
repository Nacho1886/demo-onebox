import { HttpInterceptorFn } from '@angular/common/http';
import { eventInterceptor } from '@app/core/event/infraestructure/interceptors/event.interceptor';

/**
 * HTTP Event Interceptors
 */
const INTERCEPTORS: HttpInterceptorFn[] = [
  eventInterceptor,
];

/**
 * Function to provide all application interceptors
 */
export function provideAppInterceptors(): HttpInterceptorFn[] {
  return [...INTERCEPTORS];
}
