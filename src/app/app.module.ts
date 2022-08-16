import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardFormModule } from './card-form/card-form.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CardFormModule, PipesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
