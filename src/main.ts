import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InitService } from './app/services/init/init.service';

function initializeAppFactory(initService: InitService) {
  return (): void => {
    initService.initializeApp().then();
  };
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(MatSnackBarModule),
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [InitService],
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
