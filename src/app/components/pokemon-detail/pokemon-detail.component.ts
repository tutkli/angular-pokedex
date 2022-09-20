import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { filter, Observable } from 'rxjs';
import { Pokemon } from 'pokenode-ts';
import { FlexModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { PokemonTypeColors } from '../../shared/pokemon-type-colors.const';
import { ToKilogramsPipe } from '../../pipes/to-kilograms/to-kilograms.pipe';
import { ToMetersPipe } from '../../pipes/to-meters/to-meters.pipe';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, FlexModule, MatChipsModule, ToKilogramsPipe, ToMetersPipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent implements OnInit {
  pokemonTypeColors = PokemonTypeColors;
  smallerScreen!: boolean;

  get pokemon$(): Observable<Pokemon | undefined> {
    return this.pokemonService.pokemon$.pipe(filter((pokemon: Pokemon | undefined): boolean => pokemon !== undefined));
  }

  constructor(
    private pokemonService: PokemonService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.WebPortrait,
      ])
      .subscribe({
        next: (result: BreakpointState): void => {
          this.smallerScreen = result.matches;
          this.changeDetectorRef.detectChanges();
        },
      });
  }
}
