import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ScrollHide } from '../../directives/scroll-hide';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatIconModule, CommonModule, ScrollHide],
  standalone: true,
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {

}
