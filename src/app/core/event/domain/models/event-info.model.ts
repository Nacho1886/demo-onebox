import { EventBase } from '@app/core/event/domain/models/event-base.model';
import { Session } from '@app/core/event/domain/models/session.model';

export interface EventInfo extends EventBase {
  sessions: Session[];
}
