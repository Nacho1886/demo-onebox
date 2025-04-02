import { CartSession } from '@app/core/cart/domain/models/cart-session.model';

export interface CartEvent {
  eventId: string;
  eventTitle: string;
  sessions: CartSession[];
}
