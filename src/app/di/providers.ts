import { Provider } from '@angular/core';
import { EventRepository } from '@app/core/event/domain/repositories/event.repository';
import { EventDetailRepository } from '@app/core/event/domain/repositories/event-detail.repository';
import { EventDataRepository } from '@app/core/event/infraestructure/repositories/event-data.repository';
import { EventDetailDataRepository } from '@app/core/event/infraestructure/repositories/event-detail-data.repository';

/**
 * Event-related providers
 */
const EVENT_PROVIDERS: Provider[] = [
  { provide: EventRepository, useClass: EventDataRepository },
  { provide: EventDetailRepository, useClass: EventDetailDataRepository },
];

/**
 * Function to provide all application providers
 */
export function provideAppProviders(): Provider[] {
  return [...EVENT_PROVIDERS];
}
