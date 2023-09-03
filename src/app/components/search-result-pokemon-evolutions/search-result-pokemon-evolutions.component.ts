import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonEvolImg } from 'src/app/common/interfaces/pokemon-evol-img';
import { PokemonEvolution } from 'src/app/common/interfaces/pokemon-evolution';
import { isObjectNotNullNotUndefined } from 'src/app/common/utils/utils-common';
import { PokeDexServiceService } from 'src/app/services/poke-dex-service.service';

@Component({
  selector: 'app-search-result-pokemon-evolutions',
  templateUrl: './search-result-pokemon-evolutions.component.html',
  styleUrls: ['./search-result-pokemon-evolutions.component.css'],
})
export class SearchResultPokemonEvolutionsComponent implements OnInit {
  // Decorate the property with @Input() => The @Input() decorator in a child component or directive signifies
  // that the property can receive its value from its parent component.
  @Input() backgroundColorPropsEvolArrow: string = '';
  @Input() pokemonIdProps: number = 0;

  borderColorVolumeArrow: string = '';
  pokemonEvolArr: PokemonEvolution[] = [];
  leftArrowPropsArr: number[] = [];
  rightPropCssDiv: number = 0;

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
    this.borderColorVolumeArrow = '2px '+ this.backgroundColorPropsEvolArrow+ ' solid';

    console.log('this.pokemonIdProps @ ngOnInit(): ' + this.pokemonIdProps);
    console.log('this.borderColorVolumeArrow @ ngOnInit(): ' + this.borderColorVolumeArrow);

    this.activatedRoute.paramMap.subscribe(() => {
      this.handlePokemonEvolutionsById(this.pokemonIdProps);
    });
  }

  /**
   * @description Handle Pokemon Evolution Chain by ID.
   * @param thePokemonId
   * @returns void
   * @author WALID ZHANI
   */
  handlePokemonEvolutionsById(thePokemonId: number): void {
    // debugger;
    console.log(
      'thePokemonId @ handlePokemonEvolutionsById(): ' + thePokemonId
    );

    this.pokeDexService
      .getPokemonEvolutionChainById(thePokemonId)
      .subscribe((data) => {
        console.log(
          'data @ handlePokemonEvolutionsById(): ' + JSON.stringify(data)
        );

        this.extractPreparePokemonEvolObjs(data);
      });
  }

  /**
   * @description Extract Pokemon Evolution Objects.
   * @param data
   * @returns void
   * @author WALID ZHANI
   */
  extractPreparePokemonEvolObjs(data: any): void {
    debugger
    let pokemonObjLvl0 = undefined;
    let pokemonObjLvl1 = undefined;
    let pokemonObjLvl2 = undefined;

    const chainObj = data.chain;
    if (isObjectNotNullNotUndefined(chainObj)) {
      if (isObjectNotNullNotUndefined(data.chain.species))
        pokemonObjLvl0 = data.chain.species; // LEVEL 0

      const firstEvolvsToObj = chainObj.evolves_to;
      if (isObjectNotNullNotUndefined(firstEvolvsToObj) && firstEvolvsToObj.length > 0) {
        if (isObjectNotNullNotUndefined(firstEvolvsToObj[0])) {
          if (isObjectNotNullNotUndefined(firstEvolvsToObj[0].species))
            pokemonObjLvl1 = firstEvolvsToObj[0].species; // LEVEL 1

          const secondEvolvsToObj = firstEvolvsToObj[0].evolves_to;
          if (isObjectNotNullNotUndefined(secondEvolvsToObj) && secondEvolvsToObj.length > 0) {
            if (isObjectNotNullNotUndefined(secondEvolvsToObj[0])) {
              if (isObjectNotNullNotUndefined(secondEvolvsToObj[0].species))
                pokemonObjLvl2 = secondEvolvsToObj[0].species; // LEVEL 2
            }
          }
        }
      }
    }

    const pokemonObjsLvlsArr: any[] = [];
    const pokemonObjsLvlsArrDraft: any[] = [
      pokemonObjLvl0,
      pokemonObjLvl1,
      pokemonObjLvl2,
    ];

    pokemonObjsLvlsArrDraft.forEach(el => {
      if (el !== undefined)
        pokemonObjsLvlsArr.push(el);
    });
    
    console.log(
      'pokemonObjsLvlsArr @ extractPreparePokemonEvolObjs(): ' +
        JSON.stringify(pokemonObjsLvlsArr)
    );

    this.handlePokemonEvolAndImgUrlByName(pokemonObjsLvlsArr);
  }

  /**
   * @description Calculate the 'right' property of the Div containing the Pokemon Evolution Chain => 'right: someValue in px' (eg.: 'right: 20px').
   * @returns void
   * @author WALID ZHANI
   */
  calculateRightPropCssDiv(): void {
    if (this.pokemonEvolArr.length === 3)
      // IF 3 EVOLUTIONS IN TOTAL
      this.rightPropCssDiv = 80;
    else if (this.pokemonEvolArr.length === 2)
      // IF 2 EVOLUTIONS IN TOTAL
      this.rightPropCssDiv = 180;
    else if (this.pokemonEvolArr.length === 1)
      // IF NO EVOLUTIONS (0)
      this.rightPropCssDiv = 320;

    console.log(
      'this.rightPropCssDiv @ calculateRightPropCssDiv(): ' +
        this.rightPropCssDiv
    );
  }

  /**
   * @description Handle the Pokemon Image for each object in 'pokemonObjsLvlsArr' and create the whole 'pokemonEvolArr' array of objects that contains all needed informations about Pokemon Evolution.
   * @param pokemonObjsLvlsArr
   * @returns void
   * @author WALID ZHANI
   */
  handlePokemonEvolAndImgUrlByName(pokemonObjsLvlsArr: any[]): void {
    // debugger
    /* 
      cssProps: {
        leftPropsDivName: number, 0 => 260 => 520 (pace: 260)
        leftPropsDivImage: number, 0 => 265 => 530 (pace: 265)
        leftPropsDivArrow : number, 132.5 => 132.5 + (132.5 * 2) [pace: old + (132.5 * 2)]       	
      } 
    */
    let leftPropsDivNameVal = 0;
    let leftPropsDivImageVal = 0;
    let leftPropsDivArrowVal = 0;

    if (isObjectNotNullNotUndefined(pokemonObjsLvlsArr)) {
      for (let i = 0; i < pokemonObjsLvlsArr.length; i++) {
        if (pokemonObjsLvlsArr[i] !== undefined) {
          this.pokeDexService
            .getPokemonByName(pokemonObjsLvlsArr[i].name)
            .subscribe((data) => {
              const pokemonObjLvlElmnt = pokemonObjsLvlsArr[i];
              const thePokemonName = pokemonObjsLvlsArr[i].name;

              if (i === 0) {
                // pokemonObjLvl0
                leftPropsDivNameVal = 0;
                leftPropsDivImageVal = 0;
                leftPropsDivArrowVal = 132.5;
              } else if (i === 1 || i === 2) {
                // i === 1 OR/THEN i === 2 => pokemonObjLvl1
                leftPropsDivNameVal = leftPropsDivNameVal + 260;
                leftPropsDivImageVal = leftPropsDivImageVal + 265;
                leftPropsDivArrowVal = leftPropsDivArrowVal + 132.5 * 2;
              }
              this.leftArrowPropsArr.push(leftPropsDivArrowVal);

              const pokemon = data;
              if (isObjectNotNullNotUndefined(pokemon)) {
                const pokemonImgUrlObj: PokemonEvolImg = {
                  pokemonName: thePokemonName,
                  pokemonImgUrl: pokemon.sprites.other.home.front_default,
                };

                this.pokemonEvolArr.push({
                  ...pokemonObjLvlElmnt, // ...pokemonObjLvl{i}: 0 -- 1 -- 2
                  pokemonImgUrl: pokemonImgUrlObj.pokemonImgUrl,
                  evolutionLvl: i, // {i}: 0 -- 1 -- 2
                  cssProps: {
                    leftPropsDivName: leftPropsDivNameVal,
                    leftPropsDivImage: leftPropsDivImageVal,
                    leftPropsDivArrow: leftPropsDivArrowVal,
                  },
                }); // LEVEL {i}: 0 -- 1 -- 2
              }

              if (i === pokemonObjsLvlsArr.length - 1) {
                // IF all the "pokemonObjsLvlsArr" is looped
                this.calculateRightPropCssDiv();

                console.log(
                  'this.leftArrowPropsArr - default @ preparePokemonEvolArr -> handlePokemonEvolutionsById(): ' +
                    JSON.stringify(this.leftArrowPropsArr)
                );
                console.log(
                  'this.pokemonEvolArr @ preparePokemonEvolArr -> handlePokemonEvolutionsById(): ' +
                    JSON.stringify(this.pokemonEvolArr) + ' - length: '+ this.pokemonEvolArr.length
                );

                // We need to eliminate the last value of the arrow, because we don't need him after the last image of a pokémon
                this.leftArrowPropsArr.length =
                  this.leftArrowPropsArr.length - 1;
                console.log(
                  'this.leftArrowPropsArr - after filter @ preparePokemonEvolArr -> handlePokemonEvolutionsById(): ' +
                    JSON.stringify(this.leftArrowPropsArr)
                );
              }
            });
        }
      }
    }
  }
}