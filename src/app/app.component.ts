import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from './core/services/pokemon/pokemon.service';
import { filter, Observable } from 'rxjs';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FlexModule } from '@angular/flex-layout';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, FlexModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private pokemonService: PokemonService) {}

  get pokemonObservable(): Observable<Pokemon | undefined> {
    return this.pokemonService.pokemonObservable.pipe(
      filter((pokemon: Pokemon | undefined): boolean => pokemon !== undefined)
    );
  }
}
