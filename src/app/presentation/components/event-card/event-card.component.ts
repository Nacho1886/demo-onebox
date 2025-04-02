import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Event } from '@app/core/event/domain/models/event.model';
import { RouteName } from '@routes';

@Component({
  selector: 'app-event-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './event-card.component.html',
  host: { class: 'size-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  $event: InputSignal<Event> = input.required<Event>({ alias: 'event' });

  readonly RouteName = RouteName;
}
