import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BackgroundService } from './app/core/services/background/background.service';

function initializeAppFactory(backgroundService: BackgroundService) {
  return (): void => {
    backgroundService.init().then();
  };
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    BackgroundService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [BackgroundService],
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
