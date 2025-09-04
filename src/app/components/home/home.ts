import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Layout } from '../../pages/app-layout/layout/layout';
import { RouterLink } from '@angular/router';
import { AfterViewInit, ElementRef, ViewChild , NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../footer/footer';
import { Collections } from '../collections/collections';
import { Sliderpage } from '../sliderpage/sliderpage';


@Component({
  selector: 'app-home',
  imports: [Layout,RouterLink,Footer,Collections,Sliderpage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Home implements AfterViewInit {
@ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    const video = this.bgVideo.nativeElement;

    // Make sure properties are set BEFORE load/play (some browsers require this)
    video.defaultMuted = true;
    video.muted = true;
    // TS doesn't know about playsInline on HTMLVideoElement in some setups:
    (video as any).playsInline = true;
    video.autoplay = true;

    const tryPlay = () =>
      video.play().catch(() => {
        // Fallback: attach a one-time user-gesture to start it if the browser still blocks
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
      // reload sources with the right flags already set
      video.load();
      // give the browser a tick to attach the buffer, then play
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

    // Respect reduced motion (optional)
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }

    start();


 const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Visible:', entry.target);
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // ✅ animate once
          }
        });
      },
      { threshold: 0.1 }
    );

    
    setTimeout(() => {
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}, 500); 

  }

scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }






}
