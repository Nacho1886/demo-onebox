import { EventDetail } from '@app/core/event/domain/models/event-detail.model';
import { Observable } from 'rxjs';

export abstract class EventDetailRepository {
  abstract getById(id: string): Observable<EventDetail>;
}
