import { HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Constants for URLs and event data
 */
const LOCALHOST_URL = 'http://localhost:4200';
const ASSETS_PATH = '/assets/data';

const ENDPOINTS = {
  EVENT: 'event',
  EVENT_DETAIL: 'event-detail',
} as const;

type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

const VALID_EVENT_IDS = new Set(['68', '184']);

/**
 * HTTP Event Interceptor as a function
 */
export const eventInterceptor: HttpInterceptorFn = (req, next) => {
  if (isEventRequest(req, ENDPOINTS.EVENT_DETAIL)) {
    return handleEventDetailRequest(req, next);
  }
  if (isEventRequest(req, ENDPOINTS.EVENT)) {
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
  next: HttpHandlerFn
): Observable<any> {
  const eventId = extractEventId(req);

  if (eventId && isValidEventId(eventId)) {
    return next(req.clone({ url: buildEventUrl(eventId) }));
  } else {
    return next(req.clone({ url: buildEventsListUrl() }));
  }
}

/** Handles the event detail request and returns mock data from assets if the event ID is valid */
function handleEventDetailRequest(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<any> {
  const eventId = extractEventId(req);

  if (!eventId || !isValidEventId(eventId)) {
    return throwError(
      () =>
        new HttpErrorResponse({
          error: 'No data available for the provided event detail ID',
          status: 404,
        })
    );
  }

  return next(req.clone({ url: buildEventDetailUrl(eventId) }));
}

/** Extracts the event ID from the request URL */
function extractEventId(req: HttpRequest<any>): string | null {
  const eventId = req.url.split('/').pop();
  return eventId ?? null;
}

/** Checks if the event ID is valid */
function isValidEventId(eventId: string): boolean {
  return eventId ? VALID_EVENT_IDS.has(eventId) : false;
}

/** Builds the URL for a specific event */
function buildEventUrl(eventId: string): string {
  return `${LOCALHOST_URL}${ASSETS_PATH}/event-info-${eventId}.json`;
}

/** Builds the URL for the events list */
function buildEventsListUrl(): string {
  return `${LOCALHOST_URL}${ASSETS_PATH}/events.json`;
}

/** Builds the URL for the event detail */
function buildEventDetailUrl(eventId: string): string {
  return `${LOCALHOST_URL}${ASSETS_PATH}/event-info-${eventId}.json`;
}
