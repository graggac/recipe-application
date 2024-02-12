import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-signup-section',
  templateUrl: './signup-section.component.html',
  styleUrls: ['./signup-section.component.css']
})
export class SignupSectionComponent implements OnInit{
  list: string[] = ["We welcome food enthusiasts of all backgrounds and experience levels.",
          "Explore a diverse collection of delicious recipes.",
          "Customize your culinary journey with theme options and personal preferences.",
          "We're here to support your cooking journey, no matter your skill level.",
          "We believe that great food doesn't have to be complicated.",
          "Join us in the joy of cooking, sharing, and laughter."];

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
        
  loginWithRedirect(): void {
    this.auth.loginWithRedirect({ 
      authorizationParams: {
        screen_hint: 'signup'
      } 
    });
  }
}