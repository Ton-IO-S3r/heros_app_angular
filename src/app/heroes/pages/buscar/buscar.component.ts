import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  
  termino: string = '';
  heroes: Heroe[] = [];
  selectedHero!: Heroe;
  constructor(private heoresService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando = () => {
    this.heoresService.getSearchSuggestions(this.termino)
        .subscribe(
          {
            next: heroes => this.heroes = heroes,
            error: error => console.log(error)
          }
        )
  }

  getSelected = (event: MatAutocompleteSelectedEvent) => {
    if (!event.option.value) {
      this.termino = '';
      return
    }
    this.selectedHero = event.option.value;
    this.termino = this.selectedHero.superhero;


  }

}
