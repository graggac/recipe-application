import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faClock, faUserClock, faPlateWheat, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs/internal/Subscription';
import { SpoonacularService } from '../services/spoonacular.service';
import { RecipeCardInfo } from '../models/recipe-card-info';
import { forkJoin } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ExtendedIngredient } from '../models/recipe-detail-info';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  faClock = faClock;
  faUserClock = faUserClock;
  faPlateWheat = faPlateWheat;
  faHeartPulse = faHeartPulse;
  id!: number;
  recipe: any;
  nutritionInfo: any;
  recipeSubscription!: Subscription;
  nutritionSubscription!: Subscription;
  similarRecipes: any[] = [];
  nutritionVisualizationHtml?: SafeHtml;
  visualizationSubscription!: Subscription;
  ingredientListInput: string = '';
  
  constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document, private router: Router, private spoonacularService: SpoonacularService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      if (!this.id) {
        this.router.navigateByUrl("/");
      }
      this.recipeSubscription = this.spoonacularService
        .getRecipe(this.id)
        .subscribe((res) => {
          this.recipe = res;
          this.updateNutrition();
        });     
    
        this.spoonacularService.visualizeNutrition(this.ingredientListInput, 2).subscribe(
          (visualizationHtml: SafeHtml) => {
            this.nutritionVisualizationHtml = visualizationHtml;
          },
        );
      
      this.nutritionSubscription = this.spoonacularService
        .getNutritionLabel(this.id)
        .subscribe((res) => {
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onloadend = () => {
            this.nutritionInfo = reader.result;
          };
        }); 

        this.spoonacularService.getSimilarRecipes(this.id).subscribe((res: any[]) => {
          const recipeIds = res.map((recipe: any) => recipe.id);
          forkJoin(recipeIds.map((id: number) => this.spoonacularService.getRecipe(id))).subscribe((detailedRecipes: any[]) => {
            this.similarRecipes = detailedRecipes;
          });
        });
      
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }

  }

  onRecipeCardClicked(recipe: RecipeCardInfo) {
    this.router.navigate(['/recipe', recipe.id]);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.nutritionSubscription.unsubscribe();
    this.visualizationSubscription.unsubscribe();
  }

  updateNutrition() {
    const ingredientList = this.recipe.extendedIngredients
      .map((ingredient: ExtendedIngredient) => ingredient.original)
      .join('\n');
    const servings = this.recipe.servings;

    if (this.visualizationSubscription) {
      this.visualizationSubscription.unsubscribe();
    }

    this.visualizationSubscription = this.spoonacularService.visualizeNutrition(ingredientList, servings).subscribe(
      (visualizationHtml: SafeHtml) => {
        this.nutritionVisualizationHtml = visualizationHtml;
      }
    );
  }
}