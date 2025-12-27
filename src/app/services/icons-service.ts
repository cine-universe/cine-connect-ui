import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  constructor(private matIconRegistry: MatIconRegistry,
  private domSanitizer: DomSanitizer
  ) {}

  registerIcons() {
    this.matIconRegistry.addSvgIcon('messaging', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/messaging.svg'));
    this.matIconRegistry.addSvgIcon('forward', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/forward.svg'));
    this.matIconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
  }
}
