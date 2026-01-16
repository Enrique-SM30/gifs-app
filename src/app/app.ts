import { Component, signal } from '@angular/core';
import { RouterOutlet } from "../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet]
})
export class App {
  protected readonly title = signal('gifs-app');
}
