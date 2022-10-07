import { Injectable } from '@angular/core';
import { FastAverageColor, FastAverageColorResult } from 'fast-average-color';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from 'pokenode-ts';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private readonly fastAverageColor: FastAverageColor = new FastAverageColor();

  constructor(private pokemonService: PokemonService) {}

  /**
   * Initializes the background service by requesting the first Pokemon and upgrading the background color with the result
   */
  async init(): Promise<void> {
    return new Promise<void>((resolve: any, reject: any): void => {
      this.pokemonService
        .getPokemon(1)
        .then((): void => {
          this.pokemonService.pokemon$.pipe(delay(1)).subscribe({
            next: (pokemon: Pokemon | undefined): void => {
              if (pokemon !== undefined) this.updateBackground();
            },
          });
        })
        .catch((error): void => {
          console.error(error);
          reject();
        });
      resolve();
    });
  }

  /**
   * Gets the average color of the selected Pokemon image and updates the CSS variable for the body background-color
   */
  updateBackground(): void {
    this.fastAverageColor
      .getColorAsync(document.querySelector('img'))
      .then((color: FastAverageColorResult): void => {
        document.documentElement.style.setProperty('--background-color', color.hex);
      })
      .catch((error): void => console.log(error));
  }
}
