import { Component } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from 'src/Meeting';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent {
meeting: Meeting = {
    id: 0,
    clientId: 0,
    date: '',
    time: '',
    purpose: ''
  };

  message: string = '';

  constructor(private meetingService: MeetingService) {}

  submitMeeting() {
  this.meetingService.addMeeting(this.meeting).subscribe({
    next: (res) => {
      this.message = 'Meeting scheduled successfully!';
      this.meeting = { id: 0, clientId: 0, date: '', time: '', purpose: '' };
      // No need to refresh manually, service will update BehaviorSubject
    },
    error: (err) => {
      this.message = 'Error scheduling meeting.';
    }
  });
}
}
