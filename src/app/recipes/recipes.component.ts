import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SpoonacularService } from '../services/spoonacular.service';
import { RecipeCardInfo } from '../models/recipe-card-info';
import { Subscription, forkJoin } from "rxjs";
import { RecipeInfo } from '../models/recipe-detail-info';
import { ParamsService } from '../services/params.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private spoonacularService: SpoonacularService,
    private paramsService: ParamsService
  ) {}
  
  fixedRecipesSubscription!: Subscription;
  randomRecipes!: Subscription;
  recipes: any[] = [];

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  
    this.fetchRandomRecipes();
  }

  fetchRandomRecipes(): void {
    this.randomRecipes = this.spoonacularService
      .getRandomRecipes(12)
      .subscribe((recipe: any) => {
        this.recipes = recipe.recipes;
      });
  }

  selectFilter(selectedFilters: any): void {
    const query = this.paramsService.transformToQuery(selectedFilters);

    this.fixedRecipesSubscription = this.spoonacularService
        .searchComplexRecipe(query)
        .subscribe((res: any) => {
            this.recipes = res.results;
        });
  }

  onSearch(searchTerm: RecipeCardInfo) {
    const title = searchTerm.title ?? '';

    this.spoonacularService.getRecipeAutoComplete(title).subscribe((recipes: any[]) => {
      const recipeIds = recipes.map(recipe => recipe.id);
      forkJoin(recipeIds.map(id => this.spoonacularService.getRecipe(id))).subscribe((detailedRecipes: RecipeInfo[]) => {
        this.recipes = detailedRecipes;
      });
    });
  }
  
  onRecipeCardClicked(recipe: RecipeCardInfo) {
    this.router.navigate(['/recipe', recipe.id]);
  }

  ngOnDestroy(): void {
    if (this.fixedRecipesSubscription) {
      this.fixedRecipesSubscription.unsubscribe();
    }
    this.randomRecipes.unsubscribe();
  }
}
