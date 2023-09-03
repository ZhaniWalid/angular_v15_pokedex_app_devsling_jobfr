import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PokeDexSearchPageComponent } from './components/poke-dex-search-page/poke-dex-search-page.component';
import { NoPokemonFoundComponent } from './components/no-pokemon-found/no-pokemon-found.component';
import { FooterCmpCommonPageComponent } from './components/footer-cmp-common-page/footer-cmp-common-page.component';
import { SearchResultPokemonEvolutionsComponent } from './components/search-result-pokemon-evolutions/search-result-pokemon-evolutions.component';
import { SearchResultPokemonMovesComponent } from './components/search-result-pokemon-moves/search-result-pokemon-moves.component';
import { SearchResultPokemonStatsComponent } from './components/search-result-pokemon-stats/search-result-pokemon-stats.component';
import { SearchResultPokemonComponent } from './components/search-result-pokemon/search-result-pokemon.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        PokeDexSearchPageComponent,
        NoPokemonFoundComponent,
        SearchResultPokemonComponent,
        SearchResultPokemonStatsComponent,
        SearchResultPokemonEvolutionsComponent,
        SearchResultPokemonMovesComponent,
        FooterCmpCommonPageComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-pokedex-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-pokedex-app');
  });

  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(undefined); // It should be "undefined" & Not "AngularPokedexApp" because, I have removed the default querySelector('.content span')
  }); */
});
