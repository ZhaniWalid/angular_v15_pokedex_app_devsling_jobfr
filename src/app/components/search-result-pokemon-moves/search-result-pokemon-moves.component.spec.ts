import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultPokemonMovesComponent } from './search-result-pokemon-moves.component';

describe('SearchResultPokemonMovesComponent', () => {
  let component: SearchResultPokemonMovesComponent;
  let fixture: ComponentFixture<SearchResultPokemonMovesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultPokemonMovesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultPokemonMovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
