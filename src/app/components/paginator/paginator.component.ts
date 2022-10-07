import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from 'pokenode-ts';
import { BreakpointObserverService } from '../../services/breakpoint-observer/breakpoint-observer.service';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, FlexModule, MatButtonModule, MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  idArray = Array.from(Array(10).keys());

  get smallBreakpoint$(): Observable<boolean> {
    return this.breakpointObserverService.smallBreakpoint$;
  }

  get pokemon$(): Observable<Pokemon | undefined> {
    return this.pokemonService.pokemon$;
  }

  constructor(private pokemonService: PokemonService, private breakpointObserverService: BreakpointObserverService) {}

  async getPreviousPokemon(): Promise<void> {
    await this.pokemonService.getPreviousPokemon();
  }

  async getNextPokemon(): Promise<void> {
    await this.pokemonService.getNextPokemon();
  }

  async getPokemonById(pokemonId: number): Promise<void> {
    await this.pokemonService.getPokemon(pokemonId);
  }
}
