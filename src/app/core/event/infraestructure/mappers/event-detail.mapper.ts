import { DateFormatter } from '@app/core/shared/domain/date.formatter';
import { EventInfo } from '@app/core/event/domain/models/event-info.model';
import { Session } from 'src/app/core/event/domain/models/session.model';

export class EventInfoMapper {
  mapToEventInfo(data: Record<string, any>): EventInfo {
    return {
      id: data['event'].id,
      title: data['event'].title,
      subtitle: data['event'].subtitle,
      image: data['event'].image,
      sessions: data['sessions'].map(this.mapSession),
    };
  }

  private mapSession(session: Record<string, any>): Session {
    return {
      date: DateFormatter.parse(session['date']),
      availability: session['availability'],
    };
  }
}
