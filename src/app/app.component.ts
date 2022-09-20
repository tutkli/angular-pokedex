import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FlexModule } from '@angular/flex-layout';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, FlexModule, PokemonDetailComponent, PaginatorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  smallerScreen!: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private changeDetectorRef: ChangeDetectorRef) {}

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
