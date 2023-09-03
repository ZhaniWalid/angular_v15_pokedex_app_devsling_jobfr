import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultPokemonComponent } from './search-result-pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResultPokemonEvolutionsComponent } from '../search-result-pokemon-evolutions/search-result-pokemon-evolutions.component';
import { SearchResultPokemonMovesComponent } from '../search-result-pokemon-moves/search-result-pokemon-moves.component';
import { SearchResultPokemonStatsComponent } from '../search-result-pokemon-stats/search-result-pokemon-stats.component';

describe('SearchResultPokemonComponent', () => {
  let component: SearchResultPokemonComponent;
  let fixture: ComponentFixture<SearchResultPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [
        SearchResultPokemonComponent,
        SearchResultPokemonStatsComponent,
        SearchResultPokemonEvolutionsComponent,
        SearchResultPokemonMovesComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have << STATS >> in -- #stats-tab -- by ID', () => {
    const statsTabDiv = fixture.debugElement.nativeElement.querySelector('#stats-tab');
    expect(statsTabDiv.innerHTML).toBe(' STATS ');
  });

  it('should have << EVOLUTIONS >> in -- #evolutions-tab -- by ID', () => {
    const evolutionsTabDiv = fixture.debugElement.nativeElement.querySelector('#evolutions-tab');
    expect(evolutionsTabDiv.innerHTML).toBe(' EVOLUTIONS ');
  });

  it('should have << MOVES >> in -- #moves-tab -- by ID', () => {
    const movesTabDiv = fixture.debugElement.nativeElement.querySelector('#moves-tab');
    expect(movesTabDiv.innerHTML).toBe(' MOVES ');
  });
});
