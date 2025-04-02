import { EventBase } from '@app/core/event/domain/models/event-base.model';

export interface Event extends EventBase {
  place: string;
  startDate: Date;
  endDate: Date;
  description: string;
}
