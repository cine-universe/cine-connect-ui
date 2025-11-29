import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-messagebox',
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './messagebox.html',
  styleUrl: './messagebox.scss',
})
export class Messagebox implements AfterViewChecked {
  @Input() message: any;
  @Input() messages: any[] = [];
  @Input() currentUserId: any = 'me';
  @Output() back = new EventEmitter<boolean>();

  outgoingMessage = '';

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    const text = (this.outgoingMessage || '').trim();
    if (!text) return;

    const msg = {
      id: Date.now(),
      senderId: this.currentUserId,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };

    this.messages.push(msg);
    this.outgoingMessage = '';
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private scrollToBottom() {
    try {
      const el = this.scrollContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  trackById(index: number, item: any) {
    return item?.id ?? index;
  }

  trigger() {
    this.back.emit(false);
  }
}
