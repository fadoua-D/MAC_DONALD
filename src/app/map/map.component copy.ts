import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { Place } from '../models/place';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent  implements OnInit, OnChanges {

  @Input() restaurants!: Place[];
  @Input() lat : number = 48.8566 ;
  @Input() lon : number = 2.3522;

  @Input() receivedData!: string;
  @Input() items: Place[] = [];
  cityName: string = 'Paris';  // Ville par défaut

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 13,
    //center: L.latLng(48.8566, 2.3522), // Paris
    center: L.latLng(this.lat, this.lon),
  };

  // Liste des marqueurs
  markers: L.Marker[] = [];

  // Ajouter des marqueurs initiaux
  ngOnInit(): void {
    //this.initMap();
    //this.updateMap(this.cityName); // Centrer la carte sur la ville par défaut
    // this.addMarker(48.8566, 2.3522, 'Bienvenue à Paris !');
    // this.addMarker(48.8584, 2.2945, 'Tour Eiffel');
    // this.addMarker(48.8606, 2.3376, 'Musée du Louvre');
    // this.addMarker(48.7079028, 2.3890941, 'Athis-Mons');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.cityName) {
    //   this.updateMap(this.cityName); // Mettre à jour la carte quand la ville change
    // }

    console.log('**********************');
    console.log('items', this.items);
    console.log('**********************');

    for(let item of this.items){
      this.addMarker(Number(item.lat), Number(item.lon), item.display_name);
      console.log('**********************');
      console.log('item.name', item.display_name);
      console.log('**********************');
    }
    // Add markers for restaurants
    // this.items.forEach((restaurant) => {
    //     L.marker([restaurant.lat, restaurant.lon]).addTo(map)
    //         .bindPopup(restaurant.display_name);
    //   }); t
 
  }

  // Méthode pour ajouter un marqueur
  addMarker(lat: number, lng: number, popupText: string): void {
    const marker = L.marker([lat, lng], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: './assets/marker-icon.png',
        shadowUrl: './assets/marker-shadow.png',
      }),
    }).bindPopup(popupText);

    this.markers.push(marker);
  }



  // initMap(): void {
  //   // Initialisation de la carte avec la vue par défaut (Paris)
  //   this.map = L.map('map').setView([this.lat, this.lon], 12);  // Zoom = 12 pour une vue de ville

  //   // Ajouter un fond de carte
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(this.map);
  // }

  // updateMap(cityName: string): void {
  //   this.getCityCoordinates(cityName).subscribe(data => {
  //     if (data && data[0]) {
  //       // Extraire la latitude et la longitude de la réponse
  //       const lat = parseFloat(data[0].lat);
  //       const lon = parseFloat(data[0].lon);

  //       // Centrer la carte sur la nouvelle ville
  //       this.map.setView([lat, lon], 12); // Recentrer avec un zoom de 12

  //       // Ajouter un marqueur à la position
  //       L.marker([lat, lon]).addTo(this.map).bindPopup(`${cityName}`).openPopup();
  //     }
  //   });
  // }

  // getCityCoordinates(cityName: string) {
  //   const params = new HttpParams()
  //     .set('q', cityName)
  //     .set('format', 'json')
  //     .set('addressdetails', '1')
  //     .set('limit', '1'); // Limiter la recherche à 1 résultat

  //   return this.httpClient.get<any>('https://nominatim.openstreetmap.org/search', { params });
  // }

}
