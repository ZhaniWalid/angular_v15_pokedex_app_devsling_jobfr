import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { PokemonList } from '../common/classes/pokemon-list';
import { PokemonListInterface } from '../common/interfaces/pokemon-list-interface';

@Injectable({
  providedIn: 'root'
})
export class PokeDexServiceService {

  private pokeApiBaseUrl: string = 'https://pokeapi.co/api/v2';
  private pokeApiPokemonUrl: string = `${this.pokeApiBaseUrl}/pokemon`;
  private pokeApiPokemonSpeciesDescUrl: string = `${this.pokeApiBaseUrl}/pokemon-species`;
  private pokeApiPokemonEvolutionChainUrl: string = `${this.pokeApiBaseUrl}/evolution-chain`;
  
  constructor(private httpClient: HttpClient) { }

  /**
   * @description GET All Pokemons paginated from the Pokemon REST API https://pokeapi.co/api/v2/pokemon.
   * @returns Observable< PokemonList > 
   * @author WALID ZHANI 
  */
  getAllPokemonsPaginated(): Observable<PokemonList> {
    // debugger
    // You can add 'https://pokeapi.co/api/v2'+ '/?offset=20&limit=20' (who are by default)
    const res = this.httpClient.get<PokemonListInterface>(this.pokeApiPokemonUrl).pipe(
      map(response => response)
    );

    return res;
  }

  /**
   * @description GET the Pokemon by ID from the Pokemon REST API https://pokeapi.co/api/v2/pokemon/{thePokemonId}.
   * @param thePokemonId
   * @returns Observable< any > 
   * @author WALID ZHANI 
  */
  getPokemonById(thePokemonId: number): Observable<any> {
    // debugger
    // Need to build URL based on pokemon ID
    const pokemonByIdUrl = `${this.pokeApiPokemonUrl}/${thePokemonId}`;

    return this.httpClient.get<any>(pokemonByIdUrl).pipe(
      // map((data: any) => console.log(`getPokemonById-SERVICE @ fetched Pokemon=${JSON.stringify(data)}`)),
       tap(_ => console.log(`getPokemonById-SERVICE @ fetched Pokemon thePokemonId=${thePokemonId}`)),
       catchError(this.handleError<any>(`getPokemonById-SERVICE @ thePokemonId=${thePokemonId}`))
     );;
  }

  /**
   * @description GET the Pokemon by NAME from the Pokemon REST API https://pokeapi.co/api/v2/pokemon/{thePokemonName}.
   * @param thePokemonName
   * @returns Observable< any > 
   * @author WALID ZHANI 
  */
  getPokemonByName(thePokemonName: string): Observable<any> {
    // debugger
    // Need to build URL based on pokemon name
    const pokemonByNameUrl = `${this.pokeApiPokemonUrl}/${thePokemonName}`;

    return this.httpClient.get<any>(pokemonByNameUrl).pipe(
     // map((data: any) => console.log(`getPokemonByName-SERVICE @ fetched Pokemon=${JSON.stringify(data)}`)),
      tap(_ => console.log(`getPokemonByName-SERVICE @ fetched Pokemon thePokemonName=${thePokemonName}`)),
      catchError(this.handleError<any>(`getPokemonByName-SERVICE @ thePokemonName=${thePokemonName}`))
    );
  }

  /**
   * @description GET the Pokemon Species & Description by ID from the Pokemon REST API https://pokeapi.co/api/v2/pokemon-species/{thePokemonId}.
   * @param thePokemonId
   * @returns Observable< any > 
   * @author WALID ZHANI 
  */
  getPokemonDescriptionById(thePokemonId: number): Observable<any> {
    // debugger
    // Need to build URL based on pokemon ID
    const pokemonDescriptionByIdUrl = `${this.pokeApiPokemonSpeciesDescUrl}/${thePokemonId}`;

    return this.httpClient.get<any>(pokemonDescriptionByIdUrl).pipe(
      // map((data: any) => console.log(`getPokemonDescriptionById-SERVICE @ fetched thePokemonId=${JSON.stringify(data)}`)),
       tap(_ => console.log(`getPokemonDescriptionById-SERVICE @ fetched Pokemon-Description thePokemonId=${thePokemonId}`)),
       catchError(this.handleError<any>(`getPokemonDescriptionById-SERVICE @ thePokemonId=${thePokemonId}`))
    );
  }

  /**
   * @description GET the Pokemon Evolution Chain by ID from the Pokemon REST API https://pokeapi.co/api/v2/evolution-chain/{thePokemonId}.
   * @param thePokemonId
   * @returns Observable< any > 
   * @author WALID ZHANI 
  */
  getPokemonEvolutionChainById(thePokemonId: number): Observable<any> {
    // Need to build URL based on pokemon ID
    const pokemonEvolutionChainByIdUrl = `${this.pokeApiPokemonEvolutionChainUrl}/${thePokemonId}`;

    return this.httpClient.get<any>(pokemonEvolutionChainByIdUrl).pipe(
      // map((data: any) => console.log(`getPokemonEvolutionChainById-SERVICE @ fetched thePokemonId=${JSON.stringify(data)}`)),
       tap(_ => console.log(`getPokemonEvolutionChainById-SERVICE @ fetched Pokemon-EvolutionChain thePokemonId=${thePokemonId}`)),
       catchError(this.handleError<any>(`getPokemonEvolutionChainById-SERVICE @ thePokemonId=${thePokemonId}`))
    );
  }

  /**
   * @description Handle Http operation that failed. | Let the app continue.
   * @param operation - name of the operation that failed.
   * @param result - optional value to return as the observable result.
   * @returns result as T (Let the app keep running by returning an empty result).
   * @author WALID ZHANI
   */
  handleError<T>(operation = 'operation', result?: T)  {
    /* 
      # handleError:

          The following "handleError()" can be shared by many "HeroService" methods
          so it's generalized to meet their different needs.

          Instead of handling the error directly, it returns an error handler function to "catchError".
          This function is configured with both the name of the operation
          that failed and a safe return value.

          After reporting the error to the console, the handler constructs a friendly message
          and returns a safe value so the application can keep working.

          Because each service method returns a different kind of "Observable" result,
          "handleError()" takes a type parameter to return the safe value 
          as the type that the application expects. */

    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}