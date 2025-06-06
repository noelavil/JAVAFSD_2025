import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meeting } from 'src/Meeting';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
private apiUrl = 'http://localhost:3000/meetings';
  
  private meetingsSubject = new BehaviorSubject<Meeting[]>([]);
  meetings$ = this.meetingsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.apiUrl).pipe(
      tap(meetings => this.meetingsSubject.next(meetings))
    );
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, meeting).pipe(
      tap(() => this.refreshMeetings())
    );
  }

  private refreshMeetings() {
    this.http.get<Meeting[]>(this.apiUrl).subscribe(meetings => {
      this.meetingsSubject.next(meetings);
    });
  }
}
