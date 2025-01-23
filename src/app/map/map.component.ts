import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, AfterViewInit, EventEmitter } from '@angular/core';
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
export class MapComponent  implements OnInit, OnChanges, AfterViewInit {

  @Input() restaurants: Place[] = [];
  @Input() receivedObject: any;

  @Output() restaurantSelected = new EventEmitter<string>();



  map: any; // Référence à la carte
  cityName: string = 'Paris';  // Ville par défaut
  lat: number = 48.8566; // Latitude par défaut (Paris)
  lon: number = 2.3522;  // Longitude par défaut (Paris)


  // Liste des marqueurs
  markers: L.Marker[] = [];

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


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['receivedObject'] && changes['receivedObject'].currentValue) {
      let cityName = this.receivedObject.cityName;
      this.updateMap(cityName); // Recentrer la carte si la ville change
    }
    if (changes['restaurants'] && this.restaurants.length > 0) {
      this.updateMapWithMarkers();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap(); // Initialisation de la carte
  }
  

  initMap(): void {
    this.map = L.map('map').setView([this.lat, this.lon], 13); // Centrer la carte par défaut
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  updateMap(cityName: string): void {
        let lat = this.receivedObject.lat;
        let lon = this.receivedObject.lon;

        // Recentrer la carte sur la nouvelle ville
        this.map.setView([lat, lon], 13); // Centrer la carte avec un zoom de 13
  }


  // Méthode pour ajouter un marqueur
  // addMarker(lat: number, lng: number, popupText: string): void {
  //   const marker = L.marker([lat, lng], {
  //     icon: L.icon({
  //       iconSize: [25, 41],
  //       iconAnchor: [13, 41],
  //       iconUrl: './assets/marker-icon.png',
  //       shadowUrl: './assets/marker-shadow.png',
  //     }),
  //   }).addTo(this.map)
  //   .bindPopup(popupText)
  //   .openPopup();

  //   this.markers.push(marker);
  // }

  private updateMapWithMarkers(): void {
    if (!this.map) return;

    // Supprime tous les marqueurs existants avant d'ajouter les nouveaux
    this.map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker) {
        this.map?.removeLayer(layer);
      }
    });

    // Ajoute des marqueurs pour chaque restaurant
    this.restaurants.forEach((restaurant) => {
      L.marker([restaurant.lat, restaurant.lon],
        {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: './assets/marker-icon.png',
            shadowUrl: './assets/marker-shadow.png',
          }),
        })
        .addTo(this.map!)
        .bindPopup(`
          <div>
            <p>${restaurant.display_name}</p>
            <button id="popup-button" class="btn btn-choice">
              Choisir
            </button>
          </div>
        `)
         // Écouter les interactions du bouton dans le popup
        .on('popupopen', () => {
          const button = document.getElementById('popup-button');
          if (button) {
            button.addEventListener('click', () => {
             // alert('Bouton cliqué !');
              this.restaurantSelected.emit(restaurant.display_name); // Émettre le restaurant sélectionné
            });
          }
        }); 

    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Supprime la carte proprement
    }
  }

}
