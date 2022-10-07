import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexModule } from '@angular/flex-layout';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, FlexModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent {
  @ViewChild('searchInput') searchInputRef: ElementRef<HTMLInputElement> | undefined;

  constructor(private pokemonService: PokemonService) {}

  /**
   * Automatically search the Pokemon when pressing ENTER inside the input
   */
  searchPokemon(): void {
    if (this.searchInputRef === undefined) {
      return;
    }
    const value = this.searchInputRef.nativeElement.value;
    this.pokemonService.getPokemon(value).then((): void => {
      if (this.searchInputRef !== undefined) this.searchInputRef.nativeElement.value = '';
    });
  }
}
