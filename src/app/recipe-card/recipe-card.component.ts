import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SpoonacularService } from '../services/spoonacular.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe: any;
  @Input() showViewButton: boolean = true;
  @Output() recipeClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router) {}

  viewRecipe(recipeTitle: string) {
    this.router.navigate(['/recipe', recipeTitle]);
  }

  onRecipeClicked() {
    this.recipeClicked.emit(this.recipe.title);
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
