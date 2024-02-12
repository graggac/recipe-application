import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { SignupSectionComponent } from './signup-section/signup-section.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { ThemeService } from './services/themes.service';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { LoadingComponent } from './loading/loading.component';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    HomeComponent,
    HeroSectionComponent,
    SignupSectionComponent,
    FooterComponent,
    ProfileComponent,
    SearchHistoryComponent,
    RecipesComponent,
    SignupPageComponent,
    RecipeCardComponent,
    RecipeDetailComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-2zlqky1xsanumqpq.us.auth0.com',
      clientId: 'dk0rWzol64gPRrgPSQcNvxZgpDTB0mWp',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    ThemeService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}

