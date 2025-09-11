// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sliderpage',
//   imports: [],
//   templateUrl: './sliderpage.html',
//   styleUrl: './sliderpage.scss'
// })
// export class Sliderpage {

// }
import { Component, AfterViewInit, ElementRef, ViewChild, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sliderpage',
  templateUrl: './sliderpage.html',
  imports: [RouterLink],
  styleUrls: ['./sliderpage.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sliderpage implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const video = this.bgVideo.nativeElement;

    video.defaultMuted = true;
    video.muted = true;
    (video as any).playsInline = true;
    video.autoplay = true;

    const tryPlay = () =>
      video.play().catch(() => {
        // Fallback: require a click/tap once if autoplay is blocked
        const kick = () => {
          video.play().finally(() => {
            window.removeEventListener('click', kick);
            window.removeEventListener('touchstart', kick);
          });
        };
        window.addEventListener('click', kick, { once: true, passive: true });
        window.addEventListener('touchstart', kick, { once: true, passive: true });
      });

    const start = () => {
      video.load();
      this.zone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          if (video.readyState >= 2) {
            tryPlay();
          } else {
            video.addEventListener('canplaythrough', tryPlay, { once: true });
          }
        });
      });
    };

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }

    start();
  }
}
