import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  imageFolder = '../assets/images/';
  imageFiles = ['pexels-engin-akyurt-2347311.jpg',
                'pexels-gonzalo-guzmán-garcía-14179986.jpg',
                'pexels-ivan-samkov-8951202.jpg',
                'pexels-lisa-fotios-1279330.jpg',
                'pexels-marcelo-verfe-16743486.jpg',
                'pexels-miguel-marmolejos-fernández-6389711.jpg',
                'pexels-pixabay-361184.jpg',
                'pexels-pixabay-461198.jpg',
                'pexels-valeria-boltneva-1639557.jpg'];
}
