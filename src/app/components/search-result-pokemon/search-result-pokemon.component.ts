import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonMoveInterface } from 'src/app/common/interfaces/pokemon-move-interface';
import { PokemonStatsInterface } from 'src/app/common/interfaces/pokemon-stats-interface';
import { PokeDexServiceService } from 'src/app/services/poke-dex-service.service';

@Component({
  selector: 'app-search-result-pokemon',
  templateUrl: './search-result-pokemon.component.html',
  styleUrls: ['./search-result-pokemon.component.css']
})
export class SearchResultPokemonComponent implements OnInit {
  // The "!" is the non-null assertion operator. Tells TypeScript compiler to suspend strict
  // NULL & UNDEFINED checks for a property
  pokemon!: any;
  pokemonStatsArr!: any[];
  typesPerPokemon!: any[];
  pokemonMovesArrSortedAsc!: PokemonMoveInterface[];
  leftCssPropBtns: number = 0;
  backgroundColor: string = '';
  whichComponentToLoad: number = 0;
  pokemonDescription: string = '';
  pokemonMenuTabs: string[] = [
    'STATS',
    'EVOLUTIONS',
    'MOVES'
  ];
  pokemonStats: PokemonStatsInterface = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  }
  pokemonIdAsParentProp: number = 0;
  
  constructor(
    private pokeDexService: PokeDexServiceService,
    private activatedRoute: ActivatedRoute
  ) {
    // private activatedRoute: ActivatedRoute ::
    //              => Is the current active route that loaded the component.
    //              => Useful for accessing route params. 
    //              => Coz we need that for accessing a given Pokemon ID / Pokemon Name
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.handlePokemonDetails();
    });
  }

  /**
   * @description When the tab 'STATS' is clicked, load the component 'SearchResultPokemonStatsComponent'.
   * @returns void
   * @author WALID ZHANI
   */
  onTabStatsClicked(): void {
    // Call preventDefault to prevent the page refresh / redirect.
    //event.preventDefault();
    this.whichComponentToLoad = 0;
  }

  /**
   * @description When the tab 'EVOLUTIONS' is clicked, load the component 'SearchResultPokemonEvolutionsComponent'.
   * @returns void
   * @author WALID ZHANI
   */
  onTabEvolutionsClicked(): void {
    this.whichComponentToLoad = 1;
  }

  /**
   * @description When the tab 'MOVES' is clicked, load the component 'SearchResultPokemonMovesComponent'.
   * @returns void
   * @author WALID ZHANI
   */
  onTabMovesClicked(): void {
    this.whichComponentToLoad = 2;
  }

  /**
   * @description Handle Pokemon Description by ID.
   * @param thePokemonId
   * @returns void
   * @author WALID ZHANI
   */
  handlePokemonDescriptionById(thePokemonId: number): void {
    // debugger
    console.log('thePokemonId @ handlePokemonDescriptionById(): '+ thePokemonId);

    this.pokeDexService.getPokemonDescriptionById(thePokemonId).subscribe(
      data => {
        const arrOfDescs = data.flavor_text_entries;
        
        const descWithEnglishLang = arrOfDescs.find((el: any) => {
          // The find() method => returns the #1st element of the given array, that meets the condition.
          if (el.language.name === 'en') {
            return el;
          }
        });
        this.pokemonDescription = descWithEnglishLang.flavor_text;
        this.backgroundColor = data.color.name;

        console.log('this.pokemonDescription @ handlePokemonDescriptionById(): '+ this.pokemonDescription);
        console.log('this.backgroundColor @ handlePokemonDescriptionById(): '+ this.backgroundColor);
      }
    );
  }

  /**
   * @description Handle Pokemon Details by ID or NAME => Depends on the route.
   * @returns void
   * @author WALID ZHANI
   */
  handlePokemonDetails(): void {
    //debugger
    let pokeMovesArray: any[] = [];
    let pokemonMovesArrNotOrdered: PokemonMoveInterface[] = [];

    // GET the "ID" param as a String & convcert it to a number using the "+" Symbol
    //      # ! => This is the non-null assertion operator. 
    //             It tells the compiler that the obj is not null.
    const thePokemonId: number = +this.activatedRoute.snapshot.paramMap.get('pokemon-id')!;
    if (thePokemonId > 0 && thePokemonId !== undefined) {
      this.pokeDexService.getPokemonById(thePokemonId).subscribe(
        data => {
          this.pokemon = data;      
          this.typesPerPokemon = this.pokemon.types;
          this.pokemonStatsArr = this.pokemon.stats;
          this.pokemonIdAsParentProp = thePokemonId;

          pokeMovesArray = this.pokemon.moves;

          pokeMovesArray.forEach((el: any) => {
            const moveObj: PokemonMoveInterface = {
              moveName: el.move.name,
              moveLvl: el.version_group_details[0].level_learned_at,
            };

            pokemonMovesArrNotOrdered.push(moveObj);
          });

          this.pokemonMovesArrSortedAsc = this.sortPokemonMovesArr(pokemonMovesArrNotOrdered);
 
          this.handlePokemonDescriptionById(thePokemonId);
          this.handleTypesPerPokemonProps();
          this.handlePokemonStats(this.pokemonStatsArr);
          
          console.log('this.pokemonMovesArrSortedAsc @ pokemon-id @ handlePokemonDetails(): '+ JSON.stringify(this.pokemonMovesArrSortedAsc));
          console.log('pokeMovesArray @ pokemon-id @ handlePokemonDetails(): '+ JSON.stringify(pokeMovesArray));
          console.log('this.pokemon @ pokemon-id @ handlePokemonDetails(): '+ JSON.stringify(this.pokemon));
          console.log('this.typesPerPokemon @ pokemon-id @ handleTypesPerPokemonProps() -> handlePokemonDetails(): '+ JSON.stringify(this.typesPerPokemon));
          console.log('pokemonStatsArr @ pokemon-id @ handlePokemonDetails(): '+ JSON.stringify(this.pokemonStatsArr));
          console.log('this.pokemonStats @ pokemon-id @ handlePokemonStats() -> handlePokemonDetails(): '+ JSON.stringify(this.pokemonStats));
        }
      );
    }
    
    // GET the "Pokemon Name" param as a String
    //      # ! => This is the non-null assertion operator. 
    //             It tells the compiler that the obj is not null.
    const thePokemonName: string = this.activatedRoute.snapshot.paramMap.get('pokemon-name')!;
    if (thePokemonName !== '' && thePokemonName !== undefined && thePokemonName !== null) {
      this.pokeDexService.getPokemonByName(thePokemonName).subscribe(
        data => {
          this.pokemon = data;    
          this.typesPerPokemon = this.pokemon.types;
          this.pokemonStatsArr = this.pokemon.stats;

          pokeMovesArray = this.pokemon.moves;

          pokeMovesArray.forEach((el: any) => {
            const moveObj: PokemonMoveInterface = {
              moveName: el.move.name,
              moveLvl: el.version_group_details[0].level_learned_at,
            };

            pokemonMovesArrNotOrdered.push(moveObj);
          });

          this.pokemonMovesArrSortedAsc = this.sortPokemonMovesArr(pokemonMovesArrNotOrdered);

          const pokemonID = this.pokemon.id;
          this.pokemonIdAsParentProp = pokemonID;
          
          this.handlePokemonDescriptionById(pokemonID);
          this.handleTypesPerPokemonProps();
          this.handlePokemonStats(this.pokemonStatsArr);

          console.log('this.pokemonMovesArrSortedAsc @ pokemon-name @ handlePokemonDetails(): '+ JSON.stringify(this.pokemonMovesArrSortedAsc));
          console.log('pokeMovesArray @ pokemon-name @ handlePokemonDetails(): '+ JSON.stringify(pokeMovesArray));
          console.log('this.pokemon @ pokemon-name @ handlePokemonDetails(): '+ JSON.stringify(this.pokemon));
          console.log('this.typesPerPokemon @ pokemon-name @ handleTypesPerPokemonProps() -> handlePokemonDetails(): '+ JSON.stringify(this.typesPerPokemon));
          console.log('pokemonStatsArr @ pokemon-name @ handlePokemonDetails(): '+ JSON.stringify(this.pokemonStatsArr));
          console.log('this.pokemonStats @ pokemon-name @ handlePokemonStats() -> handlePokemonDetails(): '+ JSON.stringify(this.pokemonStats));
        }
      );
    }
  }

  /**
   * @description Sort the Pokemon Moves array by "Move Level" in Ascending Order.
   * @param pokemonMovesArrNotOrderedIn
   * @returns pokemonMovesArrSortedAscOut: PokemonMoveInterface[]
   * @author WALID ZHANI
   */
  sortPokemonMovesArr(pokemonMovesArrNotOrderedIn: PokemonMoveInterface[]): PokemonMoveInterface[] {
    let pokemonMovesArrSortedAscOut: PokemonMoveInterface[] = [];

    pokemonMovesArrSortedAscOut = pokemonMovesArrNotOrderedIn.sort(
      (x, y) => x.moveLvl - y.moveLvl
    );

    return pokemonMovesArrSortedAscOut;
  }

  /**
   * @description Handle Pokemon Types, to know how much types the Pokemon has to give the 'leftCssPropBtns' property the appropriate value & also 'typesPerPokemon' array.
   * @returns void
   * @author WALID ZHANI
   */
  handleTypesPerPokemonProps(): void {
    if (this.typesPerPokemon.length > 1) { // IF it has 2 types or MORE
      for (let i = 0; i < this.typesPerPokemon.length; i++) {
        if (i === 0)
          this.leftCssPropBtns = 0;
        else 
          this.leftCssPropBtns += 300;

        this.typesPerPokemon[i] = {
          ...this.typesPerPokemon[i], // '...' => Is the Spread Operator, make a shallow copy of the Object
          leftCssPropBtns: this.leftCssPropBtns,
        };  
      }
    } else { // IF it has ONLY 1 TYPE
      this.leftCssPropBtns = 100;

      this.typesPerPokemon[0] = { // [0] => Because it ONLY has ONE Element
        ...this.typesPerPokemon[0], // '...' => Is the Spread Operator, make a shallow copy of the Object
        leftCssPropBtns: this.leftCssPropBtns,
      };  
    }    
  }

  /**
   * @description Handle the Pokemon Stats Values like 'HP', 'ATK', 'DEF' etc.
   * @param pokemonStatsArrIn
   * @returns void
   * @author WALID ZHANI
   */
  handlePokemonStats(pokemonStatsArrIn: any): void {
    let pokemonStatsMap = new Map();

    pokemonStatsArrIn.forEach((el: any) => {
      pokemonStatsMap.set(el.stat.name, el.base_stat);
    });

    pokemonStatsMap.forEach((value: number, key: string) => {
      switch(key) {
        case 'hp':
          this.pokemonStats.hp = value;
          break;
        case 'attack':
          this.pokemonStats.attack = value;
          break;
        case 'defense':
          this.pokemonStats.defense = value;
          break;
        case 'special-attack':
          this.pokemonStats.specialAttack = value;
          break;
        case 'special-defense':
          this.pokemonStats.specialDefense = value;
          break;
        case 'speed':
          this.pokemonStats.speed = value;
          break;
        default:
          return;
      }
    });

    console.log('pokemonStatsMap @ handlePokemonStats(): '+ [...pokemonStatsMap]);
  }

}