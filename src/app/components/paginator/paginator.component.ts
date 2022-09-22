import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Observable } from 'rxjs';
import { Pokemon } from 'pokenode-ts';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, FlexModule, MatButtonModule, MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  idArray = Array.from(Array(10).keys());
  smallerScreen!: boolean;

  get pokemon$(): Observable<Pokemon | undefined> {
    return this.pokemonService.pokemon$;
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
