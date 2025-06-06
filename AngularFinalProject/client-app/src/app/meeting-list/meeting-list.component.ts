import { Component } from '@angular/core';
import { Meeting } from 'src/Meeting';
import { MeetingService } from '../meeting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent {
meetings: Meeting[] = [];
  loading = false;
  errorMsg = '';
  private subscription: Subscription | undefined;

  constructor(private meetingService: MeetingService) {}

  ngOnInit(): void {
    this.loading = true;
    // Subscribe to meetings observable to get live updates
    this.subscription = this.meetingService.meetings$.subscribe({
      next: (meetings) => {
        this.meetings = meetings;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load meetings.';
        this.loading = false;
      }
    });

    // Initial fetch
    this.meetingService.getMeetings().subscribe(); // triggers BehaviorSubject update
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  fetchMeetings() {
    this.loading = true;
    this.meetingService.getMeetings().subscribe({
      next: (data) => {
        this.meetings = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load meetings.';
        this.loading = false;
      }
    });
  }
}
