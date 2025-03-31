import { Event } from '@app/core/event/domain/models/event.model';
import { Observable } from 'rxjs';

export abstract class EventRepository {
  abstract getAll(): Observable<Event[]>;
  abstract getById(id: string): Observable<Event>;
}
