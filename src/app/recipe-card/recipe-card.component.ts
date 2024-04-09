import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeCardInfo } from '../models/recipe-card-info';
import { RecipeInfo } from '../models/recipe-detail-info';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: RecipeInfo;
  @Input() showViewButton: boolean = true;
  @Output() recipeClicked: EventEmitter<RecipeCardInfo> = new EventEmitter<RecipeCardInfo>();

  constructor(private router: Router) {}

  viewRecipe(recipeTitle: string) {
    this.router.navigate(['/recipe', recipeTitle]);
  }

  onRecipeClicked() {
    this.recipeClicked.emit(this.recipe);
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }

  ngOnInit(): void {}
}
