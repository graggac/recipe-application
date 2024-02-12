import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent  implements OnInit {
  isButtonActive: boolean = false;
  public isSidebarVisible = false;
  public isSidebarOpen = false;

  toggleButtonState() {
    this.isButtonActive = !this.isButtonActive;
    this.isSidebarVisible = !this.isSidebarVisible;
    this.isSidebarOpen = this.isSidebarVisible;
  }

  closeSidebar() {
    this.isSidebarVisible = false;
    this.isSidebarOpen = false;
  }

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
  }

}
  
