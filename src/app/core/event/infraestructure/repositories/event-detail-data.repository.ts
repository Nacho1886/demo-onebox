import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventDetailRepository } from '@app/core/event/domain/repositories/event-detail.repository';
import { EventDetailMapper } from '@app/core/event/infraestructure/mappers/event-detail.mapper';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { EventDetail } from 'src/app/core/event/domain/models/event-detail.model';

@Injectable({
  providedIn: 'root',
})
export class EventDetailDataRepository implements EventDetailRepository {
  private readonly ENDPOINT_PATH = 'event-detail';

  private readonly http: HttpClient = inject(HttpClient);
  private readonly eventDetailMapper: EventDetailMapper =
    new EventDetailMapper();

  private get endpoint(): string {
    return `${environment.SERVER_URL}/${this.ENDPOINT_PATH}`;
  }

  getById(id: string): Observable<EventDetail> {
    return this.http
      .get<any>(`${this.endpoint}/${id}`)
      .pipe(map((data) => this.eventDetailMapper.toEventDetail(data)));
  }
}
