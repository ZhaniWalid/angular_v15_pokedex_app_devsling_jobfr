import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonMoveInterface } from 'src/app/common/interfaces/pokemon-move-interface';
import { formatMoveNameToStartUppercaseClean } from 'src/app/common/utils/utils-common';

@Component({
  selector: 'app-search-result-pokemon-moves',
  templateUrl: './search-result-pokemon-moves.component.html',
  styleUrls: ['./search-result-pokemon-moves.component.css'],
})
export class SearchResultPokemonMovesComponent implements OnInit {
  // Decorate the property with @Input() => The @Input() decorator in a child component or directive signifies
  // that the property can receive its value from its parent component.
  @Input() pokemonMovesArrSortAscProps!: PokemonMoveInterface[];

  pokeMovesWithNamesFormatArrSortAsc!: PokemonMoveInterface[];


  /* constructor(private activatedRoute: ActivatedRoute) {
    // private activatedRoute: ActivatedRoute ::
    //              => Is the current active route that loaded the component.
    //              => Useful for accessing route params.
    //              => Coz we need that for accessing a given Pokemon ID / Pokemon Name
  } */

  ngOnInit(): void {
    this.formatPokemonMovesNames();
  }

  /**
   * @description Format Pokemon Moves Names to be elegant in the display, for eg.: 'bind' => 'Bind' | 'mega-drain' => 'Mega Drain'.
   * @returns void
   * @author WALID ZHANI
   */
  formatPokemonMovesNames(): void {
    
    if (this.pokemonMovesArrSortAscProps !== undefined) {
      this.pokemonMovesArrSortAscProps.forEach(
        (pokeMoveEl: PokemonMoveInterface) =>
          (pokeMoveEl.moveName = formatMoveNameToStartUppercaseClean(
            pokeMoveEl.moveName
          ))
      );
    }
      
    this.pokeMovesWithNamesFormatArrSortAsc = this.pokemonMovesArrSortAscProps;

    console.log(
      'this.pokeMovesWithNamesFormatArrSortAsc @ formatPokemonMovesNames(): ' +
        JSON.stringify(this.pokeMovesWithNamesFormatArrSortAsc)
    );
  }

}