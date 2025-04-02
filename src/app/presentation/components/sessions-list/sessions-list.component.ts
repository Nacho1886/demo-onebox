import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { EventInfo } from '@app/core/event/domain/models/event-info.model';
import { Cart } from '@app/core/cart/domain/models/cart.model';
import { CartEvent } from '@app/core/cart/domain/models/cart-event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsListComponent {
  $eventInfo = input.required<EventInfo | null>({ alias: 'eventInfo' });
  $cart = model.required<Cart>({ alias: 'cart' });

  getSelectedSeats(sessionDate: Date): number {
    const session = this.getSession(sessionDate);
    return session?.selectedSeats ?? 0;
  }

  canAddSession(sessionDate: Date): boolean {
    const selectedSeats = this.getSelectedSeats(sessionDate);
    const availability =
      this.$eventInfo()?.sessions.find(
        (session) => session.date.getTime() === sessionDate.getTime(),
      )?.availability ?? 0;

    return selectedSeats < availability;
  }

  canRemoveSession(sessionDate: Date): boolean {
    return this.getSelectedSeats(sessionDate) > 0;
  }

  addSessionToCart(sessionDate: Date): void {
    this.updateCart((cart) => {
      const event = this.findOrCreateEvent(cart);
      const session = this.getSession(sessionDate);

      if (session) {
        session.selectedSeats += 1;
      } else {
        event.sessions.push({ date: sessionDate, selectedSeats: 1 });
      }

      return cart;
    });
  }

  removeSessionFromCart(sessionDate: Date): void {
    this.updateCart((cart) => {
      const event = this.findEvent(cart);
      if (!event) return cart;

      const sessionIndex = event.sessions.findIndex(
        (s) => s.date.getTime() === sessionDate.getTime(),
      );
      if (sessionIndex !== -1) {
        this.decrementSession(event, sessionIndex);
      }

      if (event.sessions.length === 0) {
        cart.events = cart.events.filter((e) => e.eventId !== event.eventId);
      }

      return cart;
    });
  }

  private findEvent(cart: Cart): CartEvent | null {
    return cart.events.find((e) => e.eventId === this.$eventInfo()?.id) ?? null;
  }

  private getSession(sessionDate: Date) {
    const event = this.findEvent(this.$cart());

    return event?.sessions.find(
      (session) => session.date.getTime() === sessionDate.getTime(),
    );
  }

  private decrementSession(event: CartEvent, sessionIndex: number): void {
    const session = event.sessions[sessionIndex];
    session.selectedSeats -= 1;
    if (session.selectedSeats === 0) {
      event.sessions.splice(sessionIndex, 1);
    }
  }

  private updateCart(updateFn: (cart: Cart) => Cart): void {
    this.$cart.update((cart) => {
      return { ...updateFn(cart) };
    });
  }

  private findOrCreateEvent(cart: Cart): CartEvent {
    let event = this.findEvent(cart);
    if (!event) {
      event = {
        eventId: this.$eventInfo()?.id ?? '',
        eventTitle: this.$eventInfo()?.title ?? '',
        sessions: [],
      };
      cart.events.push(event);
    }
    return event;
  }
}
