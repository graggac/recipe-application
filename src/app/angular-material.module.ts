import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatOptionModule,
    ],
  imports: [
    
  ]
})

export class AngularMaterialModule {

}