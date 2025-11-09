import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jobcard',
  imports: [],
  templateUrl: './jobcard.html',
  styleUrl: './jobcard.scss',
})
export class Jobcard {
  @Input() data: any;
}
