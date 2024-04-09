import { Injectable } from '@angular/core';

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