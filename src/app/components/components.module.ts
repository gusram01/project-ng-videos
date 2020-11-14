import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'ng-starrating';

import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { CastSliderComponent } from './cast-slider/cast-slider.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SliderComponent,
    MoviesListComponent,
    CastSliderComponent,
  ],
  imports: [CommonModule, RouterModule, RatingModule, PipesModule, FormsModule],
  exports: [
    NavbarComponent,
    SliderComponent,
    MoviesListComponent,
    CastSliderComponent,
  ],
})
export class ComponentsModule {}
