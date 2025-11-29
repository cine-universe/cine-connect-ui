import { Component, EventEmitter, inject, Input, Output, ViewChild, ElementRef, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DescForm } from '../../desc-form/desc-form';

@Component({
  selector: 'app-description',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './description.html',
  styleUrl: './description.scss',
})
export class Description implements AfterViewInit {
  
  @Input() description: string = '';
  @Output() descriptionUpdated = new EventEmitter<string>();

  readonly dialog = inject(MatDialog);
  private readonly cd = inject(ChangeDetectorRef);

  @ViewChild('descText', { static: false }) descText!: ElementRef<HTMLElement>;

  expanded = false;
  hasOverflow = false;

  openDescription() {
    this.dialog.open(DescForm, {
      data: this.description ?? '',
      width: '90%',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    }).afterClosed().subscribe((data) => {
      if(data != undefined && data!=null) {
        this.descriptionUpdated.emit(data.description);
      }
    });
  }

  ngAfterViewInit(): void {
    // check overflow once rendered
    setTimeout(() => this.checkOverflow(), 0);
  }

  @HostListener('window:resize')
  onResize() {
    // re-evaluate overflow on resize
    this.checkOverflow();
  }

  toggleExpand() {
    this.expanded = !this.expanded;
    // when collapsing, re-check whether the "see more" should be shown
    if (!this.expanded) {
      setTimeout(() => this.checkOverflow(), 0);
    }
  }

  private checkOverflow() {
    const el = this.descText?.nativeElement;
    if (!el) return;
    // compute whether the rendered block is taller than two lines
    // temporarily enforce the clamped styles to compute accurate measurements
    const prevMaxHeight = el.style.maxHeight;
    const prevWhiteSpace = el.style.whiteSpace;
    // ensure normal flow to measure full height
    el.style.whiteSpace = 'normal';
    el.style.maxHeight = '';
    const fullHeight = el.scrollHeight;
    // measure two-line height using computed line-height
    const cs = getComputedStyle(el);
    const lineHeight = parseFloat(cs.lineHeight || '1.2') || (parseFloat(cs.fontSize || '14') * 1.2);
    const twoLineHeight = lineHeight * 2 + 1; // small buffer
    // restore inline styles
    el.style.maxHeight = prevMaxHeight;
    el.style.whiteSpace = prevWhiteSpace;

    const overflow = fullHeight > twoLineHeight;
    this.hasOverflow = overflow;
    this.cd.detectChanges();
  }
}
