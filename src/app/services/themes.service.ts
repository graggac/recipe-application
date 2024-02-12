import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = false;

  constructor() {
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
  }

  toggleDarkTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  getIsDarkTheme(): boolean {
    return this.isDarkTheme;
  }
}