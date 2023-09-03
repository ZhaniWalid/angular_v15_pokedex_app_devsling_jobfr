import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonList } from 'src/app/common/classes/pokemon-list';
import { PokeDexServiceService } from 'src/app/services/poke-dex-service.service';

@Component({
  selector: 'app-poke-dex-search-page',
  templateUrl: './poke-dex-search-page.component.html',
  styleUrls: ['./poke-dex-search-page.component.css']
})
export class PokeDexSearchPageComponent implements OnInit {
  // The "!" is the non-null assertion operator. Tells TypeScript compiler to suspend strict
  // NULL & UNDEFINED checks for a property
  pokemon!: any;
  pokemonRandomIdIfNotExistFollowUp: string = '';
  pokemonsArr: PokemonList = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };

  constructor(
    private pokeDexService: PokeDexServiceService,
    private router: Router) {

  }

  ngOnInit(): void {
    //debugger
    this.getPokemonsFromApi();
  }

  /**
   * @description Return all Pokemons paginated from the REST API.
   * @returns void
   * @author WALID ZHANI
   */
  getPokemonsFromApi(): void {
    //debugger
    this.pokeDexService.getAllPokemonsPaginated().subscribe(
      data => {
        this.pokemonsArr = data;
        console.log('pokemonsArr - INSIDE CALLBACK - @ getPokemonsFromApi(): '+ JSON.stringify(this.pokemonsArr));
      }
    ); 
  }

  /**
   * @description Verify IF there is a Pokemon with the given ID then redirect to '/pokemon-info-page/search-by-id/${pokemonID}', ELSE redirect to '/404-pokemon-not-found'.
   * @param pokemonID
   * @returns void
   * @author WALID ZHANI
   */
  verifyPokemonIdThenRedirect(pokemonID: number): void {
    //debugger

    this.pokeDexService.getPokemonById(pokemonID).subscribe(
      data => {
        if (data) {
          this.pokemon = {...data}; 
          console.log('this.pokemon - INSIDE CALLBACK - @ verifyPokemonIdThenRedirect(): '+ JSON.stringify(this.pokemon));
          this.router.navigateByUrl(`/pokemon-info-page/search-by-id/${pokemonID}`);
        } else {
          if (this.pokemonRandomIdIfNotExistFollowUp === 'SEARCHING WITH RANDOM ID')
            alert(`The Pokemon you are searching for with this random ID -- ${pokemonID} --, DOES NOT EXIST, press OK to redirect !!!`);

          this.router.navigateByUrl(`/404-pokemon-not-found`);
        }      
      }
    );
  }

  /**
   * @description Verify IF there is a Pokemon with the given NAME then redirect to '/pokemon-info-page/search-by-name/${pokemonName}', ELSE redirect to '/404-pokemon-not-found'.
   * @param pokemonName
   * @returns void
   * @author WALID ZHANI
   */
  verifyPokemonNameThenRedirect(pokemonName: string): void {
    //debugger

    this.pokeDexService.getPokemonByName(pokemonName.toLowerCase()).subscribe(
      data => { 
          if (data) {
            this.pokemon = {...data}; 
            console.log('this.pokemon - INSIDE CALLBACK - @ verifyPokemonNameThenRedirect(): '+ JSON.stringify(this.pokemon));
            this.router.navigateByUrl(`/pokemon-info-page/search-by-name/${pokemonName.toLowerCase()}`);
          } else
            this.router.navigateByUrl(`/404-pokemon-not-found`);
      }
    );
  }

  /**
   * @description When clicking the button 'SEARCH', verify the IF the Search is by ID then use the 'verifyPokemonIdThenRedirect()' method, 
   *  ELSE IF the Search is by NAME then use the 'verifyPokemonNameThenRedirect()', ELSE redirect to '/404-pokemon-not-found'.
   * @param searchTxtInputVal
   * @returns void
   * @author WALID ZHANI
   */
  doSearchPokemonByNameOrId(searchTxtInputVal: string): void {
    // debugger
    // "navigateByUrl" => Route the Data to our "search" router. It will be handled by
    //       the "SearchResultPokemonComponent"
    //  `/search/${searchTxtVal}` => Will match this router: 
    //       { path: 'pokemon-info-page/search-by-id/:pokemon-id', component: SearchResultPokemonComponent },
    //       { path: 'pokemon-info-page/search-by-name/:pokemon-name', component: SearchResultPokemonComponent },
    console.log(`searchTxtInputVal @ doSearchPokemonByNameOrId: ${searchTxtInputVal}`);

    if (searchTxtInputVal.length === 0 && searchTxtInputVal === '')
      alert('When searching with the button << Search >>, the input value SHOULD NOT BE EMPTY.!!!');
    else if (Number.isInteger(parseInt(searchTxtInputVal)) && parseInt(searchTxtInputVal) > 0)
      this.verifyPokemonIdThenRedirect(parseInt(searchTxtInputVal));
    else if (!Number.isInteger(parseInt(searchTxtInputVal)) && searchTxtInputVal !== '')
      this.verifyPokemonNameThenRedirect(searchTxtInputVal);
    else
      this.router.navigateByUrl(`/404-pokemon-not-found`);
  }

  /**
   * @description When clicking the button 'RANDOM' without filling the ipnut text, Do a random search by a random ID then calling the 'verifyPokemonIdThenRedirect()' method,
   *    ELSE redirect to '/404-pokemon-not-found'.
   * @returns void
   * @author WALID ZHANI
   */
  doRandomSearchPokemonById() {
    //debugger

    // Returns a random integer from 0 to 1281... because the Pokemon Database has 1281 Pokemons
    const randomNumber: number = Math.random() * 1281;
    const randomPokemonID: number = randomNumber | 0; // Take ONLY the NUMBER before the '.'
    console.log(`randomPokemonID @ doRandomSearchPokemonById: ${randomPokemonID}`);

    if (randomPokemonID > 0) {
      this.pokemonRandomIdIfNotExistFollowUp += 'SEARCHING WITH RANDOM ID';
      this.verifyPokemonIdThenRedirect(randomPokemonID);
    } else 
      this.router.navigateByUrl(`/404-pokemon-not-found`);
  }

}