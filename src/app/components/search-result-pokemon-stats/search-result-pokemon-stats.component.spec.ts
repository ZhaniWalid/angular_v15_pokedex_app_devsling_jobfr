import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultPokemonStatsComponent } from './search-result-pokemon-stats.component';

describe('SearchResultPokemonStatsComponent', () => {
  let component: SearchResultPokemonStatsComponent;
  let fixture: ComponentFixture<SearchResultPokemonStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultPokemonStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultPokemonStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
