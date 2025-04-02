import { Provider } from '@angular/core';
import { EventRepository } from '@app/core/event/domain/repositories/event.repository';
import { EventInfoRepository } from '@app/core/event/domain/repositories/event-info.repository';
import { EventDataRepository } from '@app/core/event/infraestructure/repositories/event-data.repository';
import { EventInfoDataRepository } from '@app/core/event/infraestructure/repositories/event-info-data.repository';
import { CartRepository } from '@app/core/cart/domain/repositories/cart.repository';
import { CartDataRepository } from '@app/core/cart/infraestructure/repositories/cart-data.repository';

/**
 * Event-related providers
 */
const EVENT_PROVIDERS: Provider[] = [
  { provide: EventRepository, useClass: EventDataRepository },
  { provide: EventInfoRepository, useClass: EventInfoDataRepository },
];

/**
 * Cart-related providers
 */
const CART_PROVIDERS: Provider[] = [
  { provide: CartRepository, useClass: CartDataRepository },
];

/**
 * Function to provide all application providers
 */
export function provideAppProviders(): Provider[] {
  return [...EVENT_PROVIDERS, ...CART_PROVIDERS];
}
