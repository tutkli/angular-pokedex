import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { filter, Observable } from 'rxjs';
import { Pokemon } from 'pokenode-ts';
import { FlexModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { PokemonTypeColors } from '../../shared/pokemon-type-colors.const';
import { ToKilogramsPipe } from '../../pipes/to-kilograms/to-kilograms.pipe';
import { ToMetersPipe } from '../../pipes/to-meters/to-meters.pipe';
import { BreakpointObserverService } from '../../services/breakpoint-observer/breakpoint-observer.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, FlexModule, MatChipsModule, ToKilogramsPipe, ToMetersPipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  pokemonTypeColors = PokemonTypeColors;

  get smallBreakpoint$(): Observable<boolean> {
    return this.breakpointObserverService.smallBreakpoint$;
  }

  get pokemon$(): Observable<Pokemon | undefined> {
    return this.pokemonService.pokemon$.pipe(filter((pokemon: Pokemon | undefined): boolean => pokemon !== undefined));
  }

  constructor(private pokemonService: PokemonService, private breakpointObserverService: BreakpointObserverService) {}
}
