import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokeDexSearchPageComponent } from './components/poke-dex-search-page/poke-dex-search-page.component';
import { NoPokemonFoundComponent } from './components/no-pokemon-found/no-pokemon-found.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultPokemonComponent } from './components/search-result-pokemon/search-result-pokemon.component';

import { HttpClientModule } from '@angular/common/http';
import { PokeDexServiceService } from './services/poke-dex-service.service';
import { SearchResultPokemonStatsComponent } from './components/search-result-pokemon-stats/search-result-pokemon-stats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { SearchResultPokemonEvolutionsComponent } from './components/search-result-pokemon-evolutions/search-result-pokemon-evolutions.component';
import { SearchResultPokemonMovesComponent } from './components/search-result-pokemon-moves/search-result-pokemon-moves.component';
import { FooterCmpCommonPageComponent } from './components/footer-cmp-common-page/footer-cmp-common-page.component';

const routes: Routes = [
  // NOTE: * Order of routes is important.
  //       * First match wins.
  //       * Start from most specific to generic.
  { path: 'pokemon-info-page/search-by-id/:pokemon-id', component: SearchResultPokemonComponent },
  { path: 'pokemon-info-page/search-by-name/:pokemon-name', component: SearchResultPokemonComponent },
  { path: 'pokedex-welcome-search-page', component: PokeDexSearchPageComponent },
  { path: '404-pokemon-not-found', component: NoPokemonFoundComponent },
  { path: '', redirectTo: '/pokedex-welcome-search-page', pathMatch: 'full' },
  // path: '**' => This is a generic wildcard.
  //            => It will on anything that didn't match above routes.
  { path: '**', redirectTo: '/pokedex-welcome-search-page', pathMatch: 'full' }
];

@NgModule({
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
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatTabsModule
  ],
  providers: [PokeDexServiceService], // Allow us to inject the given Service, into other parts of our app
  bootstrap: [AppComponent]
})
export class AppModule { }
