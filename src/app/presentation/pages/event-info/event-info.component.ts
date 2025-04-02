import { UpperCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  resource,
  ResourceStatus,
  signal,
} from '@angular/core';
import { EventInfo } from '@app/core/event/domain/models/event-info.model';
import { EventInfoRepository } from '@app/core/event/domain/repositories/event-info.repository';
import { CartRepository } from '@app/core/cart/domain/repositories/cart.repository';
import { ShoppingCartComponent } from '@app/presentation/components/shopping-cart/shopping-cart.component';
import { SessionsListComponent } from '@app/presentation/components/sessions-list/sessions-list.component';
import { lastValueFrom } from 'rxjs';
import { Cart } from '@app/core/cart/domain/models/cart.model';
import { RouterLink } from '@angular/router';
import { RouteName } from '@app/app.routes';

@Component({
  selector: 'main[app-event-info]',
  imports: [
    ShoppingCartComponent,
    SessionsListComponent,
    UpperCasePipe,
    RouterLink,
  ],
  templateUrl: './event-info.component.html',
  host: { class: 'flex flex-col gap-4 p-4  md:px-16' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EventInfoComponent {
  private readonly eventInfoRepository = inject(EventInfoRepository);
  private readonly cartRepository = inject(CartRepository);

  $id = input.required<string>({ alias: 'id' });

  readonly ResourceStatus = ResourceStatus;
  readonly RouteName = RouteName;

  eventInfoResource = resource<EventInfo | null, string>({
    request: () => this.$id(),
    loader: ({ request }) =>
      lastValueFrom(this.eventInfoRepository.getEventInfo(request)),
    defaultValue: null,
  });

  cartResource = resource<Cart, void>({
    loader: () => lastValueFrom(this.cartRepository.get()),
    defaultValue: { events: [] },
  });

  constructor() {
    effect(() => {
      const cart = this.cartResource.value();
      if (this.cartResource.isLoading()) return;
      this.cartRepository.save(cart);
    });
  }

  getErrorMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      return err.error;
    }
    return 'An error occurred';
  }
}
