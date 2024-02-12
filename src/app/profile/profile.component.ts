import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileJson: string | null = null;
  isDarkTheme: boolean;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.updateTheme(this.isDarkTheme);
  }

  toggleDarkTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.updateTheme(this.isDarkTheme);
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  private updateTheme(isDarkTheme: boolean): void {
    if (isDarkTheme) {
      this.document.body.classList.add('dark-theme');
    } 
    else {
      this.document.body.classList.remove('dark-theme');
    }
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }
}
