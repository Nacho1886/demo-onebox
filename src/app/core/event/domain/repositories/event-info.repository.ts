import { EventInfo } from '@app/core/event/domain/models/event-info.model';
import { Observable } from 'rxjs';

export abstract class EventInfoRepository {
  abstract getEventInfo(id: string): Observable<EventInfo>;
}
