import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
  selector: 'app-header',
  imports: [RouterLink, MatBadgeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
