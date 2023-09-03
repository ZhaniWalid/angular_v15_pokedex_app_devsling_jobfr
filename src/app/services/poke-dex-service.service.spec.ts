import { TestBed } from '@angular/core/testing';

import { PokeDexServiceService } from './poke-dex-service.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PokeDexServiceService', () => {
  let pokeDexService: PokeDexServiceService;
  const bulbasaurPokeName = 'bulbasaur';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [PokeDexServiceService],
    }).compileComponents();

    pokeDexService = TestBed.inject(PokeDexServiceService);
  });

  it('should be created', () => {
    expect(pokeDexService).toBeTruthy();
  });

  it('should return the pokemon << bulbasur >> by the -- id = 1 --', () => {
    pokeDexService.getPokemonById(1).subscribe(data => {
      expect(data.name).toEqual(bulbasaurPokeName);
    });
  });

  it('should return the pokemon << bulbasur >> by the -- name = bulbasur --', () => {
    pokeDexService.getPokemonByName('bulbasur').subscribe(data => {
      expect(data.name).toEqual(bulbasaurPokeName);
    });
  });

  it('should return << Not Found >> when searching for a pokemon by the -- id = 0 --', () => {
    pokeDexService.getPokemonById(1).subscribe(data => {
      expect(data).toEqual('Not Found');
    });
  });

  it('should have a size of 4, as an -- PokemonList -- object', () => {
    /* 
      It should have the size = 4, because the Object has 4 items like that:
        PokemonList = {
          count: 0,
          next: '',
          previous: '',
          results: []
        };
    */

    pokeDexService.getAllPokemonsPaginated().subscribe((data) => {
      expect(data).toHaveSize(4);
    });
  });
});
