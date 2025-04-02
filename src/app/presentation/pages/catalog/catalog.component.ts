import {
  ChangeDetectionStrategy,
  Component,
  inject,
  resource,
  ResourceRef,
} from '@angular/core';
import { Event } from '@app/core/event/domain/models/event.model';
import { EventRepository } from '@app/core/event/domain/repositories/event.repository';
import { EventCardComponent } from '@app/presentation/components/event-card/event-card.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'main[app-catalog]',
  imports: [EventCardComponent],
  templateUrl: './catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CatalogComponent {
  private readonly eventRepository = inject(EventRepository);

  eventsResource: ResourceRef<Event[]> = resource({
    loader: () => lastValueFrom(this.eventRepository.getEvents()),
    defaultValue: [],
  });
}
