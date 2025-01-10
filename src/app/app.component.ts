import { Component } from '@angular/core';
import { MapComponent} from './map/map.component';
// import { RouterOutlet } from '@angular/router';
// import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [FooterComponent, RouterOutlet],
  //imports: [RouterOutlet],
  imports: [
    MapComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mac_donald';
}