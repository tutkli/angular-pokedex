import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private readonly smallBreakpoint: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  smallBreakpoint$: Observable<boolean> = this.smallBreakpoint.asObservable().pipe(share());

  constructor(private breakpointObserver: BreakpointObserver) {}

  /**
   * Checks the matching state of @media queries and updates view when it matches a small screen
   */
  init(): void {
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
          this.smallBreakpoint.next(result.matches);
        },
      });
  }
}
