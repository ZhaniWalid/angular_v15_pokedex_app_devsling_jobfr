import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultPokemonEvolutionsComponent } from './search-result-pokemon-evolutions.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchResultPokemonEvolutionsComponent', () => {
  let component: SearchResultPokemonEvolutionsComponent;
  let fixture: ComponentFixture<SearchResultPokemonEvolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ SearchResultPokemonEvolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultPokemonEvolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
