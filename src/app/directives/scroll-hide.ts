import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollHide]'
})
export class ScrollHide {

  constructor() { }

  private lastScrollTop = 0;
  private tolerance = 10; // Minimum scroll distance to trigger action

  // Automatically binds the class 'nav-hidden' to the element when isHidden is true
  @HostBinding('class.nav-hidden') isHidden = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    // 1. Ignore if scrolling in the "rubber band" zone (top of page)
    if (currentScroll <= 0) {
      this.isHidden = false;
      return;
    }

    // 2. Logic to determine direction
    // If current scroll > last scroll -> Scrolling Down
    if (currentScroll > this.lastScrollTop && currentScroll > this.tolerance) {
      this.isHidden = true;
    } 
    // If current scroll < last scroll -> Scrolling Up
    else if (currentScroll < this.lastScrollTop) {
      this.isHidden = false;
    }

    this.lastScrollTop = currentScroll;
  }

}
