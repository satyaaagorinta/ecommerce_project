import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, CarouselModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
// export class Footer implements AfterViewInit{
export class Footer {
items = [
    'assets/natureheadgearmodel.png',
    'assets/redsuitcover.png',
    'assets/boldgeometriccover.jpeg',
    'assets/cover.jpeg',
    'assets/freepik__the-style-is-candid-image-photography-with-natural__95157.png',
    'assets/freepik__the-style-is-candid-image-photography-with-natural__23050.jpeg',
    'assets/bubblegum.png',
    'assets/partylightaesthetic_hologram.png',
    
    
  ];

  // Owl options = your jQuery config (Angular-safe)
  options: OwlOptions = {
    center: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    nav: false,
    
    responsive: {
      0:    { items: 2 },
      600:  { items: 4 },
      1300: { items: 6 }
    },
    // optional: smoothen transitions
    smartSpeed: 450
  };

  // ngAfterViewInit(): void {
  //   // replace all <i data-feather="..."> with SVGs
  //   feather.replace();
  // }
}

