import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private itemsSubject = new BehaviorSubject<Place[]>([]);
  items$ = this.itemsSubject.asObservable();

  updateItems(newItems: Place[]) {
    this.itemsSubject.next(newItems); // Émet la dernière valeur
  }
}
