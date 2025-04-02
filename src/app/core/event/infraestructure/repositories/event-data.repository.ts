import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EventRepository } from '@app/core/event/domain/repositories/event.repository';
import { EventMapper } from '@app/core/event/infraestructure/mappers/event.mapper';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { Event } from 'src/app/core/event/domain/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventDataRepository implements EventRepository {
  private readonly ENDPOINT_PATH = 'events';

  private readonly http: HttpClient = inject(HttpClient);
  private readonly eventMapper: EventMapper = new EventMapper();

  private get endpoint(): string {
    return `${environment.SERVER_URL}/${this.ENDPOINT_PATH}`;
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Record<string, any>[]>(this.endpoint).pipe(
      map((data) => data.map((item) => this.eventMapper.mapToEvent(item))),
      map((events) =>
        events.sort((a, b) => a.endDate.getTime() - b.endDate.getTime()),
      ),
    );
  }

  getEventById(id: string): Observable<Event> {
    return this.http
      .get<Record<string, any>>(`${this.endpoint}/${id}`)
      .pipe(map((data) => this.eventMapper.mapToEvent(data)));
  }
}
