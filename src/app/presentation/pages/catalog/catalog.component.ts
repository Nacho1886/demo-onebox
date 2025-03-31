import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Event } from '@app/core/event/domain/models/event.model';
import { EventRepository } from '@app/core/event/domain/repositories/event.repository';
import { EventCardComponent } from '@app/presentation/components/event-card/event-card.component';

@Component({
  selector: 'main[app-catalog]',
  imports: [EventCardComponent],
  templateUrl: './catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CatalogComponent {
  private readonly eventRepository = inject(EventRepository);

  $events: Signal<Event[]> = toSignal(this.eventRepository.getAll(), {
    initialValue: [],
  });
}
