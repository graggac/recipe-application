import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SpoonacularService } from '../services/spoonacular.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {}
  
  recipes: any[] = [];
  filteredRecipes: any[] = [];

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }

    this.filteredRecipes = this.recipes.slice();
  }

  onSearch(query: string) {
    if (query) {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
    } 
  }

  onRecipeCardClicked(recipeTitle: string) {
    this.router.navigate(['/recipe', recipeTitle]);
  }
}
