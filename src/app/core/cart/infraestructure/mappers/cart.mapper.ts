import { DateFormatter } from '@app/core/shared/domain/date.formatter';
import { Cart } from '@app/core/cart/domain/models/cart.model';
import { CartEvent } from '@app/core/cart/domain/models/cart-event.model';
import { CartSession } from '@app/core/cart/domain/models/cart-session.model';

export class CartMapper {
  mapToCart(data: Record<string, any>): Cart {
    return {
      events: data['events'].map(this.mapCartEvent),
    };
  }

  private mapCartEvent = (event: Record<string, any>): CartEvent => {
    const eventSessions = event['sessions'].map(this.mapSession);

    return {
      eventId: event['eventId'],
      eventTitle: event['eventTitle'],
      sessions: eventSessions,
    };
  };

  private mapSession(session: Record<string, any>): CartSession {
    return {
      date: DateFormatter.parse(session['date']),
      selectedSeats: session['selectedSeats'],
    };
  }

  mapToPersistence(cart: Cart): Record<string, any> {
    return {
      events: cart.events.map((event) => ({
        eventId: event.eventId,
        eventTitle: event.eventTitle,
        sessions: event.sessions.map((session) => ({
          date: DateFormatter.toISO(session.date),
          selectedSeats: session.selectedSeats,
        })),
      })),
    };
  }
}
