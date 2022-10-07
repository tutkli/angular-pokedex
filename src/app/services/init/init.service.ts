import { Injectable } from '@angular/core';
import { BackgroundService } from '../background/background.service';
import { BreakpointObserverService } from '../breakpoint-observer/breakpoint-observer.service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  constructor(
    private backgroundService: BackgroundService,
    private breakpointObserverService: BreakpointObserverService
  ) {}

  initializeApp(): Promise<void> {
    return new Promise<void>(async (resolve: any, reject: any): Promise<void> => {
      await this.backgroundService.init();
      this.breakpointObserverService.init();
      resolve();
    });
  }
}
