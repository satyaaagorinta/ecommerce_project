import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Main } from '../main/main';
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [Header,Main,Sidebar,RouterOutlet,CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
