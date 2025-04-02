import { Provider } from '@angular/core';
import { EventRepository } from '@app/core/event/domain/repositories/event.repository';
import { EventInfoRepository } from '@app/core/event/domain/repositories/event-info.repository';
import { EventDataRepository } from '@app/core/event/infraestructure/repositories/event-data.repository';
import { EventInfoDataRepository } from '@app/core/event/infraestructure/repositories/event-info-data.repository';

/**
 * Event-related providers
 */
const EVENT_PROVIDERS: Provider[] = [
  { provide: EventRepository, useClass: EventDataRepository },
  { provide: EventInfoRepository, useClass: EventInfoDataRepository },
];

/**
 * Function to provide all application providers
 */
export function provideAppProviders(): Provider[] {
  return [...EVENT_PROVIDERS];
}
