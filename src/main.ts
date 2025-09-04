// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';
// import { provideAnimations } from '@angular/platform-browser/animations';



// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideNoopAnimations } from '@angular/platform-browser/animations'; 
// or use provideAnimations if you want Angular animations globally

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideNoopAnimations()   // 👈 disables Angular animations globally
  ]
}).catch((err) => console.error(err));
