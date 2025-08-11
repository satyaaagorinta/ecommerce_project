import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
