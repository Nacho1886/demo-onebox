import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventInfoRepository } from '@app/core/event/domain/repositories/event-info.repository';
import { EventInfoMapper } from '@app/core/event/infraestructure/mappers/event-detail.mapper';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { EventInfo } from '@app/core/event/domain/models/event-info.model';

@Injectable({
  providedIn: 'root',
})
export class EventInfoDataRepository implements EventInfoRepository {
  private readonly ENDPOINT_PATH = 'event-info';

  private readonly http: HttpClient = inject(HttpClient);
  private readonly eventInfoMapper: EventInfoMapper = new EventInfoMapper();

  private get endpoint(): string {
    return `${environment.SERVER_URL}/${this.ENDPOINT_PATH}`;
  }

  getEventInfo(id: string): Observable<EventInfo> {
    return this.http
      .get<any>(`${this.endpoint}/${id}`)
      .pipe(map((data) => this.eventInfoMapper.mapToEventInfo(data)));
  }
}
