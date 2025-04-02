import { CartEvent } from '@app/core/cart/domain/models/cart-event.model';

export interface Cart {
  events: CartEvent[];
}
