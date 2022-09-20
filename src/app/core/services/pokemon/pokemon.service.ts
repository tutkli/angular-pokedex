import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon, PokemonClient } from 'pokenode-ts';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly pokeAPI: PokemonClient = new PokemonClient();
  private readonly pokemonSubject: BehaviorSubject<Pokemon | undefined> = new BehaviorSubject<Pokemon | undefined>(
    undefined
  );
  readonly pokemonObservable: Observable<Pokemon | undefined> = this.pokemonSubject.asObservable();

  constructor() {
    this.getPokemon(1);
  }

  /**
   * Get a Pokemon by its name or id
   * @param nameOrId {string | number} The Pokemon name or id
   */
  getPokemon(nameOrId: string | number): void {
    if (typeof nameOrId === 'string') {
      this.pokeAPI
        .getPokemonByName(nameOrId)
        .then((pokemon: Pokemon): void => this.pokemonSubject.next(pokemon))
        .catch((error): void => console.error(error()));
    }
    if (typeof nameOrId === 'number') {
      this.pokeAPI
        .getPokemonById(nameOrId)
        .then((pokemon: Pokemon): void => this.pokemonSubject.next(pokemon))
        .catch((error): void => console.error(error()));
    }
  }
}
