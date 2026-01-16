import { Injectable } from '@angular/core';
import { Notification } from '../models/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  notifications: Notification[] = [];

  constructor() {
    this.initializeNotifications();
  }

  initializeNotifications() {
    this.notifications = [
      {
        id: 1,
        type: 'application_update',
        message: 'Your application for the <b class="notification-highlights">Software Engineer</b> position has been viewed.',
        timestamp: new Date('2024-06-15T10:30:00'),
        avatarUrl: 'https://picsum.photos/id/64/200/200',
        read: false
      },
      {
        id: 2,
        type: 'new_message',
        message: 'You have a new message from <b class="notification-highlights">Rajamouli</b> regarding your application.',
        timestamp: new Date('2024-06-14T14:20:00'),
        avatarUrl: 'https://picsum.photos/id/32/200/200',
        read: true
      },
      {
        id: 3,
        type: 'job_recommendation',
        message: 'We recommend a job opportunity for you.',
        timestamp: new Date('2024-06-13T09:15:00'),
        avatarUrl: 'https://picsum.photos/id/12/200/200',
        read: false
      },
      {
        id: 4,
        type: 'system_alert',
        message: 'Your password will expire in 5 days. Please update it soon.',
        timestamp: new Date('2024-06-12T16:45:00'),
        avatarUrl: 'https://picsum.photos/id/45/200/200',
        read: true
      },
      {
        id: 5,
        type: 'event_invitation',
        message: 'You are invited to attend the upcoming career fair next week.',
        timestamp: new Date('2024-06-11T11:00:00'),
        avatarUrl: 'https://picsum.photos/id/78/200/200',
        read: false
      },
      {
        id: 6,
        type: 'posting_update',
        message: 'Your application for the <b class="notification-highlights">Product Manager</b> position has been shortlisted.',
        timestamp: new Date('2024-06-10T13:30:00'),
        avatarUrl: 'https://picsum.photos/id/90/200/200',
        read: true
      }
    ];
  }

  getNotifications() {
    return this.notifications;
  }

  deleteNotification(id: number) {
    this.notifications = this.notifications.filter((n: Notification) => n.id !== id);
    return this.notifications;
  }

  publishNotification(notification: Notification) {
    this.notifications.unshift(notification);
  }
}
