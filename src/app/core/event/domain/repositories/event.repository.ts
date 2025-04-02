import { Event } from '@app/core/event/domain/models/event.model';
import { Observable } from 'rxjs';

export abstract class EventRepository {
  abstract getEvents(): Observable<Event[]>;
  abstract getEventById(id: string): Observable<Event>;
}
