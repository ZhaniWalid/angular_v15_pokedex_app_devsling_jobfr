describe('PokemonList', () => {
  it('should create an instance of a -- pokemonListObj --', () => {
    const pokemonListObj = {
      count: 1281,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/',
        },
      ],
    }; 
    
    expect(pokemonListObj).toBeTruthy();
  });
});
