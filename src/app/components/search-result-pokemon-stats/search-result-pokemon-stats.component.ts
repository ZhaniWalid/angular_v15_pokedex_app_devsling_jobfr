import { Component, Input, OnInit } from '@angular/core';
import { PokemonStatsInterface } from 'src/app/common/interfaces/pokemon-stats-interface';

@Component({
  selector: 'app-search-result-pokemon-stats',
  templateUrl: './search-result-pokemon-stats.component.html',
  styleUrls: ['./search-result-pokemon-stats.component.css']
})
export class SearchResultPokemonStatsComponent implements OnInit {
  // Decorate the property with @Input() => The @Input() decorator in a child component or directive signifies
  // that the property can receive its value from its parent component.
  @Input() pokemonStatsProps: PokemonStatsInterface = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  }
  @Input() backgroundColorProps: string = '';
  
  pokemonStatsTitles: string[] = [
    'HP',
    'ATK',
    'DEF',
    'SATK',
    'SDEF',
    'SPD'
  ];

  constructor() {}
  
  ngOnInit(): void {
    // debugger
    console.log('ngOnInit() @ SearchResultPokemonStats @ pokemonStatsProps - from parent-to-child: '+ JSON.stringify(this.pokemonStatsProps));
    
    if (this.backgroundColorProps !== '' && this.backgroundColorProps !== undefined)
      console.log('ngOnInit() @ SearchResultPokemonStats @ backgroundColorProps - from parent-to-child: '+ this.backgroundColorProps);
  }

}