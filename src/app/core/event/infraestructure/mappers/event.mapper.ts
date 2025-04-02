import { DateFormatter } from '@app/core/shared/domain/date.formatter';
import { Event } from 'src/app/core/event/domain/models/event.model';

export class EventMapper {
  mapToEvent(data: Record<string, any>): Event {
    return {
      id: data['id'],
      title: data['title'],
      subtitle: data['subtitle'],
      image: data['image'],
      place: data['place'],
      startDate: DateFormatter.parse(data['startDate']),
      endDate: DateFormatter.parse(data['endDate']),
      description: data['description'],
    };
  }
}
