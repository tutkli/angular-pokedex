import { Inject, Injectable } from '@angular/core';
import { FastAverageColor, FastAverageColorResult } from 'fast-average-color';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from 'pokenode-ts';
import { delay } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private readonly fastAverageColor: FastAverageColor = new FastAverageColor();

  constructor(private pokemonService: PokemonService, @Inject(DOCUMENT) private document: Document) {}

  async init(): Promise<void> {
    this.pokemonService.pokemonObservable.pipe(delay(1)).subscribe({
      next: (pokemon: Pokemon | undefined): void => {
        if (pokemon !== undefined) this.updateBackground();
      },
    });

    return new Promise<void>((resolve: any, reject: any): void => resolve());
  }

  updateBackground(): void {
    this.fastAverageColor
      .getColorAsync(document.querySelector('img'))
      .then((color: FastAverageColorResult): void => {
        const body = document.querySelector('body');
        if (body !== null) {
          body.style.backgroundColor = color.rgba;
        }
      })
      .catch((error): void => console.log(error));
  }
}
