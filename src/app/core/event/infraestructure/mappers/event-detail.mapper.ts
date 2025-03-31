import { DateFormatter } from '@app/core/shared/domain/date.formatter';
import { EventDetail } from 'src/app/core/event/domain/models/event-detail.model';
import { Session } from 'src/app/core/event/domain/models/session.model';

export class EventDetailMapper {
  toEventDetail(data: Record<string, any>): EventDetail {
    return {
      id: data["event"].id,
      title: data["event"].title,
      subtitle: data["event"].subtitle,
      image: data["event"].image,
      sessions: data["sessions"].map(this.mapSession),
    };
  }

  private mapSession(session: Record<string, any>): Session {
    return {
      date: DateFormatter.parse(session['date']),
      availability: session['availability'],
    };
  }
}
