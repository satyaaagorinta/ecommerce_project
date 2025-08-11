import { Component } from '@angular/core';
import { Layout } from '../../pages/app-layout/layout/layout';
import { RouterLink } from '@angular/router';
import { AfterViewInit, ElementRef, ViewChild , NgZone} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [Layout,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {
 @ViewChild('bgVideo') bgVideoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    
    window.addEventListener('load', () => {
      const video = this.bgVideoRef.nativeElement;
      video.load(); 
      video
        .play()
        .then(() => console.log('Video playing'))
        .catch((err) => console.warn('Autoplay failed:', err));
    });
  }
}
