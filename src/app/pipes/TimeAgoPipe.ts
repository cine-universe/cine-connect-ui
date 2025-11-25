import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  
  private datePipe = inject(DatePipe);

  transform(value: string | Date): string {
    if (!value) return '';

    const inputDate = new Date(value);
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

    // Time unit conversions
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // --- Logic Start ---

    // 1. Check if it is a different year
    if (inputDate.getFullYear() !== now.getFullYear()) {
      // Output: 'Nov-2024'
      return this.datePipe.transform(inputDate, 'MMM-y') || ''; 
    }

    // 2. Check if it is older than 7 days (1 week)
    if (days > 7) {
      // Output: '14-Nov'
      return this.datePipe.transform(inputDate, 'd-MMM') || '';
    }

    // 3. Check Days (1 to 7 days)
    if (days >= 1) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }

    // 4. Check Hours
    if (hours >= 1) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    // 5. Check Minutes
    if (minutes >= 1) {
      return `${minutes} min ago`;
    }

    // 6. Fallback for just now (less than 1 minute)
    return 'Just now';
  }
}