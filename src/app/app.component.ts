import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { MapComponent} from './map/map.component';
import { Place } from './models/place';
import { SearchComponent } from './search/search.component';
//import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  imports: [
    MapComponent,
    SearchComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent{
  title = 'mac_donald';
  sharedObject: any; // Stocke l'objet reçu avec les infos sur la ville
  restaurants: any[] = []; // Liste des restaurants à transmettre à MapComponent


  receiveObject(obj: any): void {
    this.sharedObject = obj; // Mettre à jour l'objet partagé
  }

  updateRestaurants(restaurants: any[]): void {
    this.restaurants = restaurants; // Met à jour la liste des restaurants
  }
}