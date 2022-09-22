import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly pokeAPI: PokemonClient = new PokemonClient();
  private readonly pokemon: BehaviorSubject<Pokemon | undefined> = new BehaviorSubject<Pokemon | undefined>(undefined);
  readonly pokemon$: Observable<Pokemon | undefined> = this.pokemon.asObservable();

  get currentPokemon(): Pokemon | undefined {
    return this.pokemon.getValue();
  }

  constructor(private messageService: MessageService) {}

  /**
   * Get a Pokemon by its name or id
   * @param nameOrId {string | number} The Pokemon name or id
   */
  async getPokemon(nameOrId: string | number): Promise<void> {
    if (typeof nameOrId === 'string') {
      return this.pokeAPI
        .getPokemonByName(nameOrId.toLowerCase())
        .then((pokemon: Pokemon): void => this.pokemon.next(pokemon))
        .catch((): void => this.messageService.showMessage("We couldn't find that Pokemon."));
    }
    return this.pokeAPI
      .getPokemonById(nameOrId)
      .then((pokemon: Pokemon): void => this.pokemon.next(pokemon))
      .catch((): void => this.messageService.showMessage("We couldn't find that Pokemon."));
  }

  async getPreviousPokemon(): Promise<void> {
    if (this.currentPokemon === undefined || this.currentPokemon.id === 1) {
      return;
    }
    await this.getPokemon(this.currentPokemon.id - 1);
  }

  async getNextPokemon(): Promise<void> {
    if (this.currentPokemon === undefined) {
      return;
    }
    await this.getPokemon(this.currentPokemon.id + 1);
  }
}
