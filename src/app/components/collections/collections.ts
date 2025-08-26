import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-collections',
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './collections.html',
  styleUrl: './collections.scss'
})
export class Collections {

}
