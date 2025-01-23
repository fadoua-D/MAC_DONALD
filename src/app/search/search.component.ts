import { Component, OnInit,ElementRef, ViewChild, EventEmitter, Output, ChangeDetectorRef} from '@angular/core';
//import { FormsModule, NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormControl, Validators} from '@angular/forms'
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AsyncPipe, NgFor, NgIf} from '@angular/common';
import { Place } from '../models/place';
//import { map, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-search',
  imports:[
    ReactiveFormsModule,
    AsyncPipe,
    NgFor,
    NgIf
   // NgStyle
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  //exportAs: 'searchPlace'
})

export class SearchComponent implements OnInit {

  //public city: FormControl = new FormControl('', [Validators.required]);
  public city: FormControl = new FormControl('');
  public cityAdress: string = '';
  cities$! : Observable<Place[]> ;
  @ViewChild('cityAdress') elRef!:ElementRef;

  @Output() restaurantsEmit = new EventEmitter<any[]>(); // Émetteur pour transmettre les restaurants
  @Output() cityInfoEmitted = new EventEmitter<any>(); // Événement pour envoyer l'objet
  //restaurants$! : Observable<Place[]> ;
  public restaurants : Place[] = [];
  public macDonalds : Place[] = [];


  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef){

  }

  ngOnInit(): void {

  }

  recupererVille(e:KeyboardEvent){
    e.preventDefault();
    this.cities$ = this.apiService.getCitiesByName(this.city.getRawValue());
  }

  onSelected(value:string): void {
		this.cityAdress = value;
    this.city.setValue(`${this.cityAdress}`); // Ou patchValue
    this.elRef.nativeElement.className="collapse";
	}

  restaurantList(e:Event){
    e.preventDefault();
    this.apiService.getCityCoordinates(this.city.getRawValue()).subscribe(data => {
      if (data && data[0]) {
        // Extraire le nom la latitude et la longitude de la réponse
        const cityInfo = {
          cityName: data[0].display_name,
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };

        this.cityInfoEmitted.emit(cityInfo); // Émettre l'objet au parent
      }
    });
 
    this.apiService.getAllRestaurants(this.city.getRawValue())
    // .pipe(
    //   debounceTime(400),  // Attend 400ms après la dernière frappe
    //   distinctUntilChanged() // Ignore si la valeur n'a pas changé
    // )
    .subscribe((result) => {
      this.restaurants = result;
        // Émet les restaurants vers le ParentComponent
        this.restaurantsEmit.emit(result);
        //this.cdr.detectChanges(); // Forcer la mise à jour

    }) 
    
  }
  




}
