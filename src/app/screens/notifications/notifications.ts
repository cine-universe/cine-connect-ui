import { Component, OnChanges, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { NotificationService } from '../../services/notification-service';
import { Notification } from '../../models/Notification';
import { Router } from '@angular/router';
import { MobileHeader } from '../../components/mobile-header/mobile-header';

@Component({
  selector: 'app-notifications',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MobileHeader,
    TimeAgoPipe
  ],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications implements OnInit {

  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  categories: string[] = [
    'All',
    'Jobs',
    'Messages',
    'My Posts'
  ];
  selectedCategory: string = 'All';

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.notifications = this.notificationService.getNotifications();
    this.filteredNotifications = this.notifications;
  }

  filterNotifications(category?: string) {
    console.log(category)
    if (category) {
      this.selectedCategory = category;
    }
    if (this.selectedCategory === 'All') {
      this.filteredNotifications = this.notifications;
    } else if(this.selectedCategory === 'Jobs') {
      console.log('Filtering job recommendations ' + this.notifications);
      this.filteredNotifications = this.notifications.filter((n: any) => n.type === 'job_recommendation' || n.type === 'application_update');
    } else if(this.selectedCategory === 'Messages') {
      this.filteredNotifications = this.notifications.filter((n: any) => n.type === 'new_message');
    } else if(this.selectedCategory === 'My Posts') {
      this.filteredNotifications = this.notifications.filter((n: any) => n.type === 'posting_update');
    }
  }

  deleteNotification(id: number) {
    this.notifications = this.notificationService.deleteNotification(id);
    this.filterNotifications(this.selectedCategory)
  }

  openNotification(notification: Notification) {
    if((this.selectedCategory === 'Jobs' || this.selectedCategory === 'All') && (notification.type === 'job_recommendation' || notification.type === 'application_update')) {
      this.router.navigate(['/applications']);
    }
  }
}
