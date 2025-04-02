import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

/**
 * Constants for URLs and event data
 */
const LOCALHOST_URL = 'http://localhost:4200';
const ASSETS_PATH = '/assets/data';

const ENDPOINTS = {
  EVENTS: 'events',
  EVENT_INFO: 'event-info',
} as const;

type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

const VALID_EVENT_IDS = new Set(['68', '184']);

/**
 * HTTP Event Interceptor as a function
 */
export const eventInterceptor: HttpInterceptorFn = (req, next) => {
  if (isEventRequest(req, ENDPOINTS.EVENT_INFO)) {
    return handleEventInfoRequest(req, next);
  }
  if (isEventRequest(req, ENDPOINTS.EVENTS)) {
    return handleEventRequest(req, next);
  }
  return next(req);
};

/** Checks if the request is for the events list or a specific event */
function isEventRequest(req: HttpRequest<any>, endpoint: Endpoint): boolean {
  return req.url.includes(endpoint);
}

/** Handles the event request, returns mock data from assets */
function handleEventRequest(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<any> {
  const eventId = extractEventId(req);

  return next(req.clone({ url: buildEventsListUrl() })).pipe(
    map((eventListResponse) => {
      if (eventId) {
        const events = (eventListResponse as HttpResponse<any>).body;
        const event = events.find((e: any) => e.id === eventId);
        if (!event) {
          throw new HttpErrorResponse({
            error: 'Event not found',
            status: 404,
          });
        }
        return new HttpResponse({ body: event });
      }
      return eventListResponse;
    }),
    catchError((error) => throwError(() => error)),
  );
}

/** Handles the event info request and returns mock data from assets if the event ID is valid */
function handleEventInfoRequest(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<any> {
  const eventId = extractEventId(req);

  if (!eventId || !isValidEventId(eventId)) {
    return throwError(
      () =>
        new HttpErrorResponse({
          error: 'Event info not found',
          status: 404,
        }),
    );
  }

  return next(req.clone({ url: buildEventInfoUrl(eventId) })).pipe(
    delay(1500), // Simulate network delay
  );
}

/** Extracts the event ID from the request URL */
function extractEventId(req: HttpRequest<any>): string | null {
  const parts = req.url.split('/');
  const eventId = parts.pop();
  return eventId && VALID_EVENT_IDS.has(eventId) ? eventId : null;
}

/** Checks if the event ID is valid */
function isValidEventId(eventId: string): boolean {
  return VALID_EVENT_IDS.has(eventId);
}

/** Builds the URL for the events list */
function buildEventsListUrl(): string {
  return `${LOCALHOST_URL}${ASSETS_PATH}/events.json`;
}

/** Builds the URL for the event info */
function buildEventInfoUrl(eventId: string): string {
  return `${LOCALHOST_URL}${ASSETS_PATH}/event-info-${eventId}.json`;
}
