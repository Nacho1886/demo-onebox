import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { Cart } from '@app/core/cart/domain/models/cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {
  $cart = model.required<Cart>({ alias: 'cart' });

  private findEvent(cart: Cart, eventId: string) {
    return cart.events.find((e) => e.eventId === eventId) ?? null;
  }

  removeSession(eventId: string, sessionDate: Date) {
    this.$cart.update((cart) => {
      const event = this.findEvent(cart, eventId);
      if (!event) return cart;

      const session = event.sessions.find(
        (s) => s.date.getTime() === sessionDate.getTime(),
      );

      if (!session) return cart;

      session.selectedSeats -= 1;

      if (session.selectedSeats === 0) {
        event.sessions = event.sessions.filter(
          (s) => s.date.getTime() !== sessionDate.getTime(),
        );
      }

      if (event.sessions.length === 0) {
        cart.events = cart.events.filter((e) => e.eventId !== eventId);
      }

      return { ...cart };
    });
  }

  removeEvent(eventId: string) {
    this.$cart.update((cart) => ({
      ...cart,
      events: cart.events.filter((e) => e.eventId !== eventId),
    }));
  }
}
