import { Component , Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { NgIf } from '@angular/common';
//import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ NgIf ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnChanges{
  @Input() restaurantDetails: any = ''; // Ville reçue du parent

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restaurantName']) {
      console.log(this.restaurantDetails);
    }
  }

}
