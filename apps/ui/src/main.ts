import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {APP_CONFIG} from './app/app.config';

if (environment.production) {
  enableProdMode();
}

fetch('/assets/config.json', {cache: 'no-store'})
  .then((response) => response.json())
  .then((config) => {
    platformBrowserDynamic([{provide: APP_CONFIG, useValue: config}])
      .bootstrapModule(AppModule)
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  });
